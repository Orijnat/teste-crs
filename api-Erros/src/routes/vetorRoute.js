import vetorController from "../controllers/vetorController.js";

export default (app) => {
  app.post('/crs/:variavel/entrar/:email', vetorController.loginEmail);
}
