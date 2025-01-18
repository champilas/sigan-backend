import { Model, DataTypes, Sequelize } from "sequelize";
import { COWS_TABLE } from "./cow.model";

const BIRTHS_TABLE = "births";

interface BirthAttributes {
  id: string;
  birthDate: Date;
  cowId: string;
  comments?: string;
  calfSex: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BirthSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  birthDate: {
    field: "birth_date",
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
  calfSex: {
    field: "calf_sex",
    type: DataTypes.ENUM("MALE", "FEMALE"),
    allowNull: false,
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

class Birth extends Model<BirthAttributes> implements BirthAttributes {
  public id!: string;
  public birthDate!: Date;
  public cowId!: string;
  public comments?: string;
  public calfSex!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.Cow, { as: "cow", foreignKey: "cowId" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: BIRTHS_TABLE,
      modelName: "Birth",
      timestamps: true,
    };
  }
}

export { BIRTHS_TABLE, BirthSchema, BirthAttributes, Birth };
