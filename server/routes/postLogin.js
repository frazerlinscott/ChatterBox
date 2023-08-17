
const users = require('./usersData');

module.exports = function(req, res) {
    const { username, pwd } = req.body;



    console.log('Typed:', username, pwd);


    // Check if user with the given username and password exists
    const foundUser = users.find(u => u.username === username && u.password === pwd);


    if (foundUser) {
        res.json({ ok: true, user: foundUser });
    } else {
        res.json({ ok: false });
    }
};

