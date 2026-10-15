import React, { useState } from 'react';
import { 
  BellRing, 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Bookmark, 
  Filter, 
  X, 
  AlertTriangle,
  Info,
  CheckCircle2,
  Share2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Announcement } from '../types';
import { BookmarkService } from '../services/campusServices';

interface AnnouncementsPageProps {
  announcements: Announcement[];
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ 
  announcements,
  isGuest,
  onRequireAuth
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Exact categories requested by user: All, Academic, Examination, Events, Student Services, Campus
  const categories = ['All', 'Academic', 'Examination', 'Events', 'Student Services', 'Campus'];

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesPri = selectedPriority === 'All' || a.priority === selectedPriority;
    return matchesSearch && matchesCat && matchesPri;
  });

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleBookmark = (ann: Announcement, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      onRequireAuth?.('Save announcement bookmark');
      return;
    }
    if (BookmarkService.isSaved(ann.id)) {
      BookmarkService.remove(ann.id);
    } else {
      BookmarkService.add({
        type: 'announcement',
        itemId: ann.id,
        title: ann.title,
        subtitle: `${ann.category} • ${ann.priority} Priority`
      });
    }
  };

  const getPriorityStyle = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rose-100 text-rose-800 border border-rose-200';
      case 'High':
      case 'Important':
        return 'bg-amber-100 text-amber-900 border border-amber-200';
      case 'Normal':
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const urgentOrImportant = filteredAnnouncements.filter(a => a.priority === 'Urgent' || a.priority === 'High');
  const standardNotices = filteredAnnouncements.filter(a => a.priority !== 'Urgent' && a.priority !== 'High');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Strict Demo Disclaimer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold tracking-wide">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                DEMO NOTICES • FOR PROTOTYPE PURPOSES ONLY
              </span>
              <span className="text-xs font-semibold text-slate-400">
                SOA SmartHub Circulars
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Announcements & Notices
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Explore 8 verified demo notices covering the Academic Calendar, Semester Exams, Central Library, Student Section documents, Bus schedules, and Hackathon registration.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 max-w-sm">
            <span className="font-bold text-slate-900 block mb-0.5">Prototype Advisory:</span>
            Sample circulars do not represent official university circulars or legally binding decisions. Confirm all dates with the Registrar.
          </div>
        </div>
      </div>

      {/* Search Bar and Category Filter Row */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notices by title, keyword, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#176B4D] shadow-2xs"
            />
          </div>

          {/* Priority Quick Filter */}
          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority:</span>
            {['All', 'Urgent', 'High', 'Normal'].map((pri) => (
              <button
                key={pri}
                onClick={() => setSelectedPriority(pri)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                  selectedPriority === pri 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {pri === 'High' ? 'Important' : pri}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Bar: All, Academic, Examination, Events, Student Services, Campus */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 shadow-2xs ${
                selectedCategory === cat 
                  ? 'bg-[#176B4D] text-white shadow-xs' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAnnouncements.map((ann) => {
          const isBookmarked = BookmarkService.isSaved(ann.id);
          const isHighPri = ann.priority === 'High' || ann.priority === 'Urgent';

          return (
            <div 
              key={ann.id}
              onClick={() => setSelectedAnnouncement(ann)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group shadow-xs ${
                isHighPri 
                  ? 'bg-white border-amber-200/90 hover:border-amber-400 hover:shadow-md' 
                  : 'bg-white border-slate-200 hover:border-[#176B4D]/40 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${getPriorityStyle(ann.priority)}`}>
                      {ann.priority === 'High' ? 'IMPORTANT' : ann.priority.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-bold text-[#176B4D] bg-[#E7F3ED] px-2.5 py-0.5 rounded-md">
                      {ann.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ann.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#176B4D] transition-colors leading-snug">
                  {ann.title}
                </h3>
                
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {ann.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] font-medium text-slate-500 truncate max-w-[200px]">
                  By {ann.author}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleToggleBookmark(ann, e)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked 
                        ? 'bg-amber-500 border-amber-500 text-white' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                    title="Bookmark Notice"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-bold text-[#176B4D] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-xs">
                    Read Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <BellRing className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">No matching announcements found</h4>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or switching category filters.</p>
        </div>
      )}

      {/* Full Notice Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[88vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close notice"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pr-10">
              <span className={`text-xs font-bold px-3 py-1 rounded-lg ${getPriorityStyle(selectedAnnouncement.priority)}`}>
                {selectedAnnouncement.priority === 'High' ? 'IMPORTANT' : selectedAnnouncement.priority.toUpperCase()} PRIORITY
              </span>
              <span className="text-xs font-bold text-[#176B4D] bg-[#E7F3ED] px-3 py-1 rounded-lg">
                {selectedAnnouncement.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {selectedAnnouncement.date}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedAnnouncement.title}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span>Issued by: <strong className="text-slate-700">{selectedAnnouncement.author}</strong></span>
                <span>•</span>
                <span>Audience: {selectedAnnouncement.targetAudience}</span>
              </div>
            </div>

            {/* Notice Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 leading-relaxed">
              <strong>Notice Overview:</strong> {selectedAnnouncement.summary}
            </div>

            {/* Full Notice Content */}
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap space-y-3 font-normal">
              <p>{selectedAnnouncement.content}</p>
            </div>

            {/* Demo Notice Warning Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Demo Notice Disclaimer:</strong> This circular is published for the SOA SmartHub Ideas Sprint prototype demonstration. Do not treat dates, payment instructions, or deadlines as official university decisions.
              </span>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={(e) => handleToggleBookmark(selectedAnnouncement, e)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${
                  BookmarkService.isSaved(selectedAnnouncement.id)
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{BookmarkService.isSaved(selectedAnnouncement.id) ? 'Saved to Bookmarks' : 'Bookmark Notice'}</span>
              </button>

              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-6 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white text-xs font-bold transition-colors shadow-2xs"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
