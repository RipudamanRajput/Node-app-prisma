import prisma from "../db";

export const getOneUpdate = async (req, res) => {
    const id = req.params.id
    const update = await prisma.update.findFirst({
        where: {
            id
        }
    })
    res.json({ datas: update })
}


export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.res.user.id
        },
        include: {
            Update: true
        }
    })
    const updates = products.reduce((allupdates, product) => {
        return [...allupdates, ...product.Update]
    }, [])
    res.json({ data: updates })
}


export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        // does not belong t user
        return res.json({ message: "error ocuured " })
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({ data: update })
}


export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.res.user.id,
        },
        include: {
            Update: true
        }
    })

    const updates = products.reduce((allupdates, product) => {
        return [...allupdates, ...product.Update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        // handle this
        return res.json({ message: "error occured" })
    }

    const updatedupdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({ data: updatedupdate })
}


export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.res.user.id,
        },
        include: {
            Update: true
        }
    })

    const updates = products.reduce((allupdates, product) => {
        return [...allupdates, ...product.Update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        // handle this
        return res.json({ message: "error occured" })
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deleted })
}