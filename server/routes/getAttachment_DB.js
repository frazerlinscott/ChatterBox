module.exports = function(app, db) {

app.get('/getAttachment/:attachmentId', async (req, res) => {
    const attachmentId = req.params.attachmentId; // get the attachmentId from the URL

    // Fetch the attachment data using the attachmentId from the database
    const attachmentData = await db.collection('attachments').findOne({ attachmentId: attachmentId });

    // If the attachment data exists, serve the file using its filePath
    if (attachmentData) {
        // The path.join() method joins the given path segments together.
        // The __dirname is the directory name of the current module (i.e., your server file).
        // We're using it to get the absolute path to the attachment on your server.
        res.sendFile(path.join(__dirname, attachmentData.filePath)); 
    } else {
        // If the attachment doesn't exist, send a 404 error
        res.status(404).send('Attachment not found');
    }
})
};