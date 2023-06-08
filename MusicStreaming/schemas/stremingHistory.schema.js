const mongoose = require('mongoose'), Schema = mongoose.Schema

const HistorySchema = new Schema({
    iUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    iPlaylistId: {
        type: Schema.Types.ObjectId,
        ref: 'playlist'
    },
    iSongId: {
        type: Schema.Types.ObjectId,
        ref: 'songs'
    },
    nStartTime: {
        type: Number, 
        default: 0,
    }
},{ timestamps: true })

const History = mongoose.model('user', HistorySchema)

module.exports = History