import React, { useState } from 'react';
import { Bookmark, Trash2, MapPin, Layers, BellRing, ArrowRight } from 'lucide-react';
import { BookmarkItem, NavTab } from '../types';
import { BookmarkService } from '../services/campusServices';

interface SavedPageProps {
  bookmarks: BookmarkItem[];
  onUpdateBookmarks: () => void;
  onNavigate: (tab: NavTab) => void;
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({ 
  bookmarks, 
  onUpdateBookmarks, 
  onNavigate,
  isGuest,
  onRequireAuth
}) => {
  const handleRemove = (itemId: string) => {
    BookmarkService.remove(itemId);
    onUpdateBookmarks();
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B4D] uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" /> Personal Saved Items
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Bookmarked Resources</h2>
          <p className="text-sm text-slate-500 mt-1">
            Quickly access your saved campus buildings, laboratories, student services, and announcements.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-emerald-50 text-[#176B4D] text-xs font-bold">
          {bookmarks.length} Saved Items
        </div>
      </div>

      {isGuest && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-amber-600 shrink-0" />
            <span>You are browsing in <strong>Guest Mode</strong>. To sync your bookmarks across sessions and devices, sign in with your student account.</span>
          </div>
          <button
            onClick={() => onRequireAuth?.('Sync personal bookmarks')}
            className="px-3 py-1.5 rounded-lg bg-amber-800 text-white font-semibold text-xs hover:bg-amber-900 shrink-0 shadow-2xs"
          >
            Sign In
          </button>
        </div>
      )}

      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-3">
          <Bookmark className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="text-base font-bold text-slate-900">No saved items yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You can bookmark buildings on the campus map, facilities in student utilities, or notices in announcements.
          </p>
          <button 
            onClick={() => onNavigate('map')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#176B4D] text-white text-xs font-semibold shadow-2xs hover:bg-[#145a3f]"
          >
            Explore Campus Map
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <div key={bm.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#176B4D] flex items-center justify-center shrink-0">
                  {bm.type === 'building' && <MapPin className="w-5 h-5" />}
                  {bm.type === 'facility' && <Layers className="w-5 h-5" />}
                  {bm.type === 'announcement' && <BellRing className="w-5 h-5" />}
                  {bm.type === 'utility' && <Bookmark className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{bm.type}</span>
                    <span className="text-xs text-slate-400">Saved on {bm.savedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{bm.title}</h4>
                  <p className="text-xs text-slate-500">{bm.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    if (bm.type === 'building') onNavigate('map');
                    else if (bm.type === 'facility') onNavigate('utilities');
                    else if (bm.type === 'announcement') onNavigate('announcements');
                    else onNavigate('utilities');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRemove(bm.itemId)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
