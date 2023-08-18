const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const { username, pwd } = req.body;

    // Read the JSON file
    fs.readFile(path.join(__dirname, '..', 'data', 'usersData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the usersData.json file:', err);
            return res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }

        // Parse the data to get the array of users
        const users = JSON.parse(data);

        // Check if a user with the given username and password exists
        const foundUser = users.find(u => u.username === username && u.password === pwd);

        if (foundUser) {
            res.json({ ok: true, user: foundUser });
        } else {
            res.json({ ok: false });
        }
    });
};
