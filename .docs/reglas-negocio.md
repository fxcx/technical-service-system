# Reglas de Negocio — taller de calderas

# Objetivo del Sistema

taller de calderas es un sistema de administración integral para empresas de servicio técnico para una comunicacion precisa entre tecnicos y administracion.

Su objetivo es administrar el ciclo completo de un trabajo técnico desde la creación del servicio hasta la rendición económica del técnico.

El sistema posee dos perfiles principales:

- Administrador
- Técnico

 Cada usuario posee permisos específicos según su rol.
Toda la lógica del sistema debe respetar las siguientes reglas.
---

# 1. El sistema es la fuente oficial de información

Toda la información oficial se almacena en la base de datos del sistema.

Ninguna integración externa (Google Sheets, WhatsApp, etc.) puede modificar información directamente.

Las integraciones únicamente reflejan información existente.

---

# 2. Cada orden de servicio representa un servicio que hace el tecnico

Un Servicio tecnico representa una visita programada a un cliente.

El servicio posee su propio historial, que esta atado a un cliente, técnico asignado y documentación asociada.

---

# 3. Un cliente puede tener múltiples servicios

No existe límite de servicios asociados a un cliente.

El historial debe permanecer disponible de forma permanente del servicio ya que queda registrado cada servicio de cada tecnico y cada servicio que tubo cada cliente.

---

# 4. Los servicios nunca se eliminan físicamente

Los servicios forman parte del historial operativo de la empresa.

Solo podrán marcarse como cancelados o el estado correspondiente solo administracion puede eliminar o actualizar cada servicio.

---

# Servicios [./modulos/services.md]

# Agenda (schedule) [./modulos/agenda.md]

La agenda representa todos los servicios programados,cada tecnico tiene su propia agenda


# Técnico [./modulos/technician.md]

Cada técnico únicamente puede visualizar:

- sus servicios
- Lista de precios para tecnico (Modelo: inventario va a poder dar las listas)
- sus presupuestos
- su rendición

Nunca podrá acceder a información perteneciente a otro técnico lo unicos que se va a poder ver es por logica es el historial del cliente.

ya que el tecnico pude ver del detalle del servicio y con eso el historial del cliente.


## Finalización del Servicio

Cuando un técnico finaliza un servicio podrá:

- cerrar el trabajo
- registrar un cobro (es el cobro que importa ya que al crear el servicio se crea un valor parcial nosabemos en que cobro se va a terminar al final del servicio ya que puede sugir adicionales)
- enviar un presupuesto (opcional)

Las acciones son independientes.

Un servicio puede:

- tener cobro sin presupuesto


## Presupuestos

Los presupuestos representan trabajos futuros derivados de una visita técnica.

Un servicio puede generar como máximo un presupuesto.

Los presupuestos poseen únicamente dos estados.

- Pendiente
- Finalizado

No existen estados intermedios.

Cuando el técnico envía un presupuesto:

- Administración recibe el presupuesto pendiente con los detalles de ese servicio.
- El presupuesto permanece visible hasta que Administración lo finaliza.

Los presupuestos desaparecen del menu de presupuestos una vez finalizado por administracion el que desaparezcan de ese menu no significa que ese servicio es eliminado.

## Cobros

Los cobros representan dinero efectivamente recibido por el técnico.

Cada servicio puede tener un único cobro o deuda o ambas ya que puede faltar parte del pago.

El cobro puede incluir:

- monto cobrado total
- efectivo / transferencia / otros (requerido)
- deuda si es el caso (opcional)
- gastos (opcional)

siempre se debera poner el valor por el tecnico si pago o debe
esto simplifica administracion contactarce con el cliente que no abono

---

# Repuestos [.docs/modulos/paymentsRendition.md]

Un Servicio realizado puede contener múltiples repuestos, los repuestos van a estar viculados al inventario y rendicion para una rapida buscada de repuesto que se uso y valor agilizando el cierre de rendicion.


# Inventario [.docs/modulos/Inventario.md]

El modulo de inventario permiten identificar el origen de cada repuesto y tener el valor de costo y venta.

Lista de precio.

- cargar la base de lista de precios con una hoja csv
- lista administracion
- lista de precios para tecnicos


**Administracion**

- carga lista que es una hoja de calculo de googlesheets
- ver lista tal cual se cargo
- calculo automatico de porcentaje de ganancia de
- editar
- buscar repuesto
- asinar una lista de precios para el tecnico donde va a tener el valor venta

**Tecnico**

- ver lista de precios
- Buscador

---

# Modulo Rendición [.docs/modulos/paymentsRendition.md]

Rendición Semanal, Mensual o con fecha seleccionadas Cada técnico posee una rendición.

La rendición agrupa todos los servicios realizados durante la fecha que se establecio, las fechas ya renddidas no seran seleccionables 

las fechas de renciones completadas ya no deben poder ser seleccionadas para rendirse nuevamente.

Se veran todo los detalles de cobro, deuda, repuestos para poder hcaer el cierre correspondiente


# Cálculo de rendicion de los servicios tabla interna repuestos

de costos (es el costo final donde administracion ve el costo y la venta del repuesto que queda que debe pagar a cada provedor de esos repuestos)

La fórmula oficial es:

- Servicios por empresa total

- Repuestos total por provedoor

- costo de repuesto por provedoor - venta de repuesto

---

# Historial del cliente

Toda acción de servicios esta fuertemente viculada a los clientes importante tener el historial del cliente eso es oro.

El CLIENTE :

- Todos lo servicios que realizo con el detalle de cada servicio
- asignación de técnico
- cobro
- envío de presupuesto
- cierre finalización 

El historial nunca debe eliminarse ya que es el historial de cada cliente.

---

# Integraciones

El sistema podrá integrarse con servicios externos.

Inicialmente:

- Google Sheets

Futuras integraciones:

- Google Calendar
- Outlook Calendar

Las integraciones nunca reemplazan al sistema principal.

---

# Escalabilidad

Toda nueva funcionalidad deberá respetar estas reglas.

No podrán implementarse módulos que contradigan la lógica definida en este documento.

Este archivo constituye la especificación funcional principal del sistema.
