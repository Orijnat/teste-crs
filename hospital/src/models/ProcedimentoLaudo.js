import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Procedimento from "./ProcedimentosModel.js";
import Laudos from  "./LaudosModel.js";

const ProcedimentoLaudo = sequelize.define(
    'procedimento_laudo',
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

ProcedimentoLaudo.belongsTo(Procedimento,
    {
        as: 'procedimento',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: {
            name: 'idProcedimento',
            allowNull: false,
            field: 'id_procedimento'
        }
    }
);
ProcedimentoLaudo.belongsTo(Laudos,
    {
        as: 'laudo',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: {
            name: 'idLaudos',
            allowNull: false,
            field: 'id_laudos'
        }
    }
);

export default ProcedimentoLaudo;