import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Settings, Users, HelpCircle, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-primary-content' 
            : 'hover:bg-base-200'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-grow">{label}</span>
        {isActive && <ChevronRight className="h-5 w-5" />}
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  // Detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile when resizing to mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { id: 'home', label: 'Accueil', icon: <Home className="h-5 w-5" /> },
    { id: 'users', label: 'Utilisateurs', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="h-5 w-5" /> },
    { id: 'help', label: 'Aide', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Mobile toggle button - always visible on mobile */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 btn btn-circle btn-primary"
        aria-label={isOpen ? "Fermer menu" : "Ouvrir menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`
          fixed md:relative z-20
          h-full min-h-screen
          bg-base-100 shadow-xl
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64 left-0' : 'w-0 md:w-16 -left-full md:left-0'}
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 flex items-center justify-between h-16 border-b border-base-300">
            <h2 className={`font-bold text-lg whitespace-nowrap ${!isOpen && 'md:hidden'}`}>
              Mon Application
            </h2>
            
            {/* Desktop toggle button */}
            <button 
              onClick={toggleSidebar}
              className="hidden md:flex btn btn-sm btn-ghost btn-circle"
              aria-label={isOpen ? "Réduire menu" : "Élargir menu"}
            >
              {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <NavItem 
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeItem === item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    if (isMobile) setIsOpen(false);
                  }}
                />
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-base-300">
            <button 
              className="flex items-center w-full p-3 rounded-lg hover:bg-base-200 text-error"
              onClick={() => console.log('Déconnexion')}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className={!isOpen ? 'md:hidden' : ''}>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content wrapper - just a placeholder */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isOpen ? 'md:ml-64' : 'md:ml-16'}
      `}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;