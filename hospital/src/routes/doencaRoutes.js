import doencaController from '../controllers/doencaController.js'

export default (app) => {
    app.get('/doenca/get-all', doencaController.get);
    app.get('/doenca/get-id/:id', doencaController.getId);
    app.post('/doenca/create', doencaController.create);
    app.put('/doenca/update/:id', doencaController.update);

};