import { useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { triggerUpdateOtp, updateCredentials } from '../../auth/auth.service';
import { motion } from 'framer-motion';
import * as faceapi from '@vladmandic/face-api';

const UserProfile = () => {
  const { user } = useAuth();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Facial Recognition State
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [faceStatus, setFaceStatus] = useState(null); // 'scanning' | 'valid' | 'invalid'
  const imgRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setMessage('');
    setFaceStatus('scanning');
    setIsAnalyzing(true);

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    try {
      // Load the TinyFaceDetector model directly from JSdelivr CDN
      await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');

      // Wait a moment for the image to mount in the DOM
      setTimeout(async () => {
        if (!imgRef.current) return;
        
        const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions());
        
        if (detections.length === 1) {
          setFaceStatus('valid');
          setMessage('Facial recognition successful! Valid ID photo detected.');
          // In a real app, you would now upload the file to AWS S3 or the backend
        } else if (detections.length === 0) {
          setFaceStatus('invalid');
          setError('Biometric Error: No human face detected in the image.');
        } else {
          setFaceStatus('invalid');
          setError(`Biometric Error: Multiple faces (${detections.length}) detected. Please use a solo photo.`);
        }
        setIsAnalyzing(false);
      }, 500);

    } catch (err) {
      console.error(err);
      setError('Failed to initialize facial recognition engine.');
      setFaceStatus('invalid');
      setIsAnalyzing(false);
    }
  };

  const handleTriggerOtp = async () => {
    setIsUpdating(true);
    setError('');
    setMessage('');
    try {
      const res = await triggerUpdateOtp();
      setMessage(res.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to trigger OTP');
      setIsUpdating(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await updateCredentials(otp, newPassword);
      setMessage(res.message);
      setStep(1);
      setIsUpdating(false);
      setOtp('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update credentials');
    }
  };

  return (
    <div className="container-fluid py-4" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
      <h2 className="mb-4 fw-bold text-dark">Profile Settings</h2>
      
      <div className="row g-4">
        {/* Profile Image & Biometrics */}
        <div className="col-lg-5">
          <div className="card edgeless-card shadow-sm p-4 text-center">
            <h5 className="fw-semibold text-dark mb-4">Identity Verification</h5>
            
            <div className="position-relative d-inline-block mb-4">
              <img 
                ref={imgRef}
                src={imagePreview || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email}&backgroundColor=e2e8f0`} 
                alt="Profile" 
                className={`rounded-circle shadow-sm border border-4 ${faceStatus === 'valid' ? 'border-success' : faceStatus === 'invalid' ? 'border-danger' : 'border-white'}`}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                crossOrigin="anonymous" // Required for face-api canvas drawing
              />
              {isAnalyzing && (
                <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="spinner-border text-light" role="status"></div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="photo-upload" className="btn btn-dark rounded-pill px-4 fw-semibold shadow-sm w-100">
                <i className="bi bi-camera me-2"></i> Upload New ID Photo
              </label>
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="d-none" 
                onChange={handleImageUpload} 
              />
            </div>
            
            <p className="text-secondary small mt-2">
              <i className="bi bi-shield-check me-1"></i> 
              Our AI biometric engine requires a clear, solo photo of your face to authorize uploads.
            </p>

            {error && <div className="alert alert-danger small py-2 mt-3 text-start"><i className="bi bi-exclamation-triangle me-2"></i>{error}</div>}
            {message && faceStatus === 'valid' && <div className="alert alert-success small py-2 mt-3 text-start"><i className="bi bi-check-circle me-2"></i>{message}</div>}
          </div>
        </div>

        {/* Account Details & Security */}
        <div className="col-lg-7">
          <div className="card edgeless-card shadow-sm p-4">
            <h5 className="fw-semibold text-dark mb-4">Account Information</h5>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-semibold">Corporate Email</label>
              <input type="email" className="form-control bg-light border-0 fw-medium" value={user?.email || ''} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-semibold">Access Role</label>
              <input type="text" className="form-control bg-light border-0 fw-medium" value={user?.role || ''} readOnly />
            </div>
            
            <hr className="my-4 opacity-25" />
            
            <h5 className="fw-semibold text-dark mb-4">Security</h5>
            
            {message && faceStatus !== 'valid' && <div className="alert alert-success py-2">{message}</div>}

            {!isUpdating && (
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline-danger rounded-pill fw-semibold px-4" 
                onClick={handleTriggerOtp}
              >
                <i className="bi bi-key me-2"></i> Request Password Change
              </motion.button>
            )}

            {isUpdating && step === 2 && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleUpdateSubmit} className="mt-3 bg-light p-4 rounded-4 border">
                <div className="mb-3">
                  <label className="form-label fw-semibold small">New Password</label>
                  <input 
                    type="password" 
                    className="form-control border-0" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    minLength="8"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold small">6-Digit Verification Code (OTP)</label>
                  <input 
                    type="text" 
                    className="form-control border-0 fw-bold letter-spacing-2" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    required 
                  />
                  <div className="form-text mt-2"><i className="bi bi-info-circle me-1"></i>Check your email for the code to authorize this change.</div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary rounded-pill fw-semibold px-4">Update Credentials</button>
                  <button type="button" className="btn btn-white rounded-pill fw-semibold px-4 border" onClick={() => setIsUpdating(false)}>Cancel</button>
                </div>
              </motion.form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
