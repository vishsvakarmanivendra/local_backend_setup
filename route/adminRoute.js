import express from "express"
import { createAdmin, deleteAdmin, getPendingVendors, updateVendorStatus, getAdminById, getAllAdmins, updateAdmin } from "../controller/adminController.js";
const route = express.Router();

route.post('/admins', createAdmin);
route.post('/getAdmin', getAllAdmins)
route.get('/admins/:id', getAdminById)
route.put('/update', updateAdmin)
route.delete('/admins/:id', deleteAdmin)
route.get('/vendors/pending', getPendingVendors);
route.put('/vendors/status', updateVendorStatus);

export default route;
