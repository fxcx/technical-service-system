# Arquitectura del Sistema — TechService

# Visión General

TechService es un sistema de gestión integral para empresas de servicio técnico implementado como una Progressive Web App (PWA).

La aplicación utiliza un monolito Full Stack construido con Next.js App Router.

La PWA constituye la interfaz principal utilizada por administradores y técnicos desde PC, tablet y dispositivos móviles.

La arquitectura separa claramente:

- Presentación
- Cliente
- Lógica de negocio
- Persistencia
- Integraciones externas

La base de datos PostgreSQL constituye la fuente oficial de verdad del sistema.

---

# Objetivos de la Arquitectura

La arquitectura debe cumplir los siguientes principios:

- Escalable.
- Modular.
- Fácil de mantener.
- Integrable con servicios externos.
- Preparada para crecimiento.
- Bajo acoplamiento entre módulos.
- Separación clara entre interfaz, negocio y persistencia.

El sistema debe poder incorporar nuevos módulos sin modificar innecesariamente la estructura existente.

---

# Stack Tecnológico

## Frontend

- Next.js App Router
- React
- TypeScript
- Context para necesidades simples
- Zustand como almacén centralizado
- TailwindCSS
- shadcn/ui
- Radix UI

## Reactividad

RxJS deberá utilizarse únicamente cuando exista una necesidad real de programación reactiva basada en streams u observables.

RxJS no es un requisito para implementar Push Notifications.

Las notificaciones Push utilizarán Web Push y Service Worker.

---

# Backend

- Next.js App Router
- Server Components
- Server Actions
- Route Handlers
- Middleware
- Zod
- bcrypt
- Autenticación y autorización
- Manejo centralizado de errores
- Logging

---

# Base de Datos

- PostgreSQL
- Supabase
- supabase storage (para guardar imagenes)
- Prisma 8 ORM

Supabase PostgreSQL constituye la fuente oficial de verdad del sistema.

Prisma es responsable del acceso de la aplicación a PostgreSQL.

Prisma se ejecuta exclusivamente en el servidor.

El navegador nunca debe ejecutar Prisma directamente.

# 3 storrage en supabase`

Storage — TechService

## Proveedor

El almacenamiento principal de archivos utilizará Supabase Storage.

PostgreSQL no se utilizará para almacenar directamente archivos binarios grandes.

---

# Principios de Rendimiento

La arquitectura deberá diseñarse para permitir crecimiento del volumen de datos y usuarios sin modificar el monolito principal.

La aplicación deberá utilizar:

- Consultas selectivas.
- Paginación.
- Índices adecuados.
- Separación entre datos operativos y archivos.
- Carga diferida de información pesada.
- Almacenamiento externo para archivos y fotografías.

El volumen de datos no debe considerarse una razón suficiente para introducir microservicios.

## Organización

Los archivos deberán organizarse por entidad.

Ejemplo:

```text
services/
  {serviceId}/
    photos/
      {uuid}.webp
      {uuid}_thumb.webp
```

---

# Performance — TechService

## Objetivo

El sistema debe mantener tiempos de respuesta adecuados a medida que aumentan:

- usuarios
- servicios
- clientes
- fotografías
- presupuestos
- cobros
- rendiciones
- historial

## Base de datos

Las consultas deberán solicitar únicamente la información necesaria.

Evitar:

```sql
SELECT *
FROM tabla;
```

cuando la tabla pueda contener grandes cantidades de registros.

Las consultas deberán:

utilizar filtros
utilizar paginación
utilizar índices
evitar N+1 queries
seleccionar únicamente las columnas necesarias
evitar traer grandes volúmenes de información innecesariamente
Paginación

Las listas grandes deberán utilizar paginación.

Ejemplos:

servicios
clientes
presupuestos
cobros
rendiciones
inventario
historial

No se deberán cargar todos los registros de una tabla grande al navegador.

Índices

Los campos utilizados frecuentemente en:

WHERE
JOIN
ORDER BY
búsquedas
filtros

deberán evaluarse para indexación.

Los índices deberán basarse en patrones reales de consulta y no agregarse indiscriminadamente.

N+1

Se deberá evitar realizar consultas individuales repetitivas para cada registro de una colección.

Las relaciones necesarias deberán resolverse mediante consultas eficientes.

Imágenes

Las imágenes no deberán almacenarse dentro de PostgreSQL.

La base de datos deberá almacenar únicamente:

