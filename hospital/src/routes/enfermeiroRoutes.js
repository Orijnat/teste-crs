import enfermeiroController from "../controllers/enfermeiroController.js";

export default (app) => {
    app.get('/enfermeiro/get-all', enfermeiroController.get);
    app.get('/enfermeiro/get-id/:id', enfermeiroController.getId);
    app.post('/enfermeiro/create', enfermeiroController.create);
    app.patch('/enfermeiro/update/:id', enfermeiroController.update);

};