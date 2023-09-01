const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const updatedGroup = req.body;

    // Assuming the updatedGroup has a groupID property that's unique
    const groupIdToUpdate = updatedGroup.groupID;
    
    fs.readFile(path.join(__dirname, '..', 'data', 'groupData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the groupData.json file:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    
        const currentGroups = JSON.parse(data);
        
        // Locate the group to be updated
        const groupIndex = currentGroups.findIndex(group => group.groupID === groupIdToUpdate);
    
        if (groupIndex === -1) {
            // Group not found, handle this case as per your needs. Maybe add the new group?
            currentGroups.push(updatedGroup); // Adds the group if it wasn't found
        } else {
            // Replace the old group with the updated group
            currentGroups[groupIndex] = updatedGroup;
        }
        
        // Write back to the file
        fs.writeFile(path.join(__dirname, '..', 'data', 'groupData.json'), JSON.stringify(currentGroups, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the groupData.json file:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error.' });
            }
    
            res.json({ success: true, message: 'Group details updated successfully.' });
        });
    });
    

}