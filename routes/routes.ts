import express from "express";
import {
  createUser,
  // createManyUser,
  updateUser,
  // updateManyUser,
  findFirstUser,
  findManyUser,
  findUniqueUser,
  UserUpsert,
} from "../controllers/userControllers";

import {
  createProperty,
  // createManyProperties,
  updateProperty,
  // updateManyProperties,
  findFirstProperty,
  findManyProperties,
  getAllRulesAndPosts,
  uniquePropertyDetail,
  // findUniqueProperty,
} from "../controllers/propertyControllers";

import {
  createPost,
  // createManyPosts,
  updatePost,
  // updateManyPosts,
  findFirstPost,
  findManyPosts,
  // findUniquePost,
} from "../controllers/postControllers";

import {
  createRating,
  updateRating,
  deleteRating,
  findManyRatings,
  averageRating,
} from "../controllers/ratingControllers";

import {
  createRule,
  updateRule,
  deleteRule,
  findManyRules,
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

//user
router.post("/createuser", createUserValidate, createUser);
// router.post("/createmanyuser", createUserValidate, createManyUser);
router.post("/updateuser/:id", updateUserValidate, updateUser);
// router.post("/updatemanyuser", updateUserValidate, updateManyUser);
router.get("/findfirstuser/:username", findFirstUser);
router.get("/findmanyuser", findManyUser);
router.get("/finduniqueuser/:email", findUniqueUser);

router.post("/userupsert/:id", UserUpsert); // remaining

//property
router.post("/createproperty", createPropertyValidate, createProperty);
// router.post(
//   "/createmanyproperties",
//   createPropertyValidate,
//   createManyProperties
// );
router.post("/updateproperty/:id", updatePropertyValidate, updateProperty);
// router.post(
//   "/updatemanyproperties",
//   updatePropertyValidate,
//   updateManyProperties
// );
router.get("/findfirstproperty", findFirstProperty);
router.get("/findmanyproperties", findManyProperties);
router.get("/allPropertyDetail", getAllRulesAndPosts);
router.get("/uniquepropertydetail/:id", uniquePropertyDetail);

// router.get("/finduniqueproperty", findUniqueProperty);

//post
router.post("/createpost", createPostValidate, createPost);
// router.post("/createmanyposts", createPostValidate, createManyPosts);
router.post("/updatepost/:id", updatePostValidate, updatePost);
// router.post("/updatemanyposts", updatePostValidate, updateManyPosts);
router.get("/findfirstpost", findFirstPost);
router.get("/findmanyposts", findManyPosts);
// router.get("/finduniquepost", findUniquePost);

//rating
router.post("/createrating", createRatingValidate, createRating);
router.post("/updaterating/:id", updateRatingValidate, updateRating);
router.post("/deleterating/:id", deleteRating);
router.get("/findmanyratings/:id", findManyRatings);
router.get("/avgrating/:id", averageRating);

//rules
router.post("/createrule", createRuleValidate, createRule);
router.post("/updaterule/:id", updateRuleValidate, updateRule);
router.post("/findmanyrules", findManyRules);
router.post("/deleterule/:id", deleteRule);

export default router;
