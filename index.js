const PORT = 3000

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const cors = require('cors')

const routes = require('./routers')

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(cors())
app.use(express.json())

app.use(express.static('./public'))

app.use('/api', routes)

httpServer.listen(PORT, _ => `Server run on port ${PORT}`)

const messages = []
io.on('connection', socket => {
    console.log('Usuario conectado')

    socket.emit('messages', messages)

    socket.on('message', data => {
        messages.push({ socketId: socket.id, user: data.user, message: data.message })
        io.sockets.emit('messages', messages)
    })
})
