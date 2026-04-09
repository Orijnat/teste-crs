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
    }
}, {
    freezeTableName: true,
    timestamps: false
});


export default Medico;