import Perfil from "../models/PerfilModel.js";

const get = async (req, res) => {
    try {
        const dados = await Perfil.findAll();

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

const create = async (req, res) => {
    try {
        const { nome, descricao, nivelAcesso } = req.body;

        if (!nome || !nivelAcesso) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos obrigatórios: nome, nivelAcesso',
                data: []
            });
        }

        // Verificar se o perfil já existe
        const perfilExistente = await Perfil.findOne({
            where: { nome }
        });

        if (perfilExistente) {
            return res.status(400).send({
                type: 'error',
                message: 'Perfil com este nome já existe',
                data: []
            });
        }

        const retorno = await Perfil.create({
            nome,
            descricao,
            nivelAcesso
        });

        return res.status(201).send({
            type: 'success',
            message: 'Perfil criado com sucesso',
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
};

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

        const dados = await Perfil.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Perfil não encontrado',
                data: []
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Perfil encontrado com sucesso',
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

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, descricao, nivelAcesso } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Perfil.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Perfil não encontrado',
                data: []
            });
        }

        // Verificar se outro perfil já tem este nome
        if (nome && nome !== dados.nome) {
            const perfilExistente = await Perfil.findOne({
                where: { nome }
            });
            if (perfilExistente) {
                return res.status(400).send({
                    type: 'error',
                    message: 'Perfil com este nome já existe',
                    data: []
                });
            }
        }

        await dados.update({
            nome: nome || dados.nome,
            descricao: descricao || dados.descricao,
            nivelAcesso: nivelAcesso || dados.nivelAcesso
        });

        return res.status(200).send({
            type: 'success',
            message: 'Perfil atualizado com sucesso',
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

const delete_perfil = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'ID inválido',
                data: []
            });
        }

        const dados = await Perfil.findByPk(id);

        if (!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Perfil não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Perfil deletado com sucesso',
            data: []
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
    get,
    create,
    getId,
    update,
    delete_perfil
};
