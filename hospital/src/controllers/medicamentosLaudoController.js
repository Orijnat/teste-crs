import MedicamentosLaudo from "../models/MedicamentosLaudoModel.js";
import Laudos from "../models/LaudosModel.js";
import Medicamento from "../models/MedicamentoModel.js";

const get = async (req, res) => {
    try {
        const dados = await MedicamentosLaudo.findAll({
            include: [
                { model: Laudos, as: 'laudo' },
                { model: Medicamento, as: 'medicamento' },
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
        const { quantidade, idMedicamento, idLaudo } = req.body;

        if (!quantidade || !idMedicamento || !idLaudo) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: quantidade, idMedicamento, idLaudo',
                data: []
            });
        }

        const retorno = await MedicamentosLaudo.create({
            quantidade,
            idMedicamento,
            idLaudo
        })
        return res.status(201).send({
            type: 'success',
            message: 'Medicamento do laudo criado com sucesso',
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
        const dados= await MedicamentosLaudo.findByPk(id, {
            include: [
                { model: Laudos, as: 'laudo' },
                { model: Medicamento, as: 'medicamento' },
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Medicamento do laudo não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Medicamento do laudo encontrado com sucesso',
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
        const {quantidade, idMedicamento, idLaudo } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await MedicamentosLaudo.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Medicamento do laudo não encontrado',
                data: []
            });
        }

        dados.quantidade = quantidade ?? dados.quantidade;
        dados.idMedicamento = idMedicamento ?? dados.idMedicamento;
        dados.idLaudo = idLaudo ?? dados.idLaudo;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Medicamento do laudo atualizado com sucesso',  
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