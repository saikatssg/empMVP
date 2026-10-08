import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../users/user.model.js';
import { sendEmail } from '../../utils/mailer.js';

export const loginInitiate = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+passwordHash');
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash OTP before saving to DB
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    
    user.authOtp = hashedOtp;
    user.authOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Your 2FA Login Code',
      text: `Your verification code is: ${otp}. It expires in 10 minutes.`
    });

    res.status(200).json({ 
      message: 'Step 1 complete. 2FA code sent to your registered device/email.',
      requires2FA: true,
      username: user.username,
      email: user.email // sending email back so frontend knows where OTP went
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginVerify = async (req, res) => {
  try {
    const { username, otp } = req.body;
    
    const user = await User.findOne({ username }).select('+authOtp +authOtpExpires');
    if (!user) return res.status(401).json({ message: 'Invalid request' });

    const hashedInputOtp = crypto.createHash('sha256').update(otp).digest('hex');
    
    if (user.authOtp !== hashedInputOtp || user.authOtpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired 2FA code' });
    }

    // Clear OTP fields
    user.authOtp = undefined;
    user.authOtpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' } // Token auto-expires after 24 hours
    );
    
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge: 24 * 60 * 60 * 1000 // 24 hours session timeout
    });
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(200).json({ message: 'If the email exists, a reset link was sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Recovery Request',
      text: `Click here to securely reset your password: ${resetUrl}`
    });

    res.status(200).json({ message: 'If the email exists, a reset link was sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCredentials = async (req, res) => {
  try {
    const { newPassword, otp } = req.body;
    
    const hashedInputOtp = crypto.createHash('sha256').update(otp).digest('hex');
    
    const user = await User.findById(req.user._id).select('+authOtp +authOtpExpires');
    if (!user || user.authOtp !== hashedInputOtp || user.authOtpExpires < Date.now()) {
      return res.status(403).json({ message: 'Update failed: Invalid verification code.' });
    }

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    
    user.authOtp = undefined;
    user.authOtpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Credentials updated successfully. Next login will require the new password.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const triggerUpdateOtp = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    
    user.authOtp = hashedOtp;
    user.authOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Security Update Verification Code',
      text: `Your verification code to update your credentials is: ${otp}. It expires in 10 minutes.`
    });

    res.status(200).json({ message: 'Verification code sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deactivateAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.isActive = false;
    await user.save();
    
    res.status(200).json({ message: 'Account deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
