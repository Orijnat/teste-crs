import Ala from "./AlaModel.js";
import Consultas from "./ConsultasModel.js";
import Doenca from "./DoencaModel.js";
import Enfermeiros from "./EnfermeirosModel.js";
import Especializacoes from "./EspecializacoesModel.js";
import Kits from "./KitsModel.js";
import Laudos from "./LaudosModel.js";
import Medicamento from "./MedicamentoModel.js";
import MedicamentosLaudo from "./MedicamentosLaudoModel.js";
import MedicosEspecializacoes from "./MedicosEspecializacoesModel.js";
import Medico from "./MedicosModel.js";
import Paciente from "./PacienteModel.js";
import pacienteDoenca from "./PacienteDoencaModel.js";
import PacienteSala from "./PacientesSalasModel.js";
import Perfil from "./PerfilModel.js";
import ProcedimentoLaudo from "./ProcedimentoLaudo.js";
import Procedimentos from "./ProcedimentosModel.js";
import Sala from "./SalaModel.js";
import Triagem from "./TriagemModel.js";
import Usuarios from "./UsuarioModel.js";

// Configurar associações
Perfil.hasMany(Usuarios, { foreignKey: 'perfilId', as: 'usuarios' });
Usuarios.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' });

Perfil.hasMany(Medico, { foreignKey: 'perfilId', as: 'medicos' });
Medico.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' });

Perfil.hasMany(Enfermeiros, { foreignKey: 'perfilId', as: 'enfermeiros' });
Enfermeiros.belongsTo(Perfil, { foreignKey: 'perfilId', as: 'perfil' });

(async () => {
    await Perfil.sync();
    await Ala.sync();
    await Consultas.sync();
    await Doenca.sync();
    await Enfermeiros.sync();
    await Especializacoes.sync();
    await Kits.sync();
    await Laudos.sync();
    await Medicamento.sync();
    await MedicamentosLaudo.sync();
    await MedicosEspecializacoes.sync();
    await Medico.sync();
    await Paciente.sync();
    await pacienteDoenca.sync();
    await PacienteSala.sync();
    await ProcedimentoLaudo.sync();
    await Procedimentos.sync();
    await Sala.sync();
    await Triagem.sync();
    await Usuarios.sync();
})();

export { Perfil, Usuarios, Medico, Enfermeiros };