import "dotenv/config"
import { definePrismaConfig } from "prisma/config";
import { defineConfig as definePostgresConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: definePostgresConfig({
    contract: "prisma/contract.prisma",
    output: "generated/prisma8",
    migrations: {
      dir: "prisma/migrations",
    },
    db: {
      connection: process.env["DIRECT_URL"],
    },
  }),
})