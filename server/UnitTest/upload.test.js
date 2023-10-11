const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('/uploadPhoto endpoint', () => {

    let app;
    let dbMock;
    let req;
    let res;
    let fsMock;
    let uploadMock;

    let uploadPhotoEndpoint;
    
    beforeEach(() => {
        app = { post: sinon.stub() };

        dbMock = {
            collection: sinon.stub().returnsThis(),
            updateOne: sinon.stub()
        };

        fsMock = {
            rename: sinon.stub()
        };

        uploadMock = {
            single: sinon.stub().returns((req, res, next) => {
                req.file = req.mockFile; 
                next();
            })
        };

        uploadPhotoEndpoint = proxyquire('../routes/uploadPic_DB.js', {
            'fs': fsMock
        });

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    it('should respond with error if no photo is provided', async () => {
        req = { body: { username: 'user123' } };

        uploadPhotoEndpoint(app, uploadMock, dbMock);

        const callback = app.post.firstCall.args[2];
        await callback(req, res);


        expect(res.status.firstCall.args[0]).to.equal(400);
        expect(res.json.firstCall.args[0]).to.deep.equal({ success: false, message: 'No photo provided.' });
    });

    // it('should successfully upload, rename file, and update database', async () => {
    //     const mockUsername = 'user123';
    //     const mockFile = {
    //         path: 'temporary/path.jpg',
    //         originalname: 'userPhoto.jpg'
    //     };

    //     req = {
    //         body: { username: mockUsername },
    //         mockFile: mockFile
    //     };

    //     fsMock.rename.yields(null);  
    //     dbMock.updateOne.resolves({ modifiedCount: 1 });

    //     uploadPhotoEndpoint(app, uploadMock, dbMock);

    //     const callback = app.post.firstCall.args[2]; 
    //     await callback(req, res);

    //     expect(fsMock.rename.called).to.be.true;
    //     expect(dbMock.updateOne.called).to.be.true;
    //     expect(res.json.firstCall.args[0]).to.deep.equal({ success: true, message: 'File uploaded, renamed, and path updated in database successfully.' });
    // });
});
