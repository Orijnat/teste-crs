import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define(
    'usuario', 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        email:{
            type: DataTypes.varchar(),
            allowNull:false,
            unique: true
        },

        nome:{
            type: DataTypes.varchar(),
            allowNull: false
        },

        passwordHash:{
            type: DataTypes.varchar(),
            allownull: false
        }
    },
);

export default Triagem;