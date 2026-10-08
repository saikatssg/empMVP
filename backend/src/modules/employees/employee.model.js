import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, unique: true }, // e.g., IT-102026-001
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, trim: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
}, { timestamps: true });

// Pre-save hook to generate the custom Employee ID
employeeSchema.pre('save', async function () {
  // Only generate ID if this is a newly created document
  if (!this.isNew) return;

  // 1. Get the Department Name
  const dept = await mongoose.model('Department').findById(this.departmentId);
  if (!dept) throw new Error('Invalid Department ID');
  
  // Format Dept Name (Remove spaces, uppercase)
  const formattedDept = dept.name.toUpperCase().replace(/\\s+/g, '');

  // 2. Get Current Month & Year (e.g., 102026)
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const monthYear = `${month}${year}`;

  // 3. Create the prefix (e.g., IT-102026-)
  const prefix = `${formattedDept}-${monthYear}-`;

  // 4. Find the last employee created in this department this month
  const lastEmployee = await this.constructor
    .findOne({ employeeId: new RegExp(`^${prefix}`) })
    .sort({ employeeId: -1 });

  // 5. Calculate Sequence (001, 002, etc.)
  let sequence = 1;
  if (lastEmployee && lastEmployee.employeeId) {
    const lastSeq = parseInt(lastEmployee.employeeId.split('-')[2], 10);
    sequence = lastSeq + 1;
  }

  // 6. Assign the final ID
  this.employeeId = `${prefix}${String(sequence).padStart(3, '0')}`;
});

// Virtual field to get full name easily in the application
employeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

employeeSchema.set('toJSON', { virtuals: true });
employeeSchema.set('toObject', { virtuals: true });

export default mongoose.model('Employee', employeeSchema);
