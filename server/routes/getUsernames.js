const fs = require('fs');
const path = require('path');

app.get("/usernames", (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'usersData.json'), 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Internal Server Error.' });
      }
      const users = JSON.parse(data);
      const usernames = users.map(u => u.username);
      res.json(usernames);
    });
});



