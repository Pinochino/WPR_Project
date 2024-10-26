const { Router } = require('express')
const EmailController = require("../controller/EmailController");

const route = Router();
const emailController = new EmailController();

route.get('/:id', emailController.read);
route.get('/:id/download', emailController.downloadFile);

module.exports = route;