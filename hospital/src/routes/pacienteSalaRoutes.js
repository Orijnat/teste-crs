import pacienteSalaController from "../controllers/pacienteSalaController.js";

export default (app) => {
    app.get('/pacienteSala/get-all', pacienteSalaController.get);
    app.get('/pacienteSala/get-id/:id', pacienteSalaController.getId);
    app.get('/pacienteSala/get-empt', pacienteSalaController.getVazio);
    app.post('/pacienteSala/create', pacienteSalaController.create);
    app.put('/pacienteSala/update/:id', pacienteSalaController.update);

};