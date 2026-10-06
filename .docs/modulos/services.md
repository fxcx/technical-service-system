# Órdenes de Trabajo (Services)

# Objetivo

La Orden de Trabajo (OT) representa una visita técnica programada para un cliente.

Es la entidad principal del sistema y concentra toda la información relacionada con un trabajo técnico.

Toda la operación del sistema gira alrededor de una Orden de Trabajo.

---

# Ciclo de Vida

Toda Orden de Trabajo sigue el siguiente flujo.

```
Crear Orden de service

↓

Asignar Técnico

↓

Enviar información al Cliente manualmente por el admnistrador copy paste del formulario creado en primer instancia

↓

Agenda

↓

Visita Técnica del técnico

↓

se crea el formulario con los datos del servicio realizado

↓

Presupuesto (Opcional)

↓

Cierre

↓

Finalización
```

---

# Creación del Servicio

El Administrador crea un servicio, indicando:

- Empresa
- Cliente (requerido)
- telefono
- Dirección
- Localidad
- Equipo
- categoria de servicio
- Observaciones (opcional)
- monto estimado de servicio ya que el tecnico una vez que asista al service puede finalizar el cierre con otro valor que ese va hacer el verdadero.
- Fecha (dia que se va a realizar el servicio tecnico)
- Hora (se genera automaticamente por detras, no se pone manual)
- Se podra cargar repuestos al crear el servicio, ya van aparecer con repuestos cargados al momento de rendir
- Técnico (opcional)

Una vez creado:

- aparece en la agenda
- puede enviarse al cliente mediante WhatsApp (copy past manual lo hace administracion)

Al finalizar la creación la Orden queda automáticamente en estado:

PENDIENTE

---

# Numeración

Cada Orden debe poseer un identificador único.

Ejemplo.

OT-000001

OT-000002

OT-000003

El número debe ser visible para Administración y Técnicos.

---

# Estados

Una Orden únicamente puede encontrarse en alguno de los siguientes estados.

- Pendiente
- En Proceso
- Completado
- Cancelado
- Recoordinado
- Falta terminar el trabajo

Cada cambio de estado debe quedar registrado en la agenda.

# Asignación del Técnico

Una Orden puede crearse:

- con técnico asignado

Cuando se asigna un técnico.

La Orden aparece automáticamente en su agenda y puede actulizarce para cambiar de tecnico y parezca al correspondiente.

---

# Agenda

Toda Orden forma parte de la agenda.

La agenda debe actualizarse automáticamente cuando cambia.

- fecha
- hora
- técnico
- estado

Las modificaciones deben reflejarse también en Google Sheets cuando la integración se encuentre habilitada.

---

# Comunicación con el Cliente

Una Orden puede generar automáticamente un mensaje para WhatsApp.

El sistema deberá disponer de dos acciones.

- Copiar Mensaje

- Ir a WhatsApp

El mensaje será generado automáticamente utilizando la información de la Orden.

Ejemplo.

Empresa

Cliente

Dirección

Localidad

Servicio

Observaciones

Fecha

Monto del servicio

Nombre del Técnico

DNI del Técnico

La plantilla será configurable en futuras versiones.

---

# Servicio del Técnico

El Técnico únicamente visualizará las Órdenes asignadas a él.

Podrá.

- iniciar trabajo
- actualizar estado
- registrar cobro
- cargar Foto del recibo
- enviar presupuesto (opcional)
- cerrar el trabajo

No podrá modificar información administrativa.

---

# Inicio del Trabajo

Cuando el Técnico comienza la visita.

El estado cambia automáticamente a.

EN PROCESO

Debe registrarse.

- fecha
- hora

---

# Cierre del Trabajo

Cuando finaliza la visita el Técnico deberá completar el formulario de cierre.

El formulario incluirá.

- Observaciones finales

- Fotografía (del recibo físico que genera el técnico al cliente)

- Registrar Cobro o deuda

- Enviar Presupuesto (opcional)

- Finalizar Orden

Las acciones son independientes.

---

# Cobro

El Técnico podrá registrar un cobro inmediatamente.

El cobro pertenece únicamente a esa Orden.

Una Orden solamente puede tener un cobro o deuda.

---

# Presupuesto

Durante el cierre el Técnico podrá generar un presupuesto.

