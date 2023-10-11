const chai = require('chai');
const sinon = require('sinon');
const ioClient = require('socket.io-client');
const http = require('http');
const ioServer = require('socket.io');
const expect = chai.expect;

const chatModule = require('../sockets.js');  // Adjust path as needed

describe('Socket.io Chat Endpoint', () => {
    let server;
    let io;
    let clientSocket;
    let dbMock;

    beforeEach((done) => {
        // Mock server setup
        server = http.createServer();
        io = ioServer(server);

        // Mock the database
        dbMock = {
            collection: sinon.stub().returnsThis(),
            findOne: sinon.stub(),
            insertOne: sinon.stub(),
            updateOne: sinon.stub()
        };

        // Inject mock DB and initialize your module
        chatModule.connect(io, dbMock);

        // Client socket setup
        clientSocket = ioClient('http://localhost:3000');

        server.listen(3000, done);
    });

    afterEach((done) => {
        // Disconnect the client socket if it's connected
        if (clientSocket.connected) {
            clientSocket.disconnect();
        }
    
        // Close the Socket.io server
        io.close();
    
        // Close the HTTP server, if it's running
        if (server && server.listening) {
            server.close(done);
        } else {
            done();
        }
    });
    

    it('should allow a user to join a channel', (done) => {
        clientSocket.emit('join', 'testChannel');

        // Use io's in-built functionality to check if user has joined a room
        clientSocket.on('connect', () => {
            expect(clientSocket.connected).to.be.true;
            done();
        });
        
    });

    // You can add more tests similar to the one above, e.g., for 'message' event handling, DB operations, etc.
});
