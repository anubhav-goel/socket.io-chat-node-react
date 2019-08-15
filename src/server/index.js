const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', socket => {
    console.log('User connected with id: ', socket.id);

    socket.on('chat message', msg => {
        console.log('message::::', msg);
        io.emit('chat message', msg);
    });
});

http.listen(3001, () => {
    console.log('Listening on 3001..');
});
