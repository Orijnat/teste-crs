import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Ala = sequelize.define(
    'Ala', 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        nome:{
            type: DataTypes.STRING(100),
            allowNull:false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Ala;