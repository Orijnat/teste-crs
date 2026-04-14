import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Usuarios = sequelize.define(
    'usuario', 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },

        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },

        passwordHash:{
            type: DataTypes.STRING,
            allownull: false
        },

        nivelAcesso:{
            type: DataTypes.INTEGER,
            allownull:false
        }
    },
);

export default Usuarios;