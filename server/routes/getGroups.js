const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const { username, pwd } = req.body;

    // Read the JSON file
    fs.readFile(path.join(__dirname, '..', 'data', 'groupData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the groupData.json file:', err);
            return res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }

        // Parse the data to get the array of users
        const groups = JSON.parse(data);
        //console.log(groups)

    //Send the array of users

        res.json(groups);

        //-- Got users and groups now, now just have to create a list with them that the super admin is able to maniputlate. Same with groups.---

    });
};