import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Ala from "./AlaModel.js";

const Sala = sequelize.define(
    'Sala', 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        numero:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
    
    }, 
    {
        freezeTableName: true,
        timestamps: false 
    }
);

    Sala.belongsTo(Ala,
    {
    as: 'ala',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idAla',
        allowNull: false,
        field: 'id_ala'
    }
});

export default Sala;
