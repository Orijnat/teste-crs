import pacienteController from "../controllers/pacienteController.js";


export default (app) => {
    app.get('/pacientes/get-all', pacienteController.get);
    app.get('/pacientes/get-id/:id', pacienteController.getId);
    app.post('/pacientes/create', pacienteController.create);
    app.put('/pacientes/update/:id', pacienteController.update);
    app.delete('/pacientes/delete/:id', pacienteController.destroy);
};