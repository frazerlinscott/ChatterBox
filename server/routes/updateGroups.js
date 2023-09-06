const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const updatedGroup = req.body;
    const groupIdToUpdate = updatedGroup.groupID;

    console.log("from front: " + updatedGroup)

    fs.readFile(path.join(__dirname, '..', 'data', 'groupData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the groupData.json file:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }

        const currentGroups = JSON.parse(data);
        console.log('current groups: ' + currentGroups)

        const groupIndex = currentGroups.findIndex(group => group.groupID === groupIdToUpdate);

        if (groupIndex === -1) {
            currentGroups.push(updatedGroup);
        } else {
            currentGroups[groupIndex] = updatedGroup;
        }

        fs.writeFile(path.join(__dirname, '..', 'data', 'groupData.json'), JSON.stringify(currentGroups, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the groupData.json file:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error.' });
            }

            // Send a success response once file is written
            res.status(200).json({ success: true, message: 'Group updated successfully.' });
        });
    });
};
