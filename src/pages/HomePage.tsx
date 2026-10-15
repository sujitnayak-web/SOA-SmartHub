import React from 'react';
import { 
  Compass, 
  MapPin, 
  Bot, 
  Layers, 
  BellRing, 
  AlertCircle, 
  Bookmark, 
  ArrowRight, 
  Calendar, 
  Users, 
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
  CreditCard,
  BookOpen,
  Bus,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Building, Announcement, CampusEvent, NavTab, UserProfile } from '../types';

interface HomePageProps {
  currentUser?: UserProfile | null;
  buildings: Building[];
  announcements: announcementsType[];
  events: CampusEvent[];
  onNavigate: (tab: NavTab) => void;
  onOpenSearch: () => void;
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

type announcementsType = Announcement;

export const HomePage: React.FC<HomePageProps> = ({
  currentUser,
  buildings,
  announcements,
  events,
  onNavigate,
  onOpenSearch,
  isGuest,
  onRequireAuth
}) => {
  const publishedAnnouncements = announcements.filter(a => a.status === 'Published').slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcoming SOA SmartHub Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#176B4D] via-[#145a3f] to-[#0f442f] text-white p-8 md:p-10 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>SOA University • Smart Campus Platform</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {currentUser ? `Welcome back, ${currentUser.name}!` : 'Welcome to SOA SmartHub!'}
          </h2>
          
          <p className="text-emerald-100 text-sm md:text-base leading-relaxed mb-6">
            Your unified AI-powered digital campus for SOA University (ITER Campus). Explore interactive campus maps, consult the AI Assistant, browse library books and bus routes, and stay updated with official circulars.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onNavigate('map')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#176B4D] font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <MapPin className="w-4 h-4 text-[#176B4D]" /> 
              <span>Open Campus Map</span>
            </button>
            <button 
              onClick={() => onNavigate('assistant')}
              className="px-5 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 active:scale-95"
            >
              <Bot className="w-4 h-4 text-emerald-300" /> 
              <span>Ask AI Assistant</span>
            </button>
            <button 
              onClick={() => onNavigate('utilities')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/15 flex items-center gap-2 active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Student Utilities</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick-Access Cards: Campus Map, AI Assistant, Utilities, Announcements, Report Issue */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Core Campus Modules</h3>
          <span className="text-xs font-semibold text-slate-400">Direct Navigation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 1: Campus Map */}
          <button 
            onClick={() => onNavigate('map')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#176B4D]/50 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#176B4D] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D]">Campus Map</h4>
              <p className="text-xs text-slate-500 mt-1">E-Block, A-Block & ITER landmarks</p>
            </div>
            <span className="mt-4 text-xs font-bold text-[#176B4D] flex items-center gap-1">
              Explore <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Card 2: AI Assistant */}
          <button 
            onClick={() => onNavigate('assistant')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">AI Assistant</h4>
              <p className="text-xs text-slate-500 mt-1">Gemini 3.8 Flash campus Q&A</p>
            </div>
            <span className="mt-4 text-xs font-bold text-blue-700 flex items-center gap-1">
              Ask AI <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Card 3: Student Utilities */}
          <button 
            onClick={() => onNavigate('utilities')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700">Student Utilities</h4>
              <p className="text-xs text-slate-500 mt-1">Fees, library, buses & documents</p>
            </div>
            <span className="mt-4 text-xs font-bold text-purple-700 flex items-center gap-1">
              Services <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Card 4: Announcements */}
          <button 
            onClick={() => onNavigate('announcements')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs">
                <BellRing className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800">Announcements</h4>
              <p className="text-xs text-slate-500 mt-1">Exam circulars & calendar updates</p>
            </div>
            <span className="mt-4 text-xs font-bold text-amber-800 flex items-center gap-1">
              Circulars <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Card 5: Report Issue */}
          <button 
            onClick={() => {
              if (isGuest) {
                onRequireAuth?.('Submit a maintenance or IT report');
              } else {
                onNavigate('report');
              }
            }}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-lg transition-all text-left group flex flex-col justify-between col-span-2 sm:col-span-1"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-700">Report an Issue</h4>
              <p className="text-xs text-slate-500 mt-1">Wi-Fi, classroom & lab maintenance</p>
            </div>
            <span className="mt-4 text-xs font-bold text-rose-700 flex items-center gap-1">
              Report <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Latest Announcements & Student Services Highlights */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Latest Announcements Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-[#176B4D]" />
                <h3 className="text-lg font-bold text-slate-900">Latest Campus Announcements</h3>
              </div>
              <button 
                onClick={() => onNavigate('announcements')}
                className="text-xs font-bold text-[#176B4D] hover:underline flex items-center gap-1"
              >
                View All Notices <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {publishedAnnouncements.map((ann) => (
                <div 
                  key={ann.id}
                  onClick={() => onNavigate('announcements')}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-[#176B4D]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#176B4D] bg-[#E7F3ED] px-2 py-0.5 rounded">
                        {ann.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{ann.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors line-clamp-2">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {ann.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate max-w-[150px]">{ann.author}</span>
                    <span className="text-xs font-bold text-[#176B4D] flex items-center gap-0.5">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Services Section Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-700" />
                <h3 className="text-lg font-bold text-slate-900">Student Services Highlights</h3>
              </div>
              <button 
                onClick={() => onNavigate('utilities')}
                className="text-xs font-bold text-[#176B4D] hover:underline flex items-center gap-1"
              >
                Go to Hub <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Service 1: Fee Overview */}
              <div 
                onClick={() => onNavigate('utilities')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#176B4D] flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D]">Fee Breakdown</h4>
                  <p className="text-xs text-slate-500 mt-1">Illustrative tuition & exam dues overview</p>
                </div>
                <span className="mt-4 text-xs font-bold text-[#176B4D] flex items-center gap-1">
                  View Fees →
                </span>
              </div>

              {/* Service 2: Central Library */}
              <div 
                onClick={() => onNavigate('utilities')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Library Catalog</h4>
                  <p className="text-xs text-slate-500 mt-1">Search CS, AI, Math & reference books</p>
                </div>
                <span className="mt-4 text-xs font-bold text-blue-700 flex items-center gap-1">
                  Browse Books →
                </span>
              </div>

              {/* Service 3: College Buses */}
              <div 
                onClick={() => onNavigate('utilities')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
                    <Bus className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800">Bus Schedules</h4>
                  <p className="text-xs text-slate-500 mt-1">Routes for Cuttack & Bhubaneswar</p>
                </div>
                <span className="mt-4 text-xs font-bold text-amber-800 flex items-center gap-1">
                  View Routes →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Campus Quick Links & Campus Directory */}
        <div className="space-y-6">
          {/* Quick Links Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#176B4D]" />
              <h3 className="text-base font-bold text-slate-900">Campus Quick Links</h3>
            </div>
            
            <div className="space-y-2 text-xs">
              <a 
                href="https://soa.ac.in" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-xl border border-slate-200 hover:border-[#176B4D] bg-slate-50 hover:bg-emerald-50/50 flex items-center justify-between font-semibold text-slate-800 transition-colors"
              >
                <span>SOA Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <div 
                onClick={() => onNavigate('utilities')}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#176B4D] bg-slate-50 hover:bg-emerald-50/50 flex items-center justify-between font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <span>Academic Calendar 2026-27</span>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div 
                onClick={() => onNavigate('utilities')}
                className="p-3 rounded-xl border border-slate-200 hover:border-[#176B4D] bg-slate-50 hover:bg-emerald-50/50 flex items-center justify-between font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <span>Student Section Documentation</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div 
                onClick={() => onNavigate('assistant')}
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 flex items-center justify-between font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                <span>Ask AI About Fee Policies</span>
                <Bot className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Popular Buildings Shortcuts */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#176B4D]" />
                <h3 className="text-base font-bold text-slate-900">Key Campus Blocks</h3>
              </div>
              <button 
                onClick={() => onNavigate('map')}
                className="text-xs font-bold text-[#176B4D] hover:underline"
              >
                Full Map →
              </button>
            </div>

            <div className="space-y-3">
              {buildings.slice(0, 3).map((bldg) => (
                <div 
                  key={bldg.id}
                  onClick={() => onNavigate('map')}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-[#176B4D] bg-slate-50/60 hover:bg-white transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <img 
                    src={bldg.image} 
                    alt={bldg.name}
                    className="w-12 h-12 rounded-xl object-cover" 
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#176B4D] bg-emerald-50 px-1.5 py-0.5 rounded">
                      {bldg.code}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#176B4D] transition-colors mt-0.5">
                      {bldg.name}
                    </h5>
                    <span className="text-[11px] text-slate-400 block">{bldg.openHours.split('-')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
