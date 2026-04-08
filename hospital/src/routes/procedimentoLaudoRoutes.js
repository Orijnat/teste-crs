import procedimentoLaudoController from "../controllers/procedimentoLaudoController.js";

export default (app) => {
    app.get('/procedimentoLaudo/get-all', procedimentoLaudoController.get);
    app.get('/procedimentoLaudo/get-id/:id', procedimentoLaudoController.getId);
    app.post('/procedimentoLaudo/create', procedimentoLaudoController.create);
    app.put('/procedimentoLaudo/update/:id', procedimentoLaudoController.update);

};