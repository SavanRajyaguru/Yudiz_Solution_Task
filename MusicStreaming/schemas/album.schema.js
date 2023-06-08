const mongoose = require('mongoose'), Schema = mongoose.Schema

const AlbumSchema = new Schema({
    iArtistId: {
        type: Schema.Types.ObjectId,
        ref: 'artist'
    },
    sAlbumName: {
        type: String,
        require: [true, 'Enter album name']
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Album = mongoose.model('album', AlbumSchema)

module.exports = Album