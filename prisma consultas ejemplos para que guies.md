🔄 El cambio de paradigma más grande
Prisma ≤7 Prisma 8
──────────────────────────────── ────────────────────────────────
schema.prisma contract.prisma
new PrismaClient() import { db } from "./prisma/db"
prisma.user.findMany() db.orm.public.User.all()
Client generado (no lo tocás) db.ts es TU código (lo commiteás)

db.orm.<Model> en vez de prisma.<model>. En Postgres siempre con el schema de por medio: db.orm.public.User (no db.orm.user).

📖 LECTURA (Reading data)
Antes (≤7) Ahora (v8)
prisma.post.findMany({ where: { published: true } }) db.orm.public.Post.where({ published: true }).all()
prisma.user.findUnique({ where: { email } }) db.orm.public.User.where({ email }).first()
prisma.user.findFirst({ where: {...} }) db.orm.public.User.where({...}).first()
prisma.user.findUniqueOrThrow(...) db.orm.public.User.where({...}).limit(1).all().firstOrThrow()
findMany({ take: 20, skip: 20 }) .limit(20).offset(20).all()
where: { title: { contains: "x", mode: "insensitive" } } .where((p) => p.title.ilike("%x%"))
where: { email: { in: [...] } } .where((u) => u.email.in([...]))
where: { OR: [...] } .where((p) => or(p.a.eq(1), p.b.eq(2))) (import or de @prisma/orm-postgres/orm-client)
select: { id: true, email: true } .select("id", "email")
orderBy: { createdAt: "desc" } .orderBy((p) => p.createdAt.desc())
prisma.post.count({ where: {...} }) .where({...}).aggregate((a) => ({ total: a.count() }))
Paginación por cursor (cursor: {...}, skip: 1) .orderBy([...]).cursor({...}).limit(20)

⚠️ Ya no hay .count() suelto — todo pasa por .aggregate(...).

✍️ ESCRITURA (Writing data)
Antes (≤7) Ahora (v8)
prisma.user.create({ data: {...} }) db.orm.public.User.create({...})
prisma.user.update({ where: {...}, data: {...} }) db.orm.public.User.where({...}).update({...})
prisma.user.delete({ where: {...} }) db.orm.public.User.where({...}).delete()
prisma.user.upsert({ where, create, update }) db.orm.public.User.upsert({ create: {...}, update: {...} }) (matchea por unique fields, no necesitás where)
prisma.post.createMany({ data: [...] }) db.orm.public.Post.createAll([...])
prisma.post.updateMany({ where, data }) db.orm.public.Post.where({...}).updateCount({...})
prisma.post.deleteMany({ where }) db.orm.public.Post.where({...}).deleteCount()
connectOrCreate ❌ Ya no existe → hacer upsert() sobre la entidad relacionada y después conectar por id
🔗 RELACIONES (Relations and joins)
Antes (≤7) Ahora (v8)
include: { author: true } .include("author")
include: { posts: { take: 5, orderBy: {...} } } .include("posts", (post) => post.select(...).orderBy(...).take(5))
Include anidado M:N (include: { tags: { include: { tag: true } } }) .include("tags", (postTag) => postTag.include("tag")) — el modelo junction siempre explícito, ya no hay M:N implícita gestionada por Prisma
where: { posts: { some: { published: true } } } .where((u) => u.posts.some((p) => p.published.eq(true)))
Mirror field opcional en 1:1 (profile Profile? en User) ❌ No soportado todavía — el include solo funciona desde el lado que tiene la FK. Para el otro sentido, usar el SQL query builder (db.sql...innerJoin(...))
🤖 Prompts listos para tu agente (IDE)

Copiá y pegá estos, uno por tarea:

Usando el skill prisma-8, migrá esta query de Prisma ORM 7 a Prisma 8:
[pegar tu código viejo con prisma.model.findMany/create/update/delete]
Usá db.orm.public.<Model> y el nuevo encadenado .where().all()/.first().
Usando el skill prisma-8, escribí una query que traiga los 20 servicios más
recientes de un técnico, con paginación por cursor (.orderBy + .cursor),
no offset.
Usando el skill prisma-8, agregá una búsqueda case-insensitive por nombre
de cliente usando el operador .ilike en el modelo Client.
Usando el skill prisma-8, revisá todos mis .update()/.delete() en
[archivo/carpeta] y decime cuáles deberían ser updateCount()/deleteCount()
porque afectan más de un registro.
Usando el skill prisma-8, escribí la query que trae cada Service con su
Payment, Estimate y ServicePart[] incluidos en una sola consulta con .include(),
sin loops N+1.
Usando el skill prisma-8, escribí el upsert de InventoryItem por code único:
crea si no existe, actualiza costPrice/sellPrice/techPrice si ya existe,
sin tocar el campo stock.
Usando el skill prisma-8, encontrá todos los Service que tengan al menos
un ServicePart cargado, usando .some() en el where en vez de traer todo
y filtrar en JS.
Revisá si en mi código quedó algún connectOrCreate de Prisma 7 (ya no existe
en Prisma 8) y reemplazalo por un upsert() + conexión manual por id.
⚠️ Antes de correr al agente

Confirmá que tenés el skill instalado (npx prisma skills sync si el proyecto no es nuevo) — la doc dice que create-prisma@latest lo trae de fábrica, pero si tu proyecto ya existía antes hay que sincronizarlo a mano.
