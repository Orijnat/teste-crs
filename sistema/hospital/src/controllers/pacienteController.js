import Paciente from '../models/PacienteModel.js';
import Consultas from '../models/ConsultasModel.js';
import PacienteDoenca from '../models/PacienteDoencaModel.js';
import PacienteSala from '../models/PacientesSalasModel.js';
import Laudos from '../models/LaudosModel.js';
import Triagem from '../models/TriagemModel.js';
import Medicamento from '../models/MedicamentoModel.js';
import ProcedimentoLaudo from '../models/ProcedimentoLaudo.js';
import MedicamentoLaudo from '../models/MedicamentosLaudoModel.js';


const get = async (req, res) => {
    try{
        const dados= await Paciente.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Dados buscados com sucesso',
            data: dados
        });
    } catch (error) {
            console.log(error);
            return res.status(500).send({
                type: 'error',
                message: 'Erro',
                data: error.message
            })
        }
}

const create= async (req, res) => {
    try {
        const { nome, idade, altura, peso } = req.body;


        const retorno = await Paciente.create({
            nome,
            idade,
            altura,
            peso
        });

        return res.status(201).send({
            type: 'success',
            message: 'Paciente criado com sucesso',
            data: retorno
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao criar paciente',
            data: error.message
        });
    }
}

const gethis = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado',
                data: []
            });
        }

        const [consultas, pacienteDoenca, pacienteSala, laudos, triagem, medicamentos] = await Promise.all([
            Consultas.findAll({ where: { idPaciente: id } }),
            PacienteDoenca.findAll({ where: { idPaciente: id } }),
            PacienteSala.findOne({ where: { idPaciente: id }, order: [['dataEntrada', 'DESC']] }),
            Laudos.findAll({ where: { idPaciente: id } }),
            Triagem.findAll({ where: { idPaciente: id } })
        ]);

        return res.status(200).send({
            type: 'success',
            message: 'Histórico do paciente recuperado',
            data: {
                paciente,
                consultas,
                doencas: pacienteDoenca,
                oSala: pacienteSala,
                laudos,
                triagens: triagem
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro interno no servidor',
            data: error.message
        });
    }
};


const getId = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Paciente encontrado',
            data: paciente
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro na requisição',
            data: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const dadosNovos = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID deve ser numérico',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado para atualização',
                data: []
            });
        }

        Object.keys(dadosNovos).forEach(campo => {
            paciente[campo] = dadosNovos[campo];
        });

        await paciente.save();

        return res.status(200).send({
            type: 'success',
            message: 'Dados do paciente atualizados com sucesso',
            data: paciente
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao atualizar paciente',
            data: error.message
        });
    }
};


const getcura = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado',
                data: []
            });
        }

        const [pacienteSala, laudos, triagens, medicamentos] = await Promise.all([
            PacienteSala.findOne({ where: { idPaciente: id }, order: [['dataEntrada', 'DESC']] }),
            Laudos.findAll({ where: { idPaciente: id } }),
            Triagem.findAll({ where: { idPaciente: id } }),
            MedicamentoLaudo.findAll({
                include: [
                    { model: Medicamento, as: 'medicamento' },
                    { model: Laudos, as: 'laudo', where: { idPaciente: id } }
                ]
            })
        ]);

        return res.status(200).send({
            type: 'success',
            message: 'Dados de cura do paciente recuperados com sucesso',
            data: {
                paciente,
                sala: pacienteSala,
                laudos,
                triagens,
                medicamentos
            }
        });



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro interno no servidor',
            data: error.message
        });
    }
}

export default {
    get,
    create,
    getId,
    getcura,
    gethis,
    update
}