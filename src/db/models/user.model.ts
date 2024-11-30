import { Model, DataTypes, Sequelize } from "sequelize";

const USERS_TABLE = "users";

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    taxId: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taxId: {
        field: "tax_id",
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "USER",
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

class User extends Model<UserAttributes> {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public taxId!: string;
    public role!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    static associate(models: any) {
    }

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: USERS_TABLE,
            modelName: "User",
            timestamps: true,
        };
    }
}

export { User, UserAttributes, UserSchema, USERS_TABLE };
