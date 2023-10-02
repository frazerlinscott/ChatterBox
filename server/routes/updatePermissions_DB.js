module.exports = function(app, db) {
    app.post('/update-permission', async (req, res) => {
        const newPermission = req.body;

        try {
            // Specify the collection
            const usersCollection = db.collection('UserData');

            // Check if the user needs to be invalidated
            const updateQuery = {};
            if (newPermission.valid === false) {
                updateQuery.valid = false;
            } else {
                updateQuery.role = newPermission.role;
            }

            // Update the user in the database
            const result = await usersCollection.updateOne(
                { username: newPermission.username },
                { $set: updateQuery }
            );

            if (result.matchedCount === 0) {
                console.log("User not found");
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            res.json({ success: true, message: 'User details updated successfully.' });
        } catch (err) {
            console.error("Error:", err);  // Log any errors
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
};
