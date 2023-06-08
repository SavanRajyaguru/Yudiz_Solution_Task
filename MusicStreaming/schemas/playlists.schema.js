const mongoose = require('mongoose'), Schema = mongoose.Schema

const PlaylistSchema = new Schema({
    sName: {
        type: String,
        require: [true, 'Enter playlist name']
    },
    iUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    dCreatedDate: {
        type: Date,
        default: Date.now
    },
})

const Playlist = mongoose.model('playlist', PlaylistSchema)

module.exports = Playlist