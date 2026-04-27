import Especializacoes from "../models/EspecializacoesModel.js";

const get = async (req, res) => {
    try {
        const dados = await Especializacoes.findAll();

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
        const { especializacao } = req.body;

        if (!especializacao) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo obrigatório: especializacao',
                data: []
            });
        }

        const retorno = await Especializacoes.create({
            especializacao
        })
        return res.status(201).send({
            type: 'success',
            message: 'Especialização criada com sucesso',
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
        const dados= await Especializacoes.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Especialização não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Especialização encontrada com sucesso',
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
        const { especializacao } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Especializacoes.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Especialização não encontrada',
                data: []
            });
        }

        dados.especializacao = especializacao ?? dados.especializacao;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Especialização atualizada com sucesso',  
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