import PacienteDoenca from "../models/PacienteDoencaModel.js";
import Paciente from '../models/PacienteModel.js';
import Doenca from '../models/DoencaModel.js';

const get = async (req, res) => {
    try {
        const dados = await PacienteDoenca.findAll({
            include: [
                { model: Doenca, as: 'doenca' },
                {model: Paciente, as: 'paciente'}
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
        const { paciente_id, doenca_id } = req.body;

        if (!paciente_id || !doenca_id) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: paciente_id, doenca_id',
                data: []
            });
        }

        const retorno = await PacienteDoenca.create({
            paciente_id,
            doenca_id
        })
        return res.status(201).send({
            type: 'success',
            message: 'Associação Paciente-Doença criada com sucesso',
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
        const dados= await PacienteDoenca.findByPk(id, {
            include: [
                { model: Doenca, as: 'doenca' },
                {model: Paciente, as: 'paciente'}
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Associação Paciente-Doença não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Associação Paciente-Doença encontrada com sucesso',
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
        const { paciente_id, doenca_id } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await PacienteDoenca.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Associação Paciente-Doença não encontrada',
                data: []
            });
        }

        dados.paciente_id = paciente_id ?? dados.paciente_id;
        dados.doenca_id = doenca_id ?? dados.doenca_id;
        

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Associação Paciente-Doença atualizada com sucesso',  
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