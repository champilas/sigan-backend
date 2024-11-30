import { Model, DataTypes, Sequelize } from "sequelize";

const ADMINS_TABLE = "admins";

interface AdminAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const AdminSchema = {
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

class Admin extends Model<AdminAttributes> {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: ADMINS_TABLE,
            modelName: "Admin",
            timestamps: true,
        };
    }
}

export { Admin, AdminAttributes, AdminSchema, ADMINS_TABLE };