identificador
ruta
nombre
tipo
tamaño
metadatos necesarios

El archivo físico deberá almacenarse en Supabase Storage.

Carga de imágenes

Las imágenes deberán optimizarse antes o durante su almacenamiento.

Se deberán considerar:

compresión
redimensionamiento
formatos modernos
thumbnails
carga diferida

Una lista no deberá descargar imágenes originales innecesariamente.

# ORM

La persistencia utilizará Prisma.

Toda lectura o escritura realizada por la aplicación deberá respetar la capa de persistencia.

La lógica de acceso a datos no deberá estar dispersa dentro de componentes de interfaz.

# Seguridad de Base de Datos

La base de datos utilizará Row Level Security (RLS).

Las políticas de seguridad deberán impedir que un usuario acceda a información que no corresponde a su rol o alcance.

La seguridad de autorización debe existir tanto en la aplicación como en la base de datos cuando corresponda.

---

# Cache

Se utilizarán mecanismos de caché de Next.js únicamente cuando sean compatibles con la naturaleza de los datos.

La información dinámica y sensible no deberá almacenarse mediante mecanismos de caché que puedan provocar datos obsoletos o filtraciones entre usuarios.

---

# Arquitectura General

```text
                         INTERNET
                            │
                            ▼
                       Navegador / PWA
                            │
                           HTTPS
                            │
                ┌───────────┴───────────┐
                │                       │
         Server Components       Client Components
                │                       │
                │                Service Worker
                │                       │
                │                    IndexedDB
                │
                └───────────┬───────────┘
                            │
               Server Actions / Route Handlers
                            │
                            ▼
                    Capa de negocio
                            │
                            ▼
                     Capa de persistencia
                            │
                         Prisma
                            │
                            ▼
                  Supabase PostgreSQL
```

La infraestructura que ejecuta el monolito se define en `infrastructure.md`.

La arquitectura lógica del sistema no depende de un proveedor específico de infraestructura.

---

# Capas

## Presentación

Responsable de la interfaz.

Incluye:

- páginas
- layouts
- componentes
- formularios
- estados visuales
- navegación

---

## Cliente

Responsable de la experiencia interactiva en el navegador.

Incluye:

- Client Components
- Zustand
- Context
- Service Worker
- IndexedDB
- estado de conectividad
- cola de sincronización
- funcionalidades PWA

---

## Negocio

Implementa las reglas definidas en:

```text
.docs/reglas-negocio.md
```

Toda funcionalidad nueva debe respetar dicho documento.

La lógica de negocio no debe depender directamente de componentes visuales.

---

## Persistencia

Responsable del acceso a la base de datos.

Utiliza:

```text
Prisma
    ↓
Supabase PostgreSQL
```

Toda lectura y escritura debe pasar por la capa correspondiente de persistencia.

---

## Integraciones

Responsable de comunicarse con servicios externos.

Actualmente:

- Google Sheets
- APIs externas

Las integraciones deberán permanecer desacopladas del resto del sistema.

---

# Módulos del Sistema

```text
Dashboard

Clientes

Agenda

Técnicos

Servicios

Rendiciones

Presupuestos

Inventario

Integraciones

```

Cada módulo posee responsabilidades específicas y debe mantener bajo acoplamiento con los demás módulos.

---

# Flujo General

```text
Administrador
      ↓
Crear Servicio
      ↓
Crear Cliente o buscar
      ↓
Asignar Técnico
      ↓
Agenda
      ↓
Técnico realiza la visita
      ↓
Cierre del servicio
      ↓
Cobro
      ↓
Presupuesto opcional
      ↓
Rendición
      ↓
Finalización
```

---

# Roles

## Administrador

Puede administrar completamente el sistema.

Funciones:

- Clientes
- Técnicos
- Agenda
- Cobros
- Presupuestos
- Rendiciones
- Inventario

---

## Técnico

Solo puede acceder a la información correspondiente a su ámbito de trabajo.

Puede:

- visualizar agenda
- cambiar estados
- cerrar servicios
- enviar presupuestos
- registrar cobros
-
- consultar rendiciones propias finalizadas

Nunca debe poder administrar o consultar información perteneciente a otros técnicos cuando las reglas de negocio lo impidan.

---

# Comunicación entre Módulos

Los módulos utilizan la base de datos como fuente oficial de información.

