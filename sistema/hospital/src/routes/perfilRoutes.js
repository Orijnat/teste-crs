import perfilController from "../controllers/perfilController.js";

export default (app) => {
  app.get('/perfil/get-all', perfilController.get);
  app.get('/perfil/get-id/:id', perfilController.getId);
  app.post('/perfil/create', perfilController.create);
  app.put('/perfil/update/:id', perfilController.update);
  app.delete('/perfil/delete/:id', perfilController.delete_perfil);
};
