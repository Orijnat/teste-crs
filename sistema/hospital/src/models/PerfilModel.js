import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Perfil = sequelize.define(
    'perfil',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nivelAcesso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Nível numérico de acesso (1-Administrativo, 2-Médico, 3-Enfermeiro)'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Perfil;
