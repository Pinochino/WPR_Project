const { Router } = require('express')
const RegisterControler = require("../controller/RegisterController");

const route = Router();
const registerController = new RegisterControler();

route.get('/', registerController.index)
route.post('/create', registerController.create);

module.exports = route;