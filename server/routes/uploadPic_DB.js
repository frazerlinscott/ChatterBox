
const fs = require('fs');
const path = require('path');

module.exports = function(app, upload, db) {
    app.post('/uploadPhoto', upload.single('photo'), async (req, res, next) => {

        console.log('Uploading photo HITT')

        const username = req.body.username;
        console.log(username);


        if (req.file) {
            const fileExt = path.extname(req.file.originalname);
            console.log(req.file.originalname)
            const newPath = 'uploads/' + username + fileExt;
            console.log(newPath)

        //     // Rename the file
            fs.rename(req.file.path, newPath, async function (err) {
                if (err) {
                    console.error('Error renaming the file:', err);
                    return res.status(500).json({ success: false, message: 'Error renaming the file.' });
                }
                console.log('File renamed successfully.');

                // Once the file is renamed, update the user's profilePic in the database
                try {
                    const usersCollection = db.collection('UserData');
                    await usersCollection.updateOne(
                        { username: username }, // Filter by the username
                        { $set: { profilePic: newPath } } // Update the profilePic field
                    );

                    console.log('User profile picture path updated in database.');
                    res.json({ success: true, message: 'File uploaded, renamed, and path updated in database successfully.' });

                } catch (dbError) {
                    console.error('Error updating user profile picture path in database:', dbError);
                    res.status(500).json({ success: false, message: 'Error updating profile picture path in database.' });
                }
            });

        } else {
            res.status(400).json({ success: false, message: 'No photo provided.' });
        }
    });
};

