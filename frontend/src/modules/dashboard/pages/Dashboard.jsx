import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1, 
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' }
  })
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentEmployees = [
    { id: 1, name: 'Alice Smith', role: 'IT Admin', pay: '$4,200', tax: '$630', total: '$3,570', status: 'Pending', color: 'warning' },
    { id: 2, name: 'Bob Jones', role: 'IT HR', pay: '$3,800', tax: '$570', total: '$3,230', status: 'Pending', color: 'warning' },
    { id: 3, name: 'Evan Wright', role: 'FA Admin', pay: '$4,100', tax: '$615', total: '$3,485', status: 'Approved', color: 'success' },
    { id: 4, name: 'Jack Sparrow', role: 'ECC Employee', pay: '$3,100', tax: '$465', total: '$2,635', status: 'Approved', color: 'success' },
  ];

  return (
    <div className="container-fluid py-4 px-lg-4" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
      
      {/* Header */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold text-dark mb-1">Welcome, {user?.username || 'Admin'}!</h4>
          <p className="text-secondary small m-0">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light border shadow-sm fw-semibold d-flex align-items-center gap-2 rounded-3" onClick={() => navigate('/calendar')}>
            <i className="bi bi-calendar3 text-primary"></i> Full Calendar
          </button>
          <button className="btn btn-dark rounded-3 px-4 fw-semibold shadow-sm d-flex align-items-center gap-2" onClick={() => alert("Generate New Service menu opening...")}>
            <i className="bi bi-plus-lg"></i> New Service
          </button>
        </div>
      </motion.div>

      <h5 className="fw-bold text-dark mb-3">Dashboard</h5>

      {/* 4 KPI Cards (Matching Image layout) */}
      <div className="row g-3 mb-4">
        {[ 
          { title: 'Total Employees', value: '256', icon: 'bi-people', color: 'success', bg: '#e8f3ef', trend: '+3.4% last month' },
          { title: 'Average Salary', value: '$3,256', icon: 'bi-cash', color: 'danger', bg: '#fcebe9', trend: '-2.83% last month' },
          { title: 'Total outstanding', value: '$89,235', icon: 'bi-calculator', color: 'primary', bg: '#eef4fc', trend: '+2.84% last month' },
          { title: 'Total Requests', value: '35', icon: 'bi-chat-left-text', color: 'warning', bg: '#fdf8ec', trend: '+6.42% last month' },
        ].map((stat, i) => (
          <motion.div key={i} className="col-md-6 col-xl-3" custom={i + 1} initial="hidden" animate="visible" variants={fadeUp}>
            <div className="card border-0 shadow-sm p-4 h-100 rounded-4" style={{ backgroundColor: stat.bg }}>
              <div className="d-flex align-items-start justify-content-between mb-2">
                <div className="d-flex align-items-center gap-3">
                  <div className={`bg-white text-${stat.color} rounded-circle d-flex align-items-center justify-content-center shadow-sm`} style={{ width: '40px', height: '40px' }}>
                    <i className={`bi ${stat.icon} fs-5`}></i>
                  </div>
                  <div>
                    <h3 className="fw-bold text-dark m-0">{stat.value}</h3>
                    <div className="text-secondary small fw-semibold">{stat.title}</div>
                  </div>
                </div>
              </div>
              <div className="text-secondary small mt-3 fw-medium">{stat.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        {/* Payroll History (Left Chart) */}
        <div className="col-lg-8">
          <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="mb-4">
              <h5 className="fw-bold m-0 text-dark">Payroll History</h5>
              <p className="small text-secondary m-0">Check out the total payout vs requested amount</p>
            </div>
            
            <div className="d-flex h-100 align-items-end justify-content-between position-relative px-2 pb-2" style={{ minHeight: '200px' }}>
              {/* Horizontal Grid lines */}
              <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between pb-4" style={{ zIndex: 0 }}>
                {[...Array(5)].map((_, i) => <div key={i} className="border-bottom border-light w-100" style={{ borderStyle: 'dashed !important' }}></div>)}
              </div>
              
              {/* Bars */}
              {[70, 85, 95, 50, 45, 90, 45, 10].map((val, i) => (
                <div key={i} className="d-flex flex-column align-items-center gap-2 position-relative z-1" style={{ width: '6%', height: '100%' }}>
                  <div className="w-100 d-flex flex-column justify-content-end h-100 gap-1">
                    <motion.div className="bg-success bg-opacity-25 w-100 rounded-top" initial={{ height: 0 }} animate={{ height: `${val * 0.2}%` }} transition={{ delay: 0.5 + (i * 0.05), duration: 0.6 }}></motion.div>
                    <motion.div className="bg-success w-100 rounded-bottom" initial={{ height: 0 }} animate={{ height: `${val * 0.8}%` }} transition={{ delay: 0.5 + (i * 0.05), duration: 0.6 }}></motion.div>
                  </div>
                  <span className="small fw-semibold text-secondary" style={{ fontSize: '10px' }}>0{i+1} Mar</span>
                </div>
              ))}

              {/* Side Legend */}
              <div className="position-relative z-1 ms-4 d-flex flex-column justify-content-center h-100 pb-4">
                <h5 className="fw-bold m-0 text-dark">$89,235</h5>
                <span className="small text-secondary mb-3">Total Payout</span>
                <h5 className="fw-bold m-0 text-dark">$7,263</h5>
                <span className="small text-secondary mb-4">Delayed payout</span>
                <button className="btn btn-outline-secondary btn-sm rounded-pill fw-semibold" onClick={() => navigate('/employees')}>View Full Report</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Requests Sparkline (Right Chart) */}
        <div className="col-lg-4">
          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp} className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="mb-4">
              <h5 className="fw-bold m-0 text-dark">Requests</h5>
              <p className="small text-secondary m-0">Check the requested from employees</p>
            </div>
            <div className="d-flex h-100 align-items-end justify-content-center position-relative pb-4" style={{ minHeight: '200px' }}>
              {/* Fake SVG Sparkline */}
              <svg viewBox="0 0 100 50" className="w-100 h-100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#dc3545', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: '#dc3545', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M0,30 L10,20 L20,40 L30,25 L40,25 L50,10 L60,25 L70,45 L80,15 L90,15 L100,15 L100,50 L0,50 Z" fill="url(#grad1)" />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d="M0,30 L10,20 L20,40 L30,25 L40,25 L50,10 L60,25 L70,45 L80,15 L90,15 L100,15" 
                  fill="none" 
                  stroke="#dc3545" 
                  strokeWidth="2" 
                />
                <circle cx="50" cy="10" r="2" fill="#dc3545" />
              </svg>
              {/* Dates */}
              <div className="position-absolute bottom-0 w-100 d-flex justify-content-between px-1">
                {['10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar'].map((d, i) => (
                  <span key={i} className="small text-secondary" style={{ fontSize: '10px' }}>{d}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Employees Table (Full Width) */}
      <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-header bg-white border-bottom pt-4 pb-3 d-flex justify-content-between align-items-center rounded-top-4">
          <div className="d-flex align-items-center gap-2">
            <h5 className="fw-bold m-0 text-dark">Recent</h5>
            <span className="text-secondary small">16 Employees</span>
          </div>
          <select className="form-select form-select-sm w-auto border rounded-3 fw-semibold shadow-sm">
            <option>All Department</option>
            <option>IT</option>
            <option>FA</option>
          </select>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 border-0">
              <thead className="text-secondary small" style={{ borderBottom: '1px solid #f1f1f1' }}>
                <tr>
                  <th className="ps-4 border-0 fw-medium pb-3 pt-3">Name ↓</th>
                  <th className="border-0 fw-medium pb-3 pt-3">Position</th>
                  <th className="border-0 fw-medium pb-3 pt-3">Gross pay</th>
                  <th className="border-0 fw-medium pb-3 pt-3">Tax</th>
                  <th className="border-0 fw-medium pb-3 pt-3">Total</th>
                  <th className="border-0 fw-medium pb-3 pt-3 text-center">Status</th>
                  <th className="pe-4 border-0 fw-medium pb-3 pt-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map((emp, i) => (
                  <motion.tr key={emp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + (i * 0.1) }}>
                    <td className="ps-4 border-light py-3">
                      <div className="d-flex align-items-center">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${emp.name}&backgroundColor=e2e8f0`} alt="" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                        <div>
                          <div className="fw-bold text-dark">{emp.name}</div>
                          <div className="small text-secondary">{Math.floor(Math.random() * 900000) + 100000}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-light">
                      <div className="fw-bold text-dark">{emp.role}</div>
                      <div className="small text-secondary">Department</div>
                    </td>
                    <td className="border-light">
                      <div className="fw-bold text-dark">{emp.pay}</div>
                      <div className="small text-secondary">Monthly</div>
                    </td>
                    <td className="border-light">
                      <div className="fw-bold text-dark">{emp.tax}</div>
                      <div className="small text-secondary">15%</div>
                    </td>
                    <td className="border-light">
                      <div className="fw-bold text-dark">{emp.total}</div>
                      <div className="small text-secondary">Net salary</div>
                    </td>
                    <td className="border-light text-center">
                      <span className={`text-${emp.color} fw-bold small`} style={{ backgroundColor: emp.status === 'Approved' ? '#e8f3ef' : '#fdf8ec', padding: '6px 12px', borderRadius: '6px' }}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="pe-4 border-light text-end">
                      <button className="btn btn-sm btn-light border rounded-3 fw-semibold text-secondary" onClick={() => navigate('/employees')}>Actions :</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Dashboard;
