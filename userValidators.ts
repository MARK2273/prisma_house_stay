import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createUserValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roleType = { A: "BUYER", B: "SELLER", C: "" };

  const result = Joi.object().keys({
    username: Joi.string().min(4).max(20).required(),
    age: Joi.string().min(0).max(100).required(),
    email: Joi.string().email().required(),
    contact: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    role: Joi.string().valid(...Object.values(roleType)),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};


export const updateUserValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roleType = { A: "BUYER", B: "SELLER", C: "" };

  const result = Joi.object().keys({
    username: Joi.string().min(4).max(20),
    age: Joi.number().min(0).max(100),
    email: Joi.string().email(),
    contact: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/),
    role: Joi.string().valid(...Object.values(roleType)),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};


