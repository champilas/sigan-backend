import { Model, DataTypes, Sequelize } from "sequelize";
import { COWS_TABLE } from "./cow.model";

const HEATS_TABLE = "heats";

interface HeatAttributes {
  id: string;
  heatDate: Date;
  cowId: string;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const HeatSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  heatDate: {
    field: "heat_date",
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cowId: {
    field: "cow_id",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: COWS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
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

class Heat extends Model<HeatAttributes> implements HeatAttributes {
  public id!: string;
  public heatDate!: Date;
  public cowId!: string;
  public comments?: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.Cow, { as: "cow", foreignKey: "cowId" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: HEATS_TABLE,
      modelName: "Heat",
      timestamps: true,
    };
  }
}

export { HEATS_TABLE, HeatSchema, HeatAttributes, Heat };