```text
Clientes
    ↓
Servicios
    ↓
Cobros
    ↓
Presupuestos
    ↓
Rendiciones
```

Los módulos no deben establecer dependencias innecesarias entre sí.

Cuando un módulo necesite información de otro, deberá utilizar las capas correspondientes del sistema.

---

# Eventos del Sistema

Todo cambio importante deberá generar un evento interno cuando corresponda.

Ejemplos:

- Servicio creado
- Servicio actualizado
- Servicio cancelado
- Cobro registrado
- Presupuesto enviado
- Rendición generada

Los eventos deberán diseñarse de manera que puedan utilizarse posteriormente para automatizaciones.

---

# Integraciones

Las integraciones no deben convertirse en la fuente principal de verdad del sistema.

El flujo debe ser:

```text
Sistema
   ↓
Integración
   ↓
Servicio Externo
```

Las integraciones deberán consumir información del sistema mediante las capas correspondientes.

---

# Google Sheets

Google Sheets representa únicamente una vista externa de la agenda.

Cada modificación realizada dentro de TechService puede sincronizar la información correspondiente.

La sincronización puede producirse cuando:

- se crea un servicio
- cambia la fecha
- cambia el técnico
- cambia el estado
- se cancela un servicio

Google Sheets no constituye la fuente oficial de verdad.

Google Sheets no deberá modificar directamente la información principal del sistema.

---

# WhatsApp

WhatsApp funciona como herramienta de comunicación.

El sistema puede generar mensajes preparados para copiar y pegar.

El usuario decide cuándo enviarlos.

No existen envíos automáticos de WhatsApp dentro de la arquitectura actual.

---

# Eventos y Automatización

Los eventos internos deberán mantener la posibilidad de incorporar posteriormente:

- Notificaciones Push
- Automatizaciones
- Integraciones adicionales
- Inteligencia Artificial
- Flujos automáticos

Las automatizaciones no deben modificar directamente datos sin pasar por las reglas de negocio correspondientes.

---

# PWA

TechService se implementa como Progressive Web App.

La PWA deberá permitir:

- instalación
- ejecución en modo standalone
- experiencia responsive
- mantenimiento de sesión
- carga rápida
- detección online/offline
- funcionamiento offline cuando corresponda
- sincronización posterior
- futuras notificaciones Push

---

# Service Worker

El Service Worker es responsable de las capacidades PWA del cliente.

Puede encargarse de:

- cachear recursos estáticos
- gestionar estrategias de caché
- detectar determinados escenarios offline
- participar en Push Notifications
- participar en sincronización cuando corresponda

El Service Worker no debe contener lógica de negocio.

---

# Información Dinámica

Los datos dinámicos y sensibles no deberán cachearse indiscriminadamente.

Ejemplos:

- Servicios
- Clientes
- Agenda
- Técnicos
- Presupuestos
- Cobros
- Rendiciones
- Inventario

La información deberá mantenerse aislada según usuario y rol.

---

# Funcionamiento Offline

El sistema debe diferenciar claramente entre:

```text
ONLINE
```

y:

```text
OFFLINE
```

La interfaz debe mostrar claramente el estado actual de conectividad.

---

# Operaciones Offline del Técnico

Cuando el técnico se encuentre sin conexión, la aplicación podrá trabajar con la información previamente sincronizada que sea necesaria.

Debe contemplarse:

- consultar servicios previamente sincronizados
- consultar información necesaria del servicio
- registrar cambios de estado
- registrar cierre de servicio
- registrar cobros
- registrar repuestos utilizados
- registrar información para presupuestos
- guardar temporalmente operaciones pendientes

Las operaciones offline no se consideran confirmadas por el servidor hasta que hayan sido sincronizadas correctamente.

---

# Cola de Sincronización

Las operaciones realizadas offline deberán almacenarse en una cola local.

```text
Usuario
   ↓
PWA
   ↓
¿Hay conexión?
   ↓
┌──────────────┐
│              │
Sí             No
│              │
↓              ↓
Servidor    Storage local
│              │
↓              ↓
Supabase    Cola de operaciones
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

- identificar cada operación
- generar un identificador único
- registrar fecha de creación
- registrar estado
- reintentar operaciones fallidas
- evitar duplicados
- registrar errores

---

# Idempotencia

Toda operación que pueda ejecutarse mediante sincronización debe diseñarse considerando idempotencia.

Si una operación se reenvía debido a un retry, el servidor no debe generar información duplicada.

Ejemplo:

```text
Operación:
Cerrar servicio #123

