import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './modules/users/user.model.js';
import Department from './modules/departments/department.model.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  
  // Create Dept
  const dept = await Department.findOneAndUpdate(
    { name: 'Engineering' },
    { name: 'Engineering', budgetCode: 'ENG-101' },
    { upsert: true, new: true }
  );

  // Create Admin
  const email = 'admin@example.com';
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash('admin123', salt);
    await User.create({ email, passwordHash, role: 'Admin', isActive: true });
    console.log('Admin user created: admin@example.com / admin123');
  } else {
    console.log('Admin user already exists');
  }

  process.exit(0);
};

seed();
