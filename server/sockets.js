// sockets.js


// module.exports = {
//     connect: function(io) {
//         io.on('connection', (socket) => {
//             console.log('user connected : ' + socket.id);
            
//             socket.on('join', (channel) => {
//                 socket.join(channel);
//             });
            
//             socket.on('message', async (data) => {
//                 io.to(data.channel).emit('message', {message: data.message, channel: data.channel, username: data.username});
//             });
//         });
//     }
// }



module.exports = {
    connect: function(io) {
        io.on('connection', (socket) => {
            console.log('User connected : ' + socket.id);
            
            socket.on('join', (channel) => {
                console.log(`User ${socket.id} joined channel: ${channel}`);
                socket.join(channel);
            });
            
            socket.on('message', async (data) => {
                console.log('Received message on server:', data);
                io.to(data.channel).emit('message', {message: data.message, channel: data.channel, username: data.username});
              });
        });
    }
}
