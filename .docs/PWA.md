# Arquitectura PWA

Taller de calderas debe implementarse como una **Progressive Web App (PWA)**.

La PWA será la interfaz principal del sistema y deberá poder instalarse desde navegadores compatibles como una aplicación en los dispositivos utilizados por administradores y técnicos.

La aplicación seguirá siendo una aplicación web basada en Next.js, pero incorporará capacidades propias de una PWA mediante un **Service Worker**, Web App Manifest, estrategias de caché y soporte para funcionamiento offline cuando corresponda.

---

## Objetivos de la PWA

La implementación PWA debe permitir:

- Instalar Taller de calderas como aplicación.
- Ejecutar la aplicación desde el dispositivo sin necesidad de abrir manualmente el navegador.
- Mantener la sesión del usuario.
- Cargar rápidamente las interfaces utilizadas frecuentemente.
- Detectar cambios entre conexión online y offline.
- Permitir determinadas operaciones al técnico cuando no exista conexión.
- Sincronizar automáticamente los cambios realizados offline cuando vuelva la conexión.
- Recibir notificaciones Push cuando esta funcionalidad sea implementada.
- Mantener una experiencia consistente en PC, tablet y teléfono.

---

# Service Worker

Taller de calderas utilizará un **Service Worker** como mecanismo principal para las capacidades PWA.

El Service Worker será responsable de:

- Cachear recursos estáticos.
- Permitir carga rápida de la aplicación.
- Gestionar estrategias de caché.
- Detectar y gestionar determinados escenarios offline.
- Participar en la futura implementación de notificaciones Push.
- Participar en la sincronización de operaciones pendientes cuando corresponda.

El Service Worker **no debe contener lógica de negocio**.

La lógica de negocio debe permanecer dentro de las capas correspondientes de la aplicación.

---

# Web App Manifest

La aplicación deberá incluir un `manifest.webmanifest` correctamente configurado.

Debe definir como mínimo:

- `name`
- `short_name`
- `description`
- `start_url`
- `display`
- `theme_color`
- `background_color`
- `icons`

La aplicación debe utilizar `display: standalone` para que, cuando sea instalada, tenga comportamiento similar a una aplicación nativa.

Los iconos deberán incluir los tamaños necesarios para los navegadores y dispositivos compatibles.

---

# Estrategia de Caché

La estrategia de caché debe diferenciar entre:

### Recursos estáticos

Pueden utilizar estrategias de caché agresivas debido a que no representan información dinámica del negocio.

Ejemplos:

- JavaScript
- CSS
- fuentes
- iconos
- imágenes estáticas

### Información dinámica

Los datos provenientes de la aplicación y de Supabase **no deben cachearse indiscriminadamente**.

La información dinámica debe utilizar estrategias específicas dependiendo de su naturaleza.

Ejemplos:

- Servicios
- Clientes
- Agenda
- Técnicos
- Presupuestos
- Cobros
- Rendiciones

La información sensible y dinámica debe mantenerse controlada y nunca exponerse mediante una estrategia de caché que pueda provocar filtraciones entre usuarios o roles.

---

# Funcionamiento Offline

El sistema debe diferenciar claramente entre:

**Online**

El dispositivo tiene conexión con el servidor y Supabase.

**Offline**

El dispositivo perdió temporalmente la conexión.

La PWA debe detectar ambos estados y reflejarlos visualmente en la interfaz.

---

# Operaciones Offline del Técnico

El rol Técnico es el principal usuario que requiere capacidades offline.

Cuando el técnico se encuentre sin conexión, la aplicación debe permitir trabajar con la información previamente sincronizada que sea necesaria para su jornada.

Como mínimo, debe contemplarse la posibilidad de:

- Consultar servicios previamente sincronizados.
- Consultar información necesaria del servicio.
- Registrar cambios de estado.
- Registrar información del cierre del servicio.
- Registrar cobros.
- Registrar repuestos utilizados.
- Registrar información necesaria para presupuestos.
- Guardar temporalmente las operaciones realizadas.

Las operaciones realizadas offline **no deben considerarse confirmadas por el servidor hasta que sean sincronizadas correctamente**.

---

# Cola de Sincronización

Las operaciones realizadas mientras el dispositivo está offline deberán almacenarse localmente en una **cola de sincronización**.

Conceptualmente:

```text
Usuario
   ↓
PWA
   ↓
¿Hay conexión?
   ↓
 ┌───────────────┐
 │               │
Sí              No
 │               │
 ↓               ↓
Servidor       Storage local
 │               │
 ↓               ↓
Supabase      Cola de operaciones
                 │
                 ↓
          Recupera conexión
                 │
                 ↓
          Sincronización
                 │
                 ↓
              Servidor
```

La cola deberá permitir:

- Identificar cada operación.
- Mantener un identificador único de operación.
- Registrar fecha de creación.
- Registrar estado de sincronización.
- Reintentar operaciones fallidas.
- Evitar duplicar operaciones.
- Registrar errores de sincronización.

---

# Idempotencia

Toda operación que pueda ejecutarse mediante sincronización debe diseñarse considerando **idempotencia**.

Si una operación offline se envía nuevamente debido a un retry, el servidor no debe generar información duplicada.

Ejemplo:

```text
Operación:

Cerrar servicio #123

operationId:
550e8400-e29b-41d4-a716-446655440000
```

Si el cliente envía nuevamente la misma operación debido a una pérdida de conexión, el servidor debe reconocer que esa operación ya fue procesada.

---

# Fuente de Verdad

La base de datos del servidor continúa siendo la **fuente oficial de verdad**.

El almacenamiento local del dispositivo solamente representa un estado temporal y/o una caché de trabajo.

