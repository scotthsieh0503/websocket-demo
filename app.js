const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
    res.render('index')
})


app.get('/chart-demo', (req, res) => {
    res.render('chartDemo')
})

//Listen on port 3000
server = app.listen(3000)


//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
const chat = io.of('/chat').on('connection', (socket) => {
    console.log('New user connected')

    //default username
    const color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    socket.user = {'username': 'Anonymous', 'color': color}

    //listen on change_username
    socket.on('change_username', (data) => {
    socket.user.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
    //broadcast the new message
    socket.emit('new_message', {message : data.message, user : socket.user});
    })

    //listen on typing
    socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {user : socket.user})
    })
})


//listen on every connection
const chartDemo = io.of('/chart-demo').on('connection', (socket) => {
    console.log('New user connected')
    //listen on change_username
    socket.on('new_data', (data) => {
        socket.emit('new_data', {value : data.value, timestamp : data.timestamp});
    })
})
