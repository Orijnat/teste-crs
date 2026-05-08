import loginController from "../controllers/loginController.js";

export default (app) => {
  app.post('/login', loginController.login);
};
  