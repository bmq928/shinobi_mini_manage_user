const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const name = "User"


const UserSchema = new Schema({
    _id         : { type: String, require: true}, // user id from shinobi db, not $id from this db
    mail        : { type: String, require: true },
    password    : { type: String, require: true },
    ke          : { type: String },  // 
    detail      : String,
    isRoot      : { type: Boolean, require: true },
    alMonitors  : { type: [String], default: [] }  // allowed monitor to access(list monitor id of shinobi, not $id of this db)
    // monitorOption       // not use right now
}, { _id: false })


// UserSchema.methods.setPassword = (password) => {
//     let user = this;
//     if(!password) throw new Error('no password')
//     bcrypt
//         .genSalt((err, salt)=> {
//             if (err) throw err;
//             bcrypt
//                 .hash(password, salt, (err, hash) => {
//                     if(err) throw err;
//                     console.log(hash)
//                     console.log(user)
//                     user.salt = salt;
//                     user.password = hash 
//                     console.log(`password: ${user.password}`)               
//                 })
//         })

// }

// UserSchema.pre('save', next => {
//     let user = this;
//     if(!user.password) return next();

//     this.salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, this.salt)

//     console.log('pre')
//     console.log(this);
//     console.log(this.salt)

//     // console.log(user)
//     // // let user = this;
//     // if(!password) throw new Error('no password')
//     // bcrypt
//     //     .genSalt((err, salt)=> {
//     //         if (err) return next(err)
//     //         bcrypt
//     //             .hash(password, salt, (error, hash) => {
//     //                 if(err) return next(error)
//     //                 console.log(hash)
//     //                 console.log(user)
//     //                 user.salt = salt;
//     //                 user.password = hash 
//     //                 user.save()
//     //                 console.log(`password: ${user.password}`)               
//     //             })
//     //     })

// })

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.password) return next();

    bcrypt.genSalt((err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            user.password = hash;
            console.log(user.password)
            next()
        })
    })


})

//do not use any more
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(Math.random()))
}
UserSchema.methods.validPassword = function (password, callback) {
    bcrypt
        .compare(password, this.password, (err, same) =>{
            if(err) callback(err, null)
            else callback(null, same)
        })
}
UserSchema.methods.isRootUser = function () {
    return this.isRoot
}
UserSchema.methods.addMonitor = function (mid) {
    let alMonitors = this.alMonitors;

    if(alMonitors.indexOf(mid) === -1) alMonitors.push(mid)
    else throw new Error('this monitor have already allowed')
}
mongoose.model(name, UserSchema)
module.exports = mongoose.model(name)