const { Router } = require('express')
const OutboxController = require("../controller/OutboxController");

const route = Router();
const outboxController = new OutboxController();

route.get('/', outboxController.read)

module.exports = route;