const mongoose = require('mongoose')
const { Schema } = mongoose
const name = 'Monitor'

const MonitorSchema = new Schema({
    shinobi_mid     : {type: String, required: true}, //monitor id from shinobi id, not $id from this db
    ke              : {type: String, required: true},
    name            : {type: String, required: true},
    // shto         : Array // i dont know what i means
    // shfr:         Array // i dont know what i means
    details         : String,
    type            : {type: String, required: true},
    ext             : {type: String, required: true},
    protocol        : {type: String, required: true},
    host            : {type: String, required: true},
    path            : {type: String, required: true},
    port            : {type: Number, required: true},
    fps             : {type: Number, required: true},
    mode            : {type: String, required: true},
    width           : {type: Number, required: true},
    height          : {type: Number, required: true},
})

mongoose.model(name, MonitorSchema)

module.exports = mongoose.model(name)