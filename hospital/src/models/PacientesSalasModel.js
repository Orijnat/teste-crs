import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Sala from "./SalaModel.js";
import Paciente from "./PacienteModel.js";  


const PacienteSala = sequelize.define(
    'pacientes_salas',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dataEntrada:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        dataSaida:{
            type: DataTypes.DATE,
            allowNull:true,
        }
    },
{
    freezeTableName: true,
    timestamps: false
}
);

    PacienteSala.belongsTo(Sala, 
        { 
            as: 'sala',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idSala',
                allowNull: false,
                field: 'id_sala'
            }
        }
    );

    PacienteSala.belongsTo(Paciente,
        {
            as: 'paciente',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idPaciente',
                allowNull: false,
                field: 'id_paciente'
            }
        });



export default PacienteSala;