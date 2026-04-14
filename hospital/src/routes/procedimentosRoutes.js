import procedimentosController from "../controllers/procedimentosController.js";

export default (app) => {
  app.get('/procedimentos/get-all', procedimentosController.get);
  app.get('/procedimentos/get-id/:id', procedimentosController.getId);
  app.post('/procedimentos/create', procedimentosController.create);
  app.put('/procedimentos/update/:id', procedimentosController.update);
};