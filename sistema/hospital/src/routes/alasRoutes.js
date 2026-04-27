import alasController from "../controllers/alasController.js";

export default (app) => {
  app.get('/alas/get-all', alasController.get);
  app.get('/alas/get-id/:id', alasController.getId);
  app.post('/alas/create', alasController.create);
  app.put('/alas/update/:id', alasController.update);
};