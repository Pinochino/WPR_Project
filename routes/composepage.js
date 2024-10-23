const { Router } = require('express')
const ComposeController = require("../controller/ComposeController");

const route = Router();
const composeController = new ComposeController();

route.get('/', composeController.index)

module.exports = route;