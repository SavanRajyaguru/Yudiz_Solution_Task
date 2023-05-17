const crypto = require('crypto');
class Validation {

    //* check username and password regex
    userInput(req, res, next) {
        try {
            const userRegex = new RegExp("^[a-z0-9]{3,29}$");
            const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
            console.log('USER>>>>', userRegex.test(req.body.username));
            console.log('PASS>>>>', passwordRegex.test(req.body.password));

            if (passwordRegex.test(req.body.password)
                || userRegex.test(req.body.username)) {
                // jsonData.push({ id: req.body.id, username: req.body.username, password: req.body.password })
                next();
            } else {
                return res.status(200).json({ msg: "Enter valid username or password" })
            }
        } catch (error) {
            console.log(error);
            return res.status(200).json({ msg: "Error in validation" });
        }
    }

    //* convert password into Hash
    userPasswordConverter(req, res) {
        try {
            const jsonData = require('../database/userdata.json');
            // jsonData = JSON.stringify(jsonData);
            const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
            const userData = jsonData.find(item => req.body.id == item.id);
            if (userData) {
                if (userData.password === passwordHash
                    && userData.username === req.body.username) {
                    return res.status(200).json({ msg: "Logged in" });
                } else {
                    return res.status(200).json({ msg: "Enter valid Username or password" })
                }
            }

            return res.status(200).json({ msg: "User is not present" });

        } catch (error) {
            console.log(error);
            return res.status(200).json({ msg: "Error in hashing" });
        }
    }
}

module.exports = new Validation();