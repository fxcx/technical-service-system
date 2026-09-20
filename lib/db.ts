import "dotenv/config"
import "temporal-polyfill/full/global"
import postgres from "@prisma/orm-postgres/runtime"
import type { Contract } from "../generated/prisma8/contract.d.ts"
import contractJson from "../generated/prisma8/contract.json" with { type: "json" }


export const db = postgres<Contract>({
    contractJson,
    url: process.env["DATABASE_URL"],
})

// Alias para compatibilidad con código que importa `prisma` desde lib/prisma.ts
export const prisma = db
