//const socket = require('socket.io')
const app = require('express')()
const http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('<h1>PACMAN</h1>')
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })

  socket.on('move player', (direction)=> {
    console.log('moved',direction)
    socket.broadcast.emit('move player', direction)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})