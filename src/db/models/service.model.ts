import { Model, DataTypes, Sequelize } from "sequelize";
import { COWS_TABLE } from "./cow.model";

const SERVICES_TABLE = "services";

interface ServiceAttributes {
  id: string;
  serviceType: string;
  reference?: string;
  serviceDate?: Date;
  cowId: string;
  comments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  serviceType: {
    field: "service_type",
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serviceDate: {
    field: "service_date",
    type: DataTypes.DATEONLY,
    allowNull: true,
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

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: string;
  public serviceType!: string;
  public reference?: string;
  public serviceDate?: Date;
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
      tableName: SERVICES_TABLE,
      modelName: "Service",
      timestamps: true,
    };
  }
}

export { SERVICES_TABLE, ServiceSchema, ServiceAttributes, Service };
