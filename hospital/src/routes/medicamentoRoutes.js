import medicamentoController from "../controllers/medicamentoController.js";

export default (app) => {
  app.get('/medicamento/get-all', medicamentoController.get);
  app.get('/medicamento/get-id/:id', medicamentoController.getId);
  app.post('/medicamento/create', medicamentoController.create);
  app.put('/medicamento/update/:id', medicamentoController.update);
};