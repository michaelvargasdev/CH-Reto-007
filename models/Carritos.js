const fs = require('fs')
const UUID = require("uuidjs")

class Carrito {
    constructor(fileName) {
        this.fileName = fileName
        this.config = { encoding: 'utf-8' }
    }

    async readFile() {
        try {
            if (fs.existsSync(this.fileName)) {
                const content = await fs.readFileSync(this.fileName, Carrito.config)
                return JSON.parse(content)
            } else {
                await this.writeFile([])
                return  []
            }
        } catch (error) {
            throw error
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFileSync(this.fileName, JSON.stringify(data), Carrito.config)
        } catch (error) {
            throw error
        }
    }

    async getById(id) {
        try {
            const list = await this.readFile()
            return list.find(item => item.id === id) || null
        } catch (error) {
            throw error
        }
    }

    async create(data) {
        try {
            const list = await this.readFile()
            const id = UUID.generate()
            list.push({ id, ...data })
            await this.writeFile(list)
            return id
        } catch (error) {
            throw error
        }
    }

    async deleteById(id) {
        try {
            const list = await this.readFile()
            const newList = [...list.filter(item => item.id !== id)]
            await this.writeFile(newList)
        } catch (error) {
            throw error
        }
    }

    async getProductsById(id) {
        try {
            const list = await this.readFile()
            const carrito = list.find(item => item.id === id) || null
            return carrito ? carrito.products : []
        } catch (error) {
            throw error
        }
    }

    async addProduct(id, product) {
        try {
            const list = await this.readFile()
            const index = list.findIndex(item => item.id === id)
            list[index].products.push(product)
            await this.writeFile(list)
        } catch (error) {
            throw error
        }
    }

    async deleteProductById(id, id_prod) {
        try {
            const list = await this.readFile()
            const index = list.findIndex(item => item.id === id)
            list[index].products = [...list[index].products.filter(item => item.id !== id_prod)]
            await this.writeFile(list)
        } catch (error) {
            throw error
        }
    }
}

module.exports = Carrito
