import Perfil from "../models/PerfilModel.js";

export const criarPerfisPadroes = async () => {
    try {
        // Verificar se os perfis já existem
        const perfilAdmin = await Perfil.findOne({ where: { nome: 'Administrador' } });
        const perfilMedico = await Perfil.findOne({ where: { nome: 'Medico' } });
        const perfilEnfermeiro = await Perfil.findOne({ where: { nome: 'Enfermeiro' } });

        if (!perfilAdmin) {
            await Perfil.create({
                nome: 'Administrador',
                descricao: 'Administrador do sistema',
                nivelAcesso: 1
            });
            console.log('✓ Perfil Administrador criado');
        }

        if (!perfilMedico) {
            await Perfil.create({
                nome: 'Medico',
                descricao: 'Médico do hospital',
                nivelAcesso: 2
            });
            console.log('✓ Perfil Médico criado');
        }

        if (!perfilEnfermeiro) {
            await Perfil.create({
                nome: 'Enfermeiro',
                descricao: 'Enfermeiro do hospital',
                nivelAcesso: 3
            });
            console.log('✓ Perfil Enfermeiro criado');
        }
    } catch (error) {
        console.error('Erro ao criar perfis:', error);
    }
};

export default criarPerfisPadroes;
