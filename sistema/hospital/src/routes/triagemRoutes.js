import triagemController from "../controllers/triagemController.js";

export default (app) => {
  app.get('/triagem/get-all', triagemController.get);
  app.get('/triagem/get-id/:id', triagemController.getId);
  app.post('/triagem/create', triagemController.create);
  app.put('/triagem/update/:id', triagemController.update);
};