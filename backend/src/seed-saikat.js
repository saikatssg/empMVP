import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './modules/users/user.model.js';
import Employee from './modules/employees/employee.model.js';
import Department from './modules/departments/department.model.js';

dotenv.config();

const seedSaikat = async () => {
  await connectDB();
  
  // 1. Ensure Department
  let dept = await Department.findOne({ name: 'Engineering' });
  if (!dept) {
    dept = await Department.create({ name: 'Engineering', budgetCode: 'ENG-101' });
  }

  // 2. Create User
  const username = 'saikat';
  const email = 'saikat@example.com';
  
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log('User already exists');
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash('Saikat@1234', salt);

  const user = await User.create({ 
    username,
    email, 
    passwordHash, 
    role: 'Admin', 
    isActive: true 
  });
  
  await Employee.create({
    userId: user._id,
    firstName: 'Saikat',
    lastName: 'Sengupta',
    phone: '1234567890',
    departmentId: dept._id
  });

  console.log('Admin user Saikat Sengupta created: username: saikat / Saikat@1234');
  process.exit(0);
};

seedSaikat();
