const mongoose = require('mongoose'), Schema = mongoose.Schema

const AlbumSongsSchema = new Schema({
    iAlbumId: {
        type: Schema.Types.ObjectId, 
        ref: 'album'
    },
    iSongId: {
        type: Schema.Types.ObjectId, 
        ref: 'songs'
    }
})

const Artist = mongoose.model('AlbumSongs', AlbumSongsSchema)

module.exports = Artist