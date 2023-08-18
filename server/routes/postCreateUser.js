const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const newUser = req.body;

    // Validate the user data (add any other necessary validations)
    if (!newUser.username || !newUser.email || !newUser.password || !newUser.birthday) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Read the current users data
    fs.readFile(path.join(__dirname, '..', 'data', 'usersData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the usersData.json file:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }

        const users = JSON.parse(data);

        // Check if the user already exists
        const existingUser = users.find(u => u.username === newUser.username || u.email === newUser.email);
        if (existingUser) {
            console.log("Already existing user");
            return res.status(400).json({ success: false, message: 'Username or Email already exists.' });
        }

        // Push the new user to the list
        users.push(newUser);
        console.log("User added successfully");

        // Write back to the file
        fs.writeFile(path.join(__dirname, '..', 'data', 'usersData.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the usersData.json file:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error.' });
            }

            res.json({ success: true, message: 'User created successfully.' });
        });
    });
};
