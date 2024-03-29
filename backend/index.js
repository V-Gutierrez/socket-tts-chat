
const express = require('express')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = app.listen(process.env.PORT || 5000)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000', '192.168.0.56:5000', 'localhost:3000', 'https://ttschat-vgutierrez.herokuapp.com/'],
  }
})

io.on("connection", (socket) => {
  const connections = Array.from(io.sockets.sockets).map(socket => socket[0]).length

  socket.removeAllListeners()
  socket.emit("ONLINE_USERS", connections)

  socket.on("SEND_MESSAGE", ({ message, user, signin, createdAt }) => {
    if (signin) {
      socket.emit("BROADCAST", { message, user, createdAt })
    }
    socket.broadcast.emit("BROADCAST", { message, user: user, createdAt })
  })
})

app.use(express.static(path.resolve(__dirname, '../views/build')))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../views/build', 'index.html'))
})