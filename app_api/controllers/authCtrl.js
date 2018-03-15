const User = require('../models/User');
let passport = require('passport')

module.exports.login = (req, res) => {
    let { mail, password } = req.body;
    console.log(req.session)
    if(!mail) return res.status(400).json({message: 'mail is required'})
    if(!password) return res.status(400).json({message: 'password is required'})

    // User.find({ mail }, (err, users) => {
    //     let user = users[0]
    //     //bind function to use
    //     // user.validPassword = user.validPassword.bind(user)
    //     // console.log(user.isRootUser())
    //     // if (err) {
    //     //     res.status(400).json('mail invalid')
    //     // } else if (user.validPassword(password)) {
    //     //     console.log('inside password')
    //     //     req.session.uid = user._id
    //     //     res.status(201).json(user._id)
    //     // } else {
    //     //     console.log('inside pass invalid')
    //     //     res.status(400).json('password invalid')
    //     // }

    //     // if (err) res.status(400).json({message: 'mail invalid'})
    //     if (err) res.status(400).json(err)

    //     user.validPassword(password, (p_err, same) => {
    //         if (p_err) {
    //             console.error(p_err)
    //             // res.status(500).json({message: 'internal error'});
    //             res.status(500).json(p_err);
    //         }
    //         else if (same) {
    //             req.session._id = user._id
    //             res.status(201).json({_id: user._id})
    //         }
    //         else {
    //             console.log(user)
    //             console.log(same)
    //             res.status(400).json({message: 'password invalid'})
    //         }

    //     })


    // })
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(400).json(err)
        if(user) {
            const token = user.generateJWT();
            return res.status(201).json({token})
        } else {
            return res.status(400).json(info)
        }
    })(req, res);

}

// module.exports.logout = (req, res) => {
//     req.session = null;
//     res.status(200).send('logout')
// }