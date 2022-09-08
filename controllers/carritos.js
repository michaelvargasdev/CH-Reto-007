const Carritos = require('../models/Carritos')
const carritos = new Carritos('carritos.txt')

const createShoppingCart = async (req, res) => {
    try {
        const { body } = req
        const id = await carritos.create({ timeStamp: Date.now(), products: [body.product]})
        return res.status(200).json({ id })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteShoppingCart = async (req, res) => {
    try {
        const { id } = req.params
        const data = await carritos.getById(id)
        if (data) {
            await carritos.deleteById(id)
            return res.status(204).json()
        } else {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getProductsById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await carritos.getById(id)
        if (data) {
            const products = await carritos.getProductsById(id)
            return res.status(200).json({ products })
        } else {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const { product } = body
        const data = await carritos.getById(id)
        if (data) {
            const products = await carritos.getProductsById(id)
            const { id: id_prod } = products.find(item => item.id === product.id) || {}
            if (!id_prod) {
                await carritos.addProduct(id, product)
                return res.status(200).json()
            } else {
                return res.status(404).json({ error: 'El producto ya existe en el carrito' })
            }
        } else {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const { id, id_prod } = req.params
        const data = await carritos.getById(id)
        if (data) {
            await carritos.deleteProductById(id, id_prod)
            return res.status(200).json()
        } else {
            return res.status(404).json({ error: 'Carrito no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createShoppingCart,
    deleteShoppingCart,
    getProductsById,
    addProduct,
    deleteProductById
}
