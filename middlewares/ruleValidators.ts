import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createRuleValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Joi.object().keys({
    rule: Joi.string().min(0).max(50).required(),
    propertyId: Joi.number().required(),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};

export const updateRuleValidate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = Joi.object().keys({
      rule: Joi.string().min(0).max(50),
      propertyId: Joi.number(),
    });
  
    const valid = result.validate(req.body);
    if (valid.error != null) {
      return res.json({ message: valid.error.details[0].message });
    }
    next();
  };