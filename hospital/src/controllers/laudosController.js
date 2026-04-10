import Laudos from "../models/LaudosModel.js";
import Consultas from "../models/ConsultasModel.js";
import Medico from "../models/MedicosModel.js";
import Paciente from "../models/PacienteModel.js";
import fileupload from "../utils/fileupload.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const get = async (req, res) => {
    try {
        const dados = await Laudos.findAll({
            include: [
                { model: Consultas, as: 'consulta' },
                { model: Medico, as: 'medico' },
                { model: Paciente, as: 'paciente' }
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
        const { idConsulta, idMedico, idPaciente } = req.body;

        if (!idConsulta || !idMedico || !idPaciente) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: idConsulta, idMedico, idPaciente',
                data: []
            });
        }

        const retorno = await Laudos.create({
            idConsulta,
            idMedico,
            idPaciente
        })




        if(req.files && req.files.arquivos){
            let upload= await fileupload(req.files.arquivos, {
                id: retorno.id,
                tipo: req.query.tipo || 'imagem',
                tabela: 'laudos'
            });

            retorno.arquivos = `${process.env.API_HOST}`+`${upload.path}`;
            console.log(upload)
            await retorno.save();
        }

        return res.status(201).send({
            type: 'success',
            message: 'Laudo criado com sucesso',
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
        const dados= await Laudos.findByPk(id, {
            include: [
                { model: Consultas, as: 'consulta' },
                { model: Medico, as: 'medico' },
                { model: Paciente, as: 'paciente' }
            ]
        });

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Laudo não encontrado',
                data: []
            })
        }

        return res.status(200).send({
            type: 'success',
            message: 'Laudo encontrado com sucesso',
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
        const {idConsulta, idMedico, idPaciente} = req.body;

        const dados = await Laudos.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Laudo não encontrado',
                data: []
            });
        }

        

        

        if(req.files && req.files.arquivos){
            if(dados.arquivos){
                try {
                    const publicIndex = dados.arquivos.indexOf('public/');
                    const arquivoAntigo = publicIndex >= 0
                        ? dados.arquivos.slice(publicIndex)
                        : dados.arquivos.replace(/^https?:\/\/[^/]+/, '').replace(/^\/+/, '');
                    const caminhoArquivoAntigo = path.resolve(__dirname, '..', '..', arquivoAntigo);

                    if (fs.existsSync(caminhoArquivoAntigo)) {
                        fs.unlinkSync(caminhoArquivoAntigo);
                    } else {
                        console.log('Aviso: arquivo antigo não encontrado para exclusão:', caminhoArquivoAntigo);
                    }
                } catch (err) {
                    console.log("Aviso: Não foi possível deletar o arquivo antigo:", err.message);
                }
            }

            let upload = await fileupload(req.files.arquivos, {
                id: dados.id,
                tipo: req.body.tipo || 'imagem',
                tabela: 'laudos'
            });

            dados.arquivos= `${process.env.API_HOST}${upload.path}`;
        }

        dados.idConsulta = idConsulta ?? dados.idConsulta;
        dados.idMedico = idMedico ?? dados.idMedico;
        dados.idPaciente = idPaciente ?? dados.idPaciente;

        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Laudo atualizado com sucesso',  
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



const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        if(isNaN(id)){
            return res.status(400).send({
                type: 'error',
                message: 'Este id não é um número',
                data: []
            });
        }
        const dados = await Laudos.findByPk(id);

        if(!dados){
            return res.status(404).send({
                type: 'error',
                message: 'Não foi encontrado um registro com codigo ' + id,
                data: []
            });
        }

        if(dados.arquivos){
            try {
                const publicIndex = dados.arquivos.indexOf('public/');
                const caminhoRelativo = publicIndex >= 0
                    ? dados.arquivos.slice(publicIndex)
                    : dados.arquivos.replace(/^https?:\/\/[^/]+/, '').replace(/^\/+/, '');

                
                const caminhoNovo = path.resolve(__dirname, '..', '..', caminhoRelativo);

                if (fs.existsSync(caminhoNovo)) {
                    fs.unlinkSync(caminhoNovo);
                    console.log("Arquivo físico removido com sucesso:", caminhoRelativo);
                }
            } catch (err) {
                console.log("Aviso: Não foi possível deletar o arquivo físico:", err.message);
            }
        }
        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'foi excluido com sucesso',
            data: dados
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro !!!',
            data: error.message
        })
    }
}

export default {
    get,
    create,
    getId,
    update,
    destroy
};