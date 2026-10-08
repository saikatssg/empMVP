import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from './modules/users/user.model.js';
import Employee from './modules/employees/employee.model.js';
import Department from './modules/departments/department.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/empmvp');
    console.log('Connected to DB');

    // Create Departments
    const deptNames = ['IT', 'FA', 'ECC'];
    const departments = {};
    
    for (const name of deptNames) {
      let dept = await Department.findOne({ name });
      if (!dept) {
        dept = await Department.create({ name, description: `${name} Department`, budgetCode: `BC-${name}-001` });
      }
      departments[name] = dept._id;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Password@123', salt);

    const generateUserAndEmp = async (deptName, role, fName, lName, username) => {
      // Create User
      const user = await User.create({
        username,
        email: `${username}@appleinems.com`,
        passwordHash,
        role,
        isActive: true
      });

      // Create Employee Profile
      await Employee.create({
        userId: user._id,
        firstName: fName,
        lastName: lName,
        departmentId: departments[deptName]
      });
      
      console.log(`Created ${role} for ${deptName}: ${fName} ${lName}`);
    };

    // IT Department
    await generateUserAndEmp('IT', 'Admin', 'Alice', 'Smith', 'it_admin');
    await generateUserAndEmp('IT', 'HR_Manager', 'Bob', 'Jones', 'it_hr');
    await generateUserAndEmp('IT', 'Employee', 'Charlie', 'Brown', 'it_emp1');
    await generateUserAndEmp('IT', 'Employee', 'Diana', 'Prince', 'it_emp2');

    // FA Department (Finance & Accounting)
    await generateUserAndEmp('FA', 'Admin', 'Evan', 'Wright', 'fa_admin');
    await generateUserAndEmp('FA', 'HR_Manager', 'Fiona', 'Gallagher', 'fa_hr');
    await generateUserAndEmp('FA', 'Employee', 'George', 'Miller', 'fa_emp1');
    
    // ECC Department
    await generateUserAndEmp('ECC', 'Admin', 'Hannah', 'Abbott', 'ecc_admin');
    await generateUserAndEmp('ECC', 'HR_Manager', 'Ian', 'Malcolm', 'ecc_hr');
    await generateUserAndEmp('ECC', 'Employee', 'Jack', 'Sparrow', 'ecc_emp1');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
