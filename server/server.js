///------------------------------------------------------------------------------------------------

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const app = express();
const fs = require('fs');

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors:  {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

const PORT = 3000;

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist/week4tut')));

// Importing sockets.js
const sockets = require('./sockets.js');
sockets.connect(io, PORT);

//const postCreateUser = require('./routes/postCreateUser.js');

// const updateUser = require('./routes/updateUser');

// const AllUserData = require('./routes/getAllUsers');

// const newPermission = require('./routes/updatePermission');

//const getGroups = require('./routes/getGroups');

// const updateGroups = require('./routes/updateGroups');

//app.post("/login", require("./routes/postLogin"));

// app.post('/update-user', updateUser);

// app.post('/create-user', postCreateUser);

// app.get('/all-users', AllUserData);

// app.post('/update-permission', newPermission);

//app.get('/all-groups', getGroups);

// app.post('/update-groups', updateGroups);



const main = async function(client) {
    try {
        await client.connect();

        console.log("database connection established")

        const dbName = 'liveChatSystem'

        const db = client.db(dbName)

        require('./routes/updateGroups_DB.js')(app, db, ObjectId);

        require('./routes/login_DB.js')(app, db);
        require('./routes/allUsernames_DB.js')(app, db);
        require('./routes/addUser_DB.js')(app, db)
        require('./routes/allGroupsNames_DB.js')(app, db);
        require('./routes/getAllUsers_DB.js')(app, db);
        require('./routes/getAllGroups_DB.js')(app, db);
        require('./routes/updatePermissions_DB.js')(app, db);

        require('./routes/message_DB.js')(app, db);


    } catch (error) {
        console.error("Failed to connect to the database:", error);
        client.close();
    }
};




http.listen(PORT, function() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    console.log('Server has been started on port ' + PORT + ' at ' + h + ':' + m);
});

main(client);
module.exports = app;
