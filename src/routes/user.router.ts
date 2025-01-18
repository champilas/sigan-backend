// src/routes/user.router.ts
import { Router, Request, Response, NextFunction } from "express";
import validatorHandler from "../middlewares/validator.handler"; 
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} from "../schemas/user.schema";
import UserService from "../services/user.service";

const route = Router();
const userService = new UserService();

export default (app: Router) => {
  // Montamos este router en /users
  app.use("/users", route);

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: CRUD de usuarios
   */

  // Crear un usuario
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       201:
   *         description: User created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  route.post(
    "/",
    validatorHandler(createUserSchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        next(error);
      }
    }
  );

  // Listar todos los usuarios
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   */
  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  // Obtener un usuario por id
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by id
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User id
   *     responses:
   *       200:
   *         description: A single user
   *       404:
   *         description: User not found
   */
  route.get(
    "/:id",
    validatorHandler(getUserSchema, "params"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const user = await userService.findOne(id);
        res.json(user);
      } catch (error) {
        next(error);
      }
    }
  );

  // Actualizar un usuario
  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Update a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserInput'
   *     responses:
   *       200:
   *         description: The updated user
   *       404:
   *         description: User not found
   */
  route.patch(
    "/:id",
    validatorHandler(getUserSchema, "params"),
    validatorHandler(updateUserSchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const changes = req.body;
        const updatedUser = await userService.updateUser(id, changes);
        res.json(updatedUser);
      } catch (error) {
        next(error);
      }
    }
  );

  // Eliminar un usuario
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *     responses:
   *       200:
   *         description: User deleted
   *       404:
   *         description: User not found
   */
  route.delete(
    "/:id",
    validatorHandler(getUserSchema, "params"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );
};
