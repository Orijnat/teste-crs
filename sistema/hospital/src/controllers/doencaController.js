import Doenca from '../models/DoencaModel.js';

const get = async (req, res) => {
    try {
        const dados = await Doenca.findAll();

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
        const { descricao } = req.body;

        if (!descricao) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo obrigatório: descricao',
                data: []
            });
        }

        const retorno = await Doenca.create({
            descricao
        })
        return res.status(201).send({
            type: 'success',
            message: 'Descrição criada com sucesso',
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
        const dados = await Doenca.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Descrição não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Descrição encontrada com sucesso',
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
        const { descricao } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Doenca.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Descrição não encontrada',
                data: []
            });
        }

        dados.descricao = descricao ?? dados.descricao;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Descrição atualizada com sucesso',  
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