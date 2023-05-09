class Validation {
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
}

module.exports = new Validation();