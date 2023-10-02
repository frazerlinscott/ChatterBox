// message_DB.js

// module.exports = function(app, db) {
//     app.post('/messages', async (req, res) => {

//         console.log("endpoint hit")

//         try {
//             const newMessage = req.body;
//             console.log(newMessage) 
//             const messagesCollection = db.collection('chatData');
//             const result = await messagesCollection.insertOne(newMessage);
//             res.status(201).json(result.ops[0]);
//         } catch (err) {
//             res.status(500).json({ error: err.message });
//         }
//     });
// };

module.exports = function(app, db) {

    app.post('/messages', async (req, res) => {
        console.log('Received POST request');
        try {
            const { groupName, channelName, message } = req.body;
            
            // Find the group and channel in the database
            const group = await db.collection('chatData').findOne({ groupName });
            
            // If group does not exist, create a new group and channel
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
                const result = await db.collection('chatData').insertOne(newGroup);
                return res.status(201).json(result.ops[0]);
            }
            
            // If channel does not exist in the group, add new channel to the group
            const channelIndex = group.channels.findIndex(ch => ch.channelName === channelName);
            if (channelIndex === -1) {
                const result = await db.collection('chatData').updateOne(
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
                return res.status(201).json(result);
            }
            
            // If both group and channel exist, add the message to the channel
            const result = await db.collection('chatData').updateOne(
                { groupName, "channels.channelName": channelName },
                {
                    $push: {
                        "channels.$.messages": message
                    }
                }
            );
            
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};
