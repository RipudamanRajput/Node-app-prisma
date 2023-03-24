import prisma from "../db";

// Get All
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.res.user.id
        },
        include: {
            Products: true
        }
    })
    res.json({ data: user.Products })
}

// Get One 
export const getOneProducts = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.res.user.id
        }
    })
    res.json({ data: product })
}

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.res.user.id
        }
    })
    res.json({ data: product })
}

export const updateProduct = async (req, res) => {
    const update = await prisma.product.update({
        where: {

            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.res.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })
    res.json({ data: update })
}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.res.user.id
            }
        }
    })
    res.json({ data: deleted })
}

