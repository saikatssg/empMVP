import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../../../config/axiosInstance';

const Portfolio = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We would typically fetch employee details by username here.
    // For MVP, we'll mock it if the API doesn't support public fetching by username yet.
    // Since there's no public endpoint built yet, we'll simulate a fetch.
    setTimeout(() => {
      setEmployee({
        firstName: 'Saikat',
        lastName: 'Sengupta',
        username: username,
        role: 'Admin / Principal Engineer',
        bio: 'Passionate about crafting scalable, edgeless corporate ecosystems that empower global teams. I specialize in the MERN stack and modern UI architectures.',
        skills: ['React', 'Node.js', 'MongoDB', 'UI/UX Design', 'System Architecture'],
        email: 'saikat@example.com',
        location: 'Cupertino, CA',
        joinDate: 'Oct 2026'
      });
      setLoading(false);
    }, 800);
  }, [username]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: '100vh', fontFamily: '"SF Pro Display", sans-serif' }}>
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3 shadow-sm sticky-top glass-header">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 cursor-pointer" onClick={() => navigate('/')}>Apple IN EMS</a>
          <button className="btn btn-outline-dark rounded-pill px-4 fw-semibold shadow-sm" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </nav>

      <div className="container py-5 mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="edgeless-card shadow-diffuse bg-white p-5 text-center position-relative overflow-hidden"
            >
              {/* Header Gradient */}
              <div className="position-absolute top-0 start-0 w-100" style={{ height: '120px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}></div>
              
              <div className="position-relative z-1" style={{ marginTop: '40px' }}>
                <img 
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${employee.username}&backgroundColor=e2e8f0`} 
                  alt="Avatar" 
                  className="rounded-circle shadow bg-white border border-4 border-white mb-4"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                
                <h1 className="fw-bolder display-5 mb-1">{employee.firstName} {employee.lastName}</h1>
                <p className="fs-5 text-secondary fw-medium mb-4">@{employee.username} &bull; {employee.role}</p>

                <div className="d-flex justify-content-center gap-4 mb-5 text-secondary">
                  <span><i className="bi bi-geo-alt-fill me-2"></i>{employee.location}</span>
                  <span><i className="bi bi-envelope-fill me-2"></i>{employee.email}</span>
                  <span><i className="bi bi-calendar-check-fill me-2"></i>Joined {employee.joinDate}</span>
                </div>
              </div>

              <hr className="border-secondary opacity-25 my-5" />

              <div className="text-start px-md-4">
                <h4 className="fw-bold mb-3">About Me</h4>
                <p className="fs-5 text-secondary lh-base mb-5">
                  {employee.bio}
                </p>

                <h4 className="fw-bold mb-4">Core Competencies</h4>
                <div className="d-flex flex-wrap gap-2 mb-5">
                  {employee.skills.map((skill, index) => (
                    <span key={index} className="badge bg-light text-dark border px-3 py-2 fs-6 rounded-pill fw-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="bg-light p-4 rounded-4 text-center mt-4">
                  <h5 className="fw-bold mb-3">Want to work together?</h5>
                  <button className="btn btn-dark rounded-pill px-5 py-2 fw-semibold">Contact {employee.firstName}</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Portfolio;
