const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const allGroupsEndpoint = require('../routes/getAllGroups_DB.js'); 

describe('/all-groups endpoint', () => {

    let app;
    let dbMock;
    let req;
    let res;

    beforeEach(() => {
        app = { get: sinon.stub() }; // Mock the app.get method

        dbMock = {
            collection: sinon.stub().returnsThis(),
            find: sinon.stub().returnsThis(),
            toArray: sinon.stub()
        };

        req = {};  // Empty request as no request body or parameters are used in this case

        res = {
            json: sinon.stub(),
            status: sinon.stub().returnsThis()
        };
    });

    it('should respond with all groups', async () => {
        const mockGroups = [{ id: 1, name: 'group1' }, { id: 2, name: 'group2' }];
        dbMock.toArray.resolves(mockGroups);

        allGroupsEndpoint(app, dbMock);
        
        const callback = app.get.firstCall.args[1];
        await callback(req, res);

        expect(res.json.firstCall.args[0]).to.deep.equal(mockGroups);
    });

    it('should handle errors and respond with Internal Server Error', async () => {
        dbMock.toArray.rejects(new Error("Database Error")); // Simulate an error

        allGroupsEndpoint(app, dbMock);

        const callback = app.get.firstCall.args[1];
        await callback(req, res);

        expect(res.status.firstCall.args[0]).to.equal(500);
        expect(res.json.firstCall.args[0]).to.deep.equal({ ok: false, message: 'Internal Server Error' });
    });
});
