// src/services/auth.service.ts

import boom from "@hapi/boom";
import sequelize from "../libs/sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config/config"; // Ajusta según tu proyecto
import UserService from "./user.service";

export default class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Signup: crea un nuevo usuario en la BD y retorna el JWT
   */
  public async signup(data: { name: string; email: string; password: string; role?: string }) {
    // Usamos el userService para crear el usuario
    const user = await this.userService.createUser(data);

    // Generar token
    const token = this.generateToken(user.id, user.role);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    };
  }

  /**
   * Login para usuarios existentes
   */
  public async loginUser(email: string, password: string) {
    const userRecord = await sequelize.models.User.findOne({ where: { email } });
    if (!userRecord) {
      throw boom.unauthorized("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, userRecord.password);
    if (!isMatch) {
      throw boom.unauthorized("Invalid credentials");
    }
    const token = this.generateToken(userRecord.id, userRecord.role);
    return {
      token,
      user: {
        id: userRecord.id,
        email: userRecord.email,
        role: userRecord.role,
        name: userRecord.name,
      },
    };
  }

  /**
   * Login para admins
   */
  public async loginAdmin(email: string, password: string) {
    const adminRecord = await sequelize.models.User.findOne({
      where: { email, role: "ADMIN" },
    });
    if (!adminRecord) {
      throw boom.unauthorized("Not an admin or invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, adminRecord.password);
    if (!isMatch) {
      throw boom.unauthorized("Invalid credentials");
    }
    const token = this.generateToken(adminRecord.id, adminRecord.role);
    return {
      token,
      admin: {
        id: adminRecord.id,
        email: adminRecord.email,
        role: adminRecord.role,
        name: adminRecord.name,
      },
    };
  }

  private generateToken(userId: string, role: string) {
    const payload = { sub: userId, role };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
  }
}
