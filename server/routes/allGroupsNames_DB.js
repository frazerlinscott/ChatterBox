module.exports = function(app, db) {
    app.get("/groups", async (req, res) => {
        try {
            // Specify the collection
            const groupsCollection = db.collection('groupData');

            // Find all groups in the collection where valid is true and project only the groupName field
            const groups = await groupsCollection.find({ valid: true }, { projection: { groupName: 1, _id: 0 } }).toArray();

            const groupNames = groups.map(g => g.groupName);
            res.json(groupNames);

        } catch (err) {
            console.error("Error reading from database:", err);  // Log any database reading errors
            res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    });
};
