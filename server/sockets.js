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



// module.exports = {
//     connect: function(io) {
//         io.on('connection', (socket) => {
//             //console.log('User connected : ' + socket.id);
            
//             socket.on('join', (channel) => {
//                 //console.log(`User ${socket.id} joined channel: ${channel}`);
//                 socket.join(channel);
//             });
            
//             socket.on('message', async (data) => {
//                 console.log('Message event triggered'); // Log for debugging
//                 io.to(data.channel).emit('message', {message: data.message, channel: data.channel, username: data.username});
//               });
//         });
//     }
// }


// In your socket.js
module.exports = {
    connect: function(io, db) {
        io.on('connection', (socket) => {
            console.log('User connected : ' + socket.id);
            
            socket.on('join', (channel) => {
                console.log(`User ${socket.id} joined channel: ${channel}`);
                socket.join(channel);
            });
            
            socket.on('message', async (data) => {
                console.log('Received message on server:', data);

                // Save the message to the database here before emitting it to other clients
                const messageData = {
                    groupName: data.groupName,
                    channelName: data.channel,
                    message: {
                        message: data.message,
                        username: data.username,
                        timestamp: new Date().toISOString()
                    }
                };

                try {
                    await saveMessageToDb(db, messageData);
                    io.to(data.channel).emit('message', {message: data.message, channel: data.channel, username: data.username});
                } catch (error) {
                    console.error('Error saving message to database:', error);
                }
            });
        });
    }
}

async function saveMessageToDb(db, messageData) {
    // Use your existing logic for saving message to the database
    const { groupName, channelName, message } = messageData;
    const group = await db.collection('chatData').findOne({ groupName });
    if (!group) {
        const newGroup = {
            groupName,
            channels: [
                {
                    channelName,
                    messages: [message]
                }
            ]
        };
        await db.collection('chatData').insertOne(newGroup);
    } else {
        const channelIndex = group.channels.findIndex(ch => ch.channelName === channelName);
        if (channelIndex === -1) {
            await db.collection('chatData').updateOne(
                { groupName },
                {
                    $push: {
                        channels: {
                            channelName,
                            messages: [message]
                        }
                    }
                }
            );
        } else {
            await db.collection('chatData').updateOne(
                { groupName, "channels.channelName": channelName },
                {
                    $push: {
                        "channels.$.messages": message
                    }
                }
            );
        }
    }
}

