const {  Notification } = require('../models')

function getnotifications(req, res) {
    Notification.findAll({ where: { userid } })
    .then(notifications => res.json(notifications))
    .catch(err => res.status(500).json({ error: 'Something went wrong' }))
}

module.exports = { getnotifications };