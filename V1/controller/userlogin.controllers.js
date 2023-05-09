let jsonData = require('../database/userdata.json')

const getUser = (req, res) => {
    try {
        res.status(200).json(jsonData);
    } catch (error) {
        console.log(error);
        res.status(404).send('Getuser Error');
    }

}

const insertUser = (req, res) => {
    try {
        jsonData.push({ id: req.body.id, username: req.body.username, password: req.body.password })
        return res.status(200).json({ msg: "Data added successfully", data: jsonData });
    } catch (error) {
        console.log(error);
        res.status(404).send('Insert Error');
    }
}

const deleteUser = (req, res) => {
    try {
        //* If Array length is 0
        if (jsonData.length == 0) {
            return res.status(200).json({ msg: "Arrays is empty!" })
        }

        //* If id is not present in array
        const index = jsonData.findIndex(item => item.id == req.params.id);
        if (index == -1) {
            return res.status(200).json({ msg: "Enter valid UserId" })
        }

        //* return filer data
        jsonData = jsonData.filter((item) => req.params.id != item.id)
        res.status(200).json({ msg: "Data deleted successfully", data: jsonData });
    } catch (error) {
        console.log(error);
        res.status(404).send('Delete Error');
    }

}

const updateUser = (req, res) => {
    try {
        const index = jsonData.findIndex(item => req.params.id == item.id)

        //* if id is not valid
        if (index === -1) {
            return res.status(200).json({ msg: "Enter valid UserId" })
        }
        jsonData[index].username = req.body.username
        jsonData[index].password = req.body.password

        return res.status(200).json({ msg: "Data added successfully", data: jsonData });
    } catch (error) {
        console.log(error);
        res.status(404).send('Insert Error');
    }
}


module.exports = {
    getUser,
    insertUser,
    deleteUser,
    updateUser
}