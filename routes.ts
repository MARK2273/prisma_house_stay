import express from "express";
import {
  createUser,
  createManyUser,
  updateUser,
  updateManyUser,
  findFirstUser,
  findManyUser,
  findUniqueUser,
} from "../controllers/userControllers";

import {
  createProperty,
  createManyProperties,
  updateProperty,
  updateManyProperties,
  findFirstProperty,
  findManyProperties,
  findUniqueProperty,
} from "../controllers/propertyControllers";

import {
  createPost,
  createManyPosts,
  updatePost,
  updateManyPosts,
  findFirstPost,
  findManyPosts,
  findUniquePost,
} from "../controllers/postControllers";

import {
  createRating,
  updateRating,
  deleteRating,
} from "../controllers/ratingControllers";

import {
  createRule,
  updateRule,
  deleteRule,
} from "../controllers/ruleControllers";

import { createUserValidate } from "../middlewares/userValidators";

const router = express();

//user
router.post("/createuser", createUserValidate, createUser);
router.post("/createmanyuser", createManyUser);
router.post("/updateuser/:id", createUserValidate, updateUser);
router.post("/updatemanyuser", updateManyUser);
router.post("/findfirstuser", findFirstUser);
router.post("/findmanyuser", findManyUser);
router.post("/finduniqueuser", findUniqueUser);

//property
router.post("/createproperty", createProperty);
router.post("/createmanyproperties", createManyProperties);
router.post("/updateproperty/:id", updateProperty);
router.post("/updatemanyproperties", updateManyProperties);
router.post("/findfirstproperty", findFirstProperty);
router.post("/findmanyproperties", findManyProperties);
router.post("/finduniqueproperty", findUniqueProperty);

//post
router.post("/createpost", createPost);
router.post("/createmanyposts", createManyPosts);
router.post("/updatepost/:id", updatePost);
router.post("/updatemanyposts", updateManyPosts);
router.post("/findfirstpost", findFirstPost);
router.post("/findmanyposts", findManyPosts);
router.post("/finduniquepost", findUniquePost);

//rating
router.post("/createrating", createRating);
router.post("/updaterating/:id", updateRating);
router.delete("/deleterating/:id", deleteRating);

//rules
router.post("/createrule", createRule);
router.post("/updaterule/:id", updateRule);
router.delete("/deleterule/:id", deleteRule);
export default router;
