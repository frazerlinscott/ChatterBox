module.exports = function(app, db) {
    app.post('/login', async (req, res) => {

        console.log(req.body);
        
        const { username, password } = req.body;  // Destructure request body

        console.log("hit login endpoint")

        console.log('Username:', username);
        console.log('Password:', password);

        try {
            // Specify the collection
            const usersCollection = db.collection('UserData');
         

            // Search for the user in the database
            const foundUser = await usersCollection.findOne({ username: username, password: password, valid: true });
            console.log('Found User:', foundUser);

            if (foundUser) {
                // If user is found, send a successful response
                res.json({ ok: true, user: foundUser });
            } else {
                // If user is not found, send a failure response
                res.json({ ok: false });
            }

        } catch (err) {
            console.error("Error:", err);  // Log any errors
            res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }
    });
};
