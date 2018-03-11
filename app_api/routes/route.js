let route       = require('express').Router();
let adminCtrl   = require('../controllers/adminCtrl')
let loginCtrl   = require('../controllers/loginCtrl')

route.get('/', (req, res, next) => {
    console.log(req.session)
    res.json('welcome').status(200)
})

route.post('/login', loginCtrl)

route.put('/allocate-monitor/:uid/:mid', adminCtrl.allocateMonitor)
route.put('/unallocate-monitor/:uid/:mid', adminCtrl.unallocateMonitor)
route.post('/addUser', adminCtrl.addUser)
route.delete('/removeUserByMail/:mail', adminCtrl.removeUserByMail)

module.exports = route;