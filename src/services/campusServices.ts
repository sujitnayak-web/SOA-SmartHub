import { 
  Building, 
  Facility, 
  Announcement, 
  UtilityService, 
  CampusEvent, 
  IssueReport, 
  BookmarkItem, 
  UserProfile,
  ChatMessage
} from '../types';
import { 
  INITIAL_BUILDINGS, 
  INITIAL_FACILITIES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_UTILITIES, 
  INITIAL_EVENTS, 
  INITIAL_ISSUE_REPORTS, 
  INITIAL_BOOKMARKS, 
  CURRENT_USER,
  SAMPLE_AI_QA_PAIRS
} from '../data/mockData';

// In-memory state for prototype CRUD operations
let buildingsState = [...INITIAL_BUILDINGS];
let facilitiesState = [...INITIAL_FACILITIES];
let announcementsState = [...INITIAL_ANNOUNCEMENTS];
let issueReportsState = [...INITIAL_ISSUE_REPORTS];
let bookmarksState = [...INITIAL_BOOKMARKS];
let userProfileState = { ...CURRENT_USER };

export const AuthService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    return userProfileState;
  },
  updateProfile: async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    userProfileState = { ...userProfileState, ...updates };
    return userProfileState;
  }
};

export const BuildingService = {
  getAll: async (): Promise<Building[]> => buildingsState,
  getById: async (id: string): Promise<Building | undefined> => buildingsState.find(b => b.id === id),
  create: async (building: Omit<Building, 'id'>): Promise<Building> => {
    const newBuilding = { ...building, id: `bldg-${Date.now()}` };
    buildingsState = [newBuilding, ...buildingsState];
    return newBuilding;
  },
  update: async (id: string, updates: Partial<Building>): Promise<Building | undefined> => {
    buildingsState = buildingsState.map(b => b.id === id ? { ...b, ...updates } : b);
    return buildingsState.find(b => b.id === id);
  },
  delete: async (id: string): Promise<boolean> => {
    const initialLen = buildingsState.length;
    buildingsState = buildingsState.filter(b => b.id !== id);
    return buildingsState.length < initialLen;
  }
};

export const FacilityService = {
  getAll: async (): Promise<Facility[]> => facilitiesState,
  getByBuilding: async (buildingId: string): Promise<Facility[]> => facilitiesState.filter(f => f.buildingId === buildingId),
  create: async (facility: Omit<Facility, 'id'>): Promise<Facility> => {
    const newFacility = { ...facility, id: `fac-${Date.now()}` };
    facilitiesState = [newFacility, ...facilitiesState];
    return newFacility;
  },
  update: async (id: string, updates: Partial<Facility>): Promise<Facility | undefined> => {
    facilitiesState = facilitiesState.map(f => f.id === id ? { ...f, ...updates } : f);
    return facilitiesState.find(f => f.id === id);
  },
  delete: async (id: string): Promise<boolean> => {
    const initialLen = facilitiesState.length;
    facilitiesState = facilitiesState.filter(f => f.id !== id);
    return facilitiesState.length < initialLen;
  }
};

export const AnnouncementService = {
  getAll: async (): Promise<Announcement[]> => announcementsState,
  create: async (announcement: Omit<Announcement, 'id'>): Promise<Announcement> => {
    const newAnn = { ...announcement, id: `ann-${Date.now()}` };
    announcementsState = [newAnn, ...announcementsState];
    return newAnn;
  },
  update: async (id: string, updates: Partial<Announcement>): Promise<Announcement | undefined> => {
    announcementsState = announcementsState.map(a => a.id === id ? { ...a, ...updates } : a);
    return announcementsState.find(a => a.id === id);
  },
  delete: async (id: string): Promise<boolean> => {
    const initialLen = announcementsState.length;
    announcementsState = announcementsState.filter(a => a.id !== id);
    return announcementsState.length < initialLen;
  }
};

export const UtilityServiceAPI = {
  getAll: async (): Promise<UtilityService[]> => INITIAL_UTILITIES,
  getEvents: async (): Promise<CampusEvent[]> => INITIAL_EVENTS
};

export const LibraryService = {
  getBooks: async () => {
    const { DEMO_LIBRARY_BOOKS } = await import('../data/mockData');
    return DEMO_LIBRARY_BOOKS;
  }
};

export const BusService = {
  getRoutes: async () => {
    const { DEMO_BUS_ROUTES } = await import('../data/mockData');
    return DEMO_BUS_ROUTES;
  }
};

export const FeeService = {
  getFeeOverview: async () => {
    const { DEMO_FEE_ITEMS } = await import('../data/mockData');
    return DEMO_FEE_ITEMS;
  }
};

