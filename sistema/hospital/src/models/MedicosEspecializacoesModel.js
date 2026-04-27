import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Medico from "./MedicosModel.js";
import Especializacoes from "./EspecializacoesModel.js";

const MedicosEspecializacoes = sequelize.define(
    'medicos_especializacoes',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

    },
    {  
        freezeTableName: true,
        timestamps: false
    }
);

    MedicosEspecializacoes.belongsTo(Medico, 
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

    MedicosEspecializacoes.belongsTo(Especializacoes,
        {
            as: 'especializacao',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idEspecializacao',
                allowNull: false,
                field: 'id_especializacao'
            }
        }
    );

export default MedicosEspecializacoes;