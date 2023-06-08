const uploadImages = (req, res) => {
    console.log('File Data>>>>>> ',req.file)
    if(req.file === undefined){
        return res.status(200).json({ message: 'File not found!!' })
    }
    return res.status(200).json({message: 'File uploaded successfully'})
}

module.exports = {
    uploadImages
}