const Productos = require('../models/Productos')
const productos = new Productos('productos.txt')

const getProducts = async (req, res) => {
    try {
        const data = await productos.getAll()
        return res.status(200).json({ data })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = await productos.getById(id)
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { body } = req
        const newData = await productos.create(body)
        return res.status(200).json({ data: newData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const data = await productos.getById(id)
        if (data) {
            const newData = await productos.update(id, body)
            return res.status(200).json({ data: newData })
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = await productos.getById(id)
        if (data) {
            await productos.deleteById(id)
            return res.status(204).json()
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    productos
}
