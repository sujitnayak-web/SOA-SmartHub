import React, { useState, useEffect } from 'react';
import { NavTab, Building, Facility, Announcement, UtilityService, CampusEvent, IssueReport, BookmarkItem, UserProfile } from './types';
import { 
  BuildingService, 
  FacilityService, 
  AnnouncementService, 
  UtilityServiceAPI, 
  IssueReportService, 
  BookmarkService 
} from './services/campusServices';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { GuestEntryScreen } from './components/GuestEntryScreen';
import { SignInRequiredModal } from './components/SignInRequiredModal';

import { HomePage } from './pages/HomePage';
import { CampusMapPage } from './pages/CampusMapPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { UtilitiesPage } from './pages/UtilitiesPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { SavedPage } from './pages/SavedPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainApp() {
  const { currentUser, isLoading: authLoading } = useAuth();
  const [guestMode, setGuestMode] = useState<boolean>(() => {
    return localStorage.getItem('soa_guest_mode') === 'true';
  });
  const [entryScreenView, setEntryScreenView] = useState<'entry' | 'login' | 'register'>('entry');
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Modal for guest attempting protected actions
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [requiredFeature, setRequiredFeature] = useState('');

  // Application Data States
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [utilities, setUtilities] = useState<UtilityService[]>([]);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [issueReports, setIssueReports] = useState<IssueReport[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllData = async () => {
    try {
      const [
        bldgs,
        facs,
        anns,
        utils,
        evts,
        reps,
        bms
      ] = await Promise.all([
        BuildingService.getAll(),
        FacilityService.getAll(),
        AnnouncementService.getAll(),
        UtilityServiceAPI.getAll(),
        UtilityServiceAPI.getEvents(),
        IssueReportService.getAll(),
        BookmarkService.getAll()
      ]);

      setBuildings(bldgs);
      setFacilities(facs);
      setAnnouncements(anns);
      setUtilities(utils);
      setEvents(evts);
      setIssueReports(reps);
      setBookmarks(bms);
    } catch (err) {
      console.error('Error loading campus data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load public campus data immediately on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const handleContinueAsGuest = () => {
    setGuestMode(true);
    localStorage.setItem('soa_guest_mode', 'true');
    setCurrentTab('home');
  };

  const handleOpenLogin = () => {
    setGuestMode(false);
    setEntryScreenView('login');
  };

  const handleOpenRegister = () => {
    setGuestMode(false);
    setEntryScreenView('register');
  };

  const handleRequireAuth = (featureName: string) => {
    setRequiredFeature(featureName);
    setSignInModalOpen(true);
  };

  // Do not block public pages if guest mode is enabled or already selected
  if (authLoading && !guestMode && !currentUser) {
    return (
      <div className="min-h-screen bg-[#E7F3ED] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#176B4D] animate-spin flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-sm font-semibold text-slate-700">Verifying session...</span>
        </div>
      </div>
    );
  }

  const isGuest = !currentUser;

  // If user is not authenticated and has not entered Guest Mode, show Entry Screen
  if (!currentUser && !guestMode) {
    if (entryScreenView === 'login') {
      return (
        <LoginPage 
          onSwitchToRegister={() => setEntryScreenView('register')} 
          onContinueAsGuest={handleContinueAsGuest}
        />
      );
    }
    if (entryScreenView === 'register') {
      return (
        <RegisterPage 
          onSwitchToLogin={() => setEntryScreenView('login')} 
          onContinueAsGuest={handleContinueAsGuest}
        />
      );
    }
    return (
      <GuestEntryScreen
        onContinueAsGuest={handleContinueAsGuest}
        onSelectLogin={() => setEntryScreenView('login')}
        onSelectRegister={() => setEntryScreenView('register')}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E7F3ED] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#176B4D] animate-spin flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-sm font-semibold text-slate-700">Loading SOA SmartHub Campus Data...</span>
        </div>
      </div>
    );
  }

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage 
            currentUser={currentUser}
            buildings={buildings}
            announcements={announcements}
            events={events}
            onNavigate={setCurrentTab}
            onOpenSearch={() => setSearchOpen(true)}
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'map':
        return (
          <CampusMapPage 
            buildings={buildings} 
            facilities={facilities} 
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'assistant':
        return <AIAssistantPage onNavigate={setCurrentTab} />;
      case 'utilities':
        return (
          <UtilitiesPage 
            utilities={utilities} 
            facilities={facilities} 
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'announcements':
        return (
          <AnnouncementsPage 
            announcements={announcements} 
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'report':
        return (
          <ReportIssuePage 
            facilities={facilities} 
            issueReports={issueReports} 
            onReportSubmitted={loadAllData} 
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'saved':
        return (
          <SavedPage 
            bookmarks={bookmarks} 
            onUpdateBookmarks={loadAllData} 
            onNavigate={setCurrentTab} 
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'profile':
        return (
          <ProfilePage 
            bookmarks={bookmarks} 
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return (
          <HomePage 
            currentUser={currentUser} 
            buildings={buildings} 
            announcements={announcements} 
            events={events} 
            onNavigate={setCurrentTab} 
            onOpenSearch={() => setSearchOpen(true)}
            isGuest={isGuest}
            onRequireAuth={handleRequireAuth}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased">
      {/* Persistent Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={setCurrentTab} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
        isGuest={isGuest}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-72 min-w-0">
        <Header 
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          announcements={announcements}
          onOpenLogin={handleOpenLogin}
        />

        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        buildings={buildings}
        facilities={facilities}
        announcements={announcements}
        utilities={utilities}
        onNavigate={setCurrentTab}
      />

      {/* Sign In Required Modal for Protected Actions */}
      <SignInRequiredModal
        isOpen={signInModalOpen}
        featureName={requiredFeature}
        onClose={() => setSignInModalOpen(false)}
        onLogin={handleOpenLogin}
        onRegister={handleOpenRegister}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
