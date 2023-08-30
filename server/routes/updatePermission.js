const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const newPermission = req.body;

    console.log(newPermission)
    console.log(newPermission.username)
    console.log(newPermission.role)


        //Read the current users data
        fs.readFile(path.join(__dirname, '..', 'data', 'usersData.json'), 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the usersData.json file:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error.' });
            }
        
            const users = JSON.parse(data);
        
            // Find the user that needs to be updated
            const userIndex = users.findIndex(u => u.username === newPermission.username);
        
            if (userIndex === -1) {
                console.log("User not found");
                return res.status(404).json({ success: false, message: 'User not found.' });
            }
    
        
            // Update the user's details
            // If the username or email aren't changed in updatedDetails, these assignments are redundant but harmless.
            users[userIndex].role = newPermission.role;
            
            console.log("User Permission successfully");
        
            // Write back to the file
            fs.writeFile(path.join(__dirname, '..', 'data', 'usersData.json'), JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to the usersData.json file:', err);
                    return res.status(500).json({ success: false, message: 'Internal Server Error.' });
                }
        
                res.json({ success: true, message: 'User details updated successfully.' });
            });
        });

}