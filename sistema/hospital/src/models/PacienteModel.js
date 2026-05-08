import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Perfil from "./PerfilModel.js";

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
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false
        },

        perfilId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'perfil',
                key: 'id'
            }
        },
        
        passwordHash:{
                type: DataTypes.STRING,
                allownull: false
            } 
    },
    {
        freezeTableName: true,
        timestamps: false 
    }
);

Paciente.belongsTo(Perfil, {
    as: 'perfil',
    foreignKey: 'perfilId'
});

    export default Paciente;



