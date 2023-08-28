const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
    const originalUsername = req.body.originalUsername;
    const updatedDetails = req.body.updatedDetails;

    console.log(updatedDetails.userbirthdate)


    if (!updatedDetails.username || !updatedDetails.email || !updatedDetails.userbirthdate || !updatedDetails.password ||!updatedDetails.pwdconfirm || !originalUsername) {
        console.log("400 Error: Missing required fields");
        return res.status(400).json({ success: false, message: 'Username, email, and birthdate are required.' });
   }
   

//     // Calculate Age based on Birthday Input
    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
    
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--; // Decrease age if birthdate has not occurred this year yet
        }
    
        return age;
    }

        updatedDetails.age = calculateAge(updatedDetails.userbirthdate);

    // Read the current users data
    fs.readFile(path.join(__dirname, '..', 'data', 'usersData.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the usersData.json file:', err);
            return res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    
        const users = JSON.parse(data);
    
        // Find the user that needs to be updated using the original username
        const userIndex = users.findIndex(u => u.username === originalUsername);
    
        if (userIndex === -1) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
    
        // Check if the updated username already exists in the usersData.json (excluding the current user being edited)
        if (users.some((u, idx) => u.username === updatedDetails.username && idx !== userIndex)) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }

    
        // Update the user's details
        // If the username or email aren't changed in updatedDetails, these assignments are redundant but harmless.
        users[userIndex].username = updatedDetails.username;
        users[userIndex].email = updatedDetails.email;
        users[userIndex].birthdate = updatedDetails.userbirthdate;
        users[userIndex].age = updatedDetails.age;
        users[userIndex].password = updatedDetails.password;
        users[userIndex].pwdconfirm = updatedDetails.pwdconfirm;
        
        console.log("User details updated successfully");
    
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
