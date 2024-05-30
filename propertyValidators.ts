import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createPropertyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Joi.object().keys({
    floor: Joi.string().min(0).required(),
    bedroom: Joi.string().min(0).required(),
    kitchen: Joi.string().min(0).required(),
    living_room: Joi.string().min(0).required(),
    bathroom: Joi.string().min(0).required(),
    furnished: Joi.boolean().required(),
    address: Joi.string().min(5).max(50).required(),
    user_id: Joi.string().min(1).required(),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};

export const updatePropertyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Joi.object().keys({
    floor: Joi.number().min(0),
    bedroom: Joi.number().min(0),
    kitchen: Joi.number().min(0),
    living_room: Joi.number().min(0),
    bathroom: Joi.number().min(0),
    furnished: Joi.boolean(),
    address: Joi.string(),
    user_id: Joi.string().min(1),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};
