const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const addUserEndpoint = require('../routes/addUser_DB.js');  // Adjust path if needed

describe('/addUser endpoint', () => {

    let app;
    let dbMock;
    let req;
    let res;

    beforeEach(() => {
        app = { post: sinon.stub() };  // Mock the app.post method

        dbMock = {
            collection: sinon.stub().returnsThis(),
            findOne: sinon.stub(),
            insertOne: sinon.stub()
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    it('should successfully create a user', async () => {
        const mockUser = {
            username: 'user123',
            email: 'user123@example.com',
            password: 'password123',
            birthdate: '2000-01-01'
        };

        dbMock.findOne.resolves(null); // Simulating that the user doesn't exist in the database

        req = { body: mockUser };

        addUserEndpoint(app, dbMock);
        
        const callback = app.post.firstCall.args[1];
        await callback(req, res);

        expect(res.json.firstCall.args[0]).to.deep.equal({ success: true, message: 'User created successfully.' });
    });

    it('should not create a user with an existing username', async () => {
        const mockUser = {
            username: 'existingUser',
            email: 'existingUser@example.com',
            password: 'password123',
            birthdate: '2000-01-01'
        };

        // Simulate that the user already exists in the database
        dbMock.findOne.resolves({ 
            username: 'existingUser',
            email: 'existingUser@example.com',
            valid: true
        });

        req = { body: mockUser };

        addUserEndpoint(app, dbMock);
        
        const callback = app.post.firstCall.args[1];
        await callback(req, res);

        expect(res.status.firstCall.args[0]).to.equal(400);
        expect(res.json.firstCall.args[0]).to.deep.equal({ success: false, message: 'Username or Email already exists.' });
    });
});