operationId:
550e8400-e29b-41d4-a716-446655440000
```

El servidor debe reconocer una operación ya procesada.

---

# Fuente de Verdad

La base de datos PostgreSQL en Supabase continúa siendo la única fuente oficial de verdad.

```text
Supabase PostgreSQL
        ↑
      Prisma
        ↑
   Next.js Server
        ↑
       PWA
        ↓
   IndexedDB local
```

El almacenamiento local representa únicamente un estado temporal, una caché de trabajo y una cola de operaciones pendientes.

Los datos locales nunca deben considerarse definitivos.

---

# Persistencia Local

Para datos estructurados y operaciones pendientes se utilizará:

```text
IndexedDB
```

No se utilizará `localStorage` como base de datos de la aplicación.

`localStorage` podrá utilizarse para:

- preferencias visuales
- configuración de UI
- filtros no sensibles

No se almacenarán:

- contraseñas
- secretos
- credenciales administrativas
- claves privadas
- secretos de Supabase

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
Validar
   ↓
Persistir en Supabase
   ↓
Confirmar operación
   ↓
Eliminar de cola
   ↓
Actualizar estado local
```

La sincronización debe ser resistente a:

- pérdida de conexión
- múltiples reintentos
- cierre de aplicación
- recarga de página
- suspensión del dispositivo
- operaciones duplicadas
- errores de validación
- conflictos

---

# Conflictos de Datos

La aplicación debe contemplar conflictos entre información local y datos existentes en el servidor.

Los conflictos no deben resolverse silenciosamente.

Cuando una operación offline no pueda aplicarse:

1. Detectar el conflicto.
2. Registrar la operación.
3. Informar al usuario.
4. Evitar pérdida silenciosa.
5. Aplicar las reglas de negocio correspondientes.

Las reglas concretas se definen en:

```text
.docs/reglas-negocio.md
```

---

# Estado de Conectividad

La interfaz deberá representar claramente estados como:

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

```text
⚠ Error de sincronización
```

El usuario deberá poder identificar si una operación:

- fue enviada
- está pendiente
- está sincronizando
- falló
- fue confirmada

---

# Notificaciones Push

TechService queda preparado para incorporar Web Push Notifications.

Podrán utilizarse para:

- nuevos servicios asignados
- cambios de agenda
- cambios importantes
- avisos administrativos
- recordatorios
- eventos relevantes

Las notificaciones no deberán contener información sensible innecesaria.

La implementación de Push deberá permanecer desacoplada de la lógica principal.

---

# Seguridad PWA

La PWA debe respetar las mismas políticas de seguridad que el sistema web.

No deben almacenarse en el dispositivo:

- contraseñas
- secretos de Supabase
- credenciales administrativas
- claves privadas
- tokens sensibles innecesarios
- información innecesaria para el funcionamiento offline

Las capacidades offline deben respetar el rol del usuario.

Un técnico nunca debe obtener mediante caché local información perteneciente a otro técnico.

---

# Instalación

La aplicación deberá ser instalable como PWA en navegadores compatibles.

Deberá funcionar correctamente en:

- Desktop
- Tablet
- Mobile

La interfaz debe ser responsive y estar especialmente adaptada al uso móvil de los técnicos.

---

# Escalabilidad

La arquitectura queda preparada para incorporar:

- Notificaciones Push
- Firma Digital
- Historial de Equipos
- Inteligencia Artificial
- Portal del Cliente
- Aplicación Móvil
- Inventario avanzado
- Nuevas integraciones

La incorporación de nuevos módulos no deberá romper los límites establecidos entre capas.

---

# Principios de Desarrollo

Todo desarrollo nuevo deberá cumplir:

- Código reutilizable.
- Componentes desacoplados.
- Separación entre UI y lógica.
- Validaciones centralizadas.
- APIs consistentes.
- Modelos normalizados.
- Tipado estricto.
- Documentación obligatoria.
- Respeto de las reglas de negocio.
- Separación entre cliente y servidor.

---

# Documentación

La carpeta `.docs` representa la especificación oficial del proyecto.

Toda modificación funcional debe comenzar actualizando la documentación correspondiente.

La implementación del código deberá respetar dicha documentación.

La documentación tiene prioridad sobre la implementación existente cuando ambas entren en conflicto, siempre que el cambio haya sido aprobado.
