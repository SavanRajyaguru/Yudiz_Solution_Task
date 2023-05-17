const messaging = (res, statusCode, value) => {
    try {
        res.status(statusCode).json({ message: value });
    } catch (error) {
        console.log("ERROR in msg>>>>>> ", error);
        res.status(200).json({ Error: error });
    }
}

module.exports = { messaging }