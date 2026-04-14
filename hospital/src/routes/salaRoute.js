import salaController from "../controllers/salaController.js";

export default (app) => {
  app.get('/sala/get-all', salaController.get);
  app.get('/sala/get-id/:id', salaController.getId);
  app.post('/sala/create', salaController.create);
  app.put('/sala/update/:id', salaController.update);
};