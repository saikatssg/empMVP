import { motion } from 'framer-motion';

const FullCalendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // Simple grid

  const events = [
    { date: 8, title: 'Payroll Audit', type: 'warning' },
    { date: 12, title: 'Engineering Offsite', type: 'primary' },
    { date: 24, title: 'Company Holiday', type: 'success' }
  ];

  return (
    <div className="container-fluid py-4" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 className="fw-bolder text-dark mb-1">Corporate Calendar</h3>
          <p className="text-secondary fw-medium m-0 fs-6">Manage meetings, events, and tasks.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm d-flex align-items-center gap-2">
          <i className="bi bi-plus-lg"></i> New Event
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="card border-0 shadow-sm rounded-4 p-4 h-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0 text-dark">October 2026</h4>
          <div className="btn-group">
            <button className="btn btn-light border"><i className="bi bi-chevron-left"></i></button>
            <button className="btn btn-light border fw-semibold">Today</button>
            <button className="btn btn-light border"><i className="bi bi-chevron-right"></i></button>
          </div>
        </div>

        <div className="row g-0 border-top border-start">
          {days.map(day => (
            <div key={day} className="col border-end border-bottom bg-light py-2 text-center fw-bold text-secondary">
              {day}
            </div>
          ))}
        </div>
        
        <div className="row g-0 border-start">
          {dates.map((date, i) => {
            const isCurrentMonth = date > 0 && date <= 31;
            const event = isCurrentMonth ? events.find(e => e.date === date) : null;
            return (
              <div key={i} className={`col border-end border-bottom p-2 ${!isCurrentMonth ? 'bg-light bg-opacity-50 text-muted' : 'bg-white'}`} style={{ height: '120px', minWidth: '14.28%' }}>
                <div className="d-flex justify-content-between">
                  <span className={`fw-semibold ${date === 8 ? 'bg-primary text-white rounded-circle d-flex align-items-center justify-content-center' : ''}`} style={{ width: '28px', height: '28px' }}>
                    {isCurrentMonth ? date : (date <= 0 ? 30 + date : date - 31)}
                  </span>
                </div>
                {event && (
                  <div className={`mt-2 p-1 px-2 rounded-2 small fw-semibold bg-${event.type} bg-opacity-10 text-${event.type} border border-${event.type} border-opacity-25 text-truncate`}>
                    {event.title}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default FullCalendar;
