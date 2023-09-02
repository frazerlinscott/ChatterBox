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

        fs.writeFile(path.join(__dirname, '..', 'data', 'groupData.json'), JSON.stringify(currentGroups, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the groupData.json file:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error.' });
            }

        
            fs.readFile(path.join(__dirname, '..', 'data', 'usersData.json'), 'utf8', (err, userData) => {
                if (err) {
                    console.error('Error reading the userData.json file:', err);
                    return res.status(500).json({ success: false, message: 'Internal Server Error.' });
                }

                const users = JSON.parse(userData);
                const currentGroupID = updatedGroup.groupID;
                const addedUser = updatedGroup.members[updatedGroup.members.length - 1];
                const userIndex = users.findIndex(u => u.username === addedUser);

                if (userIndex !== -1) {
                    if (users[userIndex].group) {
                        // Only push the currentGroupID if it's not already in the array
                        if (!users[userIndex].group.includes(currentGroupID)) {
                            users[userIndex].group.push(currentGroupID);
                        }
                    } else {
                        users[userIndex].group = [currentGroupID];
                    }
                }

                fs.writeFile(path.join(__dirname, '..', 'data', 'usersData.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to the usersData.json file:', err);
                        return res.status(500).json({ success: false, message: 'Internal Server Error.' });
                    }

                    // Finally, send the response after both updates are done
                    res.json({ success: true, message: 'Group and User details updated successfully.' });
                });
            });
        });
    });
};
