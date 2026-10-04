# UI / UX General — Taller

# Objetivo

La interfaz debe permitir que Administración y los Técnicos trabajen de forma rápida, simple y eficiente, con comunicación precisa.

La prioridad es reducir la cantidad de acciones necesarias para completar una tarea.

Toda pantalla debe mostrar únicamente la información necesaria para el contexto actual del usuario.

---

# Principios de Diseño

Toda la interfaz debe respetar:

- Simplicidad
- Consistencia
- Rapidez
- Responsive
- Accesibilidad
- Separación clara de funciones por rol

La interfaz de Técnicos será Mobile First.

La interfaz de Administración será Desktop First.

---

# Responsive

Toda la aplicación deberá funcionar correctamente en:

- Desktop
- Tablet
- Mobile

La adaptación deberá priorizar el contexto de uso de cada rol.

Administración:

```text
Desktop First
```

Técnico:

```text
Mobile First
```

---

# Accesibilidad

Todos los controles interactivos deberán ser comprensibles y accesibles.

Los botones importantes deberán poseer:

- Icono cuando corresponda
- Texto
- Tooltip cuando el contexto lo requiera

Toda acción destructiva deberá solicitar confirmación.

Los elementos interactivos deberán mantener tamaños adecuados para uso táctil.

---

# Estados Vacíos

Toda pantalla sin información deberá mostrar:

- Mensaje claro
- Acción principal
- Acción recomendada cuando corresponda

Nunca se deberán mostrar tablas vacías sin contexto.

---

# Estados de Carga

Toda operación que pueda demorar deberá proporcionar un estado visual apropiado.

Se deberán contemplar:

- Loading
- Skeleton cuando corresponda
- Estado vacío
- Error
- Éxito

---

# Estados del Sistema

Los estados importantes deberán representarse visualmente de manera consistente.

```text
Pendiente       → Amarillo
En Proceso      → Azul
Completado      → Verde
Cancelado       → Rojo
Cerrado         → Gris
```

Los colores nunca deberán ser el único medio para comunicar información.

---

# Componentes Reutilizables

Toda la aplicación deberá reutilizar componentes comunes cuando exista una necesidad equivalente.

Componentes principales:

```text
DataTable
Form
Modal
Drawer
Timeline
StatusBadge
Money
DatePicker
SearchInput
Pagination
ConfirmDialog
Upload
EmptyState
Loading
```

Los componentes reutilizables deberán mantener una API consistente.

---

# UX

Toda acción importante deberá requerir la menor cantidad razonable de pasos.

Como objetivo:

```text
Acciones frecuentes ≤ 3 interacciones principales
```

No deberá forzarse una cantidad artificial de clics cuando afecte claridad o seguridad.

Toda información importante deberá estar disponible sin navegación innecesaria.

El usuario no deberá perder el contexto de trabajo.

La navegación deberá ser consistente dentro de cada interfaz.

---

# Separación de Interfaces

taller de calderas posee dos experiencias diferenciadas:

```text
Administrador
    ↓
ui-administracion.md
```

```text
Técnico
    ↓
ui-tecnico.md
```

No se deberá utilizar una única interfaz genérica para ambos roles cuando las necesidades de interacción sean diferentes.

---

# Escalabilidad de UI

La interfaz deberá poder incorporar posteriormente:

- Portal del Cliente
- Firma Digital
- Google Maps
- Google Calendar
- Notificaciones Push
- Modo Oscuro
- Inteligencia Artificial
- nuevas funcionalidades PWA

Las nuevas funcionalidades deberán integrarse respetando los patrones existentes.
