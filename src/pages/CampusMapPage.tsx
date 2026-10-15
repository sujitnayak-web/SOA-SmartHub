import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Compass, 
  Navigation, 
  Layers, 
  Clock, 
  CheckCircle, 
  Bookmark, 
  X,
  Sparkles,
  Info,
  Car,
  Utensils,
  BookOpen,
  Building2,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Building, Facility } from '../types';
import { BookmarkService } from '../services/campusServices';

interface CampusMapPageProps {
  buildings: Building[];
  facilities: Facility[];
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

export const CampusMapPage: React.FC<CampusMapPageProps> = ({ 
  buildings, 
  facilities,
  isGuest,
  onRequireAuth
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(buildings[0] || null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Routing state
  const [startBuildingId, setStartBuildingId] = useState<string>(buildings[4]?.id || buildings[0]?.id || '');
  const [destBuildingId, setDestBuildingId] = useState<string>(buildings[0]?.id || '');
  const [showNavComingSoonModal, setShowNavComingSoonModal] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const filteredBuildings = buildings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || b.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSelectBuilding = (b: Building) => {
    setSelectedBuilding(b);
    setDestBuildingId(b.id);
    setIsSaved(BookmarkService.isSaved(b.id));
  };

  const handleFindRoute = () => {
    setShowNavComingSoonModal(true);
  };

  const toggleBookmark = () => {
    if (!selectedBuilding) return;
    if (isGuest) {
      onRequireAuth?.('Save a personal building bookmark');
      return;
    }
    if (isSaved) {
      BookmarkService.remove(selectedBuilding.id);
      setIsSaved(false);
    } else {
      BookmarkService.add({
        type: 'building',
        itemId: selectedBuilding.id,
        title: selectedBuilding.name,
        subtitle: `${selectedBuilding.code} • ${selectedBuilding.category}`
      });
      setIsSaved(true);
    }
  };

  const buildingFacilities = facilities.filter(f => f.buildingId === selectedBuilding?.id);

  const getCategoryColor = (cat: Building['category']) => {
    switch (cat) {
      case 'academic': return 'bg-emerald-500 text-white';
      case 'library': return 'bg-blue-500 text-white';
      case 'administrative': return 'bg-purple-500 text-white';
      case 'dining': return 'bg-amber-500 text-white';
      case 'recreational': return 'bg-rose-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getCategoryBadgeClass = (cat: Building['category']) => {
    switch (cat) {
      case 'academic': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'library': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'administrative': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'dining': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'recreational': return 'bg-rose-50 text-rose-800 border-rose-200';
      default: return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const startBldg = buildings.find(b => b.id === startBuildingId) || buildings[0];
  const destBldg = buildings.find(b => b.id === destBuildingId) || buildings[1];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Demo Label & Fast Route Selector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3ED] text-[#176B4D] border border-[#176B4D]/25 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#176B4D] animate-pulse" />
                DEMO CAMPUS MAP • SOA ITER CAMPUS
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
                Bhubaneswar, Odisha
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Campus Map & Landmarks
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Explore key campus blocks including E-Block, A-Block, Central Library, Administrative Block, Main Gate, Cafeteria, and Auditorium.
            </p>
          </div>

          {/* Route Planning Selector */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Navigation className="w-4 h-4 text-[#176B4D] shrink-0" />
              <span>Route:</span>
            </div>

            <div className="flex flex-1 items-center gap-2">
              <select 
                value={startBuildingId} 
                onChange={(e) => setStartBuildingId(e.target.value)}
                className="w-full sm:w-auto text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 shadow-2xs focus:outline-none"
              >
                {buildings.map(b => (
                  <option key={b.id} value={b.id}>From: {b.code} - {b.name.split('(')[0]}</option>
                ))}
              </select>

              <span className="text-slate-400 text-xs">→</span>

              <select 
                value={destBuildingId} 
                onChange={(e) => setDestBuildingId(e.target.value)}
                className="w-full sm:w-auto text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 shadow-2xs focus:outline-none"
              >
                {buildings.map(b => (
                  <option key={b.id} value={b.id}>To: {b.code} - {b.name.split('(')[0]}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleFindRoute}
              className="px-4 py-2 bg-[#176B4D] hover:bg-[#145a3f] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Find Route</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Layout: Left Canvas + Right Building Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Schematic SVG Map Representation */}
        <div className="lg:col-span-2 bg-[#0d1f17] rounded-3xl border border-[#176B4D]/30 relative overflow-hidden flex flex-col min-h-[540px] shadow-lg">
          {/* Top Floating Map Info Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs font-medium flex items-center gap-2 pointer-events-auto shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-emerald-300">DEMO MAP</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">Click any building marker to inspect</span>
            </div>

            <div className="hidden sm:flex bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-slate-300 gap-3 pointer-events-auto shadow-md">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Academic</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Library</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> Admin</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Dining</span>
            </div>
          </div>

          {/* Interactive Schematic SVG Canvas */}
          <div className="flex-1 relative w-full h-[540px] flex items-center justify-center overflow-hidden select-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#176B4D20_1px,transparent_1px),linear-gradient(to_bottom,#176B4D20_1px,transparent_1px)] bg-[size:36px_36px]" />

            {/* Campus Pathways (SVG Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#176B4D" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              
              {/* Campus Main Loop Roads */}
              <path d="M 18% 78% L 15% 60% L 38% 62% L 30% 38% L 50% 32% L 45% 18% L 68% 45% L 74% 24%" fill="none" stroke="url(#roadGrad)" strokeWidth="3" strokeDasharray="6,4" />
              <path d="M 18% 78% L 38% 62% L 68% 45%" fill="none" stroke="#176B4D" strokeOpacity="0.3" strokeWidth="2" />
              <path d="M 30% 38% L 68% 45%" fill="none" stroke="#176B4D" strokeOpacity="0.25" strokeWidth="2" />
              <path d="M 50% 32% L 74% 24%" fill="none" stroke="#176B4D" strokeOpacity="0.25" strokeWidth="2" />
            </svg>

            {/* Campus Compass Rose */}
            <div className="absolute bottom-5 right-5 pointer-events-none opacity-40 flex flex-col items-center">
              <Compass className="w-10 h-10 text-emerald-400" />
              <span className="text-[10px] text-emerald-200 font-mono mt-0.5 font-bold">N</span>
            </div>

            {/* Campus Main Gate Indicator */}
            <div className="absolute bottom-4 left-6 text-emerald-300/80 text-[11px] font-mono tracking-wider flex items-center gap-1.5">
              <span>← ITER Main Road (Jagamara)</span>
            </div>

            {/* Interactive Building Markers */}
            {buildings.map((bldg) => {
              const isSelected = selectedBuilding?.id === bldg.id;
              const isStart = startBuildingId === bldg.id;
              const isDest = destBuildingId === bldg.id;

              return (
                <div 
                  key={bldg.id}
                  style={{ left: `${bldg.coordinates.x}%`, top: `${bldg.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-200 cursor-pointer group"
                  onClick={() => handleSelectBuilding(bldg)}
                >
                  {/* Outer Pulsing Ring if Selected or in Route */}
                  {(isSelected || isStart || isDest) && (
                    <span className="absolute -inset-2.5 rounded-2xl bg-emerald-400/30 animate-ping pointer-events-none" />
                  )}

                  {/* Marker Node Card */}
                  <div className={`flex flex-col items-center p-2 rounded-2xl border transition-all duration-150 backdrop-blur-md shadow-lg ${
                    isSelected 
                      ? 'bg-emerald-950/90 border-emerald-400 scale-110 ring-2 ring-emerald-400/40' 
                      : 'bg-slate-900/85 border-slate-700/80 hover:border-emerald-400/60 hover:scale-105'
                  }`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${getCategoryColor(bldg.category)} shadow-xs`}>
                      {bldg.code.slice(0, 3)}
                    </div>
                    <span className="mt-1 text-[11px] font-bold text-white whitespace-nowrap px-1">
                      {bldg.name.split('(')[0].trim()}
                    </span>
                    <span className="text-[9px] text-emerald-300/90 uppercase tracking-wider font-mono">
                      {bldg.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Quick Landmark Chips */}
          <div className="bg-slate-950/80 border-t border-slate-800 p-3 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] text-slate-400 font-semibold px-2 shrink-0">Quick Select:</span>
            {buildings.map(b => (
              <button
                key={b.id}
                onClick={() => handleSelectBuilding(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedBuilding?.id === b.id 
                    ? 'bg-[#176B4D] text-white font-bold' 
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>{b.code}</span>
                <span className="text-[11px] text-slate-300">{b.name.split('(')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Selected Building Inspection Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs space-y-6">
          {selectedBuilding ? (
            <div className="space-y-5">
              {/* Building Photo & Status */}
              <div className="relative rounded-2xl overflow-hidden h-44 bg-slate-100">
                <img 
                  src={selectedBuilding.image} 
                  alt={selectedBuilding.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
                      {selectedBuilding.code}
                    </span>
                    <h4 className="text-base font-bold text-white leading-tight mt-1">
                      {selectedBuilding.name}
                    </h4>
                  </div>
                  <button 
                    onClick={toggleBookmark}
                    className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                      isSaved ? 'bg-amber-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    title={isSaved ? "Saved to Bookmarks" : "Save Bookmark"}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category & Hours Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getCategoryBadgeClass(selectedBuilding.category)}`}>
                  {selectedBuilding.category.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {selectedBuilding.openHours}
                </span>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg font-semibold">
                  {selectedBuilding.floors} Floors
                </span>
              </div>

              {/* Description */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview</h5>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedBuilding.description}
                </p>
              </div>

              {/* Key Features */}
              {selectedBuilding.features && selectedBuilding.features.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Facilities</h5>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedBuilding.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-[#176B4D] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Department Facilities in this Building */}
              {buildingFacilities.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Verified Rooms & Labs ({buildingFacilities.length})
                  </h5>
                  <div className="space-y-2">
                    {buildingFacilities.slice(0, 3).map(fac => (
                      <div key={fac.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">{fac.name}</span>
                          <span className="text-slate-500 text-[11px]">{fac.floor} • Capacity: {fac.capacity}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {fac.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Select any building marker to inspect details
            </div>
          )}

          {/* Action to set as Route Target */}
          {selectedBuilding && (
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => {
                  setStartBuildingId(selectedBuilding.id);
                  handleFindRoute();
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Start From Here
              </button>
              <button 
                onClick={() => {
                  setDestBuildingId(selectedBuilding.id);
                  handleFindRoute();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white text-xs font-bold transition-colors shadow-2xs"
              >
                Navigate Here
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Campus Buildings Directory Filter & Searchable List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Search Campus Buildings & Directory</h3>
            <p className="text-xs text-slate-500">Filter all academic blocks, centers, and student services</p>
          </div>

          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by building name or code (e.g. E-Block, C-LIB)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', 'academic', 'library', 'administrative', 'dining', 'recreational'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors capitalize ${
                categoryFilter === cat 
                  ? 'bg-[#176B4D] text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Buildings Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {filteredBuildings.map(bldg => {
            const isSelected = selectedBuilding?.id === bldg.id;
            return (
              <div 
                key={bldg.id}
                onClick={() => handleSelectBuilding(bldg)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected 
                    ? 'border-[#176B4D] bg-emerald-50/50 shadow-sm' 
                    : 'border-slate-200 hover:border-[#176B4D]/40 bg-white hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {bldg.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getCategoryBadgeClass(bldg.category)}`}>
                      {bldg.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors">
                    {bldg.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {bldg.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{bldg.floors} Floors • {bldg.openHours.split('-')[0]}</span>
                  <span className="font-bold text-[#176B4D] flex items-center gap-0.5">
                    View <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REQUIRED POLISHED POPUP: "Campus Navigation — Coming Soon" */}
      {showNavComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-7 relative space-y-5 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowNavComingSoonModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E7F3ED] text-[#176B4D] flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#176B4D] uppercase tracking-wider">Feature In Development</span>
                <h3 className="text-xl font-bold text-slate-900">Campus Navigation — Coming Soon</h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-medium text-slate-900">
                Smart campus navigation with live routes, walking directions, accessibility preferences, and real-time campus updates is coming soon.
              </p>
              <p className="text-slate-500">
                During this Ideas Sprint prototype, you can inspect building locations, facilities, and floor layouts on the interactive schematic map above.
              </p>
            </div>

            {/* Selected Route Preview */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between text-xs text-emerald-950 font-medium">
              <div>
                <span className="text-[10px] text-emerald-800 block uppercase font-bold">Planned Route</span>
                <span>{startBldg.name.split('(')[0]} → {destBldg.name.split('(')[0]}</span>
              </div>
              <span className="text-[10px] font-mono bg-white px-2 py-1 rounded-md text-emerald-800 font-bold border border-emerald-200">
                Est. ~4 mins walk
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowNavComingSoonModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white font-bold text-xs transition-colors shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
