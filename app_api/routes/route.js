let route       = require('express').Router();
let adminCtrl   = require('../controllers/adminCtrl')
let authCtrl   = require('../controllers/authCtrl')
const expressJWT = require('express-jwt')
const authMid = expressJWT({
    userProperty: 'payload', //decode userproperty in jwt-structure and pass to req.payload
    secret: process.env.JWT_SECRET
})

route.get('/', (req, res, next) => {
    console.log(req.session)
    res.json('welcome').status(200)
})

route.post('/login', authCtrl.login)
route.get('/logout', authCtrl.logout)

route.put('/allocate-monitor/:uid/:mid',authMid, adminCtrl.allocateMonitor)
route.put('/unallocate-monitor/:uid/:mid',authMid, adminCtrl.unallocateMonitor)
route.post('/addUser',authMid, adminCtrl.addUser)
route.delete('/removeUserByMail/:mail',authMid, adminCtrl.removeUserByMail)

module.exports = route;