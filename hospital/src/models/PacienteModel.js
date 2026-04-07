import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Paciente = sequelize.define(
    'Paciente', 
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
    
        idade:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },

        altura:{
            type: DataTypes.FLOAT,
            allowNull:false,
        },

        peso:{
            type:DataTypes.FLOAT,
            allowNull:false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false 
    }
);

    export default Paciente;



