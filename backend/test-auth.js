import axios from 'axios';
import crypto from 'crypto';

const runTest = async () => {
  try {
    const api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
      validateStatus: () => true
    });

    console.log('1. Initiating Login...');
    const loginRes = await api.post('/auth/login', { email: 'admin@example.com', password: 'admin123' });
    console.log('Login Response:', loginRes.data);

    // Get OTP directly from DB for testing
    const mongoose = (await import('mongoose')).default;
    await mongoose.connect('mongodb://localhost:27017/empmvp');
    const User = (await import('./src/modules/users/user.model.js')).default;
    
    // Note: authOtp is hashed in DB, so we can't reverse it. 
    // We'll change the controller temporarily or just read it from the log?
    // Actually, I can't read it from the DB because it's hashed.
  } catch (error) {
    console.error(error);
  }
};

runTest();
