const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const loginEndpoint = require('../routes/login_DB'); 

describe('/login endpoint', () => {

    let app;
    let dbMock;
    let req;
    let res;

    beforeEach(() => {
        app = { post: sinon.stub() }; // Mock the app.post method

        dbMock = {
            collection: sinon.stub().returnsThis(),
            findOne: sinon.stub()
        };

        req = {
            body: {
                username: 'testUser',
                password: 'testPassword'
            }
        };

        res = {
            json: sinon.stub(),
            status: sinon.stub().returnsThis()
        };
    });

    it('should respond with a user if found', async () => {
        dbMock.findOne.resolves({ username: 'testUser', password: 'testPassword', valid: true });

        loginEndpoint(app, dbMock);
        
        const callback = app.post.firstCall.args[1];
        await callback(req, res);

        expect(res.json.firstCall.args[0]).to.deep.equal({ ok: true, user: { username: 'testUser', password: 'testPassword', valid: true } });
    });

    it('should respond with ok: false if no user is found', async () => {
        dbMock.findOne.resolves(null); // No user found

        loginEndpoint(app, dbMock);

        const callback = app.post.firstCall.args[1];
        await callback(req, res);

        expect(res.json.firstCall.args[0]).to.deep.equal({ ok: false });
    });
});
