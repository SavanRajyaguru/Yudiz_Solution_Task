const checkHeader = (req, res, next) => {
    try {
        const language = ['english', 'hindi']
        const sLanguage = req.headers['language']
        console.log(sLanguage)

        const lng = language.find(item => sLanguage === item)
        if(lng){
            req.language = lng
            return next()
        } else {
            req.language = 'english'
            return next()
        }
        
    } catch (error) {
        console.log('ERROR>>>>>', error)
        return res.status(200).json({msg: 'Error in middleware'})
    }
}

module.exports = { checkHeader }