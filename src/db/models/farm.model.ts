import { Model, DataTypes, Sequelize } from "sequelize";
import { USERS_TABLE } from "./user.model";

const FARMS_TABLE = "farms";

interface FarmAttributes {
  id: string;
  name: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const FarmSchema = {
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
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: USERS_TABLE,
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

class Farm extends Model<FarmAttributes> implements FarmAttributes {
  public id!: string;
  public name!: string;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    this.hasMany(models.Herd, { as: "herds", foreignKey: "farmId" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: FARMS_TABLE,
      modelName: "Farm",
      timestamps: true,
    };
  }
}

export { FARMS_TABLE, FarmSchema, FarmAttributes, Farm };
