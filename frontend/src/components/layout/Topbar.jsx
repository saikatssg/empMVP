import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const Topbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from('.header-item', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav ref={headerRef} className="navbar navbar-expand-lg glass-header px-4 py-3 position-sticky top-0 z-3">
      <div className="container-fluid">
        <button className="navbar-toggler d-md-none me-3 header-item border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand mb-0 h1 text-dark fw-bold header-item">Dashboard</span>

        <div className="ms-auto header-item">
          <div className="dropdown">
            <button className="btn btn-light border px-4 fw-semibold rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i className="bi bi-person-circle me-2"></i>
              {user?.role === 'Admin' ? 'Admin Portal' : 'My Account'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 mt-2">
              <li><button className="dropdown-item fw-semibold py-2" onClick={() => navigate('/profile')}><i className="bi bi-person me-2"></i> Profile</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger fw-semibold py-2" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i> Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
