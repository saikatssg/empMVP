import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  return (
    <div className="d-flex vh-100 bg-surface overflow-hidden">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1 w-100 overflow-hidden" style={{ background: 'url("https://www.apple.com/v/macos/monterey/e/images/overview/macos_monterey_hero__c72w41iicvma_large.jpg") center/cover no-repeat', backgroundColor: '#F5F5F7' }}>
        <Topbar />
        <main className="flex-grow-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>

      <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title">Apple IN EMS</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
