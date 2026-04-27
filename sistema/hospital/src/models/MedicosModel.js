import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Medico = sequelize.define('medicos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    perfilId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'perfil',
            key: 'id'
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash:{
            type: DataTypes.STRING,
            allownull: false
        }
}, {
    freezeTableName: true,
    timestamps: false
});


export default Medico;