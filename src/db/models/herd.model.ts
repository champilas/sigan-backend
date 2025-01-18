import { Model, DataTypes, Sequelize } from "sequelize";
import { FARMS_TABLE } from "./farm.model";

const HERDS_TABLE = "herds";

interface HerdAttributes {
  id: string;
  name: string;
  farmId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const HerdSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmId: {
    field: "farm_id",
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: FARMS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  createdAt: {
    field: "created_at",
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    field: "updated_at",
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Herd extends Model<HerdAttributes> implements HerdAttributes {
  public id!: string;
  public name!: string;
  public farmId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.Farm, { as: "farm", foreignKey: "farmId" });
    this.hasMany(models.Cow, { as: "cows", foreignKey: "herdId" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: HERDS_TABLE,
      modelName: "Herd",
      timestamps: true,
    };
  }
}

export { HERDS_TABLE, HerdSchema, HerdAttributes, Herd };
