import React from 'react';
import { Lock, LogIn, UserPlus, X } from 'lucide-react';

interface SignInRequiredModalProps {
  isOpen: boolean;
  featureName: string;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const SignInRequiredModal: React.FC<SignInRequiredModalProps> = ({
  isOpen,
  featureName,
  onClose,
  onLogin,
  onRegister
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#176B4D] flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to use this feature</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            {featureName ? `"${featureName}"` : 'This personalized action'} requires an authenticated student account. Sign in or register to sync your bookmarks, file maintenance reports, and manage profile settings.
          </p>
        </div>

        {/* 3 Action Buttons: Login, Create Account, Cancel */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => {
              onClose();
              onLogin();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white font-semibold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onRegister();
            }}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-[#176B4D]" />
            <span>Create Account</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 font-medium text-xs transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
