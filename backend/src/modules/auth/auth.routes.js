import express from 'express';
import { loginInitiate, loginVerify, getMe, logout, forgotPassword, resetPassword, updateCredentials, triggerUpdateOtp, deactivateAccount } from './auth.controller.js';
import { protectRoute } from '../../middleware/auth.middleware.js';
import { restrictTo } from '../../middleware/permission.middleware.js';

const router = express.Router();

router.post('/login', loginInitiate);
router.post('/verify-otp', loginVerify);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protectRoute, getMe);

// Protected update routes
router.post('/trigger-update-otp', protectRoute, triggerUpdateOtp);
router.put('/update-credentials', protectRoute, updateCredentials);

// Admin only routes
router.put('/deactivate/:userId', protectRoute, restrictTo('Admin', 'SuperAdmin', 'HR_Manager'), deactivateAccount);

export default router;
