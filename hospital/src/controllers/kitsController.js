import Kits from '../models/KitsModel.js';

const get = async (req, res) => {
    try {
        const dados = await Kits.findAll();

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
        const { nome, quantidade } = req.body;

        if (!nome || !quantidade) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: nome, quantidade',
                data: []
            });
        }

        const retorno = await Kits.create({
            nome,
            quantidade
        })
        return res.status(201).send({
            type: 'success',
            message: 'Kit criado com sucesso',
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
        const dados= await Kits.findByPk(id);

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Kit não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Kit encontrado com sucesso',
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
        const { nome, quantidade } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Kits.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Kit não encontrado',
                data: []
            });
        }

        dados.nome = nome ?? dados.nome;
        dados.quantidade = quantidade ?? dados.quantidade;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Kit atualizado com sucesso',  
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