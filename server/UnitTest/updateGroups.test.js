const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const updateGroupsEndpoint = require('../routes/updateGroups_DB.js');  // Adjust path if needed

describe('/update-groups endpoint', () => {

    let app;
    let dbMock;
    let ObjectIdMock;
    let req;
    let res;

    beforeEach(() => {
        app = { post: sinon.stub() }; // Mock the app.post method

        dbMock = {
            collection: sinon.stub().returnsThis(),
            updateOne: sinon.stub(),
            insertOne: sinon.stub()
        };

        ObjectIdMock = sinon.stub();

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    it('should update an existing group successfully', async () => {
        ObjectIdMock.returns("mockObjectId");
        dbMock.updateOne.resolves({ matchedCount: 1 });

        req = {
            body: {
                _id: 'someExistingId',
                name: 'Updated Group'
            }
        };

        updateGroupsEndpoint(app, dbMock, ObjectIdMock);
        
        const callback = app.post.firstCall.args[1];
        await callback(req, res);

        expect(res.status.firstCall.args[0]).to.equal(200);
        expect(res.json.firstCall.args[0]).to.deep.equal({ success: true, message: 'Group updated successfully.' });
    });

    it('should insert a new group successfully', async () => {
        dbMock.insertOne.resolves({ insertedCount: 1 });

        req = {
            body: {
                name: 'New Group'
            }
        };

        updateGroupsEndpoint(app, dbMock, ObjectIdMock);
        
        const callback = app.post.firstCall.args[1];
        await callback(req, res);

        expect(res.status.firstCall.args[0]).to.equal(200);
        expect(res.json.firstCall.args[0]).to.deep.equal({ success: true, message: 'Group updated successfully.' });
    });
});
