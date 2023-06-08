const mongoose = require('mongoose'), Schema = mongoose.Schema

const ArtistSongSchema = new Schema({
    iArtistId: {
        type: Schema.Types.ObjectId,
        ref: 'artist'
    },
    iSongId: {
        type: Schema.Types.ObjectId,
        ref: 'songs'
    },
})

const ArtistSong = mongoose.model('ArtistSong', ArtistSongSchema)

module.exports = ArtistSong