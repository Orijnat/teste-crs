import Medicamento from '../models/MedicamentoModel.js';
import axios from 'axios';
import * as deepl from 'deepl-node';

const translator = new deepl.Translator(process.env.DEEPL_AUTH_KEY);

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
        const { medicamento, quantidade, controlado } = req.body;
        let { descricao } = req.body;

        if (!medicamento || !quantidade) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: medicamento, quantidade',
                data: []
            });
        }

        if (!descricao) {
            try {
                const translationName = await translator.translateText(medicamento, null, 'en-US');
                const termEn = translationName.text;

                const fdaRes = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${termEn}"&limit=1`);
                const info = fdaRes.data.results[0];
                
                const rawTextEn = [
                    info.indications_and_usage?.[0] || "",
                    info.adverse_reactions?.[0] || ""
                ].join("\n\n").substring(0, 1500);

                if (rawTextEn.trim()) {
                    const translationDesc = await translator.translateText(rawTextEn, null, 'pt-BR');
                    descricao = translationDesc.text;
                }
            } catch (e) {
                descricao = "Descrição automática indisponível";
            }
        }

        const retorno = await Medicamento.create({
            medicamento,
            descricao: descricao || "Sem descrição",
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