import { Router } from "express";
import { default as HomeController } from "../controller/HomeController";

const route = Router();
const homeController = new HomeController();

route.post('/login', homeController.login);