const { Router } = require('express')
const EmailController = require("../controller/EmailController");

const route = Router();
const emailController = new EmailController();

route.get('/', emailController.index)

module.exports = route;