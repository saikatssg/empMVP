import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import heroVideo from '../../assets/Scene.mp4';
import AIAssistant from '../../components/chat/AIAssistant';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light overflow-hidden" style={{ minHeight: '100vh', fontFamily: '"SF Pro Display", sans-serif' }}>
      <AIAssistant />
      
      {/* Navbar (Glass) */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 py-3 fixed-top" style={{ background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 text-white" href="#">Apple IN EMS</a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto fw-semibold">
              <li className="nav-item"><a className="nav-link text-white" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#showcase">Showcase</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#testimonials">Testimonials</a></li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-light rounded-pill px-4 fw-semibold shadow-sm" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section (Fantasy.co concept) */}
      <section className="position-relative d-flex align-items-center justify-content-center text-center text-white overflow-hidden" style={{ height: '100vh' }}>
        <video 
          autoPlay loop muted playsInline 
          className="position-absolute top-50 start-50 translate-middle" 
          style={{ minWidth: '100%', minHeight: '100%', zIndex: 0, filter: 'brightness(0.3)', transform: 'translate(-50%, -50%) scale(1.25)', objectFit: 'cover' }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <motion.div 
          className="position-relative z-1 container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="fw-bolder mb-3" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-2px', lineHeight: '1' }}>
            Work, <br/> Redefined.
          </h1>
          <p className="lead mb-5 opacity-75 mx-auto fw-medium" style={{ maxWidth: '600px', fontSize: '1.25rem' }}>
            Experience an edgeless corporate ecosystem built on speed, aesthetics, and intelligence.
          </p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="position-absolute bottom-0 mb-4 z-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <i className="bi bi-chevron-down fs-2 opacity-50"></i>
        </motion.div>
      </section>

      {/* About Us (Eleken.co concept: Bold, grid, typography-heavy) */}
      <section id="about" className="py-5 bg-white">
        <div className="container py-5 my-5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="row g-5">
            <div className="col-lg-5">
              <h2 className="display-4 fw-bolder mb-4" style={{ letterSpacing: '-1px' }}>We are pragmatists building for scale.</h2>
              <button className="btn btn-dark rounded-pill px-5 py-3 fw-bold mt-3">Read Our Story</button>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <p className="fs-4 text-dark fw-medium lh-base mb-4">
                We believe that internal tools shouldn't look internal. They should feel like the best consumer apps on the market.
              </p>
              <p className="fs-5 text-secondary lh-base">
                Our platform delivers an edgeless UI/UX layout that empowers your team to operate seamlessly on any device, entirely free of interruption or clutter. Every pixel serves a purpose.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Showcase */}
      <section id="services" className="py-5 bg-light">
        <div className="container py-5">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="display-5 fw-bold mb-5 text-center">Modules & Showcase</motion.h2>
          
          <div className="row g-4">
            {[
              { title: 'User Portfolios', desc: 'Each employee gets a personalized, public-facing portfolio page.', icon: 'bi-person-badge' },
              { title: 'Secure Authentication', desc: 'Enterprise-grade 2FA and session management via JWT.', icon: 'bi-shield-lock' },
              { title: 'Fluid Analytics', desc: 'Real-time corporate metrics displayed in a gorgeous 3D interface.', icon: 'bi-graph-up-arrow' },
              { title: 'Edgeless UI', desc: 'Glassmorphism and soft shadows replace archaic boxes.', icon: 'bi-window-sidebar' },
            ].map((srv, i) => (
              <motion.div key={i} className="col-md-6 col-lg-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="card edgeless-card shadow-diffuse p-4 h-100 text-center border-0 bg-white">
                  <div className="mb-4 mt-2">
                    <i className={`bi ${srv.icon} text-dark`} style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="fw-bold">{srv.title}</h5>
                  <p className="text-secondary small mt-2">{srv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements (Eleken Bold Stats Style) */}
      <section id="achievements" className="py-5 bg-dark text-white">
        <div className="container py-5 my-3">
          <div className="row g-4 text-center">
            {[
              { num: '50+', label: 'Global Partners' },
              { num: '10k+', label: 'Active Employees' },
              { num: '99.9%', label: 'Platform Uptime' },
              { num: '24/7', label: 'Technical Support' }
            ].map((stat, i) => (
              <motion.div key={i} className="col-md-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <h2 className="fw-bolder mb-2" style={{ fontSize: '4rem', letterSpacing: '-2px' }}>{stat.num}</h2>
                <p className="opacity-75 text-uppercase fw-semibold" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section id="blog" className="py-5 bg-white">
        <div className="container py-5">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="d-flex justify-content-between align-items-end mb-5">
            <h2 className="fw-bold display-5 m-0">Latest News</h2>
            <a href="#" className="text-dark fw-bold text-decoration-none">View All <i className="bi bi-arrow-right"></i></a>
          </motion.div>
          
          <div className="row g-4">
            {[1, 2, 3].map((i) => (
              <motion.div className="col-md-4" key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="card edgeless-card shadow-sm h-100 overflow-hidden border-0 bg-light">
                  <img src={`https://images.unsplash.com/photo-1551288049-${i}d8e0b28a964?auto=format&fit=crop&w=500&q=60`} className="card-img-top" alt="Blog" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body p-4">
                    <span className="badge bg-dark mb-3">Update</span>
                    <h5 className="fw-bold text-dark">The Future of Workplaces</h5>
                    <p className="text-secondary small">Read about how modern UI improves employee retention and overall satisfaction across large teams.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Brands Marquee */}
      <section className="py-5 bg-light border-top border-bottom overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content align-items-center gap-5 px-5">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="d-flex gap-5 align-items-center">
                {['GOOGLE', 'AMAZON', 'NETFLIX', 'APPLE', 'META', 'MICROSOFT', 'TESLA', 'IBM'].map((brand, i) => (
                  <h3 key={i} className="fw-bolder m-0 text-secondary opacity-25" style={{ fontSize: '2.5rem', letterSpacing: '1px' }}>{brand}</h3>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-5 bg-white">
        <div className="container py-5 my-5 text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="display-5 fw-bold mb-5">What Clients Say</motion.h2>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                className="pb-5"
              >
                {[
                  { text: "This platform completely revolutionized how we manage our global teams. The UI is exceptionally clean and distraction-free.", author: "Jane Doe, CTO at TechCorp" },
                  { text: "The fastest, most elegant internal tool I have ever used. The edgeless design makes it feel like magic.", author: "John Smith, HR Director" }
                ].map((test, i) => (
                  <SwiperSlide key={i}>
                    <p className="fs-3 fw-medium text-dark lh-base mb-4">"{test.text}"</p>
                    <p className="text-secondary fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>{test.author}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container pt-5">
          <div className="row g-5">
            <div className="col-lg-5 mb-4">
              <h3 className="fw-bold mb-4">Apple IN EMS</h3>
              <p className="opacity-75 pe-lg-5 lh-lg">Designing the future of enterprise management tools, focusing on uncompromised speed, security, and breathtaking aesthetics.</p>
            </div>
            <div className="col-md-4 col-lg-3 mb-4 offset-lg-1">
              <h5 className="fw-bold mb-4">Quick Links</h5>
              <ul className="list-unstyled opacity-75 lh-lg">
                <li><a href="#about" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="#services" className="text-white text-decoration-none">Services</a></li>
                <li><a href="#showcase" className="text-white text-decoration-none">Showcase</a></li>
                <li><a href="/login" className="text-white text-decoration-none">Login Portal</a></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <h5 className="fw-bold mb-4">Contact Us</h5>
              <p className="opacity-75 mb-2"><i className="bi bi-envelope me-2"></i> hello@appleinems.com</p>
              <p className="opacity-75 mb-2"><i className="bi bi-telephone me-2"></i> +1 (800) 123-4567</p>
              <p className="opacity-75"><i className="bi bi-geo-alt me-2"></i> Cupertino, CA 95014</p>
            </div>
          </div>
          <hr className="my-5 border-secondary" />
          <div className="d-flex justify-content-between align-items-center opacity-50 small">
            <span>&copy; 2026 Apple IN EMS. All rights reserved.</span>
            <div className="d-flex gap-3">
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-github"></i>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default HomePage;
