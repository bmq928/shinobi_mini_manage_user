let route       = require('express').Router();
let adminCtrl   = require('../controllers/adminCtrl')
let loginCtrl   = require('../controllers/loginCtrl')

route.get('/', (req, res, next) => {
    console.log(req.session)
    res.json('welcome').status(200)
})

route.post('/login', loginCtrl)

route.put('/allocate-monitor/:uid/:mid', adminCtrl.allocateMonitor)
route.post('/addUser', adminCtrl.addUser)
route.delete('/removeUserByMail/:mail', adminCtrl.removeUserByMail)

module.exports = route;