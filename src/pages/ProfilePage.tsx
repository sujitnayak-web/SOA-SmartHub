import React, { useState } from 'react';
import { User, Bell, Mail, Shield, Bookmark, CheckCircle2, Sparkles, Building2, AlertCircle } from 'lucide-react';
import { BookmarkItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthService, ACADEMIC_YEAR_OPTIONS } from '../services/authService';

interface ProfilePageProps {
  bookmarks: BookmarkItem[];
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ bookmarks, isGuest, onRequireAuth }) => {
  const { currentUser, authUser, refreshProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [academicYear, setAcademicYear] = useState('1st Year');
  const [notificationsEnabled, setNotificationsEnabled] = useState(currentUser?.notificationsEnabled ?? true);
  const [emailAlerts, setEmailAlerts] = useState(currentUser?.emailAlerts ?? true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (isGuest || !currentUser || !authUser) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#E7F3ED] text-[#176B4D] flex items-center justify-center mx-auto">
          <User className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Student Profile & Settings</h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          You are currently exploring SOA SmartHub in <strong>Guest Mode</strong>. Personal profile records, student credentials, and notification settings require signing in with a student account.
        </p>
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onRequireAuth?.('Access personalized student profile')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#176B4D] text-white text-xs font-semibold shadow-2xs hover:bg-[#145a3f] transition-colors"
          >
            Sign In with Student ID
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await AuthService.updateProfile(authUser.id, {
        fullName: name.trim(),
        department: department.trim(),
        academicYear
      });
      await refreshProfile();
      setSuccessMsg('Profile updated successfully in Supabase!');
    } catch (err: any) {
      console.error('Profile update error:', err);
      setErrorMsg(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B4D] uppercase tracking-wider mb-1">
            <User className="w-4 h-4" /> Supabase Account & Preferences
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Student Profile Settings</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your authenticated identity, academic branch, and notification preferences.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Avatar & ID Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center space-y-4 shadow-2xs">
          <div className="relative w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-emerald-50 shadow-md">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{currentUser.name}</h3>
            <span className="text-xs text-slate-500 truncate block">{currentUser.email}</span>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">Registration No:</span>
              <span className="font-mono font-semibold text-slate-800">{currentUser.studentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Role:</span>
              <span className="font-semibold text-[#176B4D]">{currentUser.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Saved Items:</span>
              <span className="font-semibold text-slate-800">{bookmarks.length} Bookmarks</span>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Edit Form & Preferences */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-2xs">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Authenticated Credentials & Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Branch</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                  >
                    {ACADEMIC_YEAR_OPTIONS.map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#176B4D]" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Push Notifications</span>
                      <span className="text-[11px] text-slate-500">Receive campus announcements and shuttle updates</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B4D] focus:ring-[#176B4D]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#176B4D]" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Email Digest</span>
                      <span className="text-[11px] text-slate-500">Weekly campus events and library schedules</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B4D] focus:ring-[#176B4D]"
                  />
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] disabled:opacity-50 text-white text-xs font-semibold shadow-2xs"
              >
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
