import Consultas from "../models/ConsultasModel.js";
import Paciente from "../models/PacienteModel.js";
import Medico from "../models/MedicosModel.js";

const get = async (req, res) => {
    try {
        const dados = await Consultas.findAll({
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Medico, as: 'medico' }
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
        const { data, idPaciente, idMedico } = req.body;

        if (!data || !idPaciente || !idMedico) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: data, idPaciente, idMedico',
                data: []
            });
        }

        const retorno = await Consultas.create({
            data,
            idPaciente,
            idMedico
        })
        return res.status(201).send({
            type: 'success',
            message: 'Consulta criada com sucesso',
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
        const dados= await Consultas.findByPk(id, {
            include: [
                { model: Paciente, as: 'paciente' },
                { model: Medico, as: 'medico' }
            ]
        });

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Consulta não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Consulta encontrada com sucesso',
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
        const { data, idPaciente, idMedico } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Consultas.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Consulta não encontrada',
                data: []
            });
        }

        dados.data = data ?? dados.data;
        dados.idPaciente = idPaciente ?? dados.idPaciente;
        dados.idMedico = idMedico ?? dados.idMedico;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Consulta atualizada com sucesso',  
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
    update
};