```text
Supabase
   ↑
Servidor
   ↑
PWA
   ↓
Storage local
```

Los datos locales nunca deben considerarse como fuente definitiva.

---

# Persistencia Local

Para las capacidades offline se deberá utilizar un almacenamiento persistente apropiado para el navegador.

Para datos estructurados y operaciones pendientes se recomienda utilizar:

**IndexedDB**

No se debe utilizar `localStorage` como base de datos de la aplicación.

`localStorage` podrá utilizarse únicamente para preferencias simples que no sean críticas.

Ejemplos:

- preferencias visuales
- configuración de UI
- filtros no sensibles

No almacenar credenciales ni información sensible en `localStorage`.

---

# Sincronización

Cuando vuelva la conexión:

```text
Offline
   ↓
Operaciones pendientes
   ↓
Detectar conexión
   ↓
Enviar operaciones
   ↓
Validar en servidor
   ↓
Persistir en Supabase
   ↓
Confirmar operación
   ↓
Eliminar de cola
   ↓
Actualizar estado local
```

La sincronización debe ser segura frente a:

- pérdida de conexión
- múltiples reintentos
- cierre de la aplicación
- recarga de la página
- suspensión del dispositivo
- operaciones duplicadas
- errores de validación
- conflictos de datos

---

# Conflictos de Datos

La aplicación debe contemplar conflictos entre los datos locales y los datos existentes en el servidor.

Los conflictos no deben resolverse silenciosamente.

Cuando una operación offline no pueda aplicarse porque el estado del servidor cambió, el sistema deberá:

1. Detectar el conflicto.
2. Registrar la operación como fallida/conflictiva.
3. Informar al usuario.
4. Evitar pérdida silenciosa de información.
5. Permitir resolver el conflicto mediante la lógica definida por negocio.

Las reglas concretas de resolución deberán definirse en:

```text
.docs/reglas-negocio.md
```

---

# Estado de Conectividad

La interfaz deberá mostrar claramente el estado de conexión.

Ejemplos:

```text
● Conectado
```

```text
● Sin conexión
```

```text
↻ Sincronizando...
```

```text
✓ Todo sincronizado
```

El usuario debe poder identificar fácilmente si una operación:

- fue enviada al servidor
- está pendiente
- está sincronizando
- falló
- fue confirmada

---

# Notificaciones Push

Taller de calderas queda preparado para incorporar **Web Push Notifications**.

Las notificaciones podrán utilizarse posteriormente para:

- Nuevos servicios asignados.
- Cambios de agenda.
- Cambios importantes en servicios.
- Avisos administrativos.
- Recordatorios.
- Eventos relevantes.

Las notificaciones Push no deben contener información sensible innecesaria.

La implementación de Push debe mantenerse desacoplada de la lógica principal del sistema.

---

# Seguridad PWA

La PWA debe mantener las mismas políticas de seguridad que la aplicación web.

No se deben almacenar en el dispositivo:

- contraseñas
- tokens sensibles innecesarios
- credenciales administrativas
- secretos de Supabase
- claves privadas
- información que no sea necesaria para el funcionamiento offline

Las capacidades offline deben respetar el rol del usuario.

Un técnico nunca debe poder obtener mediante caché local información perteneciente a otro técnico simplemente porque anteriormente estuvo disponible en el dispositivo.

---

# Instalación

La aplicación debe cumplir los requisitos necesarios para ser instalable como PWA en navegadores compatibles.

La experiencia de instalación debe permitir que el usuario pueda acceder a Taller de calderas como una aplicación independiente.

La interfaz deberá funcionar correctamente en:

- Desktop
- Tablet
- Mobile

El diseño debe ser responsive y adaptarse especialmente al uso móvil de los técnicos.

---

# Arquitectura PWA y Next.js

La implementación PWA no debe modificar la arquitectura principal del sistema.

La estructura continuará siendo:

```text
Next.js
   ↓
Server Components / Client Components
   ↓
Server Actions / Route Handlers
   ↓
Capa de negocio
   ↓
Prisma
   ↓
Supabase PostgreSQL
```

La PWA agrega una capa adicional en el cliente:

```text
                    Next.js
                       │
              ┌────────┴────────┐
              │                 │
        Server Side        Client Side
              │                 │
              │                PWA
              │                 │
              │        ┌────────┴────────┐
              │        │                 │
              │   Service Worker    IndexedDB
              │        │                 │
              └────────┴─────────────────┘
                       │
                    Prisma
                       │
                    Supabase
```

La implementación PWA no debe trasladar Prisma, secretos ni lógica de servidor al navegador.

---

# Regla Arquitectónica

El agente de desarrollo debe considerar que:

**PWA ≠ base de datos local.**

La PWA proporciona capacidades de instalación, caché, conectividad y experiencia offline.

La persistencia oficial del sistema continúa siendo:

```text
Supabase PostgreSQL
```

El almacenamiento local solamente funciona como soporte temporal para las capacidades offline.

---

# Prioridad de Implementación

La implementación PWA deberá realizarse por etapas.

### Etapa 1 — PWA básica

- Manifest
- Service Worker
- Iconos
- Instalación
- HTTPS
- Responsive UI

### Etapa 2 — Estado de conexión

- Detección online/offline
- Indicador visual
- Estados de sincronización

### Etapa 3 — Offline para Técnico

- IndexedDB
- Datos necesarios para la agenda
- Cola de operaciones
- Persistencia local

### Etapa 4 — Sincronización

- Retry
- Idempotencia
- Manejo de errores
- Resolución de conflictos

### Etapa 5 — Push Notifications

- Suscripción Push
- Service Worker Push
- Gestión de permisos
- Notificaciones por eventos

Cada etapa deberá implementarse y probarse antes de avanzar a la siguiente.

---
