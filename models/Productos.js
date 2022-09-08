const fs = require('fs')
const UUID = require("uuidjs")

class Productos {
    constructor(fileName) {
        this.fileName = fileName
        this.config = { encoding: 'utf-8' }
    }

    async readFile() {
        try {
            if (fs.existsSync(this.fileName)) {
                const content = await fs.readFileSync(this.fileName, Productos.config)
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
            await fs.writeFileSync(this.fileName, JSON.stringify(data), Productos.config)
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        try {
            const list = await this.readFile()
            return list
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
            const newData = { id: UUID.generate(), ...data }
            list.push(newData)
            await this.writeFile(list)
            return newData
        } catch (error) {
            throw error
        }
    }

    async update(id, data) {
        try {
            const list = await this.getAll()
            let newData = {}
            const newList = list.map(item => (item.id === id) ? newData = { ...item, ...data } : item)
            await this.writeFile(newList)
            return newData
        } catch (error) {
            throw error
        }
    }

    async deleteById(id) {
        try {
            const list = await this.readFile()
            const newList = list.filter(item => item.id !== id)
            await this.writeFile(newList)
        } catch (error) {
            throw error
        }
    }
}

module.exports = Productos
