import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Paciente from "./PacienteModel.js";
import Doenca from "./DoencaModel.js";


const PacienteDoenca = sequelize.define(
    'paciente_doenca',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

    PacienteDoenca.belongsTo(Paciente, 
        {
            as: 'paciente',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'paciente_id',
                allowNull: false,
                field: 'paciente_id'
            }
        }
    );
    
    PacienteDoenca.belongsTo(Doenca,
        {
            as: 'doenca',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'doenca_id',
                allowNull: false,
                field: 'doenca_id'
            }
        }
    );

export default PacienteDoenca;