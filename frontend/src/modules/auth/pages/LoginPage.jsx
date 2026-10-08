import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../../auth/auth.service';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Keep email for forgot password
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [step, setStep] = useState(1); // 1 = Login, 2 = OTP, 3 = Forgot Password, 4 = Reset Password
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { loginInitiate, loginVerify } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there is a reset token in URL
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const resetEmail = searchParams.get('email');
    if (token && resetEmail) {
      setStep(4);
      setEmail(resetEmail);
      // We could store the token in state, let's use the URL directly on submit
    }
  }, [location]);

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginInitiate(username, password);
      if (response.requires2FA) {
        setMessage(response.message);
        setEmail(response.email); // Store returned email for display
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await loginVerify(username, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await forgotPassword(email);
      setMessage(res.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    
    try {
      await resetPassword(email, token, password);
      setMessage('Password reset successfully. You can now login.');
      setStep(1);
      setPassword('');
      navigate('/login'); // clear URL params
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="position-relative vh-100 vw-100 overflow-hidden d-flex flex-column align-items-center justify-content-center">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="position-absolute top-50 start-50 translate-middle"
        style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover', zIndex: -1, filter: 'brightness(0.6)' }}
      >
        <source src="https://cdn.pixabay.com/video/2021/08/04/83944-585324503_large.mp4" type="video/mp4" />
      </video>

      {/* Nav Menu Overlay */}
      <nav className="position-absolute top-0 w-100 p-4 d-flex justify-content-between align-items-center z-3">
        <div className="text-white fw-bold fs-4">Apple IN EMS</div>
        <div className="d-flex gap-4">
          <a href="/" className="text-white text-decoration-none fw-semibold">Home</a>
          <a href="#" className="text-white text-decoration-none fw-semibold opacity-75">Support</a>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="edgeless-card shadow-diffuse p-5 mx-3 position-relative z-1" 
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <div className="card-body p-0">
          <h3 className="text-center mb-4 fw-bold text-dark">
            {step === 1 && 'Sign In'}
            {step === 2 && 'Two-Step Verification'}
            {step === 3 && 'Recover Password'}
            {step === 4 && 'Reset Password'}
          </h3>

          {error && <div className="alert alert-danger p-2 text-sm border-0" style={{ borderRadius: '12px' }}>{error}</div>}
          {message && (step === 2 || step === 3 || step === 1) && <div className="alert alert-success p-2 text-sm border-0" style={{ borderRadius: '12px' }}>{message}</div>}

          {step === 1 && (
            <form onSubmit={handleCredentialSubmit}>
              <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control form-control-lg bg-light border-0 text-dark" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required 
                />
              </div>
              <div className="mb-4">
                <input 
                  type="password" 
                  className="form-control form-control-lg bg-light border-0 text-dark" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold shadow-sm" 
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
              <div className="text-center mt-3">
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none btn-sm text-secondary"
                  onClick={() => { setStep(3); setError(null); setMessage(null); }}
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <input 
                  type="text" 
                  className="form-control form-control-lg bg-light border-0 text-center fs-4 letter-spacing-2 text-dark" 
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="------"
                  autoComplete="one-time-code"
                  required 
                />
                <div className="form-text mt-2 text-center text-secondary">
                  Enter the code sent to {email}
                </div>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold shadow-sm mb-3" 
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? 'Authenticating...' : 'Verify & Login'}
              </button>
              <div className="text-center">
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none btn-sm text-secondary"
                  onClick={() => { setStep(1); setError(null); setMessage(null); }}
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to login
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <input 
                  type="email" 
                  className="form-control form-control-lg bg-light border-0 text-dark" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required 
                />
                <div className="form-text mt-2 text-center text-secondary">
                  We'll send you a link to reset your password.
                </div>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold shadow-sm mb-3" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="text-center">
                <button 
                  type="button" 
                  className="btn btn-link text-decoration-none btn-sm text-secondary"
                  onClick={() => { setStep(1); setError(null); setMessage(null); }}
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to login
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="mb-4">
                <input 
                  type="password" 
                  className="form-control form-control-lg bg-light border-0 text-dark" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  required 
                  minLength="8"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold shadow-sm" 
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
