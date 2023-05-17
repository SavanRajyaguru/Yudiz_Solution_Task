let jsonData = require('../../database/userdata.json')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const { messaging } = require('../../utils/messaging.utils');
const { statuscode, messages } = require('../../utils/messages.utils');
const config = require('../../config/config');


//######### convert password into hash ###########//
const createHash = (password) => {
    try {
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
        return passwordHash;
    } catch (error) {
        console.log("Error in createHash");
    }
}

const getUser = (req, res) => {
    try {
        res.status(200).json(jsonData);
    } catch (error) {
        console.log(error);
        res.status(404).send('Getuser Error');
    }
}

//########### Update User ##########//
const updateUser = (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = req.decoded.id;

        //* check when username is already exists or not
        const checkUsername = jsonData.find(item => item.username === username);
        if (checkUsername) {
            return messaging(res, statuscode.statusNotFound, messages.alreadyRegisteredUser)
        }
        console.log("USERID>>>>>> ", typeof userId);
        const user = jsonData.find(item => item.id === userId);
        console.log("USER>>>>", user);
        if (user) {
            user.username = username;
            user.password = createHash(password);
            fs.writeFileSync('D:/Yudiz_Solution_Task/database/userdata.json', JSON.stringify(jsonData))
            return messaging(res, statuscode.statusSuccess, messages.updatedProfile);
        } else {
            return messaging(res, statuscode.statusNotFound, messages.invalidCredentials);
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ msg: "Error in updateUser" })
    }
}

//########### Sign In ############//
const signInUser = (req, res) => {
    try {
        const { username, password } = req.body;
        const user = require('../../database/userdata.json').find(u => u.username === username);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password === passwordHash) {
            const token = jwt.sign({ id: user.id, role: user.role }, config.app.secret_key, { expiresIn: '1h' })
            return res.status(200).json({ token });
        }
        return res.status(404).json({ msg: "Data not found!!!" })
    } catch (error) {
        console.log(error);
        return res.status(404).send('SignInUser Error');
    }
}

//########### Sign Up ############//
const signUpUser = (req, res) => {
    try {
        const { username, password, role } = req.body;

        //* check is user is present or not
        const existingUser = jsonData.find(item => username === item.username)
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        //* add new user to the json file
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
        const newUser = {
            id: Date.now(),
            username: username,
            password: passwordHash,
            role: role
        }

        jsonData.push(newUser);
        fs.writeFileSync('D:/Yudiz_Solution_Task/database/userdata.json', JSON.stringify(jsonData))

        //* create JWT token 
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, config.app.secret_key, { expiresIn: '1h' });

        return messaging(res, statuscode.statusSuccess, token)
    } catch (error) {
        console.log(error);
        return res.status(404).send('SignUpUser Error');
    }
}

//########### Delete User ############//
const deleteUser = (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const userIndex = jsonData.findIndex(item => item.id === userId);

        if (userIndex != -1) {
            //* delete from specific index
            jsonData.splice(userIndex, userIndex);
            fs.writeFileSync('D:/Yudiz_Solution_Task/database/userdata.json', JSON.stringify(jsonData))
            return messaging(res, statuscode.statusNotFound, messages.statusSuccess);
        }

        return messaging(res, statuscode.statusNotFound, messages.invalidCredentials);

    } catch (error) {
        console.log(error);
        res.status(403).json({ msg: "Error in updateUser" })
    }
}

module.exports = {
    getUser,
    signUpUser,
    signInUser,
    updateUser,
    deleteUser
}