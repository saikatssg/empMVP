import { useState } from 'react';
import { createEmployee } from '../employee.service';
import { motion, AnimatePresence } from 'framer-motion';

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'Employee'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createEmployee(formData);
      onEmployeeAdded();
      
      // Reset form
      setFormData({
        firstName: '', lastName: '', username: '', email: '', password: '', role: 'Employee'
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040, backdropFilter: 'blur(3px)' }}
            onClick={onClose}
          ></motion.div>

          {/* Slide-over Drawer (Right Edge) */}
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
            style={{ width: '450px', maxWidth: '100vw', zIndex: 1050 }}
          >
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
              <h5 className="mb-0 fw-bold">Add New Employee</h5>
              <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
            </div>
            
            <div className="p-4 flex-grow-1 overflow-auto">
              {error && <div className="alert alert-danger">{error}</div>}
              <form id="addEmployeeForm" onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-secondary">First Name</label>
                    <input type="text" className="form-control form-control-lg bg-light border-0" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-secondary">Last Name</label>
                    <input type="text" className="form-control form-control-lg bg-light border-0" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                
                <div>
                  <label className="form-label fw-semibold small text-secondary">Username</label>
                  <input type="text" className="form-control form-control-lg bg-light border-0" name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">Email Address</label>
                  <input type="email" className="form-control form-control-lg bg-light border-0" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">Temporary Password</label>
                  <input type="password" className="form-control form-control-lg bg-light border-0" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">System Role</label>
                  <select className="form-select form-select-lg bg-light border-0" name="role" value={formData.role} onChange={handleChange}>
                    <option value="Employee">Employee</option>
                    <option value="HR_Manager">HR Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="p-4 border-top bg-light d-flex gap-2 justify-content-end">
              <button type="button" className="btn btn-white border px-4 fw-semibold" onClick={onClose}>Cancel</button>
              <button type="submit" form="addEmployeeForm" className="btn btn-dark px-4 fw-semibold shadow-sm" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Save Employee'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddEmployeeModal;
