const mongoose = require('mongoose');
const uri = 'mongodb://localhost/miniappFakeShinobiUser'

mongoose.connect(uri)

mongoose.connection.on('connected', () => console.log(`connected to ${uri}`))
mongoose.connection.on('disconnected', () => console.log(`disconnected from ${uri}`))
mongoose.connection.on('error', err => console.log(err));

require('./Monitor');
require('./User');
require('./seed')