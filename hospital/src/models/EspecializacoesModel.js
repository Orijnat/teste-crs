import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Especializacoes = sequelize.define('especializacoes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    especializacao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Especializacoes;