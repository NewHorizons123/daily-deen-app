import { useState, useEffect } from 'react';
import { X, User, Bell, Settings, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import './Header.css';

const Header = ({ leftElement, rightElement, isProfileOnLeft }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Navigation state within the Sidebar
  const [activeScreen, setActiveScreen] = useState('menu');

  // Prevent scrolling when an overlay is open
  useEffect(() => {
    if (isMenuOpen || isProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Reset screen when closed
      setTimeout(() => setActiveScreen('menu'), 300);
    }
  }, [isMenuOpen, isProfileOpen]);

  return (
    <>
      <header className="page-header">
        {leftElement ? (
          leftElement
        ) : isProfileOnLeft ? (
          <div className="profile-pic" onClick={() => setIsProfileOpen(true)}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
          </div>
        ) : (
          <div className="menu-icon" onClick={() => setIsMenuOpen(true)}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        )}
        
        <h1 className="header-title">Daily Deen</h1>
        
        {rightElement ? (
          rightElement
        ) : !isProfileOnLeft && (
          <div className="profile-pic" onClick={() => setIsProfileOpen(true)}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
          </div>
        )}
      </header>

      {/* --- Sidebar Overlay --- */}
      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="sidebar animate-slide-in" onClick={(e) => e.stopPropagation()}>
            
            {/* SCREEN: MAIN MENU */}
            {activeScreen === 'menu' && (
              <div className="animate-fade-in flex flex-col h-full">
                <div className="sidebar-header">
                  <h2 className="heading-md italic">Sanctuary Menu</h2>
                  <button className="icon-btn-clear" onClick={() => setIsMenuOpen(false)}>
                    <X size={24} color="#1B4341" />
                  </button>
                </div>
                
                <div className="sidebar-nav mt-8">
                  <button className="sidebar-item" onClick={() => setActiveScreen('account')}>
                    <div className="flex items-center gap-4">
                      <User size={20} color="#B8965B" />
                      <span className="text-lg text-primary font-medium">My Account</span>
                    </div>
                    <ChevronRight size={20} color="#C4C9C8" />
                  </button>
                  
                  <button className="sidebar-item" onClick={() => setActiveScreen('notifications')}>
                    <div className="flex items-center gap-4">
                      <Bell size={20} color="#B8965B" />
                      <span className="text-lg text-primary font-medium">Notifications</span>
                    </div>
                    <ChevronRight size={20} color="#C4C9C8" />
                  </button>
                  
                  <button className="sidebar-item" onClick={() => setActiveScreen('preferences')}>
                    <div className="flex items-center gap-4">
                      <Settings size={20} color="#B8965B" />
                      <span className="text-lg text-primary font-medium">App Preferences</span>
                    </div>
                    <ChevronRight size={20} color="#C4C9C8" />
                  </button>
                </div>
                
                <div className="sidebar-footer mt-auto pt-8">
                  <button className="sidebar-item logout" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-4">
                      <LogOut size={20} color="#D9534F" />
                      <span className="text-lg text-[#D9534F] font-medium">Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN: MY ACCOUNT */}
            {activeScreen === 'account' && (
              <div className="animate-fade-in flex flex-col h-full">
                <div className="sidebar-header">
                  <button className="icon-btn-clear" onClick={() => setActiveScreen('menu')}>
                    <ChevronLeft size={24} color="#1B4341" />
                  </button>
                  <h2 className="heading-md italic">My Account</h2>
                  <div style={{ width: 24 }}></div> {/* Spacer */}
                </div>
                
                <div className="mt-8 flex flex-col items-center">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Profile Large" className="profile-pic-large mb-4" />
                  <p className="text-xs text-accent uppercase font-bold mb-8">Change Photo</p>
                </div>

                <div className="form-group mb-6">
                  <label className="text-xs text-muted uppercase font-bold tracking-wide">Display Name</label>
                  <input type="text" className="settings-input" defaultValue="Soulseeker" />
                </div>

                <div className="form-group mb-6">
                  <label className="text-xs text-muted uppercase font-bold tracking-wide">Email Address</label>
                  <input type="email" className="settings-input" defaultValue="seeker@dailydeen.app" />
                </div>

                <button className="btn btn-outline w-full mb-8">Reset Password</button>

                <div className="mt-auto">
                  <button className="btn btn-primary w-full" onClick={() => setActiveScreen('menu')}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN: NOTIFICATIONS */}
            {activeScreen === 'notifications' && (
              <div className="animate-fade-in flex flex-col h-full">
                <div className="sidebar-header">
                  <button className="icon-btn-clear" onClick={() => setActiveScreen('menu')}>
                    <ChevronLeft size={24} color="#1B4341" />
                  </button>
                  <h2 className="heading-md italic">Notifications</h2>
                  <div style={{ width: 24 }}></div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-muted mb-8">Manage what alerts you receive to keep your spiritual journey peaceful and intentional.</p>

                  <div className="toggle-row">
                    <div>
                      <h4 className="text-primary font-medium">Daily Reflection</h4>
                      <p className="text-xs text-muted mt-1">Evening reminder to journal</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <h4 className="text-primary font-medium">Prayer Times</h4>
                      <p className="text-xs text-muted mt-1">Alerts for daily Salah</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <h4 className="text-primary font-medium">Community Updates</h4>
                      <p className="text-xs text-muted mt-1">When fellow travelers post</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <h4 className="text-primary font-medium">Streak Milestones</h4>
                      <p className="text-xs text-muted mt-1">Encouragement for consistency</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN: APP PREFERENCES */}
            {activeScreen === 'preferences' && (
              <div className="animate-fade-in flex flex-col h-full">
                <div className="sidebar-header">
                  <button className="icon-btn-clear" onClick={() => setActiveScreen('menu')}>
                    <ChevronLeft size={24} color="#1B4341" />
                  </button>
                  <h2 className="heading-md italic">Preferences</h2>
                  <div style={{ width: 24 }}></div>
                </div>
                
                <div className="mt-8">
                  <div className="form-group mb-6">
                    <label className="text-xs text-muted uppercase font-bold tracking-wide">App Language</label>
                    <select className="settings-input mt-2">
                      <option>English</option>
                      <option>Arabic (العربية)</option>
                      <option>Urdu (اردو)</option>
                    </select>
                  </div>

                  <div className="form-group mb-6">
                    <label className="text-xs text-muted uppercase font-bold tracking-wide">Text Size</label>
                    <select className="settings-input mt-2">
                      <option>Standard</option>
                      <option>Large (More readable)</option>
                    </select>
                  </div>

                  <div className="form-group mb-8">
                    <label className="text-xs text-muted uppercase font-bold tracking-wide">Theme</label>
                    <select className="settings-input mt-2">
                      <option>Modern Sanctuary (Light)</option>
                      <option>Night Sky (Dark)</option>
                    </select>
                  </div>
                  
                  <div className="toggle-row mt-4 border-t border-[#E2DBD1] pt-6">
                    <div>
                      <h4 className="text-primary font-medium">Data Saver Mode</h4>
                      <p className="text-xs text-muted mt-1">Reduce image quality</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="btn btn-primary w-full" onClick={() => setActiveScreen('menu')}>
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- Profile Dropdown/Modal Overlay --- */}
      {isProfileOpen && (
        <div className="overlay" onClick={() => setIsProfileOpen(false)}>
          <div className="profile-modal animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile Large" className="profile-pic-large" />
              <h3 className="heading-md mt-4">Soulseeker</h3>
              <p className="text-sm text-muted mt-1">seeker@dailydeen.app</p>
              
              <div className="badge mt-4">LUMINOUS STAGE</div>
            </div>
            
            <div className="mt-8 flex-col gap-4">
              <button className="btn btn-primary w-full" onClick={() => {
                setIsProfileOpen(false);
                setIsMenuOpen(true);
                setActiveScreen('account');
              }}>
                Edit Profile
              </button>
              <button className="btn btn-outline w-full mt-4" onClick={() => setIsProfileOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
