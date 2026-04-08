import kitsController from "../controllers/kitsController.js";

export default (app) => {
    app.get('/kits/get-all', kitsController.get);
    app.get('/kits/get-id/:id', kitsController.getId);
    app.post('/kits/create', kitsController.create);
    app.put('/kits/update/:id', kitsController.update);
};