export const CampusAssistantService = {
  getStatus: async (): Promise<{ configured: boolean; model: string }> => {
    try {
      const res = await fetch('/api/assistant/status');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline or backend not ready
    }
    return { configured: false, model: 'gemini-3.8-flash' };
  },

  query: async (prompt: string, history?: { role: 'user' | 'assistant'; text: string }[]): Promise<ChatMessage> => {
    // Attempt backend Gemini query first
    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, history })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text) {
          // Find any relevant building suggestions
          const lower = prompt.toLowerCase();
          const suggestedBldgs = buildingsState.filter(b => 
            lower.includes(b.name.toLowerCase()) || 
            lower.includes(b.code.toLowerCase()) ||
            (lower.includes('library') && b.category === 'library') ||
            (lower.includes('e-block') && b.id.includes('e-block')) ||
            (lower.includes('a-block') && b.id.includes('a-block')) ||
            (lower.includes('canteen') && b.id.includes('cafeteria'))
          );

          return {
            id: `msg-${Date.now()}`,
            sender: 'assistant',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedBuildings: suggestedBldgs.length ? suggestedBldgs.slice(0, 2) : undefined,
            sources: data.sources || ['Google Gemini 3.8 Flash', 'SOA Campus Knowledge']
          };
        }
      }
    } catch {
      // Fall through to local fallback
    }

    // Local Verified Fallback Matching
    const lower = prompt.toLowerCase();
    const matchedQA = SAMPLE_AI_QA_PAIRS.find(qa => qa.keywords.some(kw => lower.includes(kw)));

    const responseText = matchedQA 
      ? matchedQA.response 
      : `I understand your question regarding "${prompt}". As SOA Smart Assistant, I can guide you to campus buildings (E-Block, A-Block, Central Library), exam procedures, library timings, college buses, and student section documentation. For official approvals, please consult the respective university office.`;

    const suggestedBldgs: Building[] = [];
    const suggestedFacs: Facility[] = [];
    const sources: string[] = matchedQA ? matchedQA.sources || [] : ['SOA SmartHub Campus Knowledge Base (Local Mode)'];

    if (matchedQA?.suggestedBuildingId) {
      const b = buildingsState.find(x => x.id === matchedQA.suggestedBuildingId);
      if (b) suggestedBldgs.push(b);
    }
    if (matchedQA?.suggestedFacilityId) {
      const f = facilitiesState.find(x => x.id === matchedQA.suggestedFacilityId);
      if (f) suggestedFacs.push(f);
    }

    if (suggestedBldgs.length === 0) {
      if (lower.includes('library')) {
        const b = buildingsState.find(x => x.category === 'library');
        if (b) suggestedBldgs.push(b);
      } else if (lower.includes('e-block') || lower.includes('computer')) {
        const b = buildingsState.find(x => x.id.includes('e-block'));
        if (b) suggestedBldgs.push(b);
      }
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedBuildings: suggestedBldgs.length ? suggestedBldgs : undefined,
      suggestedFacilities: suggestedFacs.length ? suggestedFacs : undefined,
      sources
    };
  }
};

export const IssueReportService = {
  getAll: async (): Promise<IssueReport[]> => issueReportsState,
  create: async (report: Omit<IssueReport, 'id' | 'submittedAt' | 'status'>): Promise<IssueReport> => {
    const newReport: IssueReport = {
      ...report,
      id: `rep-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Submitted'
    };
    issueReportsState = [newReport, ...issueReportsState];
    return newReport;
  },
  updateStatus: async (id: string, status: IssueReport['status']): Promise<IssueReport | undefined> => {
    issueReportsState = issueReportsState.map(r => r.id === id ? { ...r, status } : r);
    return issueReportsState.find(r => r.id === id);
  }
};

export const BookmarkService = {
  getAll: async (): Promise<BookmarkItem[]> => bookmarksState,
  add: async (item: Omit<BookmarkItem, 'id' | 'savedAt'>): Promise<BookmarkItem> => {
    const newBm: BookmarkItem = {
      ...item,
      id: `bm-${Date.now()}`,
      savedAt: new Date().toISOString().substring(0, 10)
    };
    // check if already saved
    const exists = bookmarksState.find(b => b.itemId === item.itemId);
    if (!exists) {
      bookmarksState = [newBm, ...bookmarksState];
    }
    return newBm;
  },
  remove: async (itemId: string): Promise<boolean> => {
    const initialLen = bookmarksState.length;
    bookmarksState = bookmarksState.filter(b => b.itemId !== itemId);
    return bookmarksState.length < initialLen;
  },
  isSaved: (itemId: string): boolean => {
    return bookmarksState.some(b => b.itemId === itemId);
  }
};

export const AdminService = {
  getOverviewStats: async () => {
    return {
      totalBuildings: buildingsState.length,
      totalFacilities: facilitiesState.length,
      totalAnnouncements: announcementsState.length,
      openIssueReports: issueReportsState.filter(r => r.status !== 'Resolved').length,
      activeUsersToday: 3480
    };
  }
};
