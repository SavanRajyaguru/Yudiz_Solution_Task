const mongoose = require('mongoose'), Schema = mongoose.Schema

const carSchema = Schema({
    sCarName: {
        type: String,
        require: [true, 'Enter car name']
    },
    nCarModel: {
        type: Number,
        default: 77777 
    },
    iBrand_id: {
        type: Schema.Types.ObjectId,
        ref: 'brands'
    }
}, { timestamps: false })

const Cars = mongoose.model('cars', carSchema)

module.exports = Cars