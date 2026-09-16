TechService — Diagnóstico y Roadmap
Estado General
El proyecto tiene una base sólida: schema Prisma 8 migrado a Supabase, autenticación, rutas de API y las pantallas principales del ADMIN. Sin embargo, el schema cambió significativamente desde las últimas conversaciones (se eliminaron Supplier,
PaymentPart
y se introdujeron
InventoryItem
,
ServicePart
,
SettlementItem
,
SettlementPart
,
Company
), y los lib/services todavía referencian los modelos viejos.

Diagnóstico: Qué está hecho ✅ vs Qué falta ❌
Infraestructura y base
Ítem Estado
Schema Prisma 8 (contract.prisma) ✅ Migrado y deployado en Supabase
types/index.ts alineado al schema ✅ Corregido (hoy)
Autenticación (login / session / middleware) ✅
lib/db.ts + lib/prisma.ts ✅
lib/validations.ts con Zod ✅ (necesita actualización post-schema)
lib/services (Capa de negocio)
Service Estado Problema
service.service.ts ⚠️ Desactualizado Referencia PaymentPart, modelos viejos
payment.service.ts ⚠️ Desactualizado Supplier / PaymentPart eliminados
payment-part.service.ts ❌ Obsoleto PaymentPart ya no existe → reemplazar por ServicePart
supplier.service.ts ❌ Obsoleto Supplier ya no existe → reemplazar por InventoryItem
estimate.service.ts ⚠️ Revisar Parte de relación cambió
settlement.service.ts ⚠️ Desactualizado Falta SettlementItem / SettlementPart
client.service.ts ✅ OK
technician.service.ts ✅ OK
activity-log.service.ts ✅ OK
inventory-item.service.ts ❌ No existe Nuevo modelo
service-part.service.ts ❌ No existe Nuevo modelo
company.service.ts ❌ No existe Nuevo modelo
API Routes
Ruta Estado
/api/auth/_ ✅
/api/services/_ ⚠️ Revisar compilación con schema nuevo
/api/payments/_ ⚠️ Revisar
/api/estimates/_ ⚠️ Revisar
/api/clients/_ ✅
/api/technicians/_ ✅
/api/integrations/_ ⚠️ Stub
/api/upload/_ ✅
Inventory API ❌ No existe
Companies API ❌ No existe
ServiceParts API ❌ No existe
UI — Admin (app/(dashboard)/admin)
Pantalla Estado
Dashboard ✅ Existe (métricas básicas)
Clientes ✅ Lista + crear/editar
Agenda (schedule) ✅ Existe
Servicios (lista / detalle / crear) ✅ Existe
Técnicos ✅ Existe
Presupuestos (estimates) ✅ Existe (pendiente/finalizado)
Cobros/Rendiciones (payments) ⚠️ Existe pero lógica de rendición incompleta
Inventario ❌ No existe
Empresas (Company) ❌ No existe
UI — Técnico (app/(dashboard)/technician)
Pantalla Estado
Dashboard técnico ✅
Agenda ✅
Servicios (lista) ✅
Detalle / Cierre de servicio ⚠️ Parcial
Lista de precios (Inventario) ❌ No existe
Rendición propia ❌ No existe
Roadmap Priorizado
Regla de oro: no avanzar UI rota si la capa de negocio no compila.

🔴 FASE 1 — Sincronizar capa de negocio con el schema nuevo
Requisito previo de todo lo demás.

Reescribir payment-part.service.ts → service-part.service.ts

ServicePart pertenece a Service (no a Payment)
CRUD: agregar / editar / eliminar repuesto de un servicio
Reescribir supplier.service.ts → inventory-item.service.ts

CRUD de InventoryItem (por companyId)
Búsqueda / filtrado por company y nombre
Crear company.service.ts

CRUD de Company
Métricas básicas
Actualizar service.service.ts

Quitar referencias a PaymentPart / Supplier
Incluir ServicePart y Company en las consultas de detalle
Actualizar payment.service.ts

Quitar sparePartsCost / PaymentPart
Lógica de cobro simplificada (solo dinero, método, deuda)
Actualizar settlement.service.ts

Generar SettlementItem y SettlementPart al crear / liquidar rendición
Calcular totales desde ServicePart del servicio
Actualizar lib/validations.ts

Schemas Zod para ServicePart, InventoryItem, Company
Remover schemas de PaymentPart / Supplier
🟠 FASE 2 — Módulo Inventario (nuevo)
Depende de Fase 1.

API: GET/POST /api/inventory-items, PATCH/DELETE /api/inventory-items/[id]
API: GET/POST /api/companies, PATCH/DELETE /api/companies/[id]
API: POST /api/inventory-items/import (importar desde Google Sheets)
UI Admin: /admin/inventory — lista de precios por empresa, buscador, editar márgenes
UI Técnico: /technician/inventory — lista de precios técnico (solo lectura, offline ready)
🟡 FASE 3 — Repuestos en el flujo del servicio
Depende de Fase 1.

UI: en el detalle del servicio → sección "Repuestos" con lista y agregar desde inventario
Al agregar ServicePart, copiar name, unitCost, unitSalePrice del InventoryItem (snapshot)
API: GET/POST /api/services/[id]/parts, PATCH/DELETE /api/service-parts/[id]
🟡 FASE 4 — Rendición completa
Depende de Fases 1 y 3.

Rehacer UI de rendición (/admin/payments / /admin/settlements)
Crear rendición por período (Lunes–Domingo)
Tabla por técnico: cobros + repuestos + cálculo neto + comisión (50/50 configurable)
Acciones: revisar → liquidar → bloquear
Vista técnico: /technician/settlements — ver rendición propia (readonly)
API: endpoints de Settlement actualizados
🟢 FASE 5 — Pulir flujo del técnico
Depende de Fases 1–3.

Cierre de servicio completo: estado → cobro → repuestos → presupuesto opcional
Foto de recibo (Supabase Storage, ya hay /api/upload)
Mensaje WhatsApp (copy/paste) desde el detalle de orden
🔵 FASE 6 — PWA + Offline
Puede hacerse en paralelo con Fases 4–5.

Service Worker (cacheo de assets)
IndexedDB: pre-cargar agenda y servicios del técnico
Cola offline: cierre → cobro → sincronizar cuando vuelve la conexión
Detección online/offline en la UI
⚪ FASE 7 — Integración Google Sheets
V2 — dejar preparado.

Configuración por técnico: ID de hoja
Webhook/job al crear/modificar servicio → actualizar hoja
Importar inventario desde Sheets a InventoryItem
Próximo paso inmediato
Empezar por FASE 1 — refactorizar los lib/services para que compilen correctamente contra el schema de Prisma 8. Sin esto el proyecto no compila limpio y cualquier avance en UI o API es sobre base rota.

El flujo sugerido para avanzar:

service-part.service.ts [NUEVO]
↓
inventory-item.service.ts [NUEVO]
↓
company.service.ts [NUEVO]
↓
service.service.ts [ACTUALIZAR]
↓
payment.service.ts [ACTUALIZAR]
↓
settlement.service.ts [ACTUALIZAR]
↓
validations.ts [ACTUALIZAR]
