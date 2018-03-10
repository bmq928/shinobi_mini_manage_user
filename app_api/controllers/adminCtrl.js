const User = require('../models/User');
const isRoot = (id, callback) => {
    // console.log(id)
    if (!id) callback('login required')
    else User.findById(id, (err, user) => {
        if (err || !user) {
            console.error(err); 
            callback('user invalid')
        }
        else if (!user.isRoot) callback('root user only', null)
        else callback(null, user)
    });
}

//allocate monitor
//id of monitor and user that is allocated is from req.body or param
//id of rootUser is from session
module.exports.allocateMonitor = (req, res) => {

    let session = req.session;
    let uid = session.uid // my_db 's id
    
    isRoot("5aa2b34ce73f8ecf6c5febcf", (err, user) => {
        if (err) res.status(401).json(err)

        //2 option i wonder
        //mange via shinobi_id or $id of this db
        let shinobi_uid  = req.params.shinobi_uid
        let shinobi_mid  = req.params.shinobi_mid

        

        res.status(200).json(shinobi_mid)

    })
}