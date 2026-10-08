import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Employee from './employee.model.js';
import User from '../users/user.model.js';
import Department from '../departments/department.model.js';

export const createEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, role, firstName, lastName, phone, departmentId, managerId } = req.body;

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const [newUser] = await User.create([{ email, passwordHash, role: role || 'Employee' }], { session });

    const [newEmployee] = await Employee.create([{
      userId: newUser._id,
      firstName,
      lastName,
      phone,
      departmentId,
      managerId: managerId || null
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Employee provisioned successfully',
      employee: newEmployee
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: 'Failed to create employee', error: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const { search, department, managerId } = req.query;
    const query = {};

    if (department) query.departmentId = department;
    if (managerId) query.managerId = managerId;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    const employees = await Employee.find(query)
      .populate('departmentId', 'name budgetCode')
      .populate('managerId', 'firstName lastName')
      .populate('userId', 'email role isActive')
      .sort({ lastName: 1 });

    res.status(200).json({
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching employees', error: error.message });
  }
};
