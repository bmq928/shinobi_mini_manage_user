const User = require('../models/User');
const Monitor = require('../models/Monitor');
const isRoot = (id, callback) => {
    // console.log(id)
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

    let session = req.session;
    let _id     = session._id
    let uid     = req.params.uid
    let mid     = req.params.mid
    console.log(session)
    console.log(`sessionId ${_id}`)
    console.log(`mid ${mid}`)

    isRoot(_id, (err, rootUser) => {
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
                        if(err) res.status(500).json({ message: 'internal error' })
                        res.status(200).json({message: 'monify success'})
                    })
                })
                .catch(err => {
                    console.log('from user.save.catch')
                    console.log(err);
                    if(err) res.status(400).json({ message: err.toString() })
                })
        }

    })
}