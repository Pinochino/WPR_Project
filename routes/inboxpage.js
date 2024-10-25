const { Router } = require('express')
const InboxController = require("../controller/InboxController");

const route = Router();
const inboxController = new InboxController();

route.get('/', inboxController.read);
route.get('/countPage', inboxController.countPage);
route.post('/handle-form-action', inboxController.handleFormAction)
route.delete('/delete/:id', inboxController.deleteById);
route.delete('/deleteAll', inboxController.deleteAll);

module.exports = route;