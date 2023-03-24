import { Prisma } from "@prisma/client";
import prisma from "../db";
import { comparePasswords, createJWT, hashpassword } from "../module/auth";

export const createNewUser = async (req, res) => {
    let users: Prisma.UserCreateInput[] | Prisma.UserUncheckedCreateInput[] | any =
    {
        username: req.body.username,
        Password: await hashpassword(req.body.password)
    }
    
    const user = await prisma.user.create({
        data: users,
    })

    const token = createJWT(user)
    res.json({ token })
}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password, user.Password)

    if (!isValid) {
        res.status(401)
        res.json({ message: "nope" })
        return
    }

    const token = createJWT(user)
    res.json({ token })

}