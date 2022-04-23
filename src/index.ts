
import express from 'express'
import path from 'path'
import { Server, Socket } from 'socket.io';

const app = express()
const server = app.listen(5000)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000', '192.168.0.56:5000', 'http://localhost:3000'],
  }
});

io.on("connection", (socket: Socket) => {
  socket.removeAllListeners()

  socket.on("SEND_MESSAGE", (message: string) => {
    socket.broadcast.emit("BROADCAST", { message, user: socket.id })
  })

  socket.on("ONLINE_USERS", () => {
    socket.emit("ONLINE_USERS", Object.keys(io.sockets.sockets))
  })
});

app.use(express.static(path.resolve(__dirname, '../views/build')));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../views/build', 'index.html'));
});