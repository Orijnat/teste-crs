import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Kit from "./KitsModel.js";
import Sala from "./SalaModel.js";
import Enfermeiros from "./EnfermeirosModel.js";
import Medico from "./MedicosModel.js";

const Procedimentos = sequelize.define(
    'procedimentos', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false 
    });

    Procedimentos.belongsTo(Kit,
    {
        as: 'kit',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: {
            name: 'idKit',
            allowNull: false,
            field: 'id_kit'
        }
    }
);
    Procedimentos.belongsTo(Sala,
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
    Procedimentos.belongsTo(Enfermeiros,
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
    Procedimentos.belongsTo(Medico,
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

export default Procedimentos;