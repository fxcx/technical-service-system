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

- Los tipos de las entidades de datos deben derivarse del modelo generado por Prisma.
- Usar los tipos utilitarios que expone Prisma para construir variantes (inputs, DTOs, payloads con relaciones), en lugar de copiar los campos manualmente:
  ```ts
  import { Prisma } from '@prisma/client'

  type UserWithPosts = Prisma.UserGetPayload<{ include: { posts: true } }>
  type CreateUserInput = Prisma.UserCreateInput
  ```
- Si el `schema.prisma` cambia, correr `npx prisma generate` antes de seguir escribiendo código. El compilador debe marcar como error cualquier tipo derivado que haya quedado desactualizado — si un archivo no está enlazado correctamente a los tipos de Prisma, ese error no aparecerá, así que evitar redefinir tipos "a mano" es lo que garantiza esta protección.

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

## 6. Reglas complementarias (opcional — ajustar según se necesite)

- Manejo de errores consistente: lanzar/propagar objetos `Error` (o subclases tipadas propias), nunca strings sueltos.
- No dejar `console.log` en código que se considera terminado; usar un logger si se necesita trazabilidad.
- Comentar solo lo que no es evidente por el nombre o el tipo — evitar comentarios que repiten lo que el código ya dice.
- Preferir funciones puras dentro de la lógica de negocio; aislar los efectos secundarios (DB, red, filesystem) en la capa de repositorio/servicio.