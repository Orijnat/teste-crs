import MedicosEspecializacoes from "../models/MedicosEspecializacoesModel.js";
import Especializacoes from "../models/EspecializacoesModel.js";
import Medico from "../models/MedicosModel.js";

const get = async (req, res) => {
    try {
        const dados = await MedicosEspecializacoes.findAll({
            include: [
                { model: Especializacoes, as: 'especializacao' },
                { model: Medico, as: 'medico' }
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


export default {
    get
};