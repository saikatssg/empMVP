import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'My Dashboard', path: '/dashboard', roles: ['User', 'Employee', 'Admin', 'SuperAdmin', 'HR_Manager'], icon: 'bi-house' },
    { name: 'Directory', path: '/employees', roles: ['User', 'Employee', 'Admin', 'SuperAdmin', 'HR_Manager'], icon: 'bi-people' },
    { name: 'System Analytics', path: '/admin/dashboard', roles: ['Admin', 'SuperAdmin'], icon: 'bi-graph-up' },
  ];

  const permittedLinks = navItems.filter((item) => item.roles.includes(user?.role));

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '250px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="d-flex flex-column flex-shrink-0 p-3 glass-sidebar text-white d-none d-md-flex z-3 shadow-diffuse" 
      style={{ height: '100vh', position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3 text-white">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="fs-5 fw-bold overflow-hidden"
            >
              Apple IN EMS
            </motion.span>
          )}
        </AnimatePresence>
        <button 
          className="btn btn-sm btn-link text-white shadow-none p-0 m-0" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`bi fs-4 ${isCollapsed ? 'bi-list' : 'bi-chevron-left'}`}></i>
        </button>
      </div>
      
      <hr className="mt-0 opacity-25" />
      
      <ul className="nav nav-pills flex-column mb-auto gap-2 mt-2">
        {permittedLinks.map((link, i) => (
          <motion.li 
            key={link.path} 
            className="nav-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
          >
            <NavLink 
              to={link.path} 
              className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 ${isActive ? 'bg-primary shadow-sm' : ''}`}
              style={{ padding: isCollapsed ? '10px 14px' : '10px 20px', transition: 'all 0.2s' }}
              title={isCollapsed ? link.name : ''}
            >
              <i className={`bi ${link.icon} fs-5`}></i>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </motion.li>
        ))}
      </ul>
      
      {/* Quick Actions Panel (Admin/HR Only) */}
      {['Admin', 'HR_Manager', 'SuperAdmin'].includes(user?.role) && (
        <div className="mb-4 d-flex flex-column gap-2 px-1">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-uppercase small fw-bold text-secondary mb-1 letter-spacing-1 overflow-hidden"
              >
                Quick Actions
              </motion.div>
            )}
          </AnimatePresence>
          
          <NavLink 
            to="/employees"
            className={`btn btn-sm btn-outline-light border-0 text-start d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'gap-2'} rounded-3 py-2`}
            title={isCollapsed ? 'Add Staff' : ''}
            style={{ background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}
          >
            <i className={`bi bi-person-plus-fill text-success fs-6`}></i>
            {!isCollapsed && <span className="fw-semibold text-white">Add Staff</span>}
          </NavLink>
          
          <button 
            onClick={() => alert("Payroll module coming soon!")}
            className={`btn btn-sm btn-outline-light border-0 text-start d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'gap-2'} rounded-3 py-2`}
            title={isCollapsed ? 'Run Payroll' : ''}
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <i className={`bi bi-cash-stack text-warning fs-6`}></i>
            {!isCollapsed && <span className="fw-semibold text-white">Run Payroll</span>}
          </button>
        </div>
      )}

      {/* Logout Button */}
      <div className="mt-auto pt-3 px-1">
        <button 
          onClick={async () => { await logout(); navigate('/login'); }}
          className={`btn btn-sm w-100 border-0 text-start d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'gap-2'} rounded-3 py-2`}
          title={isCollapsed ? 'Logout' : ''}
          style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#ff6b6b' }}
        >
          <i className="bi bi-box-arrow-left fs-6"></i>
          {!isCollapsed && <span className="fw-semibold">Logout</span>}
        </button>
      </div>

      <hr className="opacity-25 mb-3 mt-3" />
      <div className="small text-secondary d-flex flex-column align-items-center text-center">
        {isCollapsed ? (
          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            Logged in as: <br/>
            <span className="text-white fw-semibold d-block text-truncate" style={{ maxWidth: '180px' }}>{user?.email}</span>
            <span className="badge bg-secondary mt-2 w-100">{user?.role}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
