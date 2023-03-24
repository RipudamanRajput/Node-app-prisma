import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password, hashedPass) => {
    return bcrypt.compare(password, hashedPass)
}

export const hashpassword = (password) => {
    return bcrypt.hash(password, 10)
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        process.env.JWT_SECRET
    )

    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({ message: "Bearer token not provided" })
        return
    }

    const [ , ,token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({ message: "invalid bearer" })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        res.user = user
        next()
    } catch (e) {
        res.status(401)
        res.json({ message: "invalid bearer token" })
        return
    }
}