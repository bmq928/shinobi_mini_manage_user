const mongoose = require('mongoose');
const { Schema } = mongoose
const name = "User"


const UserSchema = new Schema({
    uid       : {type: String, require: true}, // user id from shinobi db, not $id from this db
    mail      : {type: String, require: true},
    ke        : {type: String, require: true},  // 
    detail    : String,
    alMonitors: {type: [String], default: []}  // allowed monitor to access(list monitor id of shinobi, not $id of this db)
    // monitorOption       // not use right now
})

mongoose.model(name, UserSchema)
module.exports = mongoose.model(name)