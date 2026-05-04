import tarefaController from "../controllers/tarefaController.js";
import verifyToken from "../middlewares/verifyToken.js"

export default (app) => {
  app.get('/tarefa/get-id/:id', verifyToken, tarefaController.get);
  app.delete('/tarefa/deletar/:id', verifyToken, tarefaController.destroy);
  app.get('/tarefa/getall', verifyToken, tarefaController.get);
  app.post('/tarefa/create', verifyToken, tarefaController.create);
  app.patch('/tarefa/update/:id', verifyToken, tarefaController.update);
}
