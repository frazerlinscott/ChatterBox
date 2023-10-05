module.exports = function(app, db) {
    app.get("/usernames", async (req, res) => {
        console.log("Inside /usernames route handler");  // Check if the route is triggered

        try {
            // Specify the collection
            const usersCollection = db.collection('UserData');

            // Find all users in the collection and project only the username field
            const users = await usersCollection.find({ valid: true }, { projection: { username: 1, _id: 0 } }).toArray();

            console.log("Users from database:", users);  // Check the fetched data

            const usernames = users.map(u => u.username);
            res.json(usernames);

        } catch (err) {
            console.error("Error reading from database:", err);  // Log any database reading errors
            res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    });
};
