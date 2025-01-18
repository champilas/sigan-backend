// src/schemas/user.schema.ts

import Joi from "joi";

// Atributos básicos que se requieren para crear un usuario
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().valid("USER", "ADMIN").default("USER"),
});

// Para actualizaciones (parciales)
export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(4).optional(),
  role: Joi.string().valid("USER", "ADMIN").optional(),
});

// Para parámetros de URL (id)
export const getUserSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
