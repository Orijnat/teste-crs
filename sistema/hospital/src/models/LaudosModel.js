import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize"; 
import Consultas from "./ConsultasModel.js";
import Medico from "./MedicosModel.js";
import Paciente from "./PacienteModel.js";

const Laudos = sequelize.define(
    'laudos',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        arquivos: {
            type: DataTypes.STRING
        }
    },
{
    freezeTableName: true,
    timestamps: false
}
);

    Laudos.belongsTo(Consultas,
        {
            as: 'consulta',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idConsulta',
                allowNull: false,
                field: 'id_consulta'
            }
        }
    );
    
    Laudos.belongsTo(Medico,
        {
            as: 'medico',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idMedico',
                allowNull: false,
                field: 'id_medico'
            }
        }
    );
    
    Laudos.belongsTo(Paciente,
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
    

export default Laudos;
