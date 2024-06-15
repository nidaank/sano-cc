const { Router } = require("express");
const userController = require("../controllers/userController");
const { predictStroke, predictDiabetes, predictHeartDisease } = require("../controllers/predictController");
const verifyToken = require("../middleware/verifyToken");
const refreshToken = require("../controllers/refreshToken");

const routes = Router();

routes.get('/users', verifyToken, userController.getUsers);
routes.post('/users', userController.register);
routes.post('/login', userController.login);

routes.get('/token', refreshToken);

routes.post('/predict_stroke', verifyToken, predictStroke);
routes.post('/predict_diabetes', verifyToken, predictDiabetes);
routes.post('/predict_heart_disease', verifyToken, predictHeartDisease);

module.exports = routes;
