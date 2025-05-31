import express from "express";
import User from "../models/user.model.js";
import { decryptOTP, sendOTP } from "../methods/sendOtp.js";

// Constants that should be moved to constants.js
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION,
  RESTRICTED_FIELDS,
  handleError
} from "../constants.js";

const router = express.Router();

// Utility to parse select fields from query
const parseSelectFields = (select) =>
  select ? select.split(",").join(" ") : "";


// Common validation for user identification
const validateUserIdentifier = (req, res) => {
  const { email, _id } = req.query || req.body;
  if (!email && !_id) {
    res.status(400).json({
      success: false,
      message: ERROR_MESSAGES.USER_IDENTIFIER_REQUIRED,
    });
    return false;
  }
  return true;
};

// Add User
router.post("/add-user", async (req, res) => {
  const user = req.body;

  if (!user?.email) {
    return res.status(400).json({
      success: false,
      message: ERROR_MESSAGES.EMAIL_REQUIRED,
    });
  }

  try {
    if (await User.exists({ email: user.email })) {
      return res.status(409).json({
        success: false,
        message: ERROR_MESSAGES.USER_EXISTS,
      });
    }

    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser,
      message: SUCCESS_MESSAGES.USER_CREATED,
    });
  } catch (error) {
    handleError(res, error, "user creation");
  }
});

// Delete User
router.delete("/user", async (req, res) => {
  if (!validateUserIdentifier(req, res)) return;

  const { email, _id } = req.query;
  const filter = email ? { email } : { _id };

  try {
    const user = await User.findOne(filter);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    await User.deleteOne(filter);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_DELETED,
    });
  } catch (error) {
    handleError(res, error, "user deletion");
  }
});

// Update User
router.patch("/user", async (req, res) => {
  if (!validateUserIdentifier(req, res)) return;

  const { email, _id } = req.query;
  const filter = email ? { email } : { _id };

  let updateData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => !RESTRICTED_FIELDS.includes(key))
  );

  if (updateData.otp) {
    const originalOtp = decryptOTP(updateData.otp);
    sendOTP(email, originalOtp);
  }

  try {
    const updatedUser = await User.findOneAndUpdate(filter, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: SUCCESS_MESSAGES.USER_UPDATED,
    });
  } catch (error) {
    handleError(res, error, "user update");
  }
});

// Get User
router.get("/user", async (req, res) => {
  if (!validateUserIdentifier(req, res)) return;

  const { email, _id, select } = req.query;
  const filter = email ? { email } : { _id };
  const selectFields = parseSelectFields(select);

  try {
    const user = await User.findOne(filter).select(selectFields);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    handleError(res, error, "user fetch");
  }
});

// Get All Users
router.get("/all-users", async (req, res) => {
  const { select } = req.query;
  const selectFields = parseSelectFields(select);

  try {
    const users = await User.find({}).select(selectFields);
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    handleError(res, error, "users fetch");
  }
});

// Static route
router.get("/resume", (req, res) => {
  res.render("resume");
});

export default router;
