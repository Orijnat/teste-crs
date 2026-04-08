import Laudos from "../models/LaudosModel.js";
import Consultas from "../models/ConsultasModel.js";
import Medico from "../models/MedicosModel.js";
import Paciente from "../models/PacienteModel.js";

const get = async (req, res) => {
    try {
        const dados = await Laudos.findAll({
            include: [
                { model: Consultas, as: 'consulta' },
                { model: Medico, as: 'medico' },
                { model: Pacientes, as: 'paciente' }
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
        const { idConsulta, idMedico, idPaciente } = req.body;

        if (!idConsulta || !idMedico || !idPaciente) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: idConsulta, idMedico, idPaciente',
                data: []
            });
        }

        const retorno = await Laudos.create({
            idConsulta,
            idMedico,
            idPaciente
        })
        return res.status(201).send({
            type: 'success',
            message: 'Laudo criado com sucesso',
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

const getId = async (req, res) =>{
    try {
        const id= req.params.id;

        if(isNaN(id)){
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            })
        }
        const dados= await Laudos.findByPk(id, {
            include: [
                { model: Consultas, as: 'consulta' },
                { model: Medico, as: 'medico' },
                { model: Pacientes, as: 'paciente' }
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Laudo não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Laudo encontrado com sucesso',
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
        const {idConsulta, idMedico, idPaciente } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Laudos.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Laudo não encontrado',
                data: []
            });
        }

        dados.idConsulta = idConsulta ?? dados.idConsulta;
        dados.idMedico = idMedico ?? dados.idMedico;
        dados.idPaciente = idPaciente ?? dados.idPaciente;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Laudo atualizado com sucesso',  
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