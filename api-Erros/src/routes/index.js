import tarefaRoute from "../routes/tarefaRoute.js"
import usuarioRoute from "../routes/usuarioRoute.js"
import vetorRoute from "../routes/vetorRoute.js"




function Routes(app) {

    tarefaRoute(app),
    usuarioRoute(app),
    vetorRoute(app)

}

export default Routes;