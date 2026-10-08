import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  
  // Granular Privileges
  role: { 
    type: String, 
    enum: ['SuperAdmin', 'Admin', 'HR_Manager', 'Employee', 'IT_Admin'], 
    default: 'Employee' 
  },
  permissions: [{ type: String }], // e.g., ['CAN_ADD_EMP', 'CAN_UPGRADE_CREDENTIALS']
  
  // 2FA & Security Management
  isTwoFactorEnabled: { type: Boolean, default: true }, // Forced for MVP
  twoFactorMethod: { type: String, enum: ['EMAIL', 'SMS'], default: 'EMAIL' },
  authOtp: { type: String, select: false },
  authOtpExpires: { type: Date, select: false },
  
  // Credential Recovery
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: Date, select: false },
  
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
