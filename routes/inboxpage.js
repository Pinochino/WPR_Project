const { Router } = require('express')
const InboxController = require("../controller/InboxController");

const route = Router();
const inboxController = new InboxController();

route.get('/', inboxController.readEmail);
route.delete('/logout', inboxController.logout);
route.post('/handle-form-action', inboxController.handleFormAction);

module.exports = route;