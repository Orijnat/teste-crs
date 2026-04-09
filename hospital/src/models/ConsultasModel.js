import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Paciente from "./PacienteModel.js";
import Medico from "./MedicosModel.js";
import Sala from "./SalaModel.js";
import Triagem from "./TriagemModel.js";

const Consultas= sequelize.define(
    'consultas', 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        data:{
            type: DataTypes.DATE,
            allowNull:false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

    Consultas.belongsTo(Paciente,
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

    Consultas.belongsTo(Medico,
    {
    as: 'medico',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idMedico',
        allowNull: false,
        field: 'id_medico'
    }
});

    Consultas.belongsTo(Sala,
    {
    as: 'sala',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idSala',
        allowNull: false,
        field: 'id_sala'
    }
});

    Consultas.belongsTo(Triagem,
    {
    as: 'triagem',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idTriagem',
        allowNull: false,
        field: 'id_triagem'
    }
}); 



export default Consultas;