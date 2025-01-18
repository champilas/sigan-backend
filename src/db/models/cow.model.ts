import { Model, DataTypes, Sequelize } from "sequelize";
import { HERDS_TABLE } from "./herd.model";

const COWS_TABLE = "cows";

interface CowAttributes {
  id: string;
  name: string;
  breed?: string;
  birthDate?: Date;
  herdId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CowSchema = {
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
  breed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    field: "birth_date",
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  herdId: {
    field: "herd_id",
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: HERDS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
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

class Cow extends Model<CowAttributes> implements CowAttributes {
  public id!: string;
  public name!: string;
  public breed?: string | undefined;
  public birthDate?: Date | undefined;
  public herdId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.Herd, { as: "herd", foreignKey: "herdId" });
    this.hasMany(models.Service, { as: "services", foreignKey: "cowId" });
    this.hasMany(models.Birth, { as: "births", foreignKey: "cowId" });
    this.hasMany(models.Heat, { as: "heats", foreignKey: "cowId" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: COWS_TABLE,
      modelName: "Cow",
      timestamps: true,
    };
  }
}

export { COWS_TABLE, CowSchema, CowAttributes, Cow };
