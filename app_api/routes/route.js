let route = require('express').Router();

route.get('/', (req, res, next) => {
    res.json('welcome').status(200)
})

module.exports = route;