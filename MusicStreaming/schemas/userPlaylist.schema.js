const mongoose = require('mongoose'), Schema = mongoose.Schema

const UserPlaylistSchema = new Schema({
    iUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    iPlaylistId: {
        type: Schema.Types.ObjectId,
        ref: 'playlist'
    },    
})

const UserPlaylist = mongoose.model('UserPlaylist', UserPlaylistSchema)

module.exports = UserPlaylist