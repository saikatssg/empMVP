import { useState, useEffect } from 'react';
import { getEmployees } from '../employee.service';
import { useAuth } from '../../../context/AuthContext';
import { deactivateUser } from '../../auth/auth.service';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 } // Faster stagger for rapid scanning
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } } // Under 300ms rule
};

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user } = useAuth();

  const fetchDirectory = async (search = '') => {
    try {
      setLoading(true);
      const data = await getEmployees(search);
      setEmployees(data.data); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDirectory(searchTerm);
  };

  const handleDeactivate = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this account?')) {
      try {
        await deactivateUser(userId);
        fetchDirectory(searchTerm); // Refresh the list
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to deactivate user');
      }
    }
  };

  const handleRoleChange = (empName, currentRole) => {
    const roles = ['Employee', 'HR_Manager', 'Admin'];
    const newRole = window.prompt(`Change role for ${empName} (Current: ${currentRole}).\nType one of: Employee, HR_Manager, Admin`);
    if (newRole && roles.includes(newRole)) {
      alert(`Role for ${empName} successfully upgraded to ${newRole}! (This is a frontend demonstration)`);
      // In production, you would call a backend PATCH endpoint here.
    } else if (newRole) {
      alert('Invalid role specified.');
    }
  };

  return (
    <div className="container-fluid py-2">
      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onEmployeeAdded={() => fetchDirectory(searchTerm)} 
      />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold text-dark">Employee Directory</h2>
        {user?.role === 'Admin' && (
          <button className="btn btn-primary rounded-pill shadow-sm fw-semibold" onClick={() => setIsModalOpen(true)}>
            <i className="bi bi-person-plus me-2"></i>
            Add Employee
          </button>
        )}
      </div>

      <div className="card shadow-sm border-0" style={{ borderRadius: '18px' }}>
        <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '18px', borderTopRightRadius: '18px' }}>
          <h5 className="mb-0 text-secondary fw-semibold">All Staff</h5>
          
          <form onSubmit={handleSearch} className="d-flex" style={{ maxWidth: '300px' }}>
            <div className="input-group input-group-sm">
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="Search name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-light border-0 bg-light" type="submit">
                <i className="bi bi-search text-secondary"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="card-body p-0">
          {loading && (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger m-3 border-0" style={{ borderRadius: '12px' }} role="alert">
              {error}
            </div>
          )}

          {!loading && !error && employees.length === 0 && (
            <div className="text-center p-5 text-muted">
              No employees found matching your criteria.
            </div>
          )}

          {!loading && !error && employees.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 border-0">
                <thead className="table-light text-secondary">
                  <tr>
                    <th className="ps-4 border-0">Name</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Department</th>
                    <th className="border-0">Manager</th>
                    <th className="text-end pe-4 border-0">Actions</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {employees.map((emp) => (
                    <motion.tr key={emp._id} variants={itemVariants}>
                      <td className="ps-4 border-0">
                        <div className="d-flex align-items-center py-2">
                          <img 
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${emp.firstName}${emp.lastName}&backgroundColor=e2e8f0`} 
                            alt="Avatar" 
                            className="rounded-circle me-3 shadow-sm"
                            style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                          />
                          <div>
                            <div className="fw-bold text-dark">{emp.firstName} {emp.lastName}</div>
                            {emp.userId?.role === 'Admin' && (
                              <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill mt-1" style={{ fontSize: '0.7em' }}>
                                Admin
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="border-0 text-secondary">
                        {emp.userId?.email}
                      </td>
                      <td className="border-0">
                        <span className="badge bg-light text-dark rounded-pill border">
                          {emp.departmentId?.name || 'Unassigned'}
                        </span>
                      </td>
                      <td className="border-0 text-secondary">
                        {emp.managerId 
                          ? `${emp.managerId.firstName} ${emp.managerId.lastName}` 
                          : '--'}
                      </td>
                      <td className="text-end pe-4 border-0">
                        <button className="btn btn-sm btn-light rounded-pill border me-2 text-primary fw-semibold">
                          View
                        </button>
                        {user?.role === 'Admin' && (
                          <>
                            <button className="btn btn-sm btn-light rounded-pill border text-warning fw-semibold me-2" onClick={() => handleRoleChange(emp.firstName, emp.userId?.role)}>
                              Upgrade
                            </button>
                            <button className="btn btn-sm btn-light rounded-pill border text-danger fw-semibold" onClick={() => handleDeactivate(emp.userId._id)}>
                              Deactivate
                            </button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
