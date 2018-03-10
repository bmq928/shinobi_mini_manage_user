const User = require('../models/User');

module.exports = (req, res) => {
    let { mail, password } = req.body;

    User.find({ mail }, (err, users) => {
        let user = users[0]
        //bind function to use
        user.validPassword = user.validPassword.bind(user)
        console.log(user.isRootUser())
        if (err) {
            res.status(400).json('mail invalid')
        } else if (user.validPassword(password)) {
            console.log('inside password')
            req.session.uid = user._id
            res.status(201).json(user._id)
        } else {
            console.log('inside pass invalid')
            res.status(400).json('password invalid')
        }
    })
}