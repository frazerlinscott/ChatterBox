module.exports = function(app, db) {
    app.get('/all-groups', async (req, res) => {

        try {
            // Specify the collection
            const groupsCollection = db.collection('groupData');

            // Search for all groups in the database
            const groups = await groupsCollection.find({}).toArray();

            // Send groups as a response
            res.json(groups);

        } catch (err) {
            console.error("Error:", err);  // Log any errors
            res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }
    });
};
