import Enfermeiros from "../models/EnfermeirosModel.js";

const get = async (req, res) => {
    try {
        const dados = await Enfermeiros.findAll();

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
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo obrigatório: nome',
                data: []
            });
        }

        const retorno = await Enfermeiros.create({
            nome
        })
        return res.status(201).send({
            type: 'success',
            message: 'Enfermeiro criado com sucesso',
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
        const dados= await Enfermeiros.findByPk(id);

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Enfermeiro  não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Enfermeiro encontrado com sucesso',
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
        const { nome } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Enfermeiros.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Enfermeiro não encontrado',
                data: []
            });
        }

        dados.nome = nome ?? dados.nome;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Enfermeiro atualizado com sucesso',  
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