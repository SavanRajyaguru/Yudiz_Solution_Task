const mongoose = require('mongoose'), Schema = mongoose.Schema

const UserLikedSchema = new Schema({
    iUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    iSongId: {
        type: Schema.Types.ObjectId,
        ref: 'songs'
    },    
})

const UserLikedSong = mongoose.model('UserLikedSongs', UserLikedSchema)

module.exports = UserLikedSong