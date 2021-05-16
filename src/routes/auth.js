// importing modules
const { validateRequest } = require("@coders2authority/bus-common");
const express = require("express");
const { body } = require("express-validator");

// importing user defined controller modules
const authController = require("../controllers/auth");

// importing user defined schema modules
const Operator = require("../models/operator");
const Passenger = require("../models/passenger");

// initializing router
const router = express.Router();

// POST /auth/operator/signup
router.post(
  "/operator/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email!")
      .custom((value, { req }) => {
        return Operator.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "your email address already exist in our system!"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().not().isEmpty(),
  ],
  validateRequest,
  authController.signupOperator
);

// POST /auth/passenger/signup
router.post(
  "/passenger/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email!")
      .custom((value, { req }) => {
        return Passenger.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "your email address already exist in our system!"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().not().isEmpty(),
  ],
  validateRequest,
  authController.signupPassenger
);

// POST /auth/operator/signin
router.post(
  "/operator/signin",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email!")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
  ],
  validateRequest,
  authController.signinOperator
);

// POST /auth/passenger/signin
router.post(
  "/passenger/signin",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email!")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
  ],
  validateRequest,
  authController.signinPassenger
);

// POST /auth/admin/signin
router.post(
  "/admin/signin",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email!")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
  ],
  validateRequest,
  authController.signinAdmin
);

// exporting the router
module.exports = router;
