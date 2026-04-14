import Usuarios from "../models/UsuarioModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const register = async (req, res) => {
    try {
        

        const { nome, email, password, nivelAcesso } = req.body;

        if (!nome || !email || !password || !nivelAcesso) {
            return res.status(400).send({
                    type: 'error',
                    message: 'Campos obrigatorios nome, email, senha ou nivel de acesso nao foram preenchidos',
                    data: []
                });
            }

        const UsuarioExistente = await Usuarios.findOne({
            where: {
                email
            }
        });

        if (UsuarioExistente) {
            return res.status(400).send({
                type: 'error',
                message: 'ja existe!'
        });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const retorno = await Usuarios.create({ nome, email, passwordHash, nivelAcesso });
    
    return res.status(201).send({
        type: 'success',
        message: 'Usuario criado com sucesso',
        data: retorno
    });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao criar Usuarios',
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

        const UsuariosExistente = await Usuarios.findOne({
            where: {
                email
            }
        });

        if (!UsuariosExistente || !(await bcrypt.compare(req.body.password, UsuariosExistente.passwordHash))) {
            return res.status(400).send({
                type: 'error',
                message: 'email ou senha incorretos'
            })
        }

        const token= jwt.sign(
            {
                idUsuarios: UsuariosExistente.id,
                nomeUsuarios: UsuariosExistente.nome,
                emailUsuarios: UsuariosExistente.email,
                acessoUsuario: UsuariosExistente.nivelAcesso
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

const getUserByToken= async(req,res) =>{
    try {
        
        const token= req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        console.log(token)

        if(!token){
            return res.status(400).send({
                message:'cade o token'
            })
        }

        const resposta= jwt.verify(token, process.env.SECRET_KEY)

        return res.json({data: resposta})

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
        }
}

export default {
    register,
    login,
    getUserByToken
};