import ProcedimentoLaudo from '../models/ProcedimentoLaudo.js';
import Procedimento from '../models/ProcedimentosModel.js';
import Laudos from '../models/LaudosModel.js';

const get = async (req, res) => {
    try {
        const dados = await ProcedimentoLaudo.findAll({
            include: [
                { model: Procedimento, as: 'procedimento' },
                { model: Laudos, as: 'laudo' }
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
        const { idProcedimento, idLaudos } = req.body;

        if (!idProcedimento || !idLaudos) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: idProcedimento, idLaudos',
                data: []
            });
        }

        const retorno = await ProcedimentoLaudo.create({
            idProcedimento,
            idLaudos
        })
        return res.status(201).send({
            type: 'success',
            message: 'Associação Procedimento-Laudo criada com sucesso',
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
        const dados= await ProcedimentoLaudo.findByPk(id, {
            include: [
                { model: Procedimento, as: 'procedimento' },
                { model: Laudos, as: 'laudo' }
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Associação Procedimento-Laudo não encontrada',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Associação Procedimento-Laudo encontrada com sucesso',
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
        const { idProcedimento, idLaudos } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await ProcedimentoLaudo.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Associação Procedimento-Laudo não encontrada',
                data: []
            });
        }

        dados.idProcedimento = idProcedimento ?? dados.idProcedimento;
        dados.idLaudos = idLaudos ?? dados.idLaudos;
        

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Associação Procedimento-Laudo atualizada com sucesso',  
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