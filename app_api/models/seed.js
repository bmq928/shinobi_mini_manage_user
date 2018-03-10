const User = require('./User')
const Monitor = require('./Monitor')

const monitorData = [
    {
        shinobi_mid      : 'p404',
        ke               : 'uet',
        type             : 'type',
        ext              : 'ext',
        name             : 'some_thing',
        details          : 'none',
        protocol         : 'tcp',
        path             : 'localhost:3000',
        host             : 'shinobi',
        port             : 3000,
        fps              : 60,
        mode             : 'watch-only',
        width            : 50,
        height           : 50
    },{      
        shinobi_mid      : 'p405',
        ke               : 'ulis',
        name             : 'some_some_thing',
        details          : '',
        path             : 'localhost:3000',
        type             : 'type',
        ext              : 'ext',
        protocol         : 'stream',
        host             : 'shinobi',
        port             : 3001,
        fps              : 63,
        mode             : 'duplex',
        width            : 55,
        height           : 55
    }
]

const userData = [
    {
        shinobi_uid       : '1',
        mail              : 'admin@gmail.com',
        ke                : 'uet',
        password          : 'admin_password',
        detail            : 'root_user',
        alMonitors        : monitorData.map(monitor => monitor.shinobi_mid),
        isRoot            : true
        // monitorOption       // not use right now
    }, {
        shinobi_uid       : '1',
        mail              : 'user@gmail.com',
        ke                : 'uet',
        password          : 'userPass',
        detail            : 'common_user',
        isRoot            : false,
        alMonitors        : monitorData.map(monitor => monitor.shinobi_mid)[0]
        // monitorOption       // not use right now
    }
]



User.count(null, (err, count) => {
    if(!count) userData.forEach(u => {
        // User.create(u, (err, res) => {
        //     if(err) console.error(err);
        //     else console.log(res);
        // })
        let { shinobi_uid, mail, ke, password, detail, alMonitors, isRoot } = u
        console.log(mail)
        console.log(isRoot)
        let newUser = new User({ shinobi_uid, mail,isRoot, password, detail, alMonitors })
        newUser.save(err => {
            if(err ) console.error(err)
        })
        // newUser.shinobi_uid         = shinobi_uid
        // newUser.mail        = mail
        // newUser.ke          = ke
        // newUser.detail      = detail
        // newUser.alMonitors  = alMonitors
        // newUser.isRoot      = isRoot || false
        // newUser.password    = password
        // newUser.password    = newUser.generateHash(password)


        
    })
})

Monitor.count(null, (err, count) => {
    if(!count) Monitor.create(monitorData, err => console.error(err))
})