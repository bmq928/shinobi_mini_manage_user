const User = require('./User')
const Monitor = require('./Monitor')

const monitorData = [
    {
        mid      : 'p404',
        ke       : 'uet',
        type     : 'type',
        ext      : 'ext',
        name     : 'some_thing',
        details  : 'none',
        protocol : 'tcp',
        path     : 'localhost:3000',
        host     : 'shinobi',
        port     : 3000,
        fps      : 60,
        mode     : 'watch-only',
        width    : 50,
        height   : 50
    },{
        mid      : 'p405',
        ke       : 'ulis',
        name     : 'some_some_thing',
        details  : '',
        path     : 'localhost:3000',
        type     : 'type',
        ext      : 'ext',
        protocol : 'stream',
        host     : 'shinobi',
        port     : 3001,
        fps      : 63,
        mode     : 'duplex',
        width    : 55,
        height   : 55
    }
]

const userData = [
    {
        uid       : '1',
        mail      : 'admin@gmail.com',
        ke        : 'uet',
        password  : 'admin_password',
        detail    : 'root user',
        alMonitors: ['p404', 'p405'],
        isRoot    : true
        // monitorOption       // not use right now
    }
]

User.count(null, (err, count) => {
    if(!count) userData.forEach(u => {
        // User.create(u, (err, res) => {
        //     if(err) console.error(err);
        //     else console.log(res);
        // })

        let { uid, mail, ke, password, detail, alMonitors, isRoot } = u
        let newUser = new User({ uid, mail, password, detail, alMonitors })
        newUser.uid         = uid
        newUser.mail        = mail
        newUser.ke          = ke
        newUser.detail      = detail
        newUser.alMonitors  = alMonitors
        newUser.isRoot      = isRoot
        newUser.password    = newUser.generateHash(password)
        console.log(`password: ${newUser.password}`)
        
        newUser.save(err => {
            if(err ) console.error(err)
        })


        
    })
})

Monitor.count(null, (err, count) => {
    if(!count) Monitor.create(monitorData, err => console.error(err))
})