module.exports = function(app, db, ObjectId) {

    app.post('/update-groups', async (req, res) => {
        let updatedGroup = req.body;
        const groupIdToUpdate = req.body._id;

        console.log("From front:", updatedGroup);

        // If groupIdToUpdate exists, convert it to ObjectId
        let groupId = groupIdToUpdate ? new ObjectId(groupIdToUpdate) : null;

        console.log("ID front:", groupId);

        // Remove _id and id from the updatedGroup object to prevent error
        delete updatedGroup._id;
        delete updatedGroup.id;

        try {
            // Specify the collection
            const groupsCollection = db.collection('groupData');

            // If groupId exists, update the group, else insert a new group
            if (groupId) {
                const result = await groupsCollection.updateOne(
                    { _id: groupId }, // filter
                    { $set: updatedGroup }, // update
                    //{ upsert: true } // options: create a new document if no documents match the filter
                );

                if (result.matchedCount === 0 && result.upsertedCount === 0) {
                    throw new Error('Update operation was unsuccessful.');
                }
            } else {
                const result = await groupsCollection.insertOne(updatedGroup);
                if (result.insertedCount === 0) {
                    throw new Error('Insert operation was unsuccessful.');
                }
            }

            // Send a success response
            res.status(200).json({ success: true, message: 'Group updated successfully.' });

        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    });
};
