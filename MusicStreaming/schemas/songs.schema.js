const mongoose = require('mongoose'), Schema = mongoose.Schema

const SongSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Enter song name']
    },
    dCreatedDate: {
        type: Date,
        default: Date.now
    },
    nDuration: {
        type: Number,
        require: [true, 'Enter song length']
    },
    iAlbumId: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
})

const Song = mongoose.model('songs', SongSchema)

module.exports = Song