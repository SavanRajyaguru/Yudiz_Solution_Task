let jsonData = require('../../database/userdata.json')
const fs = require('fs');
const crypto = require('crypto');

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
        //* first check if the ID is present or not
        const index = jsonData.findIndex(item => req.body.id == item.id);
        if (index != -1) {
            return res.status(200).json({ msg: "ID is present" });
        }

        const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
        console.log(passwordHash);

        jsonData.push({ id: req.body.id, username: req.body.username, password: passwordHash })

        //* write file with inserted data
        fs.writeFile('D:/Yudiz_Solution_Task/V1/database/userdata.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log('ERROR>>> in FS', err);
                return res.status(200).json({ msg: "Data Not added successfully" });
            }
            return res.status(200).json({ msg: "Data added successfully", data: jsonData });
        })

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

        //* filer data
        jsonData = jsonData.filter((item) => req.params.id != item.id)

        //* write file with deleted data
        fs.writeFile('D:/Yudiz_Solution_Task/V1/database/userdata.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log('ERROR>>> in FS', err);
                return res.status(200).json({ msg: "Data Not added successfully" });
            }
            return res.status(200).json({ msg: "Data added successfully", data: jsonData });
        })

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

        //* converted into the hash value
        const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
        console.log(passwordHash);

        jsonData[index].username = req.body.username
        jsonData[index].password = passwordHash

        //* write file with inserted data
        fs.writeFile('D:/Yudiz_Solution_Task/V1/database/userdata.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log('ERROR>>> in FS', err);
                return res.status(200).json({ msg: "Data Not added successfully" });
            }
            return res.status(200).json({ msg: "Data updated successfully", data: jsonData });
        })


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