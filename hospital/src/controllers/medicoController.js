import Medico from "../models/MedicosModel.js";
import Especializacoes from "../models/EspecializacoesModel.js";

const get = async (req, res) => {
    try {
        const dados = await Medico.findAll()
        const espec = await Especializacoes.findAll();


        return res.status(200).send({
            type: 'success',
            message: 'Dados buscados com sucesso',
            data: dados , espec
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

        const retorno = await Medico.create({
            nome
        })
        return res.status(201).send({
            type: 'success',
            message: 'Medico criado com sucesso',
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
        const dados= await Medico.findByPk(id);

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Medico não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Medico encontrado com sucesso',
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

        const dados = await Medico.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Medico não encontrado',
                data: []
            });
        }

        dados.nome = nome ?? dados.nome;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Medico atualizado com sucesso',  
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