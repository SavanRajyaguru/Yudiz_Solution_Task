const language = require('../../messages/english')
const { messaging } = require('../../utils/messaging.utils')

class LanguageController {
    printMsg(req, res){
        try {
            const sLanguage = req.language
            
            return messaging(res, 200, language[`${sLanguage}_success`])
                
        } catch (error) {
            console.log('ERRORprint>>>>>', error)
            return res.status(200).json('Error in LanguageController')
        }
    }
}

module.exports = new LanguageController()