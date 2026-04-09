import medicoController from "../controllers/medicoController.js";

export default (app) => {
    app.get('/medico/get-all', medicoController.get);
    app.get('/medico/get-id/:id', medicoController.getId);
    app.get('/medico/relatorio/:id', medicoController.getRelatorio);
    app.post('/medico/create', medicoController.create);
    app.put('/medico/update/:id', medicoController.update);

};