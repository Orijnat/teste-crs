import Consultas from "../models/ConsultasModel.js";
import Paciente from "../models/PacienteModel.js";
import Medico from "../models/MedicosModel.js";
import Laudos from "../models/LaudosModel.js";
import { Op } from 'sequelize';

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

const getSemLaudo= async (req, res) => {
    try {
        const consultasComLaudo = await Laudos.findAll({
            attributes: ['idConsulta'],
            raw: true
        });

        const idsConsultasComLaudo = [...new Set(
            consultasComLaudo
            .map((laudo) => laudo.idConsulta)
            .filter((idConsulta) => idConsulta !== null && idConsulta !== undefined)
        )];

        const where= idsConsultasComLaudo.length > 0
        ? {id : { [Op.notIn ]: idsConsultasComLaudo }} 
        : undefined;

        const dados = await Consultas.findAll({
            where, 
                include: [
                    { model: Paciente, as: 'paciente' },
                    { model: Medico, as: 'medico' }
                ]
            },
        );

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
        const { idPaciente, idMedico, relatoPaciente, relato_paciente, idTriagem, idSala } = req.body;
        const relatoPacienteValue = relatoPaciente ?? relato_paciente;

        if (!idPaciente || !idMedico || !idTriagem || !idSala) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: idPaciente, idMedico, idTriagem, idSala',
                data: []
            });
        }

        const retorno = await Consultas.create({
            idPaciente,
            idMedico,
            relato_paciente: relatoPacienteValue,
            idTriagem,
            date: new Date(),
            idSala
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
        const {idPaciente, idMedico, relatoPaciente, idTriagem, idSala } = req.body;

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

        
        dados.idPaciente = idPaciente ?? dados.idPaciente;
        dados.idMedico = idMedico ?? dados.idMedico;
        dados.relato_paciente = relatoPaciente ?? dados.relato_paciente;
        dados.idTriagem = idTriagem ?? dados.idTriagem;
        dados.idSala = idSala ?? dados.idSala;

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
    getSemLaudo,
    create,
    getId,
    update
};