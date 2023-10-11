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

const dir = './attachments';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); 
}


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');  
    },
    filename: function(req, file, cb) {
        const fileExtension = file.originalname.split('.').pop();
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        cb(null, currentDate + '.' + fileExtension);
    }
});
const upload = multer({ storage: storage });


const attachment = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'attachments/');  
    },
    filename: function(req, file, cb) {
        const fileExtension = file.originalname.split('.').pop();
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        cb(null, currentDate + '.' + fileExtension);
    }
});
const messageAttachment = multer({ storage: attachment });


const main = async function(client) {
    try {
        await client.connect();

        console.log("database connection established")

        const dbName = 'liveChatSystem'

        const db = client.db(dbName)

        const sockets = require('./sockets.js');
        sockets.connect(io, db);  // pass db instead of PORT

        app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
        app.use('/attachments', express.static(path.join(__dirname, '..', 'attachments')));
        
        require('./routes/updateGroups_DB.js')(app, db, ObjectId);
        require('./routes/login_DB.js')(app, db);
        require('./routes/allUsernames_DB.js')(app, db);
        require('./routes/addUser_DB.js')(app, db)
        require('./routes/allGroupsNames_DB.js')(app, db);
        require('./routes/getAllUsers_DB.js')(app, db);
        require('./routes/getAllGroups_DB.js')(app, db);
        require('./routes/updatePermissions_DB.js')(app, db);
        require('./routes/message_DB.js')(app, db);
        require('./routes/uploadPic_DB.js')(app, upload, db);
        require('./routes/addAttachment_DB.js')(app, messageAttachment, db);

        //require('./routes/getAttachment_DB.js')(app, db);

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
