const User = require('../models/User');
const request = require('request');

//just now we use to send all the monitorid
//but in the future we have to find in Monitor to use some kind of data in it
module.exports.listAllMonitor = (req, res) => {
    let mail = req.payload.mail;
    if (!mail) res.status(400).json({ message: 'mail is required' })

    User
        .findOne({ mail }, (err, user) => {
            let { alMonitors } = user

            if (err) res.status(500).json({ message: 'Internal error' });
            else if (!alMonitors) res.status(404).json({ message: 'no monitors allow' });
            else res.status(200).json({ alMonitors });
        })

    
}

module.exports.listAllStreamByMail = (req, res) => {
    let mail = req.payload.mail;
    if (!mail) res.status(400).json({ message: 'mail is required' })

    User
        .findOne({ mail }, (err, user) => {
            let { alMonitors } = user
            const {DOMAIN, API_KEY, GROUP_KEY} = process.env;
            let links = alMonitors.map(mid => `${DOMAIN}/${API_KEY}/embed/${GROUP_KEY}/${mid}/jquery|fullscreen`)

            if (err) res.status(500).json({ message: 'Internal error' });
            else if (!alMonitors) res.status(404).json({ message: 'no monitors allow' });
            else res.status(200).json({ links });
        })

}