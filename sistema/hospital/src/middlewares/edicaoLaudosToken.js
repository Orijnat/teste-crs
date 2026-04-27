import Medicos from "../models/MedicosModel.js"
import jwt from "jsonwebtoken"


const verifyMedico = async(req, res, next) => {
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

        console.log(decoded)

        const medicoExiste = await Medicos.findOne({ where: { id: decoded.idMedico}});

        if(!medicoExiste){
            return res.status(403).send({
                type: 'error',
                message: "medico nao autenticado ou nao existente",
                data:[]
            })
        }

        req.idMedicoLogado = decoded.idMedico;

        next();

    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! ocorreu um erro',
            data: error.message,
        });
    }
}

export default verifyMedico

