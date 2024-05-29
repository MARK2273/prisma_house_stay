import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createPostValidate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    const result = Joi.object().keys({
      propertyId: Joi.string().min(0).required(),
      title: Joi.string().min(5).max(50).required(),
      price: Joi.number().min(0).required(),
      description: Joi.string().min(10).max(150).required(),
        capacity: Joi.number().required(),
    });
  
    const valid = result.validate(req.body);
    if (valid.error != null) {
      return res.json({ message: valid.error.details[0].message });
    }
    next();
  };
  

  export const updatePostValidate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    const result = Joi.object().keys({
      propertyId: Joi.string().min(0),
      title: Joi.string().min(5).max(50),
      price: Joi.number().min(0),
      description: Joi.string().min(10).max(150),
        capacity: Joi.number(),
    });
  
    const valid = result.validate(req.body);
    if (valid.error != null) {
      return res.json({ message: valid.error.details[0].message });
    }
    next();
  };
  