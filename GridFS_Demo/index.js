const mongoose = require('mongoose')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const config = require('../config/config')
const router = require('express').Router()
const connectDb = require('./database')
const { uploadImages } = require('./controller')

//* db connection
connectDb()

//* create gridFs stream
mongoose.connection.on('open', () => {
    const db = mongoose.connection.db
    // console.log('DB>>>', db)
    const gfs = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'uploads'
    })
    console.log('Bucket Info>>>>>>', gfs)
})

//* create storage engine
const storage = new GridFsStorage({
    url: config.app.DB_URL,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads'
        }
    }
})

const upload = multer({ storage })

//* upload image
router.post('/upload', upload.single('file'), uploadImages)




//* get image
// router.get('/file/:filename', (req, res) => {
//     const file = upload.files.find({
//         filename: req.params.filename
//     })
//     .toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(404).json({ err: 'no files exist' })
//         }
//         upload.openDownloadStreamByName(req.params.filename)
//             .pipe(res)
//         })
//     console.log('FileInfo>>>>', file)
// })

module.exports = router




