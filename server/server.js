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

const postCreateUser = require('./routes/postCreateUser');
const updateUser = require('./routes/updateUser');

app.post("/login", require("./routes/postLogin"));

const postCreateUser = require('./routes/postCreateUser');

// // Dummy users
// const users = [
//     new User('user1', '1990-01-01', 32, 'user1@example.com', 'password1', true),
//     new User('user2', '1985-05-15', 37, 'user2@example.com', 'password2', true),
//     new User('user3', '2000-10-20', 22, 'user3@example.com', 'password3', true)
// ];

app.post('/update-user', updateUser);


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
