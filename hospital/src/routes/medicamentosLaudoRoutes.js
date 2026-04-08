import medicamentosLaudoController from "../controllers/medicamentosLaudoController.js";

export default (app) => {
    app.get('/medicamentosLaudo/get-all', medicamentosLaudoController.get);
    app.get('/medicamentosLaudo/get-id/:id', medicamentosLaudoController.getId);
    app.post('/medicamentosLaudo/create', medicamentosLaudoController.create);
    app.put('/medicamentosLaudo/update/:id', medicamentosLaudoController.update);

};