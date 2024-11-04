import Vendor from "../modal/vendorModel.js";
import bcryptjs from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validations } from "../utils/utility.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', 'public', 'vendor');

export const signIn = async (req, res) => {
  await validations(req);
  try {
    const vendor = await Vendor.findOne({ where: { email: req.body.email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.status !== 'approved') {
      return res.status(403).json({ message: "Your account is not yet approved by admin" });
    }

    const isPasswordValid = await bcryptjs.compare(req.body.password, vendor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Sign-in successful", vendor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signUp = async (req, res) => {
  await validations(req);
  let file = await (req.file) ? req.file.filename : null;
  req.body.profilePhoto = file;
  try {
    const existingVendor = await Vendor.findOne({ where: { email: req.body.email } });

    if (existingVendor) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    req.body.status = 'pending';

    const newVendor = await Vendor.create(req.body);

    return res.status(201).json({
      message: "Signup request submitted. Awaiting admin approval.",
      vendor: newVendor
    });
  } catch (err) {
    if (file) {
      fs.unlink(`${filePath}/${file}`, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req, res) => {
  await validations(req);
  let file = await (req.file) ? req.file.filename : null;
  req.body.profilePhoto = file;
  try {
    const { email } = req.body;

    const vendor = await Vendor.findOne({ where: { email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.status !== 'approved') {
      return res.status(403).json({ message: "You can only update your profile after admin approval." });
    }

    if (req.body.password) {
      const salt = await bcryptjs.genSalt(10);
      req.body.password = await bcryptjs.hash(req.body.password, salt);
    }
    fs.unlink(`${filePath}/${vendor.profilePhoto}`, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting file:", unlinkErr);
      }
    });
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'currentLocation', 'categories', 'workExperience', 'description', 'profilePhoto', 'serviceArea', 'toolsAvailable', 'password'];
    const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));

    updates.forEach(update => vendor[update] = req.body[update]);

    await vendor.save();

    return res.status(200).json({ message: "Vendor updated successfully", vendor });
  } catch (err) {
    if (file) {
      fs.unlink(`${filePath}/${file}`, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ where: { email: req.query.email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ vendor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyPhoneNumber = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ where: { email: req.body.email } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const currentDate = new Date();

    if (vendor.otp === req.body.otp && currentDate < vendor.otpExpiry) {
      return res.status(200).json({ message: "Valid OTP" });
    }

    return res.status(409).json({ message: "OTP expired or invalid" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
