import { prisma } from "../lib/prisma"


const createUser = async () => {
    const User = await prisma.user.create({
        data: {
            name: "facu",
            email: "",
            passwordHash: "123123",
            role: "ADMIN",
        }

    })

}

createUser()