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
        console.log(users)

    //Send the array of users

        res.json(users);

        //-- Got users and groups now, now just have to create a list with them that the super admin is able to maniputlate. Same with groups.---

    });
};