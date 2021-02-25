const  express =require('express')
const app =express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT  || 9801 ;
const data = [];

//ejs render
app.set('view engine', 'ejs');

app.get("/",(req,res)=>
{
    res.render('chat-index')
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });

    socket.on('chat message', (msg) => {
        data.push(msg)
        io.emit('get data', data);
    });

    io.emit('get data', data);
});

http.listen(port,'192.168.10.75',()=>
{
    console.log(`Create server . Port : ${port}`)
})