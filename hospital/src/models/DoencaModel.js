import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Doenca = sequelize.define(
    'doencas', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        doenca: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Doenca;