var fs = require('fs');

module.exports = function(req, res){
    let userObj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "userbirthdate": req.body.userbirthdate,
        "userage": req.body.userage,
    }

    let uArray=[]

    fs.readFile('server/data/extendedUsers.json', 'utf8', function(err, data){
        if (err) throw err;
        uArray = JSON.parse(data);
        uArray.push(userObj);
        //console.log(userObj);

        uArrayjson=JSON.stringify(uArray);
        fs.writeFile('server/data/extendedUsers.json',uArrayjson, 'utf8', function(err, data){
            if (err) throw err;
            res.send(uArray);
        })
})
}