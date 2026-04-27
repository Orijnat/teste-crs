import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Medicamento = sequelize.define('medicamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    medicamento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    controlado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Medicamento;