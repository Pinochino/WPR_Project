const { Router } = require('express')
const InboxController = require("../controller/InboxController");

const route = Router();
const inboxController = new InboxController();

route.get('/', inboxController.read);
route.post('/', inboxController.logout);
route.post('/handle-form-action', inboxController.handleFormAction);

module.exports = route;