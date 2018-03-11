const User = require('../models/User');
const Monitor = require('../models/Monitor');
const isRoot = (req, callback) => {
    // console.log(id)
    let id = req.session._id;
    if (!id) callback({ message: 'login required' })
    else User.findById(id, (err, rootUser) => {
        if (err) callback(err)
        if (!rootUser) callback({ message: 'user invalid' })
        else if (!rootUser.isRoot) callback({ message: 'root user only' }, null)
        else callback(null, rootUser)
    });
}

//allocate monitor
//id of monitor and user that is allocated is from req.body or param
//id of rootUser is from session
module.exports.allocateMonitor = (req, res) => {

    let { uid, mid } = req.params;

    isRoot(req, (err, rootUser) => {
        if (err) res.status(401).json(err)
        else {
            // let findedUser, findedMonitor;
            let findUser = User.findById(uid, (u_err, user) => {

                // if (u_err) res.status(400).json('allocated user invalid');
                if (u_err) res.status(400).json(u_err);

                return user

            });

            let findMonitor = Monitor.findById(mid, (m_err, monitor) => {
                // if (m_err) res.status(400).json('allocated monitor invalid');
                if (m_err) res.status(400).json(m_err);

                return monitor
            });

            Promise
                .all([findUser, findMonitor])
                .then((vals) => {
                    let user = vals[0]
                    let monitor = vals[1]

                    if (!user) res.status(400).json({ message: 'no user founded' })
                    if (!monitor) res.status(400).json({ message: 'no monitor founded' })

                    user.addMonitor(mid)
                    user.save(err => {
                        console.log('from user.save')
                        console.error(err)
                        if (err) res.status(500).json({ message: 'internal error' })
                        res.status(200).json({ message: 'monify success' })
                    })
                })
                .catch(err => {
                    console.log('from user.save.catch')
                    console.log(err);
                    if (err) res.status(400).json({ message: err.toString() })
                })
        }

    })
}

//add User
//cannot know how to add user
//just now use Date.now().toString() to make id
//this will change in the future
module.exports.addUser = (req, res) => {
    isRoot(req, (err, rootUser) => {
        if (err) return res.status(401).json(err);

        let { mail, ke, password, detail } = req.body

        //pre-condition
        if (!mail) return res.status(400).json({ message: 'email required' })
        if (!ke) return res.status(400).json({ message: 'ke required' })
        if (!password) return res.status(400).json({ message: 'password required' })


        //check if the email have been already existed
        User
            .find({ mail })
            .exec((err, users) => {
                if (users.length > 0) {
                    return res.status(400).json({ message: 'email have been existed' })
                }

                let newUser = new User({
                    _id: Date.now().toString(),
                    isRoot: false,
                    alMonitors: [],
                    mail, password, detail, ke
                })
                newUser.save(err => {
                    if (err) {
                        console.log('err from newUser.save from adminCtrl')
                        console.error(err)
                        res.status(400).json(err)
                    } else {
                        res.status(201).json({ message: 'create new user success' })
                    }
                })

            })



    })
}

//remove user
module.exports.removeUserByMail = (req, res) => {
    isRoot(req, (err, rootUser) => {
        if (err) return res.status(401).json(err);

        let { mail } = req.params

        //check whether mail is root or not
        if(mail === rootUser.mail) return res.status(400).json({message: 'cannot delete root user acc'})

        User
            .find({ mail })
            .remove((err) => {
                if (err) res.status(400).json(err)
                else res.status(204).json({message: 'remove completed'})
        })
    })
}