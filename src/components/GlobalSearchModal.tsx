import React, { useState } from 'react';
import { Search, MapPin, Layers, BellRing, Bot, X, ArrowRight } from 'lucide-react';
import { Building, Facility, Announcement, UtilityService, NavTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildings: Building[];
  facilities: Facility[];
  announcements: Announcement[];
  utilities: UtilityService[];
  onNavigate: (tab: NavTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  buildings,
  facilities,
  announcements,
  utilities,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase().trim();

  const matchedBuildings = lowerQuery ? buildings.filter(b => b.name.toLowerCase().includes(lowerQuery) || b.code.toLowerCase().includes(lowerQuery) || b.description.toLowerCase().includes(lowerQuery)) : [];
  const matchedFacilities = lowerQuery ? facilities.filter(f => f.name.toLowerCase().includes(lowerQuery) || f.buildingName.toLowerCase().includes(lowerQuery)) : [];
  const matchedAnnouncements = lowerQuery ? announcements.filter(a => a.title.toLowerCase().includes(lowerQuery) || a.summary.toLowerCase().includes(lowerQuery)) : [];
  const matchedUtilities = lowerQuery ? utilities.filter(u => u.title.toLowerCase().includes(lowerQuery) || u.description.toLowerCase().includes(lowerQuery)) : [];

  const hasResults = matchedBuildings.length > 0 || matchedFacilities.length > 0 || matchedAnnouncements.length > 0 || matchedUtilities.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search campus buildings, labs, services, announcements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1">
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!query && (
            <div className="py-12 text-center text-slate-400">
              <Bot className="w-10 h-10 mx-auto text-slate-300 mb-3 animate-bounce" />
              <p className="text-sm font-medium text-slate-700">Type to search across the entire SOA SmartHub campus directory</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Library", "Turing", "Hackathon", or "Wi-Fi"</p>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Check spelling or try a broader search term.</p>
            </div>
          )}

          {matchedBuildings.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Buildings ({matchedBuildings.length})
              </h3>
              <div className="space-y-1.5">
                {matchedBuildings.map(b => (
                  <div 
                    key={b.id} 
                    onClick={() => { onNavigate('map'); onClose(); }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-mono font-semibold text-[#176B4D] bg-emerald-50 px-2 py-0.5 rounded">{b.code}</span>
                      <h4 className="text-sm font-semibold text-slate-900 mt-1">{b.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{b.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#176B4D] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedFacilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Facilities & Labs ({matchedFacilities.length})
              </h3>
              <div className="space-y-1.5">
                {matchedFacilities.map(f => (
                  <div 
                    key={f.id} 
                    onClick={() => { onNavigate('utilities'); onClose(); }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition-colors group"
                  >
                    <div>
                      <span className="text-xs text-emerald-800 font-medium">{f.buildingName} • {f.floor}</span>
                      <h4 className="text-sm font-semibold text-slate-900">{f.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>Capacity: {f.capacity}</span>
                        <span>·</span>
                        <span>{f.status}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#176B4D] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedAnnouncements.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5" /> Announcements ({matchedAnnouncements.length})
              </h3>
              <div className="space-y-1.5">
                {matchedAnnouncements.map(a => (
                  <div 
                    key={a.id} 
                    onClick={() => { onNavigate('announcements'); onClose(); }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">{a.category}</span>
                        <span className="text-xs text-slate-400">{a.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 mt-1">{a.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{a.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#176B4D] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedUtilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Student Utilities ({matchedUtilities.length})
              </h3>
              <div className="space-y-1.5">
                {matchedUtilities.map(u => (
                  <div 
                    key={u.id} 
                    onClick={() => { onNavigate('utilities'); onClose(); }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition-colors group"
                  >
                    <div>
                      <span className="text-xs text-emerald-800 font-medium">{u.category}</span>
                      <h4 className="text-sm font-semibold text-slate-900">{u.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{u.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#176B4D] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span className="font-medium text-slate-700">SOA SmartHub Search v1.0</span>
        </div>
      </div>
    </div>
  );
};
