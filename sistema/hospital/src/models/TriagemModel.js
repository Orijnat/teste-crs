import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Paciente from "./PacienteModel.js";
import Enfermeiros from "./EnfermeirosModel.js";

const Triagem = sequelize.define(
    'triagem', 
    {
        id:{
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

    Triagem.belongsTo(Paciente,
        {
            as: 'paciente',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idPaciente',
                allowNull: false,
                field: 'id_paciente'
            }
        }
    );

    Triagem.belongsTo(Enfermeiros,
        {
            as: 'enfermeiro',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idEnfermeiro',
                allowNull: false,
                field: 'id_enfermeiro'
            }
        }
    );

export default Triagem;