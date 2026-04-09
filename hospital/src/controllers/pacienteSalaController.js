import { where } from 'sequelize';
import { Op } from 'sequelize';
import PacienteSala from '../models/PacientesSalasModel.js';


const get = async (req, res) => {
    try {
        const dados = await PacienteSala.findAll({
            include: [
                { model: Sala, as: 'sala' },
                { model: Paciente, as: 'paciente' }
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
        const { dataEntrada, dataSaida, idSala, idPaciente } = req.body;

        if (!dataEntrada || !idSala || !idPaciente) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: dataEntrada, idSala, idPaciente',
                data: []
            });
        }

        const retorno = await PacienteSala.create({
            dataEntrada,
            dataSaida,
            idSala,
            idPaciente
        })
        return res.status(201).send({
            type: 'success',
            message: 'Associação Paciente-Sala criada com sucesso',
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

const getVazio= async(req,res) =>{
    try {
        const sala = await PacienteSala.findAll({where: {dataSaida: { [Op.ne]: null }}
});

            return res.status(200).send({
                type: 'success',
                message: 'sala vazia encontrada',
                data: sala
            })
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
        const dados= await PacienteSala.findByPk(id, {
            include: [
                { model: Sala, as: 'sala' },
                { model: Paciente, as: 'paciente' }
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Associação Paciente-Sala não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Associação Paciente-Sala encontrada com sucesso',
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
        const { dataEntrada, dataSaida, idSala, idPaciente } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await PacienteSala.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Associação Paciente-Sala não encontrada',
                data: []
            });
        }

        dados.dataEntrada = dataEntrada ?? dados.dataEntrada;
        dados.dataSaida = dataSaida ?? dados.dataSaida;
        dados.idSala = idSala ?? dados.idSala;
        dados.idPaciente = idPaciente ?? dados.idPaciente;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Associação Paciente-Sala atualizada com sucesso',  
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
    getVazio,
    create,
    getId,
    update,
}
