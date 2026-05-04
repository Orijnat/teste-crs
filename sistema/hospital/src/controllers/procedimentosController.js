import Procedimentos from '../models/ProcedimentosModel.js';
import Kit from '../models/KitsModel.js';
import Sala from '../models/SalaModel.js';
import Enfermeiros from '../models/EnfermeirosModel.js';
import Medico from '../models/MedicosModel.js';
import Paciente from '../models/PacienteModel.js';

const get = async (req, res) => {
    try {
        const dados = await Procedimentos.findAll({
            include: [
                { model: Kit, as: 'kit' },
                { model: Sala, as: 'sala' },
                { model: Enfermeiros, as: 'enfermeiro' },
                { model: Medico, as: 'medico' },
                { model: Paciente, as: 'paciente'}
            ]
        });

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
        });
    }
};

const create = async (req,res) => {
    try {
        const { nome,  idKit, idSala, idEnfermeiro, idMedico, idPaciente, prioridade } = req.body;

        if (!nome || !idKit || !idSala || !idEnfermeiro || !idMedico || !idPaciente || !prioridade) {
            return res.status(400).send({
                type: 'error',
                message: 'Todos os campos são obrigatórios: nome, idKit, idSala, idEnfermeiro, idMedico, idPaciente',
                data: []
            });
        }

        const retorno = await Procedimentos.create({
            nome,
            idKit,
            idSala,
            idEnfermeiro,
            idMedico,
            idPaciente,
            prioridade
        })
        return res.status(201).send({
            type: 'success',
            message: 'Procedimento criado com sucesso',
            data: retorno
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro',
            data: error.message
        });
    }
}


const getId = async (req, res) => {
    try {
        const id= req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            })
        }
        const dados= await Procedimentos.findByPk(id, {
            include: [
                { model: Kit, as: 'kit' },
                { model: Sala, as: 'sala' },
                { model: Enfermeiros, as: 'enfermeiro' },
                { model: Medico, as: 'medico' },
                { model: Paciente, as: 'paciente' }
            ]
        });

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Procedimento não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Procedimento encontrado com sucesso',
            data: dados
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro',
            data: error.message
        });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, idKit, idSala, idEnfermeiro, idMedico, idPaciente, prioridade } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Procedimentos.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Procedimento não encontrado',
                data: []
            });
        }

        dados.nome = nome ?? dados.nome;;
        dados.idKit = idKit ?? dados.idKit;
        dados.idSala = idSala ?? dados.idSala;
        dados.idEnfermeiro = idEnfermeiro ?? dados.idEnfermeiro;
        dados.idMedico = idMedico ?? dados.idMedico;
        dados.idPaciente = idPaciente ?? dados.idPaciente;
        dados.prioridade = prioridade ?? dados.prioridade;  
        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Procedimento atualizado com sucesso',  
            data: dados
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro',
            data: error.message
        });
    }
}



export default {
    get,
    create,
    getId,
    update,
};
