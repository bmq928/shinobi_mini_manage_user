const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const name = "User"


const UserSchema = new Schema({
    shinobi_uid       : {type: String, require: true}, // user id from shinobi db, not $id from this db
    mail              : {type: String, require: true},
    password          : {type: String, require: true},
    ke                : {type: String},  // 
    detail            : String,
    isRoot            : {type: Boolean, require: true},
    alMonitors        : {type: [String], default: []}  // allowed monitor to access(list monitor id of shinobi, not $id of this db)
    // monitorOption       // not use right now
})


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

UserSchema.methods.generateHash  = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(Math.random()))
UserSchema.methods.validPassword = function(password) {
    console.log('inside valid pass')
    console.log(this.password)
    return bcrypt.compareSync(password, this.password)
}
UserSchema.methods.isRootUser    = () => this.isRoot
mongoose.model(name, UserSchema)
module.exports = mongoose.model(name)