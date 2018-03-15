let route       = require('express').Router();
let adminCtrl   = require('../controllers/adminCtrl')
let authCtrl   = require('../controllers/authCtrl')
let normalUserCtrl = require("../controllers/normalUserCtrl");
const expressJWT = require('express-jwt')
const authMid = expressJWT({
    userProperty: 'payload', //decode userproperty in jwt-structure and pass to req.payload
    secret: process.env.JWT_SECRET
})

route.get('/', (req, res, next) => {
    console.log(req.session)
    res.json('welcome').status(200)
})

//authCtrl
route.post('/login', authCtrl.login)

//adminCtrl
route.put('/allocate-monitor',authMid, adminCtrl.allocateMonitor)
route.put('/unallocate-monitor',authMid, adminCtrl.unallocateMonitor)
route.post('/addUser',authMid, adminCtrl.addUser)
route.delete('/removeUserByMail',authMid, adminCtrl.removeUserByMail)
route.get('/alMonitorsByMail', authMid, adminCtrl.alMonitorsByMail);

//normalUserCtrl
route.get('/getAllMonitors',authMid, normalUserCtrl.listAllMonitor)

module.exports = route;