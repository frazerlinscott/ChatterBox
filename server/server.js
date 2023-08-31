const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const app = express();
const fs = require('fs');

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/week4tut')));
console.log(__dirname);


var http = require('http').Server(app);
var server = http.listen(3000, function(){
    console.log('listening on *:3000');
})

const postCreateUser = require('./routes/postCreateUser.js');

const updateUser = require('./routes/updateUser');

const AllUserData = require('./routes/getAllUsers');

const newPermission = require('./routes/updatePermission');

const getGroups = require('./routes/getGroups');

app.post("/login", require("./routes/postLogin"));

app.post('/update-user', updateUser);

app.post('/create-user', postCreateUser);

app.post('/all-users', AllUserData);

app.post('/update-permission', newPermission);

app.post('/all-groups', getGroups);


app.get("/usernames", (req, res) => {
    console.log("Inside /usernames route handler");  // Check if the route is triggered

    fs.readFile(path.join(__dirname, 'data', 'usersData.json'), 'utf8', (err, data) => {
      if (err) {
          console.error("Error reading file:", err);  // Log any file reading errors
          return res.status(500).json({ success: false, message: 'Internal Server Error.' });
      }
      console.log("Data from file:", data);  // Check the file contents

      const users = JSON.parse(data);
      console.log("Parsed users:", users);  // Check the parsed data

      const usernames = users.map(u => u.username);
      res.json(usernames);
    });
});
