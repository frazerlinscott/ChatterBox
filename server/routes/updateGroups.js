const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const updatedGroup = req.body;
    const groupIdToUpdate = updatedGroup.groupID;

    fs.readFile(path.join(__dirname, '..', 'data', 'groupData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the groupData.json file:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }

        const currentGroups = JSON.parse(data);
        
        const groupIndex = currentGroups.findIndex(group => group.groupID === groupIdToUpdate);

        if (groupIndex === -1) {
            currentGroups.push(updatedGroup);
        } else {
            currentGroups[groupIndex] = updatedGroup;
        }
    });
};
