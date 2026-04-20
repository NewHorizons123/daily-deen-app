import { NavLink, useLocation } from 'react-router-dom';
import { Compass, BookOpen, PenTool, MessageCircle, Map, Sparkles, BookHeart } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HUB', icon: Compass },
    { path: '/journey', label: 'JOURNEY', icon: Map },
    { path: '/reflect', label: 'REFLECT', icon: PenTool, isMain: true },
    { path: '/library', label: 'LIBRARY', icon: BookHeart },
    { path: '/community', label: 'COMMUNITY', icon: MessageCircle },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.isMain) {
            return (
              <NavLink to={item.path} key={item.path} className={`nav-item nav-item-main ${isActive ? 'active' : ''}`}>
                <div className="nav-main-btn">
                  <Icon size={24} color="#FFFFFF" />
                </div>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          }

          return (
            <NavLink to={item.path} key={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={24} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
