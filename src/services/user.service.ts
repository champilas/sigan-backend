import boom from "@hapi/boom";
import sequelize from "../libs/sequelize";
import { UserAttributes } from "../db/models/user.model"; // Ajusta la ruta según tu proyecto
import bcrypt from "bcrypt";

export default class UserService {
  constructor() {}

  /**
   * Crear un nuevo usuario.
   * @param data Datos del usuario (email, password, name, etc.)
   * @returns El usuario creado
   */
  public async createUser(data: Omit<UserAttributes, "id" | "createdAt" | "updatedAt">) {
    const { email, password, ...rest } = data;

    // 1) Verificar si el email ya existe
    const userExists = await sequelize.models.User.findOne({
      where: { email },
    });
    if (userExists) {
      throw boom.conflict("Email already in use");
    }

    // 2) Hashear la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3) Crear el registro
    const newUser = await sequelize.models.User.create({
      ...rest,
      email,
      password: hashedPassword,
    });
    return newUser;
  }

  /**
   * Obtener lista de todos los usuarios (paginación opcional)
   */
  public async findAll() {
    const users = await sequelize.models.User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt"], // Ajusta atributos según lo que quieras retornar
    });
    return users;
  }

  /**
   * Obtener un usuario por id
   * @param userId
   */
  public async findOne(userId: string) {
    const user = await sequelize.models.User.findByPk(userId, {
      attributes: ["id", "name", "email", "role", "createdAt"],
    });
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  /**
   * Actualizar usuario
   * @param userId
   * @param changes
   * @returns El usuario actualizado
   */
  public async updateUser(userId: string, changes: Partial<UserAttributes>) {
    const user = await sequelize.models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound("User not found");
    }

    // Si vienen cambios de password, lo hasheamos
    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }

    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  /**
   * Eliminar usuario
   * @param userId
   * @returns 
   */
  public async deleteUser(userId: string) {
    const user = await sequelize.models.User.findByPk(userId);
    if (!user) {
      throw boom.notFound("User not found");
    }
    await user.destroy();
    return { message: "User deleted", id: userId };
  }
}
