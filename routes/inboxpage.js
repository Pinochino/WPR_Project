const { Router } = require('express')
const InboxController = require("../controller/InboxController");

const route = Router();
const inboxController = new InboxController();

route.get('/', inboxController.read)

module.exports = route;