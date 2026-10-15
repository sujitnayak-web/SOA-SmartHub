import React from 'react';
import { 
  Home, 
  MapPin, 
  Bot, 
  Layers, 
  BellRing, 
  AlertCircle, 
  Bookmark, 
  User, 
  ShieldCheck,
  Compass,
  X
} from 'lucide-react';
import { NavTab } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isGuest?: boolean;
  onOpenLogin?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  onSelectTab, 
  mobileOpen, 
  setMobileOpen,
  isGuest,
  onOpenLogin
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home Dashboard', icon: Home },
    { id: 'map' as NavTab, label: 'Campus Map', icon: MapPin },
    { id: 'assistant' as NavTab, label: 'AI Campus Assistant', icon: Bot },
    { id: 'utilities' as NavTab, label: 'Student Utilities', icon: Layers },
    { id: 'announcements' as NavTab, label: 'Announcements', icon: BellRing },
    { id: 'report' as NavTab, label: 'Report an Issue', icon: AlertCircle },
    { id: 'saved' as NavTab, label: 'My Saved', icon: Bookmark },
    { id: 'profile' as NavTab, label: 'User Profile', icon: User },
    { id: 'admin' as NavTab, label: 'Admin Dashboard', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176B4D] flex items-center justify-center text-white shadow-sm">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none">SOA SmartHub</span>
              <span className="text-xs text-slate-500 mt-1 block">Smart Campus Portal 2026</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileOpen(false)} 
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isAdmin = item.id === 'admin';

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-left
                  ${isActive 
                    ? 'bg-[#176B4D] text-white shadow-sm shadow-[#176B4D]/20 font-semibold' 
                    : isAdmin 
                      ? 'text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200/60'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : isAdmin ? 'text-emerald-700' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
                {isAdmin && !isActive && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">
                    ADMIN
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Guest Access Card */}
        {isGuest && onOpenLogin && (
          <div className="p-4 m-4 rounded-2xl bg-[#E7F3ED] border border-[#176B4D]/20 text-xs">
            <span className="font-bold text-[#176B4D] block">Browsing as Guest</span>
            <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">Personal bookmarks and issue reports require sign in.</p>
            <button
              onClick={() => {
                onOpenLogin();
                setMobileOpen(false);
              }}
              className="mt-2.5 w-full py-2 px-3 rounded-xl bg-[#176B4D] text-white font-semibold text-xs hover:bg-[#145a3f] transition-colors shadow-2xs"
            >
              Student Login
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
