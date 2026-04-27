import Medicos from "../models/MedicosModel.js"
import jwt from "jsonwebtoken"


const verifyToken = async(req, res, next) => {
    try {
        
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        console.log(token)

        if(!token){
            return res.status(403).send({
                type: 'error',
                message: 'token sumiu',
                data:[]
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const medicoExiste = await Medicos.findOne({ where: { id: decoded.idMedico}});

        if(!medicoExiste){
            return res.status(403).send({
                type: 'error',
                message: "medico nao autenticado",
                data:[]
            })
        }

        // Verificar nível de acesso (2 = Médico, 1 = Administrador)
        if(decoded.nivelAcesso === 2 || decoded.nivelAcesso === 1){
            next();
        }
        else{
            return res.status(403).send({
                type: 'error',
                message:"nao autorizado",
                data:[]
            })
        }

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
}

export default verifyToken

