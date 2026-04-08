import laudosController from "../controllers/laudosController.js";

export default (app) => {
    app.get('/laudos/get-all', laudosController.get);
    app.get('/laudos/get-id/:id', laudosController.getId);
    app.post('/laudos/create', laudosController.create);
    app.put('/laudos/update/:id', laudosController.update);

};