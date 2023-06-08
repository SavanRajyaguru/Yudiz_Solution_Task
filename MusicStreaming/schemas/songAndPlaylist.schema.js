const mongoose = require('mongoose'), Schema = mongoose.Schema

const SongPlaylistSchema = new Schema({
    iPlaylistId: {
        type: Schema.Types.ObjectId,
        ref: 'playlist',
        require: [true, 'Enter playlist id']
    },
    iSongId: {
        type: Schema.Types.ObjectId,
        ref: 'songs',
        require: [true, 'Enter song id']
    },
})

const SongPlaylist = mongoose.model('SongsAndPlaylist', SongPlaylistSchema)

module.exports = SongPlaylist