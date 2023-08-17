const User = require('./user');

const users = [
    new User('frazer@me.com', '1997-02-18', 23, 'frazer@me.com', 'frazer', true),
    new User('john@example.com', '1985-05-15', 38, 'john@example.com', 'john123', true),
    new User('jane@demo.com', '1990-08-20', 33, 'jane@demo.com', 'jane123', true)
];

module.exports = users;

