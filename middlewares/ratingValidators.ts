import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const createRatingValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Joi.object().keys({
    comment: Joi.string().min(0).max(50).required(),
    cleanliness_rating: Joi.string().min(0).required(),
    accuracy_rating: Joi.string().min(0).required(),
    check_in_rating: Joi.string().min(0).required(),
    communication_rating: Joi.string().min(0).required(),
    location_rating: Joi.string().min(0).required(),
    value_rating: Joi.string().min(0).required(),
    property_id: Joi.string().required(),
    user_id: Joi.string().required(),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};

export const updateRatingValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = Joi.object().keys({
    comment: Joi.string().min(0).max(50),
    cleanliness_rating: Joi.string().min(0),
    accuracy_rating: Joi.string().min(0),
    check_in_rating: Joi.string().min(0),
    communication_rating: Joi.string().min(0),
    location_rating: Joi.string().min(0),
    value_rating: Joi.string().min(0),
    property_id: Joi.string(),
    user_id: Joi.string(),
  });

  const valid = result.validate(req.body);
  if (valid.error != null) {
    return res.json({ message: valid.error.details[0].message });
  }
  next();
};
