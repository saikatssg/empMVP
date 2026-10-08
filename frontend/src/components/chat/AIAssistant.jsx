import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello. I am your AI HR Assistant. How can I streamline your day?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: 'user', text: query }];
    setMessages(newMessages);
    setQuery('');

    // Simulate AI response
    setTimeout(() => {
      let reply = "I'm processing your request. As an AI in the MVP stage, my integrations are still being finalized.";
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes('policy') || lowerQuery.includes('leave')) {
        reply = "Company policy allows for 20 days of PTO annually. Would you like me to open the leave request form?";
      } else if (lowerQuery.includes('directory') || lowerQuery.includes('find')) {
        reply = "You can search for any colleague in the Employee Directory module. I can also pull up specific contact cards if you provide a name.";
      } else if (lowerQuery.includes('salary') || lowerQuery.includes('payroll')) {
        reply = "Payroll information is strictly confidential and requires a 2FA prompt. Please visit the Finance portal for secure access.";
      }

      setMessages([...newMessages, { type: 'bot', text: reply }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="btn btn-dark rounded-circle shadow-lg d-flex align-items-center justify-content-center position-fixed"
        style={{ width: '60px', height: '60px', bottom: '30px', right: '30px', zIndex: 1050 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <i className="bi bi-robot fs-3"></i>
      </motion.button>

      {/* Full-Screen / Side-Panel Overlay (Onyx.doctor style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1060 }}
          >
            {/* Cinematic Video Background (Simulating Onyx.doctor idle video) */}
            <video 
              autoPlay loop muted playsInline 
              className="position-absolute w-100 h-100" 
              style={{ objectFit: 'cover', filter: 'brightness(0.2) contrast(1.2)' }}
            >
              <source src="https://cdn.pixabay.com/video/2021/08/04/83944-585324503_large.mp4" type="video/mp4" />
            </video>

            {/* Content Container */}
            <div className="position-relative w-100 h-100 d-flex flex-column text-white" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
              
              {/* Header */}
              <div className="p-4 d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25 glass-header">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-white bg-opacity-10 d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-robot fs-4"></i>
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold letter-spacing-1">Apple IN AI</h5>
                    <small className="text-white-50">Enterprise Intelligence</small>
                  </div>
                </div>
                <button className="btn btn-link text-white fs-2 text-decoration-none p-0" onClick={() => setIsOpen(false)}>
                  <i className="bi bi-x"></i>
                </button>
              </div>

              {/* Quick Actions (Onyx TeleChat style) */}
              <div className="d-flex justify-content-center gap-3 p-4">
                {[
                  { icon: 'bi-journal-text', label: 'Policies' },
                  { icon: 'bi-person-badge', label: 'Directory' },
                  { icon: 'bi-shield-lock', label: 'Security' }
                ].map((action, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    className="btn btn-outline-light rounded-pill border-opacity-25 px-4 py-2 d-flex align-items-center gap-2 backdrop-blur"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <i className={`bi ${action.icon}`}></i> <span className="fw-semibold">{action.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Chat Area */}
              <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3">
                <div className="text-center mb-4">
                  <p className="text-white-50 small text-uppercase letter-spacing-2">“Great execution begins with a conversation.”</p>
                </div>

                {messages.map((msg, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`d-flex ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div 
                      className={`p-3 rounded-4 shadow-sm ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-dark text-white border border-secondary border-opacity-25'}`}
                      style={{ 
                        maxWidth: '75%', 
                        fontSize: '1.1rem',
                        background: msg.type === 'bot' ? 'rgba(0,0,0,0.6)' : undefined,
                        backdropFilter: msg.type === 'bot' ? 'blur(10px)' : undefined,
                        borderBottomRightRadius: msg.type === 'user' ? '4px' : '1rem',
                        borderBottomLeftRadius: msg.type === 'bot' ? '4px' : '1rem'
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Ask Bar (Onyx style) */}
              <div className="p-4 border-top border-secondary border-opacity-25 glass-header">
                <div className="container" style={{ maxWidth: '800px' }}>
                  <form onSubmit={handleSend} className="d-flex align-items-center bg-dark bg-opacity-50 rounded-pill p-2 border border-secondary border-opacity-25 backdrop-blur">
                    <button type="button" className="btn btn-link text-white-50 border-0 rounded-circle p-2">
                      <i className="bi bi-mic-fill fs-5"></i>
                    </button>
                    <input 
                      type="text" 
                      className="form-control bg-transparent border-0 text-white shadow-none px-3 fs-5" 
                      placeholder="Ask HR AI anything..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoFocus
                    />
                    <motion.button 
                      type="submit" 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center shadow"
                      style={{ width: '45px', height: '45px' }}
                      disabled={!query.trim()}
                    >
                      <i className="bi bi-arrow-up-short fs-3 text-dark"></i>
                    </motion.button>
                  </form>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
