// var fs = require('fs');

// module.exports = function(req, res){
//     var u = req.body.username;
//     var p = req.body.pwd;
//     c = u + p;
//     //console.log(c);

//     console.log('Received:', u, p);

//     fs.readFile("server/data/users.json", "utf8", function(err, data) {
//         if (err) throw err;
//         let userArray = JSON.parse(data);
//         console.log(userArray);
//         let i = userArray.findIndex(user=>((user.username === u)&&(user.pwd === p)));
//         if(i==-1){
//             //console.log('User not found.');
//             res.send({"ok": false})
//         } else {
//             //console.log('User found:', userArray[i]);
//             res.send({"ok": true})
//         }
//     });
// };


// const users = require('./usersData');

// module.exports = function(req, res) {
//     const { username, pwd } = req.body;

//     // Check if user with the given username and password exists
//     const foundUser = users.find(u => u.username === username && u.password === pwd);

//     if (foundUser) {
//         res.json({ ok: true, user: foundUser });
//     } else {
//         res.json({ ok: false });
//     }
// };

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
        const foundUser = users.find(u => u.username === username && u.password === pwd && u.valid === true);

        if (foundUser) {
            res.json({ ok: true, user: foundUser });
        } else {
            res.json({ ok: false });
        }
    });
};