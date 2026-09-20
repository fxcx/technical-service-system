import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";


const createAdmin = async () => {
    try {
        const name = "Admin";
        const email = "admin@techservice.com";
        const password = "adminpassword123";
        const saltRounds = 10;

        console.log("Hashing password...");
        const passwordHash = await bcrypt.hash(password, saltRounds);

        console.log(`Creating user: ${email}`);
        let user = await prisma.orm.public.User.where({ email }).first();
        if (user) {
            user = await prisma.orm.public.User.where({ email }).update({
                name,
                passwordHash,
                role: "ADMIN",
            });
        } else {
            user = await prisma.orm.public.User.create({
                name,
                email,
                passwordHash,
                role: "ADMIN",
            });
        }

        console.log("Admin user created successfully:", user?.email);
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
};

createAdmin();
