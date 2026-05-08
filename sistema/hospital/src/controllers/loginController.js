import Usuarios from "../models/UsuarioModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Medicos from "../models/MedicosModel.js";
import Enfermeiros from "../models/EnfermeirosModel.js";
import Paciente from "../models/PacienteModel.js";



const login = async(req, res) => { 
    try {
        const {email, password} = req.body;

        if(!email || !password){
            throw new Error("algo esta faltando")
        }

        let UsuariosExistente = await Usuarios.findOne({
            where: {
                email
            }
        });

        if(!UsuariosExistente){
            UsuariosExistente = await Medicos.findOne({
            where: {
                email
            }
          });
        }

        if(!UsuariosExistente){
                        UsuariosExistente = await Enfermeiros.findOne({
                        where: {
                                email
                        }
                    });
                }

                if(!UsuariosExistente){
            UsuariosExistente = await Paciente.findOne({
            where: {
                email
            }
          });
        }

                if (!UsuariosExistente || !(await bcrypt.compare(password, UsuariosExistente.passwordHash))) {
            return res.status(400).send({
                type: 'error',
                message: 'email ou senha incorretos'
            })
        }

        const usuarioTipo = UsuariosExistente instanceof Paciente
            ? 'paciente'
            : UsuariosExistente instanceof Medicos
                ? 'medico'
                : UsuariosExistente instanceof Enfermeiros
                    ? 'enfermeiro'
                    : 'usuario';


        const token= jwt.sign(
            {
                idUsuario: UsuariosExistente.id,
                nomeUsuarios: UsuariosExistente.nome,
                emailUsuarios: UsuariosExistente.email,
                perfilId: UsuariosExistente.perfilId,
                idperfil: UsuariosExistente.perfilId
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
    login,
    getUserByToken
    
};