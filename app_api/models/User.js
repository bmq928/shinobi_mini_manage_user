const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const name = "User"
const jwt = require('jsonwebtoken');


const UserSchema = new Schema({
    _id         : { type: String, required: true}, // user id from shinobi db, not $id from this db
    mail        : { type: String, required: true },
    password    : { type: String, required: true },
    ke          : { type: String },  // 
    detail      : String,
    isRoot      : { type: Boolean, required: true },
    alMonitors  : { type: [String], default: [] },  // allowed monitor to access(list monitor id of shinobi, not $id of this db)
    _hashAlready: { type: Boolean, default: false }
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
    if(user._hashAlready) return next()

    
    bcrypt.genSalt((err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            user.password = hash;
            user._hashAlready = true;
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
UserSchema.methods.generateJWT = function(){
    const numDayExprire = 7;
    let exp = new Date();
    exp = exp.setDate(exp.getDate() + 7)

    return jwt.sign({
        // _id: this._id,
        mail: this.mail,
        isRoot: this.isRootUser(),
        exp
    }, process.env.JWT_SECRET)
}

mongoose.model(name, UserSchema)
module.exports = mongoose.model(name)