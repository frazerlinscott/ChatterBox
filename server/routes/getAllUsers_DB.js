module.exports = function(app, db) {
    app.get('/all-users', async (req, res) => {

        try {
            // Specify the collection
            const usersCollection = db.collection('UserData');

            // Search for all users in the database
            const users = await usersCollection.find({}).toArray();

            // Send users as a response
            res.json(users);

        } catch (err) {
            console.error("Error:", err);  // Log any errors
            res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }
    });
};
