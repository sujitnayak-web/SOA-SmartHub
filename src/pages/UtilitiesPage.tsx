import React, { useState } from 'react';
import { 
  CreditCard, 
  BookOpen, 
  Bus, 
  FileText, 
  Calendar, 
  Award, 
  HelpCircle, 
  Building2, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  X, 
  Phone, 
  ShieldCheck, 
  Info, 
  ChevronRight,
  Bookmark,
  Users,
  Compass,
  GraduationCap,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { UtilityService, Facility, LibraryBook, BusRoute, FeeItem } from '../types';
import { DEMO_FEE_ITEMS, DEMO_LIBRARY_BOOKS, DEMO_BUS_ROUTES } from '../data/mockData';

interface UtilitiesPageProps {
  utilities: UtilityService[];
  facilities: Facility[];
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

type UtilityTab = 'all' | 'fees' | 'library' | 'transport' | 'student-section' | 'faq';

interface ComingSoonModalData {
  isOpen: boolean;
  title: string;
  subtitle: string;
  description: string;
  instructions: string;
  extraBadge?: string;
}

export const UtilitiesPage: React.FC<UtilitiesPageProps> = ({ 
  utilities, 
  facilities,
  isGuest,
  onRequireAuth 
}) => {
  const [activeTab, setActiveTab] = useState<UtilityTab>('all');
  
  // Library sub-state
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryCat, setLibraryCat] = useState('All');

  // Modal State
  const [modalData, setModalData] = useState<ComingSoonModalData>({
    isOpen: false,
    title: '',
    subtitle: '',
    description: '',
    instructions: ''
  });

  // Calendar info modal state
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);

  const openComingSoon = (
    title: string, 
    subtitle: string, 
    description: string, 
    instructions: string,
    extraBadge?: string
  ) => {
    setModalData({
      isOpen: true,
      title,
      subtitle,
      description,
      instructions,
      extraBadge
    });
  };

  const closeModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
  };

  // Filter library books
  const filteredBooks = DEMO_LIBRARY_BOOKS.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(librarySearch.toLowerCase()) || 
                          b.author.toLowerCase().includes(librarySearch.toLowerCase()) ||
                          b.isbn.includes(librarySearch);
    const matchesCat = libraryCat === 'All' || b.category === libraryCat;
    return matchesSearch && matchesCat;
  });

  const totalFeeAmount = DEMO_FEE_ITEMS.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3ED] text-[#176B4D] border border-[#176B4D]/20 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#176B4D]" />
                UNIFIED SERVICE HUB
              </span>
              <span className="text-xs font-semibold text-slate-400">
                SOA SmartHub Phase 2
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Utilities & Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Access semester fee overviews, Central Library catalog, university bus schedules, student section requests, and academic resources.
            </p>
          </div>

          {/* Tab Navigation Switcher */}
          <div className="flex flex-wrap items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 gap-1">
            {[
              { id: 'all', label: 'All Services', icon: Sparkles },
              { id: 'fees', label: 'Fee Payment', icon: CreditCard },
              { id: 'library', label: 'Library', icon: BookOpen },
              { id: 'transport', label: 'Bus Services', icon: Bus },
              { id: 'student-section', label: 'Student Section', icon: FileText },
              { id: 'faq', label: 'Help & FAQ', icon: HelpCircle },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as UtilityTab)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-white text-[#176B4D] shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION A: FEE PAYMENT */}
      {(activeTab === 'all' || activeTab === 'fees') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#176B4D]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">A. Semester Fee Overview</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    ILLUSTRATIVE DEMO DATA
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Review sample tuition fees, examination dues, and institutional charges.
                </p>
              </div>
            </div>

            <button
              onClick={() => openComingSoon(
                'Online Fee Payment — Coming Soon',
                'Payment Gateway in Development',
                'Digital fee settlement through net banking, UPI, and debit cards will be supported in a future release of SOA SmartHub.',
                'Please do not attempt to enter payment credentials. For official fee submission and receipts, please contact the Accounts Section at Administrative Block.'
              )}
              className="px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Fees</span>
            </button>
          </div>

          {/* Fee Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono tracking-wider">
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Indicative Due Date</th>
                  <th className="py-2.5 px-3 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEMO_FEE_ITEMS.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.description}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        Tuition & Academic
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-600">{item.dueDate}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-emerald-50/50 font-bold">
                  <td colSpan={3} className="py-3.5 px-3 text-slate-900 text-sm">
                    Total Illustrative Semester Dues:
                  </td>
                  <td className="py-3.5 px-3 text-right text-base text-[#176B4D]">
                    ₹{totalFeeAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              <strong>Notice:</strong> All displayed fee figures are purely illustrative prototype demonstrations and do not represent actual student dues or invoices.
            </span>
          </div>
        </div>
      )}

      {/* SECTION B: LIBRARY SERVICES */}
      {(activeTab === 'all' || activeTab === 'library') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">B. Central Library Services</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    CATALOG PREVIEW
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Search textbook availability and explore reference titles in the Central Knowledge Center.
                </p>
              </div>
            </div>

            {/* Book Search Bar */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Computer Science', 'AI & Data Science', 'Mathematics', 'Electronics'].map(cat => (
              <button
                key={cat}
                onClick={() => setLibraryCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  libraryCat === cat ? 'bg-[#176B4D] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between group shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {book.isbn}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      book.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {book.available ? `${book.availableCopies} Available` : 'Reserved'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#176B4D] transition-colors line-clamp-2">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    By {book.author}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {book.category}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Total: {book.totalCopies} copies</span>
                  <button
                    disabled={!book.available}
                    onClick={() => openComingSoon(
                      'Library Book Issuing — Coming Soon',
                      book.title,
                      'Digital book reservation, renewal, and automated pickup lockers are coming soon to SOA SmartHub.',
                      'No real book has been reserved. Please carry your physical student ID card to the Central Library Circulation Desk on the Ground Floor.'
                    )}
                    className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
                  >
                    Issue Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION C: COLLEGE BUS SERVICES */}
      {(activeTab === 'all' || activeTab === 'transport') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-800">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">C. College Bus Services</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    DEMO TIMINGS
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Illustrative campus bus routes connecting Cuttack, Bhubaneswar, Patia, and Jagamara.
                </p>
              </div>
            </div>

            <button
              onClick={() => openComingSoon(
                'College Bus Booking — Coming Soon',
                'Live Bus Pass & Seat Allocation',
                'Smart bus pass renewals, seat reservations, and real-time GPS tracking will be available in future releases.',
                'No seat has been reserved. For official university bus passes and route inquiries, visit the Transport Department near the Main Gate.'
              )}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <Bus className="w-4 h-4" />
              <span>Book Bus Seat</span>
            </button>
          </div>

          {/* Bus Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_BUS_ROUTES.map((route) => (
              <div key={route.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    {route.routeNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{route.shift}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{route.name}</h4>
                <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{route.timing}</span>
                </div>

                {/* Stops */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Key Stops:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {route.stops.map((stop, idx) => (
                      <span key={idx} className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Bus No: {route.busNumber}</span>
                  <button
                    onClick={() => openComingSoon(
                      'College Bus Booking — Coming Soon',
                      route.name,
                      `Online seat allocation for ${route.routeNumber} will be supported in an upcoming phase.`,
                      'Please verify pickup spots and pass fees directly at the campus transport counter.'
                    )}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    Reserve Seat →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              <strong>Note:</strong> Bus schedules and stop listings are unverified demo mockups provided for Ideasprint prototype evaluation.
            </span>
          </div>
        </div>
      )}

      {/* SECTION D: STUDENT SECTION & DOCUMENT SERVICES */}
      {(activeTab === 'all' || activeTab === 'student-section') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-7 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">D. Student Section & Academic Documentation</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  ADMIN BLOCK • 1ST FLOOR
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official certificates, transcript processing, document authentication, and exam schedules.
              </p>
            </div>
          </div>

          {/* Student Section Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Bonafide Certificate */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                  Certificate Request
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Bonafide Certificate Request</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Required for education loans, passport applications, scholarship submissions, and railway concessions.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div>• Processing Time: 2-3 Working Days</div>
                  <div>• Location: Admin Block Desk #04</div>
                </div>
              </div>
              <button
                onClick={() => openComingSoon(
                  'Bonafide Request — Coming Soon',
                  'Document Issuance Portal',
                  'Online application submission, automated clearance verification, and digitally signed PDF generation will be supported in a future release.',
                  'Please collect the physical bonafide application form from the Student Section (Admin Block, 1st Floor).'
                )}
                className="w-full py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
              >
                Request Bonafide
              </button>
            </div>

            {/* 2. Student ID Card Assistance */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                  Identity Card
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Student ID Card Assistance</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Replacement for lost smart cards, RFID chip reprograming for library access, and fresh batch issuance.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div>• Processing Time: Same Day / Next Day</div>
                  <div>• Requirements: FIR copy for lost cards</div>
                </div>
              </div>
              <button
                onClick={() => openComingSoon(
                  'ID Card Assistance — Coming Soon',
                  'Smart Card Management',
                  'Online ID card duplicate requests, digital virtual campus ID, and lost card blocking are coming soon.',
                  'Please visit the Student Welfare desk at Admin Block with your enrollment receipt.'
                )}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
              >
                Request ID Card
              </button>
            </div>

            {/* 3. Academic Transcript Request */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                  Academic Records
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Academic Transcript Request</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Official sealed grade transcripts and semester mark sheets for higher education abroad or corporate verification.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div>• Processing Time: 5-7 Working Days</div>
                  <div>• Dispatch: Sealed envelopes / WES</div>
                </div>
              </div>
              <button
                onClick={() => openComingSoon(
                  'Transcript Request — Coming Soon',
                  'Registrar Exam Office',
                  'Direct electronic transcript dispatch to global universities will be supported in an upcoming update.',
                  'Please submit copies of previous semester grade cards to the Registrar Academic cell.'
                )}
                className="w-full py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
              >
                Request Transcript
              </button>
            </div>

            {/* 4. Document Verification */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 uppercase">
                  Verification
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Document Verification</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Attestation and background verification of provisional certificates, transfer certificates, and grade sheets.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div>• Processing Time: 2 Working Days</div>
                  <div>• Desk: Verification Cell #02</div>
                </div>
              </div>
              <button
                onClick={() => openComingSoon(
                  'Document Verification — Coming Soon',
                  'Verification Desk',
                  'Online QR verification of degree documents is planned for the Phase 3 backend integration.',
                  'Please present original credentials along with photocopies at Counter #02 in the Admin Block.'
                )}
                className="w-full py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
              >
                Submit for Verification
              </button>
            </div>

            {/* 5. Academic Calendar (Informational) */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                  Schedule
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Academic Calendar 2026-27</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tentative key semester milestones, teaching days, mid-term assessment slots, and semester-end holidays.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div>• Semester Term: Odd Semester 2026</div>
                  <div>• Demo schedule clearly labeled</div>
                </div>
              </div>
              <button
                onClick={() => setShowCalendarModal(true)}
                className="w-full py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
              >
                View Academic Calendar
              </button>
            </div>

            {/* 6. Examination Information (Informational) */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 uppercase">
                  Evaluations
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Examination Information</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Demo guidelines on examination form submission, hall ticket generation criteria, and seating layouts.
                </p>
                <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                  <div>• Mode: Offline Written Evaluation</div>
                  <div>• Venue: E-Block & A-Block</div>
                </div>
              </div>
              <button
                onClick={() => setShowExamModal(true)}
                className="w-full py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-colors shadow-2xs active:scale-95"
              >
                View Exam Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION E: ADDITIONAL STUDENT SERVICES & HELP */}
      {(activeTab === 'all' || activeTab === 'faq') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hostel & Accommodation */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#176B4D] flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Hostel & Accommodation</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Campus hostels provide Wi-Fi, study halls, mess dining, and 24/7 security warden supervision. Room allotment requests and maintenance issues are managed through the Hostel Warden Office.
              </p>
              <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div>• Boys Hostels: Blocks BH-1 to BH-5</div>
                <div>• Girls Hostels: Blocks GH-1 to GH-4</div>
                <div>• Mess Committee: Student governed</div>
              </div>
            </div>
            <button
              onClick={() => openComingSoon(
                'Hostel Portal — Coming Soon',
                'Hostel Management System',
                'Digital room selection, mess feedback, and leave pass management are in development.',
                'Please contact the Chief Warden Office located at Hostel Complex Block 1.'
              )}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              Hostel Services Guide →
            </button>
          </div>

          {/* Important Academic Links */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Important Academic Links</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct shortcuts to external university portals and academic repositories.
              </p>
              <div className="space-y-2 text-xs">
                <a 
                  href="https://soa.ac.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#176B4D] bg-slate-50 flex items-center justify-between font-semibold text-slate-800 transition-colors"
                >
                  <span>SOA University Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a 
                  href="#portal" 
                  onClick={(e) => {
                    e.preventDefault();
                    openComingSoon(
                      'SOA ERP Portal Integration — Coming Soon',
                      'Unified Student Single Sign-On',
                      'Direct single-sign-on integration with SOA ERP student records is in progress for Phase 3.',
                      'Please access the ERP portal through your standard institutional credentials.'
                    );
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#176B4D] bg-slate-50 flex items-center justify-between font-semibold text-slate-800 transition-colors"
                >
                  <span>ITER Student ERP Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a 
                  href="#library" 
                  onClick={(e) => {
                    e.preventDefault();
                    openComingSoon(
                      'Digital Library Access — Coming Soon',
                      'IEEE & ScienceDirect Proxy',
                      'Campus IP authenticated proxy for remote research paper downloads is being configured.',
                      'Please access digital journals from library workstations on the 2nd floor.'
                    );
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#176B4D] bg-slate-50 flex items-center justify-between font-semibold text-slate-800 transition-colors"
                >
                  <span>Digital Library (IEEE Xplore)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 text-center">
              Requires active institutional Wi-Fi or credentials
            </div>
          </div>

          {/* Student Help & Support FAQ */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Student Helpdesk & FAQ</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">Q: How do I connect to campus Wi-Fi?</span>
                  <span className="text-slate-600 mt-0.5 block leading-relaxed">
                    Connect to <code className="text-[11px] bg-slate-200 px-1 py-0.5 rounded">SOA-Student-Wi-Fi</code> and authenticate with your university registration number.
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block">Q: Where is medical assistance available?</span>
                  <span className="text-slate-600 mt-0.5 block leading-relaxed">
                    Campus dispensary operates 24/7 at the Student Welfare Center with doctors on call.
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openComingSoon(
                'Student Support Desk — Coming Soon',
                'Help & Inquiries',
                'Live ticketing and grievance resolution tracking is planned for upcoming phases.',
                'For immediate assistance, visit E-Block IT Helpdesk (Room E-208) or call extension 404.'
              )}
              className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition-colors"
            >
              Contact Student Helpdesk →
            </button>
          </div>
        </div>
      )}

      {/* POLISHED POPUP MODAL: "Coming Soon" */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-7 relative space-y-5 animate-in zoom-in-95 duration-200">
            <button 
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E7F3ED] text-[#176B4D] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#176B4D] uppercase tracking-wider">
                  Upcoming Module
                </span>
                <h3 className="text-xl font-bold text-slate-900">{modalData.title}</h3>
                {modalData.subtitle && (
                  <p className="text-xs font-medium text-slate-500">{modalData.subtitle}</p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-semibold text-slate-900">{modalData.description}</p>
              <p className="text-slate-600">{modalData.instructions}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={closeModal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white font-bold text-xs transition-colors shadow-2xs active:scale-95"
              >
                Understood, Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: Academic Calendar Info */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 relative space-y-5 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setShowCalendarModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  ILLUSTRATIVE DEMO CALENDAR
                </span>
                <h3 className="text-xl font-bold text-slate-900">Academic Calendar 2026-27</h3>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200">
              Notice: The following timeline is purely sample demo data prepared for Ideasprint 2026 Smart Campus evaluation.
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Commencement of Odd Semester Classes</span>
                  <span className="text-slate-500 text-[11px]">Regular theory and lab instructions</span>
                </div>
                <span className="font-mono font-bold text-slate-700">Aug 01, 2026</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Mid-Semester Assessment Window</span>
                  <span className="text-slate-500 text-[11px]">Internal evaluation reviews</span>
                </div>
                <span className="font-mono font-bold text-slate-700">Oct 26 - Nov 04, 2026</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Ideasprint 2026 Smart Campus Track</span>
                  <span className="text-slate-500 text-[11px]">Flagship hackathon at Biju Patnaik Auditorium</span>
                </div>
                <span className="font-mono font-bold text-[#176B4D]">Oct 20, 2026</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">End-Semester Practical Evaluations</span>
                  <span className="text-slate-500 text-[11px]">Departmental lab viva-voce</span>
                </div>
                <span className="font-mono font-bold text-slate-700">Nov 25 - Dec 02, 2026</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">End-Semester Theory Examinations</span>
                  <span className="text-slate-500 text-[11px]">Central examination cell conduction</span>
                </div>
                <span className="font-mono font-bold text-slate-700">Dec 08 - Dec 22, 2026</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: Examination Information Info */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 relative space-y-5 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setShowExamModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  ILLUSTRATIVE DEMO NOTICE
                </span>
                <h3 className="text-xl font-bold text-slate-900">Semester Examination Guidelines</h3>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200">
              Notice: Illustrative demo guidelines for prototype evaluation only. Official exam guidelines are issued by the Controller of Examinations.
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. Admit Card & Identity Verification</span>
                <p>
                  Every candidate must carry their official laminated student identity card and physical examination hall ticket. Digital copies on smartphones are not permitted in examination halls.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. Reporting Time & Seating Layout</span>
                <p>
                  Candidates must occupy assigned seats 15 minutes prior to commencement. Seating allotment charts will be pasted at the E-Block and A-Block entrance lobbies each morning.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3. Permitted Stationery & Calculators</span>
                <p>
                  Non-programmable scientific calculators are permitted for engineering mathematics and design papers. Smartwatches, Bluetooth earphones, and mobile devices are strictly barred.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowExamModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Guidelines
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
