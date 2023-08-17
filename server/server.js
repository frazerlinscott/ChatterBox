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
