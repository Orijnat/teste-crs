import Medicamento from '../models/MedicamentoModel.js';

const get = async (req, res) => {
    try {
        const dados = await Medicamento.findAll();

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
        const { medicamento, descricao, quantidade, controlado } = req.body;

        
        if (!medicamento || !descricao || !quantidade) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: medicamento, descricao, quantidade',
                data: []
            });
        }

        const retorno = await Medicamento.create({
            medicamento,
            descricao,
            quantidade,
            controlado
        })
        return res.status(201).send({
            type: 'success',
            message: 'Medicamento criado com sucesso',
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
        const dados= await Medicamento.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Medicamento não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Medicamento encontrado com sucesso',
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
        const { medicamento, descricao, quantidade, controlado } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Medicamento.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Medicamento não encontrado',
                data: []
            });
        }

        dados.medicamento = medicamento ?? dados.medicamento;
        dados.descricao = descricao ?? dados.descricao;
        dados.quantidade = quantidade ?? dados.quantidade;
        dados.controlado = controlado ?? dados.controlado;


        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Medicamento atualizado com sucesso',  
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