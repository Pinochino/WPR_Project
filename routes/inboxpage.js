const { Router } = require('express')
const InboxXController = require("../controller/InboxController");

const route = Router();
const inboxController = new InboxXController();

route.get('/', inboxController.index)
// route.post('/', homeController.login);

module.exports = route;