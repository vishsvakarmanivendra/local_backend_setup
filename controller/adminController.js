import Admin from "../modal/adminModal.js"
import Vendor from "../modal/vendorModel.js";
import bcryptjs from 'bcryptjs';

export const createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findOne({where:{email:req.body.email}});
    if(!admins)
      return res.status(401).json({message:"invalid email"})
    const status=await bcryptjs.compare(req.body.password, admins.password);
    if(!status)
      return res.status(401).json({message:"invalid credential"})
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({where:{email:req.body.email}});
    if (admin) {
      const { username, email, password } = req.body;
      await admin.update({ username, email, password });
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      await admin.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingVendors = async (req, res) => {
  try {
    const pendingVendors = await Vendor.findAll({ where: { status: 'pending' } });
    return res.status(200).json(pendingVendors);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVendorStatus = async (req, res) => {
  try {
    const { vendorId, status } = req.body; 

    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.status = status;
    await vendor.save();

    return res.status(200).json({ message: `Vendor has been ${status}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
