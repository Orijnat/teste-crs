import consultasController from "../controllers/consultasController.js";

export default (app) => {
  app.get('/consulta/get-all', consultasController.get);
  app.get('/consulta/get-id/:id', consultasController.getId);
  app.get('/consulta/get-sem-laudo', consultasController.getSemLaudo);
  app.post('/consulta/create', consultasController.create);
  app.put('/consulta/update/:id', consultasController.update);
};