import React, { useState } from 'react';
import { Search, Bell, Menu, ShieldCheck, User as UserIcon, LogOut } from 'lucide-react';
import { NavTab, Announcement } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
  announcements: Announcement[];
  onOpenLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTab, 
  onSelectTab, 
  onOpenMobileSidebar,
  onOpenSearch,
  announcements,
  onOpenLogin
}) => {
  const { currentUser, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getTabTitle = (tab: NavTab) => {
    switch(tab) {
      case 'home': return 'Home Dashboard';
      case 'map': return 'Interactive Campus Map';
      case 'assistant': return 'AI Campus Assistant';
      case 'utilities': return 'Student Utilities & Services';
      case 'announcements': return 'Campus Announcements';
      case 'report': return 'Report an Issue';
      case 'saved': return 'My Saved Bookmarks';
      case 'profile': return 'User Profile & Settings';
      case 'admin': return 'Administrative Dashboard';
      default: return 'SOA SmartHub';
    }
  };

  const publishedAnnouncements = announcements.filter(a => a.status === 'Published').slice(0, 4);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between gap-4">
      {/* Zone 1: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#176B4D] uppercase tracking-wider">SOA SmartHub</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">{getTabTitle(currentTab)}</h1>
        </div>
      </div>

      {/* Zone 2: Global Search Bar Trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <button 
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm text-slate-500 transition-all text-left shadow-2xs group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
          <span className="flex-1 truncate">Search buildings, labs, services, announcements...</span>
          <kbd className="hidden lg:inline-flex px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions (Search Mobile, Notifications, Avatar) */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={onOpenSearch}
          className="md:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#176B4D] ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900">Campus Announcements</span>
                <span className="text-[11px] font-medium text-[#176B4D] bg-[#E7F3ED] px-2 py-0.5 rounded-full">
                  {publishedAnnouncements.length} New
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {publishedAnnouncements.map((ann) => (
                  <div key={ann.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { onSelectTab('announcements'); setShowNotifications(false); }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ann.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {ann.category}
                      </span>
                      <span className="text-xs text-slate-400">{ann.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 line-clamp-1">{ann.title}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{ann.summary}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-3 border-t border-slate-100 text-center">
                <button 
                  onClick={() => { onSelectTab('announcements'); setShowNotifications(false); }}
                  className="text-xs font-semibold text-[#176B4D] hover:underline"
                >
                  View All Announcements →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu or Guest Mode Indicator */}
        {currentUser ? (
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1.5 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200"
              />
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">{currentUser.name}</span>
                <span className="text-[11px] text-slate-500 block">{currentUser.role}</span>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block">{currentUser.name}</span>
                  <span className="text-xs text-slate-500 truncate block">{currentUser.email}</span>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onSelectTab('profile'); setShowProfileMenu(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>My Profile & Settings</span>
                  </button>
                  <button 
                    onClick={() => { onSelectTab('admin'); setShowProfileMenu(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-emerald-800 hover:bg-emerald-50 flex items-center gap-2 font-medium"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Admin Dashboard</span>
                  </button>
                </div>
                <div className="pt-2 border-t border-slate-100 px-2">
                  <button 
                    onClick={() => { signOut(); setShowProfileMenu(false); }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E7F3ED] text-[#176B4D] border border-[#176B4D]/20 text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#176B4D]" />
              Guest Mode
            </span>
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
