module.exports = function(app, db) {
    app.get('/messages', async (req, res) => {
        const { groupName, channelName } = req.query;

        console.log(groupName + ': ' + channelName)
        
        if (!groupName || !channelName) {
            return res.status(400).json({ error: 'Both groupName and channelName are required.' });
        }

        try {
            const chatCollection = db.collection('chatData'); // assuming 'groups' is the name of your collection
            
            const chat = await chatCollection.findOne({ groupName: groupName });

            if (!chat) {
                return res.status(404).json({ error: 'Group not found.' });
            }

            const channel = chat.channels.find(ch => ch.channelName === channelName);

            if (!channel) {
                return res.status(404).json({ error: 'Channel not found in the given group.' });
            }

            res.json(channel.messages);

        } catch (err) {
            console.error("Error fetching messages:", err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};
