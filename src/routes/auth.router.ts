// src/routes/auth.router.ts
import { Router, Request, Response, NextFunction } from "express";
import validatorHandler from "../middlewares/validator.handler";
import {
  signupSchema,
  loginSchema,
  adminLoginSchema,
} from "../schemas/auth.schema";
import AuthService from "../services/auth.service";

const route = Router();
const authService = new AuthService();

export default (app: Router) => {
  app.use("/auth", route);

  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Authentication endpoints
   */

  /**
   * @swagger
   * /auth/signup:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthSignup'
   *     responses:
   *       201:
   *         description: User created, returns JWT token
   */
  route.post(
    "/signup",
    validatorHandler(signupSchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, password, role } = req.body;
        const result = await authService.signup({ name, email, password, role });
        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: User login
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthLogin'
   *     responses:
   *       200:
   *         description: Returns JWT token
   */
  route.post(
    "/login",
    validatorHandler(loginSchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );

  /**
   * @swagger
   * /auth/login-admin:
   *   post:
   *     summary: Admin login
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthLogin'
   *     responses:
   *       200:
   *         description: Returns JWT token for admin
   */
  route.post(
    "/login-admin",
    validatorHandler(adminLoginSchema, "body"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const result = await authService.loginAdmin(email, password);
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );
};
