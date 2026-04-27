import pacienteDoencaController from "../controllers/pacienteDoencaController.js";

export default (app) => {
  app.get('/pacienteDoenca/get-all', pacienteDoencaController.get);
  app.get('/pacienteDoenca/get-id/:id', pacienteDoencaController.getId);
  app.post('/pacienteDoenca/create', pacienteDoencaController.create);
  app.put('/pacienteDoenca/update/:id', pacienteDoencaController.update);
};