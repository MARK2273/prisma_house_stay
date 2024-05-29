import express from "express";
import {
  createUser,
  createManyUser,
  updateUser,
  updateManyUser,
  findFirstUser,
  findManyUser,
  findUniqueUser,
  UserUpsert,
  renderCreateUser,
  renderUpdateUser,
  renderFindFirstUser,
  renderFindManyUsers,
  renderFindUniqueUser,
} from "../controllers/userControllers";

import {
  createProperty,
  createManyProperties,
  updateProperty,
  updateManyProperties,
  findFirstProperty,
  findManyProperties,
  findUniqueProperty,
  deleteProperty,
  renderCreateProperty,
  renderUpdateProperty,
  renderFindFirstProperty,
  renderFindManyProperties,
  renderFindUniqueProperty,
} from "../controllers/propertyControllers";

import {
  createPost,
  createManyPosts,
  updatePost,
  updateManyPosts,
  findFirstPost,
  findManyPosts,
  findUniquePost,
  renderCreatePost,
  renderUpdatePost,
  renderFindFirstPost,
  renderFindManyPosts,
  renderFindUniquePost,
} from "../controllers/postControllers";

import {
  createRating,
  updateRating,
  deleteRating,
  findManyRatings,
  renderCreateRating,
  renderUpdateRating,
} from "../controllers/ratingControllers";

import {
  createRule,
  updateRule,
  deleteRule,
  findManyRules,
  renderCreateRule,
  renderUpdateRule,
} from "../controllers/ruleControllers";

import {
  createUserValidate,
  updateUserValidate,
} from "../middlewares/userValidators";
import {
  createPropertyValidate,
  updatePropertyValidate,
} from "../middlewares/propertyValidators";
import {
  createPostValidate,
  updatePostValidate,
} from "../middlewares/postValidators";
import {
  createRatingValidate,
  updateRatingValidate,
} from "../middlewares/ratingValidators";
import {
  createRuleValidate,
  updateRuleValidate,
} from "../middlewares/ruleValidators";

const router = express();

// User Routes
router.get("/users/create", renderCreateUser);
router.post("/users/create", createUserValidate, createUser);
router.get("/users/update/:id", renderUpdateUser);
router.post("/users/update/:id", updateUserValidate, updateUser);
router.get("/users/first", renderFindFirstUser);
router.post("/users/first", findFirstUser);
router.get("/users/many", renderFindManyUsers);
router.post("/users/many", findManyUser);
router.get("/users/unique", renderFindUniqueUser);
router.post("/users/unique", findUniqueUser);

// Property Routes
router.get("/properties/create", renderCreateProperty);
router.post("/properties/create", createPropertyValidate, createProperty);
router.get("/properties/update/:id", renderUpdateProperty);
router.post("/properties/update/:id", updatePropertyValidate, updateProperty);
router.get("/properties/first", renderFindFirstProperty);
router.post("/properties/first", findFirstProperty);
router.get("/properties/many", renderFindManyProperties);
router.post("/properties/many", findManyProperties);
router.get("/properties/unique", renderFindUniqueProperty);
router.post("/properties/unique", findUniqueProperty);

// Post Routes
router.get("/posts/create", renderCreatePost);
router.post("/posts/create", createPostValidate, createPost);
router.get("/posts/update/:id", renderUpdatePost);
router.post("/posts/update/:id", updatePostValidate, updatePost);
router.get("/posts/first", renderFindFirstPost);
router.post("/posts/first", findFirstPost);
router.get("/posts/many", renderFindManyPosts);
router.post("/posts/many", findManyPosts);
router.get("/posts/unique", renderFindUniquePost);
router.post("/posts/unique", findUniquePost);

// Rating Routes
router.get("/ratings/create", renderCreateRating);
router.post("/ratings/create", createRatingValidate, createRating);
router.get("/ratings/update/:id", renderUpdateRating);
router.post("/ratings/update/:id", updateRatingValidate, updateRating);
router.post("/ratings/delete/:id", deleteRating);

// Rule Routes
router.get("/rules/create", renderCreateRule);
router.post("/rules/create", createRuleValidate, createRule);
router.get("/rules/update/:id", renderUpdateRule);
router.post("/rules/update/:id", updateRuleValidate, updateRule);
router.post("/rules/delete/:id", deleteRule);

export default router;
