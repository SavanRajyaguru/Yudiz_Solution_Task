const mongoose = require('mongoose'), Schema = mongoose.Schema

const ArtistSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Enter artist name']
    },
    sPassword: {
        type: String,
        require: [true, 'Enter password']
    },
})

const Artist = mongoose.model('artist', ArtistSchema)

module.exports = Artist