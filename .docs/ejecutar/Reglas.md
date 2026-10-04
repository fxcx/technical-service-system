# Reglas de código — TypeScript + Prisma

## 1. Nomenclatura

- Los nombres de variables, funciones y parámetros deben describir claramente qué representan o qué hacen. No usar abreviaciones sin sentido (ej: `u` en vez de `user`, `res` genérico sin contexto).
- Convenciones de formato:
  - `camelCase` para variables y funciones.
  - `PascalCase` para tipos, interfaces y clases.
  - `UPPER_SNAKE_CASE` para constantes globales/configuración.
- Excepción razonable: índices de bucles muy cortos y locales (`for (let i = 0; ...)`) pueden mantenerse como `i`, ya que es una convención universalmente entendida — no aplica la regla de "sin abreviaciones" ahí.

## 2. Tipado explícito (types-first)

- Toda función debe declarar explícitamente el tipo de sus parámetros **y** su tipo de retorno, no depender solo de la inferencia.
- Evitar `any` en cualquier caso. Si el tipo es realmente desconocido, usar `unknown` y validar/estrechar el tipo antes de operar con el valor.
- Las firmas públicas de funciones y módulos deben ser autoexplicativas por sus tipos, sin necesidad de leer la implementación.

## 3. Prisma como fuente de verdad del tipado

> **Nota de versión:** desde Prisma ORM 7 (la versión estable recomendada en producción, ya que Prisma 8 sigue en Release Candidate) el generador por defecto cambió de `prisma-client-js` a `prisma-client`. Esto cambia dónde vive el cliente generado y cómo se importa. Ajustá esta sección según qué generador use tu proyecto.

- Los tipos de las entidades de datos deben derivarse del modelo generado por Prisma, nunca redefinidos a mano en paralelo.

- **Si el proyecto usa el generador nuevo (`prisma-client`, por defecto desde v7/v8):**
  El schema define una carpeta de salida explícita:
  ```prisma
  generator client {
    provider = "prisma-client"
    output   = "../generated/prisma"
  }
  ```
  Y las importaciones se hacen desde esa carpeta generada, no desde `@prisma/client`:
  ```ts
  import { PrismaClient, Prisma } from '../generated/prisma/client'

  type UserWithPosts = Prisma.UserGetPayload<{ include: { posts: true } }>
  type CreateUserInput = Prisma.UserCreateInput
  ```
  Los tipos de modelos y enums tienen archivos propios dentro de esa misma carpeta:
  ```ts
  import { UserModel, PostModel } from '../generated/prisma/models'
  import { Role } from '../generated/prisma/enums'
  ```
  Si se necesitan tipos en código de frontend/navegador, hay una entrada separada que no expone el cliente ni nada server-only:
  ```ts
  import { Role } from '../generated/prisma/browser'
  ```
  La ruta `../generated/prisma` es solo un ejemplo — usá la que esté definida en el `output` del schema del proyecto.

- **Si el proyecto todavía usa el generador legado (`prisma-client-js`):**
  El cliente se sigue publicando en `node_modules/@prisma/client` y se importa como antes:
  ```ts
  import { PrismaClient, Prisma } from '@prisma/client'
  ```

- Usar siempre los tipos utilitarios que expone Prisma (`Prisma.UserGetPayload`, `Prisma.UserCreateInput`, etc.) para construir variantes con relaciones, inputs o DTOs, en lugar de copiar los campos a mano.
- Si el `schema.prisma` cambia, correr `npx prisma generate` antes de seguir escribiendo código. El compilador debe marcar como error cualquier tipo derivado que haya quedado desactualizado — si un archivo no está enlazado correctamente a los tipos generados, ese error no aparecerá, así que evitar redefinir tipos "a mano" es lo que garantiza esta protección.

## 4. Modularidad

- Cada archivo tiene una responsabilidad única. No mezclar en un mismo archivo: acceso a datos, lógica de negocio y consumo/presentación.
- Separar por dominio/feature, aunque convivan en la misma carpeta:

  ```
  /lib/services/user/
    user.types.ts        → tipos específicos del módulo (basados en Prisma)
    user.repository.ts   → queries directas a la base de datos
    user.service.ts       → lógica de negocio, validaciones, orquestación
    index.ts             → barrel export (API pública del módulo)
  ```

- Evitar archivos "todo en uno" que crecen sin límite. Si un archivo empieza a mezclar responsabilidades distintas, es señal de que debe dividirse.

## 5. Barrel exports (`index.ts`)

- Cada carpeta de módulo expone su API pública a través de un `index.ts` que reexporta lo necesario.
- Los consumidores externos importan siempre desde el barrel, nunca desde los archivos internos directamente:
  ```ts
  // ✅ correcto
  import { getUserById } from '@/lib/services/user'

  // ❌ evitar
  import { getUserById } from '@/lib/services/user/user.repository'
  ```
