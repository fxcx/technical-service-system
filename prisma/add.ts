import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";
import { User, $Enums } from "../generated/prisma/client";

// type typeRole = $Enums.Role;
type typeUser = User;

async function main() {
  // const password = await bcrypt.hash("password", 10);

  const user: typeUser = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@techservice.com",
      passwordHash: "admin123",
      role: $Enums.Role.ADMIN,
      isActive: true,
      phone: "123456789",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log("USER CREADO", user);
}

main();
