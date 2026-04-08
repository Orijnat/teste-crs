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
        const { doenca, descricao } = req.body;

        if (!doenca || !descricao) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: doenca, descricao',
                data: []
            });
        }

        const retorno = await Doenca.create({
            doenca,
            descricao
        })
        return res.status(201).send({
            type: 'success',
            message: 'Doença criada com sucesso',
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
        const dados= await Doenca.findByPk(id);

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Doença não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Doença encontrada com sucesso',
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
        const { doenca, descricao } = req.body;

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
                message: 'Doença não encontrada',
                data: []
            });
        }

        dados.doenca = doenca ?? dados.doenca;
        dados.descricao = descricao ?? dados.descricao;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Doença atualizada com sucesso',  
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