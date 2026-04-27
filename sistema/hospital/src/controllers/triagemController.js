import Triagem from '../models/TriagemModel.js'
import Paciente from "../models/PacienteModel.js";
import Enfermeiro from "../models/EnfermeirosModel.js";

const get = async (req, res) => {
    try {
        const dados = await Triagem.findAll({
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Enfermeiro, as: 'enfermeiro' }
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
        const { idPaciente, idEnfermeiro } = req.body;

        if (!idPaciente || !idEnfermeiro) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: idPaciente, idEnfermeiro',
                data: []
            });
        }

        const retorno = await Triagem.create({
            idPaciente,
            idEnfermeiro
        })
        return res.status(201).send({
            type: 'success',
            message: 'Triagem criada com sucesso',
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
        const dados= await Triagem.findByPk(id, {
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Enfermeiro, as: 'enfermeiro' }
            ]
        });

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Triagem não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Triagem encontrada com sucesso',
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
        const { idPaciente, idEnfermeiro } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Triagem.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Triagem não encontrada',
                data: []
            });
        }

        dados.idPaciente = idPaciente ?? dados.idPaciente;
        dados.idEnfermeiro = idEnfermeiro ?? dados.idEnfermeiro;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Triagem atualizada com sucesso',  
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