import Medico from "../models/MedicosModel.js";
import Especializacoes from "../models/EspecializacoesModel.js";
import Consultas from "../models/ConsultasModel.js";
import Pacientes from "../models/PacienteModel.js";
import Perfil from "../models/PerfilModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const get = async (req, res) => {
    try {
        const dados = await Medico.findAll({
            include: [{
                model: Perfil,
                as: 'perfil',
                attributes: ['id', 'nome', 'nivelAcesso']
            }]
        })
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
        const { nome, email, password, perfilId } = req.body;

        if (!nome || !email || !password || !perfilId) {
            return res.status(400).send({
                type: 'error',
                message: 'alguns dos campos nome, email, password, perfilId nao foram preenchidos' ,
                data: []
            });
        }

        // Verificar se o perfil existe
        const perfilExistente = await Perfil.findByPk(perfilId);
        if (!perfilExistente) {
            return res.status(400).send({
                type: 'error',
                message: 'Perfil não encontrado',
                data: []
            });
        }

        const medicoExistente = await Medico.findOne({
            where: {
                email
            }
        });

        if (medicoExistente) {
            return res.status(400).send({
                type: 'error',
                message: 'ja existe!'
        });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);


        const retorno = await Medico.create({ nome, perfilId , passwordHash, email });
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


const login = async(req, res) => { 
    try {
        
        const {email, password} = req.body;

        if(!email || !password){
            throw new Error("algo esta faltando")
        }

        const medicoExistente = await Medico.findOne({
            where: {
                email
            },
            include: [{
                model: Perfil,
                as: 'perfil',
                attributes: ['id', 'nome', 'nivelAcesso']
            }]
        });

        if (!medicoExistente || !(await bcrypt.compare(req.body.password, medicoExistente.passwordHash))) {
            return res.status(400).send({
                type: 'error',
                message: 'email ou senha incorretos'
            })
        }

        const token= jwt.sign(
            {
                idMedico: medicoExistente.id,
                nomeMedico: medicoExistente.nome,
                emailMedico: medicoExistente.email,
                perfilId: medicoExistente.perfilId,
                perfilNome: medicoExistente.perfil.nome,
                nivelAcesso: medicoExistente.perfil.nivelAcesso
            },

            process.env.SECRET_KEY,
            {
                expiresIn: '8h'
            })

            return res.status(200).send({
                type: 'success',
                message: 'logou',
                data: token
            });

    }catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
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
        const dados= await Medico.findByPk(id);

        if (!dados) {
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

const getRelatorio= async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const medico= await Medico.findByPk(id);

        if (!medico) {
            return res.status(404).send({
                type: 'error',
                message: 'Medico não encontrado',
                data: []
            });
        }
        const consultas = await Consultas.findAll({
            where: { idMedico: id },
            include: [{
                model: Pacientes,
                as: 'paciente',
                attributes: ['nome'] 
            }]
        });
        return res.status(200).send({
            type: 'success',
            message: 'Histórico do medico recuperado',
            data: {
                medico,
                consultas
        
            }
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
    getRelatorio,
    login
};









