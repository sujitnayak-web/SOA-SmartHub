import React from 'react';
import { Compass, ArrowRight, LogIn, UserPlus, Shield, Sparkles, MapPin, Layers, Bot, BellRing } from 'lucide-react';

interface GuestEntryScreenProps {
  onContinueAsGuest: () => void;
  onSelectLogin: () => void;
  onSelectRegister: () => void;
}

export const GuestEntryScreen: React.FC<GuestEntryScreenProps> = ({
  onContinueAsGuest,
  onSelectLogin,
  onSelectRegister
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-8">
        {/* Brand & App Identity */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#176B4D] flex items-center justify-center text-white shadow-md mx-auto">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#176B4D] uppercase tracking-wider">Ideasprint 2026 Smart Campus</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">SOA SmartHub</h1>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Your unified portal for smart campus navigation, facility directory, official notices, and student utilities.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-3 py-1 border-y border-slate-100 text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-[#176B4D] shrink-0" />
            <span>Interactive Campus Map</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700">
            <Layers className="w-4 h-4 text-[#176B4D] shrink-0" />
            <span>Facility & Lab Directory</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700">
            <BellRing className="w-4 h-4 text-[#176B4D] shrink-0" />
            <span>Official Announcements</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 text-xs text-slate-700">
            <Bot className="w-4 h-4 text-[#176B4D] shrink-0" />
            <span>AI Campus Assistant</span>
          </div>
        </div>

        {/* 3 Clear Options: 1. Continue as Guest (Primary), 2. Student Login, 3. Create Student Account */}
        <div className="space-y-3 pt-2">
          {/* Option 1: Continue as Guest (PRIMARY ACTION) */}
          <button
            onClick={onContinueAsGuest}
            className="w-full py-4 px-6 rounded-2xl bg-[#176B4D] hover:bg-[#145a3f] active:scale-[0.99] text-white font-bold text-sm transition-all shadow-md flex items-center justify-between group"
          >
            <div className="text-left">
              <span className="block text-sm font-bold">Continue as Guest</span>
              <span className="block text-xs font-normal text-emerald-100 mt-0.5">Explore campus map, utilities, notices & AI assistant</span>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-slate-400">or sign in with student ID</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Option 2: Student Login */}
          <button
            onClick={onSelectLogin}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2.5 group"
          >
            <LogIn className="w-4 h-4 text-[#176B4D]" />
            <span>Student Login</span>
          </button>

          {/* Option 3: Create Student Account */}
          <button
            onClick={onSelectRegister}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-emerald-50/50 border border-emerald-200 text-[#176B4D] font-semibold text-sm transition-all shadow-2xs flex items-center justify-center gap-2.5 group"
          >
            <UserPlus className="w-4 h-4 text-[#176B4D]" />
            <span>Create Student Account</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Guest mode provides full access to public campus maps, directories, circulars, and the AI assistant.
          </p>
        </div>
      </div>
    </div>
  );
};
