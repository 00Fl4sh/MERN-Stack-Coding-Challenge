import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const NAVBAR_HEIGHT = 56; // px
  const SIDEBAR_WIDTH = sidebarCollapsed ? 64 : 256; // px

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setMobileSidebarOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleBurgerClick() {
    if (isMobile) {
      setMobileSidebarOpen((open) => !open);
    } else {
      setSidebarCollapsed((collapsed) => !collapsed);
    }
  }

  // Breadcrumbs logic
  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];
    if (pathSegments.length === 0) return breadcrumbs;
    const routeLabels = {
      'explore': 'Explore',
      'learning-paths': 'Learning Paths',
      'videos': 'Videos',
      'podcasts': 'Podcasts',
      'articles': 'Articles',
      'upload': 'Upload',
      'profile': 'Profile',
      'admin': 'Admin'
    };
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = routeLabels[segment] || segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (routeLabels[segment] || index === 0) {
        breadcrumbs.push({ label, path });
      }
    });
    return breadcrumbs;
  };
  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar onBurgerClick={handleBurgerClick} />
      </div>

      {/* Sidebar: always visible on desktop, overlays on mobile */}
      {!isMobile && (
        <div
          className="fixed z-40 bg-white border-r border-gray-200 transition-all duration-300 h-[calc(100vh-56px)]"
          style={{
            top: NAVBAR_HEIGHT,
            left: 0,
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            overflow: 'hidden',
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
          }}
        >
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className="fixed z-50 bg-white border-r border-gray-200 transition-all duration-300 h-[calc(100vh-56px)]"
            style={{
              top: NAVBAR_HEIGHT,
              left: 0,
              width: 256,
              minWidth: 256,
              overflow: 'hidden',
              height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
            }}
          >
            <Sidebar
              isCollapsed={false}
              onToggle={() => setMobileSidebarOpen(false)}
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: !isMobile ? SIDEBAR_WIDTH : 0,
          marginTop: NAVBAR_HEIGHT
        }}
      >
        {/* Breadcrumbs */}
        <div className="bg-white/80 border-b border-gray-200 px-6 py-2 shadow-sm">
          <nav className="flex items-center text-sm text-gray-500 gap-2">
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.path} className="flex items-center">
                {idx !== 0 && <span className="mx-2">/</span>}
                {idx < breadcrumbs.length - 1 ? (
                  <Link to={crumb.path} className="hover:text-blue-600 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-gray-700 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
        {/* Main Content Container */}
        <main className="p-6 bg-gradient-to-br from-white to-gray-50 min-h-[60vh]">
          <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-lg p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;