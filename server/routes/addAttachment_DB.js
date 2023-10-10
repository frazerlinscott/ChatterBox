// const fs = require('fs');
// const path = require('path');

// module.exports = function(app, messageAttachment, db) {
//     app.post('/attachPhoto', messageAttachment.any(), (req, res) => {

//         console.log('Attachment endpoint photo HITT')


//         if (req.file) {

//             console.lod("Attachmnet Recieved.... ")
//             // const fileExt = path.extname(req.file.originalname);
//             // console.log(req.file.originalname)
//             // const newPath = 'uploads/' + username + filesExt;
//             // console.log(newPath)

//         //     // Rename the file
//         //     fs.rename(req.file.path, newPath, async function (err) {
//         //         if (err) {
//         //             console.error('Error renaming the file:', err);
//         //             return res.status(500).json({ success: false, message: 'Error renaming the file.' });
//         //         }
//         //         console.log('File renamed successfully.');

//         //         // Once the file is renamed, update the user's profilePic in the database
//         //         try {
//         //             const usersCollection = db.collection('UserData');
//         //             await usersCollection.updateOne(
//         //                 { username: username }, // Filter by the username
//         //                 { $set: { profilePic: newPath } } // Update the profilePic field
//         //             );

//         //             console.log('User profile picture path updated in database.');
//         //             res.json({ success: true, message: 'File uploaded, renamed, and path updated in database successfully.' });

//         //         } catch (dbError) {
//         //             console.error('Error updating user profile picture path in database:', dbError);
//         //             res.status(500).json({ success: false, message: 'Error updating profile picture path in database.' });
//         //         }
//         //     });

//         // } else {
//         //     res.status(400).json({ success: false, message: 'No photo provided.' });

//         }
//     });
// };

// module.exports = function(app, messageAttachment, db) {
//     const countersCollection = db.collection('counters');
//     countersCollection.updateOne({ _id: "attachmentId" }, { $setOnInsert: { sequence_value: 0 } }, { upsert: true });
    

//     const getNextSequenceValue = async (sequenceName) => {
//         const sequenceDocument = await countersCollection.findOneAndUpdate(
//             { _id: sequenceName },
//             { $inc: { sequence_value: 1 } },
//             { returnOriginal: false }
//         );
//         return sequenceDocument.value.sequence_value;
//     };

//     app.post('/attachPhoto', messageAttachment.any(), async (req, res) => {
//         console.log('Attachment endpoint photo HITT');

//         if (req.files && req.files.length > 0) {
//             console.log("Attachment Received:", req.files[0].filename);
//             const filePath = req.files[0].path;

//             try {
//                 // Get the next attachment ID
//                 const attachmentId = await getNextSequenceValue("attachmentId");

//                 // Now you can use the attachmentId as needed.
//                 // If you want to save filePath in another collection with this ID, you can do so.

//                 // Return the generated ID to the frontend
//                 res.status(200).json({ message: 'File uploaded successfully!', attachmentId: attachmentId });
//             } catch (err) {
//                 console.error('Error generating or using attachment ID:', err);
//                 res.status(500).send('Server error!');
//             }
//         } else {
//             res.status(400).send('No file uploaded!');
//         }
//     });
// };

const fs = require('fs');
const path = require('path');

module.exports = function(app, messageAttachment, db) {
    app.post('/attachPhoto', messageAttachment.any(), async (req, res) => {
        console.log('Attachment endpoint photo HITT');
        console.log("DB is:", db);

        if (req.files && req.files.length > 0) {
            console.log("Attachment Received:", req.files[0].filename);
            const originalPath = req.files[0].path;

            // Fetch the file extension
            const fileExtension = path.extname(req.files[0].originalname);

            // Generate a unique attachmentId including the file extension
            const attachmentId = `${Date.now()}-${Math.floor(Math.random() * 1000)}${fileExtension}`;

            // Rename the uploaded file with the attachmentId
            const newPath = path.join(path.dirname(originalPath), attachmentId);

            fs.rename(originalPath, newPath, async (err) => {
                if (err) {
                    console.error('Error renaming the file:', err);
                    return res.status(500).send('Server error while renaming the file!');
                }

                try {
                    // Save attachment details in the database
                    await db.collection('attachments').insertOne({
                        attachmentId: attachmentId,
                        filePath: newPath,
                        uploadedAt: new Date()
                    });

                    res.status(200).json({ message: 'File uploaded successfully!', attachmentId: attachmentId });
                } catch (dbError) {
                    console.error('Error saving attachment details to the database:', dbError);
                    res.status(500).send('Server error while saving to the database!');
                }
            });
        } else {
            res.status(400).send('No file uploaded!');
        }
    });
}
