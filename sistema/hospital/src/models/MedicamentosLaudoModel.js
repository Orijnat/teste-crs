import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize"; 
import Medicamento from "./MedicamentoModel.js";
import Laudos from "./LaudosModel.js";

const MedicamentosLaudo = sequelize.define('medicamentos_laudo',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

    MedicamentosLaudo.belongsTo(Medicamento,
        {
            as: 'medicamento',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
            foreignKey: {
                name: 'idMedicamento',
                allowNull: false,
                field: 'id_medicamento'
            }
        }
    );

    MedicamentosLaudo.belongsTo(Laudos,
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

export default MedicamentosLaudo;
