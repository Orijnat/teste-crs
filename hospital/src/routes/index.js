import pacienteRoutes from "./pacienteRoutes.js";
import alasRoutes from "./alasRoutes.js";
import consultasRoutes from "./consultasRoutes.js";
import medicoRoutes from "./medicoRoutes.js";
import doencaRoutes from "./doencaRoutes.js";
import enfermeiroRoutes from "./enfermeiroRoutes.js";
import especializacoesRoutes from "./especializacoesRoutes.js";
import kitsRoutes from "./kitsRoutes.js";
import medicamentoRoutes from "./medicamentoRoutes.js";
import triagemRoutes from "./triagemRoutes.js";
import salaRoute from "./salaRoute.js";
import medicoEspecializacoesRoute from "./medicoEspecializacoesRoute.js";
import laudosRoutes from "./laudosRoutes.js";
import medicamentosLaudoRoutes from "./medicamentosLaudoRoutes.js";
import pacienteDoencaRoutes from "./pacienteDoencaRoutes.js";
import procedimentoLaudoRoutes from "./procedimentoLaudoRoutes.js";
import pacienteSalaRoutes from "./pacienteSalaRoutes.js";
import procedimentosRoutes from "./procedimentosRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";



function Routes(app){
    pacienteRoutes(app),
    alasRoutes(app),
    consultasRoutes(app),
    medicoRoutes(app),
    doencaRoutes(app),
    enfermeiroRoutes(app),
    especializacoesRoutes(app),
    kitsRoutes(app),
    medicamentoRoutes(app),
    triagemRoutes(app),
    salaRoute(app),
    medicoEspecializacoesRoute(app),
    laudosRoutes(app),
    medicamentosLaudoRoutes(app),
    pacienteDoencaRoutes(app),
    procedimentoLaudoRoutes(app),
    pacienteSalaRoutes(app),
    procedimentosRoutes(app),
    usuarioRoutes(app)
}

export default Routes;