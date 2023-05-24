const jwt = require('jsonwebtoken')
const { messaging } = require('../../utils/messaging.utils')
const { statuscode, messages } = require('../../utils/messages.utils')
const config = require('../../config/config')
const createHash = require('../../utils/createhash.utils')
const Users = require('../../schemas/user.schemas')


const getUser = async (req, res) => {
    try {
        //* find all the documets from mongodb
        const userData = await Users.find({}, { '_id': 1, 'username': 1, 'role': 1 })
        return res.status(200).json(userData)
    } catch (error) {
        console.log(error)
        return res.status(404).send('Getuser Error')
    }
}

//########### Update User ##########//
const updateUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const userId = req.decoded.id

        await Users.updateOne({ _id: userId }, 
            { username: username, password: createHash(password) })
                .then(() => messaging(res, statuscode.statusNotFound, 'Update successfull'))
                .catch(err => messaging(res, statuscode.statusNotFound, err))

    } catch (error) {
        console.log(error)
        res.status(403).json({ msg: 'Error in updateUser' })
    }
}

//########### Sign In ############//
const signInUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await Users.findOne({ username: username })
        if (!user) {
            return messaging(res, statuscode.statusSuccess, 'User not found')
        }
        
        const passwordHash = createHash(password)
        if (user.password === passwordHash) {
            const token = jwt.sign({ id: user.id, role: user.role }, config.app.secret_key, { expiresIn: config.app.expireIn })
            return res.status(200).json({ token })
        }
        return messaging(res, statuscode.statusSuccess, 'Data not found!!!')
    } catch (error) {
        console.log(error)
        return res.status(404).send('SignInUser Error')
    }
}

//########### Sign Up ############//
const signUpUser = async (req, res) => {
    try {
        const { username, password, role } = req.body

        //* check is user is present or not
        const existingUser = await Users.findOne({ username: username })
        if (existingUser) {
            return messaging(res, statuscode.statusSuccess, messages.alreadyRegisteredUser)
        }

        //* add new user to the json file
        const passwordHash = createHash(password)
        const newUser = {
            // id: Date.now(),
            username: username,
            password: passwordHash,
            role: role
        }

        //* create new user in the document
        const user = await Users.create(newUser)
        console.log('USER>>>>', user)
        if(user)
            return messaging(res, statuscode.statusSuccess, messages.statusSuccess)
            // return res.status(200).json({ message: messages.statusSuccess })
        else
            return messaging(statuscode.statusNotFound, messages.catch)

    } catch (error) {
        console.log('ERROR>>>>>>>',error)
        return res.status(404).send('SignUpUser Error: ',error)
    }
}

//########### Delete User ############//
const deleteUser = async (req, res) => {
    try {
        const username = req.params.username

        const user = await Users.deleteOne({ username: username })

        if(user.deletedCount){
            return messaging(res, statuscode.statusSuccess, 'Deleted Successfull')
        }

        return messaging(res, statuscode.statusNotFound, 'Username not found!!')

    } catch (error) {
        console.log(error)
        res.status(403).json({ msg: 'Error in updateUser' })
    }
}

module.exports = {
    getUser,
    signUpUser,
    signInUser,
    updateUser,
    deleteUser
}