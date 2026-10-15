export type NavTab = 
  | 'home' 
  | 'map' 
  | 'assistant' 
  | 'utilities' 
  | 'announcements' 
  | 'report' 
  | 'saved' 
  | 'profile' 
  | 'admin';

export interface Building {
  id: string;
  name: string;
  code: string;
  category: 'academic' | 'administrative' | 'residential' | 'recreational' | 'library' | 'dining';
  description: string;
  floors: number;
  openHours: string;
  status: 'Open' | 'Busy' | 'Closed' | 'Maintenance';
  coordinates: { x: number; y: number }; // percentage on map canvas
  facilitiesCount: number;
  image: string;
  features: string[];
}

export interface Facility {
  id: string;
  buildingId: string;
  buildingName: string;
  name: string;
  category: 'Laboratory' | 'Lecture Hall' | 'Library' | 'Cafeteria' | 'Admin Office' | 'Student Lounge' | 'Sports Complex';
  floor: string;
  status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
  capacity: number;
  currentOccupancy?: number;
  equipment: string[];
  contactEmail?: string;
  image: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Academic' | 'Examination' | 'Events' | 'Student Services' | 'Campus' | 'Emergency' | 'Campus Life' | 'Facilities';
  priority: 'High' | 'Important' | 'Normal' | 'Urgent';
  date: string;
  author: string;
  status: 'Published' | 'Draft';
  targetAudience: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: boolean;
  availableCopies: number;
  totalCopies: number;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  name: string;
  stops: string[];
  timing: string;
  shift: string;
  busNumber: string;
  inchargeContact: string;
}

export interface FeeItem {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Upcoming';
}

export interface UtilityService {
  id: string;
  title: string;
  category: 'Campus Services' | 'Academic Information' | 'Facilities' | 'Library' | 'Laboratories' | 'Admin Offices' | 'Student Activities' | 'Important Resources';
  description: string;
  location: string;
  contact: string;
  hours: string;
  linkText?: string;
  iconName: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
}

export interface IssueReport {
  id: string;
  category: 'Maintenance' | 'IT & Wi-Fi' | 'Cleanliness' | 'Safety' | 'Accessibility' | 'Other';
  title: string;
  description: string;
  facilityId: string;
  facilityName: string;
  imageUrl?: string;
  status: 'Submitted' | 'In Review' | 'In Progress' | 'Resolved';
  submittedAt: string;
  submitterName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFacilities?: Facility[];
  suggestedBuildings?: Building[];
  sources?: string[];
}

export interface BookmarkItem {
  id: string;
  type: 'building' | 'facility' | 'utility' | 'announcement';
  itemId: string;
  title: string;
  subtitle: string;
  savedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  department: string;
  role: 'Student' | 'Faculty' | 'Administrator';
  avatar: string;
  notificationsEnabled: boolean;
  emailAlerts: boolean;
  theme: 'Light' | 'Dark' | 'System';
}
