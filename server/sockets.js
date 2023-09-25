// sockets.js
module.exports = {
    connect: function(io) {
        io.on('connection', (socket) => {
            console.log('user connected : ' + socket.id);
            
            socket.on('join', (channel) => {
                socket.join(channel);
            });
            
            socket.on('message', (data) => {
                io.to(data.channel).emit('message', {content: data.message, channel: data.channel});
            });
        });
    }
}
