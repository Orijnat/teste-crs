import medicosEspecializacoesController from "../controllers/medicosEspecializacoesController.js";

export default (app) => {
  app.get('/medicosEspecializacoes/get-all', medicosEspecializacoesController.get);
};