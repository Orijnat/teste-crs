import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Kits = sequelize.define(
    'kits',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nome:{
            type: DataTypes.STRING(100),
            allowNull:false,
        },

        quantidade:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Kits;