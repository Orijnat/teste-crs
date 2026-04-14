import especializacoesController from "../controllers/especializacoesController.js";

export default (app) => {
  app.get('/especializacoes/get-all', especializacoesController.get);
  app.get('/especializacoes/get-id/:id', especializacoesController.getId);
  app.post('/especializacoes/create', especializacoesController.create);
  app.put('/especializacoes/update/:id', especializacoesController.update);
};