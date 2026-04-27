import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";


const Enfermeiros = sequelize.define(
    'enfermeiros', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome: {
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
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

export default Enfermeiros;