- Exportar explícitamente lo que es parte de la API pública (`export { getUserById } from './user.service'`), en vez de `export *` sin criterio, para no filtrar detalles internos del módulo.

## 6. Manejo centralizado de errores

- Definir un conjunto propio de clases de error (extendiendo `Error`) en un módulo central, ej. `lib/errors/`, en vez de lanzar strings o instancias genéricas de `Error` sueltas por el código:
  ```ts
  export class AppError extends Error {
    constructor(message: string, public readonly statusCode: number) {
      super(message)
      this.name = this.constructor.name
    }
  }

  export class NotFoundError extends AppError {
    constructor(entity: string) {
      super(`${entity} no encontrado`, 404)
    }
  }

  export class ValidationError extends AppError {
    constructor(message: string) {
      super(message, 400)
    }
  }
  ```
- Los errores de Prisma se traducen a estos errores propios **en la capa de repositorio**, nunca se dejan pasar crudos hacia servicios, route handlers o componentes:
  ```ts
  import { Prisma } from '../generated/prisma/client'

  try {
    return await prisma.user.findUniqueOrThrow({ where: { id } })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new NotFoundError('Usuario')
    }
    throw error
  }
  ```
- Existe un único punto central (`handleError`, un middleware, o el `catch` de cada route handler/Server Action) que decide el código HTTP, el mensaje visible al cliente y qué se loguea — esa lógica de formateo no se repite en cada endpoint.
- `try/catch` se usa principalmente en los bordes de la aplicación (route handlers, Server Actions, jobs), dejando que el error se propague desde las capas internas (repository/service) en vez de capturarlo y re-formatearlo en cada nivel.

## 7. `app/` vs `/api`: cuándo llamar al service directo y cuándo pasar por una ruta

> **Nota de versión:** Prisma 8 sigue en Release Candidate al momento de escribir esto (Prisma 7 es la versión estable recomendada para producción). El ejemplo de abajo usa el patrón de import del cliente generado (`provider = "prisma-client"` + carpeta de `output`), que es igual en ambas versiones. Prisma 8 también ofrece una forma alternativa de definir el schema en TypeScript (`contract.ts`) que todavía cambia de forma incompatible entre release candidates — no usar esa sintaxis hasta que la versión sea estable.

- En el App Router, un **Server Component puede llamar directo al `service`**, sin pasar por `/api` — corre en el servidor y puede importar `lib/` sin problema.
- `/api` (route handlers) solo hace falta cuando algo *externo* a ese render necesita los datos: un Client Component haciendo `fetch`, una app mobile, un webhook, etc.
- El `service` es el mismo código en ambos casos — ni el repository ni el validador se enteran de si la llamada vino de un Server Component o de una request HTTP. Esa reutilización es el punto de tener capas separadas.

Ejemplo completo con un modelo `User { id, name, email }`:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
}
```

```ts
// lib/validators/user.schema.ts
import { z } from 'zod'

export const getUserParamsSchema = z.object({
  id: z.string().uuid(),
})
```

```ts
// lib/services/user/user.repository.ts — única capa que toca Prisma
import { prisma } from '@/lib/db'
import { Prisma } from '../../../generated/prisma/client'
import { NotFoundError } from '@/lib/errors'

export async function findUserById(id: string) {
  try {
    return await prisma.user.findUniqueOrThrow({ where: { id } })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new NotFoundError('Usuario')
    }
    throw error
  }
}
```

```ts
// lib/services/user/user.service.ts — valida y orquesta
import { getUserParamsSchema } from '@/lib/validators/user.schema'
import { findUserById } from './user.repository'

export async function getUser(rawParams: unknown) {
  const { id } = getUserParamsSchema.parse(rawParams)
  return findUserById(id)
}
```

```ts
// lib/services/user/index.ts
export { getUser } from './user.service'
```

```tsx
// app/users/[id]/page.tsx — Server Component, sin /api
import { getUser } from '@/lib/services/user'

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser({ id: params.id })
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

```ts
// app/api/users/[id]/route.ts — solo si un Client Component o algo externo lo necesita
import { getUser } from '@/lib/services/user'
import { withErrorHandling } from '@/lib/middlewares'

export const GET = withErrorHandling(
  async (_req: Request, { params }: { params: { id: string } }) => {
    const user = await getUser({ id: params.id })
    return Response.json(user)
  }
)
```

## 8. Reglas complementarias (opcional — ajustar según se necesite)

- No dejar `console.log` en código que se considera terminado; usar un logger si se necesita trazabilidad.
- Comentar solo lo que no es evidente por el nombre o el tipo — evitar comentarios que repiten lo que el código ya dice.
- Preferir funciones puras dentro de la lógica de negocio; aislar los efectos secundarios (DB, red, filesystem) en la capa de repositorio/servicio.