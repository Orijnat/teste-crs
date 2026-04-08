import Sala from '../models/SalaModel.js';
import Ala from '../models/AlaModel.js'

const get = async (req, res) => {
    try {
        const dados = await Sala.findAll({
            include: [
                { model: Ala, as: 'ala' },
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
        const { numero, idAla } = req.body;

        if (!numero || !idAla) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: numero, idAla',
                data: []
            });
        }

        const retorno = await Sala.create({
            numero,
            idAla
        })
        return res.status(201).send({
            type: 'success',
            message: 'Sala criada com sucesso',
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
        const dados= await Sala.findByPk(id, {
            include: [
                { model: Ala, as: 'ala' },
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Sala não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Sala encontrada com sucesso',
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
        const { numero, idAla } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Sala.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Sala não encontrada',
                data: []
            });
        }

        dados.numero = numero ?? dados.numero;
        dados.idAla = idAla ?? dados.idAla;
        

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Sala atualizada com sucesso',  
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
    update,

};