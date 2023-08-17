const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/week4tut')));
console.log(__dirname);


var http = require('http').Server(app);
var server = http.listen(3000, function(){
    console.log('listening on *:3000');
})

app.post("/login", require("./routes/postLogin"));
app.post("/loginAfter", require("./routes/postLoginAfter"));

// // User class
// class User {
//     constructor(username, birthdate, age, email, password, valid) {
//         this.username = username;
//         this.birthdate = birthdate;
//         this.age = age;
//         this.email = email;
//         this.password = password;
//         this.valid = valid;
//     }
// }

// // Dummy users
// const users = [
//     new User('user1', '1990-01-01', 32, 'user1@example.com', 'password1', true),
//     new User('user2', '1985-05-15', 37, 'user2@example.com', 'password2', true),
//     new User('user3', '2000-10-20', 22, 'user3@example.com', 'password3', true)
// ];
