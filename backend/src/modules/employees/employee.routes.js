import express from 'express';
import { createEmployee, getEmployees } from './employee.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { restrictTo } from '../../middleware/permission.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.route('/')
  .get(getEmployees)
  .post(restrictTo('Admin', 'SuperAdmin', 'HR_Manager'), createEmployee);

export default router;
