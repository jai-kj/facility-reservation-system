const express = require("express");

const router = express.Router();

const {
	registerUser,
	loginUser,
	updateDetails,
	getLoggedInUser,
	logout,
} = require("../controllers/auth");

//* Importing middleware to protect routes
const { protect, authorize } = require("../middleware/auth");

//TODO : add protect and authorize by SUPER ADMIN to register route

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(protect, logout);
router.route("/me").get(protect, getLoggedInUser);

router.route("/updatedetails").put(protect, updateDetails);
// router.route("/updatepassword").put(protect,updatePassword);
module.exports = router;
