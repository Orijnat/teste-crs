import usuarioController from "../controllers/usuarioController.js"
import verifyToken from "../middlewares/verifyToken.js";

export default (app) => {
    app.post('/usuario/create',  usuarioController.register);
    app.post('/usuario/login', usuarioController.login);
    app.get('/usuario/token', usuarioController.getUserByToken)

};