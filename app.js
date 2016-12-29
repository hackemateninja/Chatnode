'use strict'
const express = require('express'),
      app     = express(),
      http    = require('http').createServer(app),
      io      = require('socket.io')(http),
      port    = process.env.PORT || 3000,
      publicDir = express.static(`${__dirname}/public`)

app
    .use(publicDir)
    .get( '/', (req, res)=> res.sendfile(`${__dirname}/index.html`) )

http.listen( port, ()=> console.log(`aplicacion corriendo en el puerto: ${port}`) )

io.on('connection', (socket) =>{
    socket.broadcast.emit('new', {message: `ha entrado un nuevo usuario al chat`})
    socket.on('newMessage', message => io.emit('user says', message))
    socket.on('disconnect', ()=>{
        console.log('ha salido un usuario del chat')
        socket.broadcast.emit('bye bye user', {message: 'ha salido un usuario del chat'})
    })
})