La generación del presupuesto no cierra automáticamente la Orden.

El presupuesto queda disponible para Administración.

Cada Orden puede tener un único presupuesto.

el envio del presupuesto debe ser simple con unos simples checklist por ejemplo

**Checlist simple y facil**

- Mantenimiento
- cambio de caldera
- repuesto
- etc

---

# Administración de Presupuestos

Cuando un Técnico envía un presupuesto.

Administración lo visualizará automáticamente en.

Presupuestos Pendientes

El presupuesto permanecerá allí hasta que Administración lo marque como.

Finalizado

---

# Fotografías

Una Orden podrá almacenar fotografías.

Inicialmente.

- Foto de finalización.

La arquitectura deberá permitir incorporar posteriormente pero para el futuro.

- fotografías antes del trabajo

- fotografías durante el trabajo

- fotografías de repuestos

- fotografías del equipo

---

# Historial de la Orden

Toda Orden posee un historial permanente.

Ejemplo.

Orden creada

↓

Técnico asignado

↓

Cliente asignado

↓

Cambio de estado

↓

Cobro registrado

↓

Presupuesto enviado (opcional)

↓

Repuestos agregados (opcional)

↓

Orden cerrada

El historial nunca debe eliminarse.

---

# Integraciones

Las Órdenes podrán integrarse con.

Google Sheets

Las integraciones reflejan información.

Nunca modifican datos del sistema.

---

# Validaciones

No podrá cerrarse una Orden inexistente.

No podrá asignarse un Técnico inactivo.

No podrá registrarse un cobro duplicado.

No podrá generarse más de un presupuesto por Orden.

Los Técnicos únicamente podrán modificar sus propias Órdenes.

---

# Futuras Mejoras

La arquitectura queda preparada para incorporar.

- Firma del Cliente

- Ubicación GPS

- Checklists

- Material utilizado

- Tiempo trabajado

- Adjuntos

- Historial del Equipo

- Garantías

- Mantenimiento Preventivo

- Encuestas de satisfacción

Sin modificar la estructura principal del módulo.


# Flujo de un Servicio

Todo servicio sigue el siguiente flujo.

```
Creación del servicio con su formulario requeridos

↓

Asignacion de Empresa

↓

Asignación de Técnico

↓

Busqueda de cliente existente o crear cliente en el momento

↓


Comunicación con Cliente (mensaje manual copy paste del formulario creado)

↓

el servicio creado pasa a la Agenda

↓

Visita Técnica del servicio

↓

Cobro o deuda (Requerido)

↓

Presupuesto (opcional)

↓

Cierre

↓

Finalización del servicio
```

---

# Estados del Servicio

Todo servicio debe encontrarse en uno de los siguientes estados.

- Pendiente
- En Proceso
- Completado
- Cancelado
- Cerrado
- Falta terminar el trabajo

Cada cambio de estado debe quedar registrado en el historial.

---

# Creación del Servicio

El Administrador crea un servicio indicando como mínimo:

- Empresa
- Cliente (requerido)
- telefono
- Dirección
- Localidad
- Equipo
- categoria de servicio
- Observaciones (opcional)
- monto estimado de servicio ya que el tecnico una vez que asista al service puede finalizar el cierre con otro valor que ese va hacer el verdadero.
- Fecha (que se va a realizar el servicio)
- Hora (se genera automaticamente por detras, no se pone manual)
- el servicio puede ya tener el nombre de un repuesto varios que se va a usar de manera interna para poder rendir el servicios, ya van aparecer con repuestos cargados y otros se cargaran al momento de rendir
- Técnico (opcional)

Una vez creado:

- aparece en la agenda
- puede enviarse al cliente mediante WhatsApp (copy past manual lo hace administracion)

---

# Comunicación con el Cliente

Cada servicio puede generar automáticamente un mensaje para WhatsApp.
esto no es un modelo o un modulo grande es simple y util.

El mensaje debe poder:

- copiarse al portapapeles
- abrir WhatsApp directamente al numero del cliente

La plantilla tiene los datos del formulario de creacion del servicio.

El sistema nunca enviará mensajes automáticamente.
Siempre será el usuario quien confirme el envío no hay una automatizacion o una integracion de la api de whatsApp.

---