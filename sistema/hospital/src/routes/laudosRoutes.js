import laudosController from "../controllers/laudosController.js";
import medicoToken from "../middlewares/medicoToken.js"
import edicaoLaudosToken from "../middlewares/edicaoLaudosToken.js"

export default (app) => {
  app.get('/laudos/get-all',  laudosController.get);
  app.get('/laudos/get-id/:id', laudosController.getId);
  app.post('/laudos/create', medicoToken,laudosController.create);
  app.put('/laudos/update/:id', edicaoLaudosToken,laudosController.updateLaudosByMedico);
  app.delete('/laudos/delete/:id', medicoToken,laudosController.destroy);
};