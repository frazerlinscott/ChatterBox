module.exports = function(app, db) {
    app.post('/addUser', async function(req, res) {
        const newUser = req.body;

        // Validate the user data
        if (!newUser.username || !newUser.email || !newUser.password || !newUser.birthdate) {
            console.log("400 Error: Missing required fields");
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Calculate Age based on Birthday Input
        function calculateAge(birthdate) {
            const today = new Date();
            const birthDate = new Date(birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
        
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        
            return age;
        }

        const age = calculateAge(newUser.birthdate);
        newUser.age = age;

        try {
            // Specify the collection
            const usersCollection = db.collection('UserData');

            // Check if the user already exists
            const existingUser = await usersCollection.findOne({
                $or: [{ username: newUser.username }, { email: newUser.email }]
            });

            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username or Email already exists.' });
            }

            // Insert the new user into the database
            await usersCollection.insertOne(newUser);
            console.log("User added successfully");
            res.json({ success: true, message: 'User created successfully.' });

        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    });
};
