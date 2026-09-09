# Reglas de Negocio — TechService

# Objetivo del Sistema

TechService es un sistema de administración integral para empresas de servicio técnico para una comunicacion precisa entre tecnicos y administracion.

Su objetivo es administrar el ciclo completo de un trabajo técnico desde la creación del servicio hasta la rendición económica del técnico.

El sistema posee dos perfiles principales:

- Administrador
- Técnico

Cada usuario posee permisos específicos según su rol.

---

# Principios del Sistema

Toda la lógica del sistema debe respetar las siguientes reglas.

## 1. El sistema es la fuente oficial de información

Toda la información oficial se almacena en la base de datos del sistema.

Ninguna integración externa (Google Sheets, WhatsApp, etc.) puede modificar información directamente.

Las integraciones únicamente reflejan información existente.

---

## 2. Cada servicio representa un servicio que hace el tecnico

Un Servicio representa una visita programada a un cliente.

El servicio posee su propio historial, estado, cliente asociado, técnico asignado y documentación asociada.

---

## 3. Un cliente puede tener múltiples servicios

No existe límite de servicios asociados a un cliente.

El historial debe permanecer disponible de forma permanente del servicio ya que queda registrado cada servicio de cada tecnico y cada servicio que tubo cada cliente.

---

## 4. Los servicios nunca se eliminan físicamente

Los servicios forman parte del historial operativo de la empresa.

Solo podrán marcarse como cancelados o el estado correspondiente solo administracion puede eliminar o actualizar cada servicio.

---

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
- puede sincronizarse con Google Sheets (es una implementacion para la V2 pero hay que dejar todo preparado)

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

# Agenda (schedule)

La agenda representa todos los servicios programados,cada tecnico tiene su propia agenda, cada tecnico tiene una hoja de googlesheest como agenda que se sicroniza con la del sistema.

Debe actualizarse automáticamente cuando:

- se crea un servicio
- cambia la fecha
- cambia la hora
- cambia el técnico
- cambia el estado
- se cancela un servicio

La agenda puede sincronizarse con Google Sheets.

Google Sheets es únicamente una vista externa.

Nunca modifica la información del sistema ya que el sistema es offline se ctualiza la base dde datos igual cuando la coneccion se levante. asi tenemos el respaldo que los tecnico puedan ver sus servicios en googlesheet.

---

# Técnico

Cada técnico únicamente puede visualizar:

- sus servicios
- Lista de presio para tecnico (Modelo: inventario va a poder dar las listas)
- sus presupuestos
- su rendición

Nunca podrá acceder a información perteneciente a otro técnico lo unicos que se va a poder ver es por logica es el historial del cliente.

ya que el tecnico pude ver del detalle del servicio y con eso el historial del cliente.

---

# Finalización del Servicio

Cuando un técnico finaliza un servicio podrá:

- cerrar el trabajo
- registrar un cobro (es el cobro que importa ya que al crear el servicio se crea un valor parcial nosabemos en que cobro se va a terminar al final del servicio ya que puede sugir adicionales)
- enviar un presupuesto (opcional)

Las acciones son independientes.

Un servicio puede:

- tener cobro sin presupuesto

---

# Presupuestos

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

---

# Cobros

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

# Repuestos

Un Servicio realizado puede contener múltiples repuestos, los repuestos van a estar viculados al inventario y rendicion para una rapida buscada de repuesto que se uso y valor agilizando el cierre de rendicion.

Este modelo debe registrar:

- Provedoor (de donde compro el repuesto)
- Nombre
- cantidad
- costo unitario
- costo total

Los repuestos forman parte de la rendición económica donde administracion va agregar al momento de rendir con el tecnico uno a uno que repuesto uso, administracion agrega Provedoor, nombre, ect.

adminitracionb al mometo de rendir, acciones.

- agregar repuesto que va a tener de referencia la lista del modelo inventario ya con el valor y lo agrega al servicio
- editar valor
- finalizar

---

# Inventario Proveedores

El modulo de inventario permiten identificar el origen de cada repuesto y tener el valor de costo y venta.

administra stock Lista de precio.,

- una de tecnico
- otra interna de administracion donde se puede ver el costo real de repuestos.

Su finalidad es poder darle una lista de precios a los tecnicos y tener una lista propia de administracion al momento de rendir va a servir parqa sacar el costo de los repuestos una vez finalizado el cierre con el tecnico.

El tecnico solo va a poder ver la lista para tecnicos.

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

# Modulo Rendición

Rendición Semanal, Mensual o con fecha seleccionadas Cada técnico posee una rendición.

La rendición agrupa todos los cobros realizados durante la fecha que se establecio, las fechas ya renddidas no seran seleccionables administracion.

las fechas de renciones completadas ya no deben poder ser seleccionadas para rendirse nuevamente.

**Rendicion tabla legible y simple **

servicio
↓

Monto Cobrado total del tecnico
↓
empresa cobros por compania
↓

Monto de gastos

↓

a favor (una seccion que se agrega para descontar)

↓

↓

- Efectivo

- Transferencia

↓

Los repuestos siempre se descuentan despues de calcular la carga de repuestos, quelo carga administracion en cada servicio que reespuesto se uso simple y rapipido.

Total de Repuestos - Total de Técnico

↓

Administracion + repuestos + seguros

Rest que quedo de esa cuenta

por el momento el ccalucolo final debe ser asi puede que sufra cambios. hasta perfecccionar el modulo de rendicion los datos siempre llegan de los servicios realizados y lña lista de precios de inventario

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
- cambio de estado
- cobro
- envío de presupuesto
- cierre
- finalización

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
