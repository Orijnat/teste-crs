import Paciente from "../models/PacienteModel.js";


const get = async (req, res)=>{
    try{
        const dados= await Paciente.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Dados buscados com sucesso',
            data: dados
        })}catch(error){
            console.log(error);
            return res.status(500).send({
                type: 'error',
                message: 'Erro',
                data: error.message
            })
        }
}

const create= async (req, res) => {
    try {
        const { nome, idade, altura, peso } = req.body;


        const retorno = await Paciente.create({
            nome,
            idade,
            altura,
            peso
        });

        return res.status(201).send({
            type: 'success',
            message: 'Paciente criado com sucesso',
            data: retorno
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao criar paciente',
            data: error.message
        });
    }
}

const getId = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Paciente encontrado',
            data: paciente
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro na requisição',
            data: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado para exclusão',
                data: []
            });
        }

        await paciente.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Registro de paciente removido',
            data: []
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao deletar registro',
            data: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const dadosNovos = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID deve ser numérico',
                data: []
            });
        }

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            return res.status(404).send({
                type: 'error',
                message: 'Paciente não encontrado para atualização',
                data: []
            });
        }

        Object.keys(dadosNovos).forEach(campo => {
            paciente[campo] = dadosNovos[campo];
        });

        await paciente.save();

        return res.status(200).send({
            type: 'success',
            message: 'Dados do paciente atualizados com sucesso',
            data: paciente
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao atualizar paciente',
            data: error.message
        });
    }
};

export default {
    get,
    create,
    getId,
    destroy,
    update
}