import { 
  Building, 
  Facility, 
  Announcement, 
  UtilityService, 
  CampusEvent, 
  IssueReport, 
  BookmarkItem, 
  UserProfile,
  LibraryBook,
  BusRoute,
  FeeItem
} from '../types';

export const INITIAL_BUILDINGS: Building[] = [
  {
    id: 'bldg-e-block',
    name: 'E-Block (Computer Science & Engineering)',
    code: 'E-BLK',
    category: 'academic',
    description: 'Premier academic hub housing Computer Science, AI/ML research labs, software development centers, and high-performance server rooms.',
    floors: 6,
    openHours: '07:30 AM - 09:30 PM',
    status: 'Open',
    coordinates: { x: 30, y: 38 },
    facilitiesCount: 16,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    features: ['High-Performance Computing Lab', 'Cloud Computing Sandbox', 'Smart Lecture Theaters', 'Faculty Cabins']
  },
  {
    id: 'bldg-a-block',
    name: 'A-Block (Core Engineering Complex)',
    code: 'A-BLK',
    category: 'academic',
    description: 'Central engineering complex featuring Mechanical, Civil, and Electrical laboratories, drawing halls, and large tutorial spaces.',
    floors: 5,
    openHours: '08:00 AM - 08:00 PM',
    status: 'Open',
    coordinates: { x: 50, y: 32 },
    facilitiesCount: 18,
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    features: ['Robotics & Mechatronics Lab', 'Fluid Mechanics Bay', 'Smart Classrooms', 'Department Offices']
  },
  {
    id: 'bldg-library',
    name: 'Central Library (Knowledge Center)',
    code: 'C-LIB',
    category: 'library',
    description: 'Multistoried central library repository housing over 150,000 textbooks, IEEE/Springer digital access stations, and peaceful study cubicles.',
    floors: 4,
    openHours: '08:00 AM - 11:00 PM',
    status: 'Open',
    coordinates: { x: 68, y: 45 },
    facilitiesCount: 12,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    features: ['Digital E-Library Zone', 'Silent Reading Floors', 'Journal & Periodicals Section', 'Discussion Pods']
  },
  {
    id: 'bldg-admin',
    name: 'Administrative Block (Dean & Registrar)',
    code: 'ADM-BLK',
    category: 'administrative',
    description: 'Central administration office accommodating the Dean ITER, Academic Registrar, Accounts Section, and Student Welfare office.',
    floors: 4,
    openHours: '09:00 AM - 05:00 PM',
    status: 'Open',
    coordinates: { x: 45, y: 18 },
    facilitiesCount: 10,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    features: ["Dean's Office", 'Student Section Desk', 'Finance & Accounts', 'Exam Cell']
  },
  {
    id: 'bldg-main-gate',
    name: 'Main Gate & Security Checkpoint',
    code: 'MG-01',
    category: 'administrative',
    description: 'Primary campus entrance at Jagamara, equipped with automated turnstiles, visitor verification kiosk, and campus security dispatch.',
    floors: 1,
    openHours: '24 Hours (Round-the-clock)',
    status: 'Open',
    coordinates: { x: 18, y: 78 },
    facilitiesCount: 3,
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    features: ['Visitor Registration Kiosk', 'Vehicle RFID Gate', 'Security Control Room']
  },
  {
    id: 'bldg-cafeteria',
    name: 'Cafeteria & Student Dining Pavilion',
    code: 'CAFE',
    category: 'dining',
    description: 'Spacious campus dining hall and food court serving breakfast, wholesome lunch, hot snacks, and beverages for students and staff.',
    floors: 2,
    openHours: '07:30 AM - 10:00 PM',
    status: 'Open',
    coordinates: { x: 38, y: 62 },
    facilitiesCount: 6,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    features: ['Student Canteen', 'Juice & Coffee Kiosks', 'Outdoor Terrace Seating', 'Faculty Dining']
  },
  {
    id: 'bldg-auditorium',
    name: 'ITER Biju Patnaik Auditorium',
    code: 'AUD-01',
    category: 'recreational',
    description: 'Air-conditioned convention hall with 1,200 seats for convocation, cultural festivals, technical symposiums, and national hackathons.',
    floors: 2,
    openHours: 'Event-based schedule',
    status: 'Open',
    coordinates: { x: 74, y: 24 },
    facilitiesCount: 5,
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    features: ['1200 Seater Acoustic Hall', 'Green Rooms', 'Audio-Visual Control Booth', 'Exhibition Foyer']
  },
  {
    id: 'bldg-parking',
    name: 'Campus Parking Zone (Students & Staff)',
    code: 'PRK-A',
    category: 'administrative',
    description: 'Organized two-wheeler and four-wheeler paved parking area adjacent to the main gate with CCTV security and EV charging bays.',
    floors: 1,
    openHours: '06:00 AM - 10:30 PM',
    status: 'Open',
    coordinates: { x: 15, y: 60 },
    facilitiesCount: 4,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    features: ['Two-Wheeler Sheds', 'EV Charging Points', '24/7 CCTV Monitoring', 'Automated Boom Barrier']
  }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    buildingId: 'bldg-e-block',
    buildingName: 'E-Block (Computer Science & Engineering)',
    name: 'Advanced AI & Data Analytics Lab (E-304)',
    category: 'Laboratory',
    floor: '3rd Floor',
    status: 'Available',
    capacity: 60,
    currentOccupancy: 34,
    equipment: ['GPU Workstations', 'Dual 4K Displays', 'Gigabit Academic LAN'],
    contactEmail: 'cse-lab@soa.ac.in',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-2',
    buildingId: 'bldg-e-block',
    buildingName: 'E-Block (Computer Science & Engineering)',
    name: 'Smart Seminar Theater (E-101)',
    category: 'Lecture Hall',
    floor: '1st Floor',
    status: 'Reserved',
    capacity: 180,
    currentOccupancy: 155,
    equipment: ['Interactive Laser Projector', 'JBL Sound Array', 'Live Lecture Streaming'],
    contactEmail: 'events@soa.ac.in',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-3',
    buildingId: 'bldg-library',
    buildingName: 'Central Library (Knowledge Center)',
    name: 'Digital Reference & Research Room',
    category: 'Library',
    floor: '2nd Floor',
    status: 'Available',
    capacity: 90,
    currentOccupancy: 48,
    equipment: ['IEEE Xplore Terminals', 'Scanners & Printers', 'Study Cubicles'],
    contactEmail: 'library@soa.ac.in',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-4',
    buildingId: 'bldg-a-block',
    buildingName: 'A-Block (Core Engineering Complex)',
    name: 'Mechatronics & IoT Automation Lab',
    category: 'Laboratory',
    floor: 'Ground Floor',
    status: 'Available',
    capacity: 40,
    currentOccupancy: 18,
    equipment: ['Robotic Arms', 'Arduino & Raspberry Pi Kits', '3D Prototyping Bench'],
    contactEmail: 'mech-iot@soa.ac.in',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-5',
    buildingId: 'bldg-cafeteria',
    buildingName: 'Cafeteria & Student Dining Pavilion',
    name: 'Main Food Court & Refreshment Lounge',
    category: 'Cafeteria',
    floor: 'Ground Floor',
    status: 'Available',
    capacity: 350,
    currentOccupancy: 210,
    equipment: ['Digital Token Display', 'Filtered Water Stations', 'Hygienic Prep Counters'],
    contactEmail: 'canteen@soa.ac.in',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fac-6',
    buildingId: 'bldg-admin',
    buildingName: 'Administrative Block (Dean & Registrar)',
    name: 'Student Section & Documentation Cell',
    category: 'Admin Office',
    floor: '1st Floor',
    status: 'Available',
    capacity: 50,
    currentOccupancy: 15,
    equipment: ['Queue Management Kiosk', 'Verification Desks', 'Certificate Printers'],
    contactEmail: 'studentsection@soa.ac.in',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Academic Calendar Update: Odd Semester 2026-27 Schedule',
    summary: 'Revised schedule for mid-term assessments, internal practical reviews, and semester-end breaks.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. The tentative academic calendar for the current semester has been released for planning purposes. Mid-term examinations are slated for mid-November, followed by departmental lab evaluations. Students must review course guidelines with respective subject coordinators.',
    category: 'Academic',
    priority: 'Important',
    date: '2026-10-14',
    author: 'Dean Academics (Demo Notice)',
    status: 'Published',
    targetAudience: 'All B.Tech, M.Tech, and MCA Batches'
  },
  {
    id: 'ann-2',
    title: 'Semester Examination Information: Form Fill-up & Admit Card Guidelines',
    summary: 'Instructions for end-semester exam registration, clearance dues, and digital hall ticket issuance.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. Eligible students can preview exam registration dates through the portal. Please ensure all library clearances and tuition dues are settled prior to the verification cutoff. This is sample data created for the Ideas Sprint prototype.',
    category: 'Examination',
    priority: 'Urgent',
    date: '2026-10-13',
    author: 'Controller of Examinations (Demo Notice)',
    status: 'Published',
    targetAudience: 'All Registered Students'
  },
  {
    id: 'ann-3',
    title: 'Library Service Notice: Extended Reading Room Timings & New Digital Resources',
    summary: 'Central Library reading rooms will remain open until midnight; IEEE Xplore terminals upgraded.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. The Central Knowledge Center announces extended reading hours from 08:00 AM to 12:00 AM midnight. Six additional high-speed terminals have been activated on the 2nd floor for digital journals and research publications.',
    category: 'Student Services',
    priority: 'Normal',
    date: '2026-10-12',
    author: 'Chief Librarian (Demo Notice)',
    status: 'Published',
    targetAudience: 'Students and Faculty Members'
  },
  {
    id: 'ann-4',
    title: 'Student Section Document Services: Bonafide & Transcript Processing Protocols',
    summary: 'Standard operating procedure for requesting bonafide certificates and grade card verifications.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. The Student Section at Admin Block Floor 1 operates service counters from 10:00 AM to 03:30 PM on weekdays. Standard processing window is 2-3 working days. In the upcoming phase of SOA SmartHub, digital one-click applications will be supported.',
    category: 'Student Services',
    priority: 'Normal',
    date: '2026-10-10',
    author: 'Student Section In-Charge (Demo Notice)',
    status: 'Published',
    targetAudience: 'All Students'
  },
  {
    id: 'ann-5',
    title: 'Campus Technical Event: Ideasprint 2026 Smart Campus Track Registrations',
    summary: 'Register teams for the flagship innovation hackathon focusing on AI, IoT, and Campus Mobility.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. Innovation Cell invites cross-disciplinary student teams to build next-generation smart campus solutions. Compete for awards and prototype incubation grants. Orientation session takes place at ITER Biju Patnaik Auditorium.',
    category: 'Events',
    priority: 'High',
    date: '2026-10-09',
    author: 'SOA Innovation Cell (Demo Notice)',
    status: 'Published',
    targetAudience: 'Engineering, Computing & Management Students'
  },
  {
    id: 'ann-6',
    title: 'College Bus Service Information: Route Schedules & Pass Renewal Notice',
    summary: 'Updated timings for Cuttack, Master Canteen, and Patia routes starting next Monday.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. Campus transport department has refreshed departure timings for major arterial routes connecting Cuttack, Baramunda, and Master Canteen. Students are advised to arrive at pickup stops 5 minutes prior to listed departure times.',
    category: 'Campus',
    priority: 'Normal',
    date: '2026-10-08',
    author: 'Transport Department (Demo Notice)',
    status: 'Published',
    targetAudience: 'Day Scholar Students'
  },
  {
    id: 'ann-7',
    title: 'Fee Payment Portal Information: Demo Semester Fee Structure Overview',
    summary: 'Guidance on reviewing semester fee breakdowns, scholarship adjustments, and installment plans.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. Students can review their illustrative semester fee overview in the Student Utilities module. Please note that real transactions are disabled in this prototype sprint and no actual payment is collected.',
    category: 'Academic',
    priority: 'Important',
    date: '2026-10-06',
    author: 'Finance & Accounts Office (Demo Notice)',
    status: 'Published',
    targetAudience: 'All Current Students'
  },
  {
    id: 'ann-8',
    title: 'Campus Maintenance & Facility Update: E-Block Wi-Fi Access Point Upgrades',
    summary: 'Scheduled firmware enhancement and bandwidth optimization on E-Block 3rd & 4th floors.',
    content: 'DEMO NOTICE — FOR ILLUSTRATIVE PURPOSES ONLY. Campus IT will conduct network optimizations between 06:00 AM and 08:00 AM this Saturday. Wired network in computer labs will remain unaffected.',
    category: 'Campus',
    priority: 'Normal',
    date: '2026-10-04',
    author: 'Campus IT Operations (Demo Notice)',
    status: 'Published',
    targetAudience: 'Campus Community'
  }
];

export const DEMO_FEE_ITEMS: FeeItem[] = [
  {
    id: 'fee-1',
    title: 'Tuition Fee (Current Semester)',
    description: 'Academic tuition, lectures, practical labs, and departmental facilities',
    amount: 115000,
    dueDate: '2026-11-15',
    status: 'Pending'
  },
  {
    id: 'fee-2',
    title: 'Semester Examination Fee',
    description: 'Central examination administration, question paper, and grade evaluation',
    amount: 4500,
    dueDate: '2026-11-20',
    status: 'Pending'
  },
  {
    id: 'fee-3',
    title: 'Campus Development & Library Charges',
    description: 'E-journal subscriptions, digital library resources, and campus maintenance',
    amount: 7500,
    dueDate: '2026-11-15',
    status: 'Pending'
  },
  {
    id: 'fee-4',
    title: 'Student Activities & Sports Fee',
    description: 'Technical fest, sports complexes, gymnasiums, and cultural societies',
    amount: 5000,
    dueDate: '2026-11-15',
    status: 'Pending'
  }
];

export const DEMO_LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'book-1',
    title: 'Introduction to Algorithms (4th Edition)',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    category: 'Computer Science',
    isbn: '978-0262046305',
    available: true,
    availableCopies: 12,
    totalCopies: 25
  },
  {
    id: 'book-2',
    title: 'Artificial Intelligence: A Modern Approach (4th Edition)',
    author: 'Stuart Russell, Peter Norvig',
    category: 'AI & Data Science',
    isbn: '978-0134610993',
    available: true,
    availableCopies: 8,
    totalCopies: 15
  },
  {
    id: 'book-3',
    title: 'Operating System Concepts (10th Edition)',
    author: 'Abraham Silberschatz, Peter B. Galvin, Greg Gagne',
    category: 'Computer Science',
    isbn: '978-1119456339',
    available: true,
    availableCopies: 14,
    totalCopies: 20
  },
  {
    id: 'book-4',
    title: 'Computer Networking: A Top-Down Approach',
    author: 'James F. Kurose, Keith W. Ross',
    category: 'Computer Science',
    isbn: '978-0136681557',
    available: false,
    availableCopies: 0,
    totalCopies: 18
  },
  {
    id: 'book-5',
    title: 'Higher Engineering Mathematics (44th Edition)',
    author: 'Dr. B.S. Grewal',
    category: 'Mathematics',
    isbn: '978-8193328491',
    available: true,
    availableCopies: 22,
    totalCopies: 35
  },
  {
    id: 'book-6',
    title: 'Digital Signal Processing: Principles, Algorithms & Applications',
    author: 'John G. Proakis, Dimitris G. Manolakis',
    category: 'Electronics',
    isbn: '978-0131873742',
    available: true,
    availableCopies: 6,
    totalCopies: 10
  }
];

export const DEMO_BUS_ROUTES: BusRoute[] = [
  {
    id: 'bus-1',
    routeNumber: 'Route 101',
    name: 'Cuttack Badambadi to ITER Campus',
    stops: ['Badambadi (07:15 AM)', 'Link Road (07:25 AM)', 'Rasulgarh (07:55 AM)', 'Baramunda (08:20 AM)', 'ITER Campus (08:45 AM)'],
    timing: '07:15 AM Departure • Morning Shift',
    shift: 'Morning & Evening',
    busNumber: 'OD-02-AK-4412',
    inchargeContact: '+91 94370 XXXXX'
  },
  {
    id: 'bus-2',
    routeNumber: 'Route 102',
    name: 'Master Canteen (Station) to ITER Campus',
    stops: ['Master Canteen (07:45 AM)', 'Rajmahal (07:55 AM)', 'Siripur (08:15 AM)', 'Khandagiri (08:35 AM)', 'ITER Campus (08:50 AM)'],
    timing: '07:45 AM Departure • Morning Shift',
    shift: 'Morning & Evening',
    busNumber: 'OD-02-BL-8930',
    inchargeContact: '+91 94371 XXXXX'
  },
  {
    id: 'bus-3',
    routeNumber: 'Route 103',
    name: 'Patia / KIIT Square to ITER Campus',
    stops: ['Patia Square (07:30 AM)', 'Jaydev Vihar (07:55 AM)', 'Fire Station (08:25 AM)', 'ITER Campus (08:50 AM)'],
    timing: '07:30 AM Departure • Morning Shift',
    shift: 'Morning & Evening',
    busNumber: 'OD-02-CM-1277',
    inchargeContact: '+91 94372 XXXXX'
  },
  {
    id: 'bus-4',
    routeNumber: 'Route 104',
    name: 'Jagamara / AIIMS Local Campus Shuttle',
    stops: ['AIIMS Square (08:10 AM)', 'Dumduma (08:25 AM)', 'Jagamara Market (08:40 AM)', 'ITER Campus (08:50 AM)'],
    timing: '08:10 AM Departure • Local Feeder',
    shift: 'Every 30 Mins',
    busNumber: 'OD-02-DS-3301',
    inchargeContact: '+91 94373 XXXXX'
  }
];

export const INITIAL_UTILITIES: UtilityService[] = [
  {
    id: 'util-1',
    title: 'Student Section & Academic Transcripts',
    category: 'Admin Offices',
    description: 'Bonafide certificates, grade cards, migration letters, and student identity documentation.',
    location: '1st Floor, Administrative Block',
    contact: '+91 (0674) 2351533 | studentsection@soa.ac.in',
    hours: 'Mon-Fri: 09:30 AM - 04:30 PM',
    linkText: 'Request Document',
    iconName: 'GraduationCap'
  },
  {
    id: 'util-2',
    title: 'Central Library Knowledge Commons',
    category: 'Library',
    description: 'Over 1.5 lakh volumes, national & international research journals, e-books, and digital study cubicles.',
    location: 'Central Library Building',
    contact: 'library@soa.ac.in | Desk: Ext 210',
    hours: 'Daily: 08:00 AM - 11:00 PM',
    linkText: 'Search Catalog',
    iconName: 'Layers'
  },
  {
    id: 'util-3',
    title: 'University Transport & Bus Dispatch',
    category: 'Campus Services',
    description: 'Fleet of university buses servicing Bhubaneswar, Cuttack, Khurda, and feeder transit points.',
    location: 'Transport Office, Near Parking Gate',
    contact: 'transport@soa.ac.in | Emergency: Ext 108',
    hours: 'Mon-Sat: 07:00 AM - 07:30 PM',
    linkText: 'View Routes',
    iconName: 'Compass'
  },
  {
    id: 'util-4',
    title: 'Campus Health & Medical Dispensary',
    category: 'Campus Services',
    description: 'Qualified resident doctors, emergency first-aid, ambulance standby, and basic medical care.',
    location: 'Ground Floor, Student Welfare Center',
    contact: '+91 94370 00000 | health@soa.ac.in',
    hours: '24/7 Emergency Support Available',
    linkText: 'Health Assistance',
    iconName: 'HeartPulse'
  },
  {
    id: 'util-5',
    title: 'Campus IT Helpdesk & Wi-Fi Support',
    category: 'Facilities',
    description: 'Assistance with campus Wi-Fi credentials, ERP portal access, lab logins, and institutional email.',
    location: 'E-Block 2nd Floor (Room E-208)',
    contact: 'it-support@soa.ac.in | Helpdesk Ext 404',
    hours: 'Mon-Sat: 08:30 AM - 06:30 PM',
    linkText: 'Submit Ticket',
    iconName: 'Wrench'
  },
  {
    id: 'util-6',
    title: 'Training & Placement Directorate',
    category: 'Important Resources',
    description: 'Pre-placement training, coding practice arenas, industry recruitment drives, and resume workshops.',
    location: '3rd Floor, Administrative Block',
    contact: 'placement@soa.ac.in | Desk: Ext 350',
    hours: 'Mon-Fri: 09:00 AM - 05:30 PM',
    linkText: 'Career Portal',
    iconName: 'Briefcase'
  }
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt-1',
    title: 'Ideasprint 2026 Smart Campus Hackathon',
    date: 'Oct 20, 2026',
    time: '09:30 AM - 06:00 PM',
    location: 'ITER Biju Patnaik Auditorium',
    category: 'Technical Hackathon',
    organizer: 'SOA Innovation Cell'
  },
  {
    id: 'evt-2',
    title: 'Workshop: Generative AI on Google Cloud',
    date: 'Oct 24, 2026',
    time: '02:00 PM - 04:30 PM',
    location: 'E-Block Advanced Computing Lab',
    category: 'Hands-on Workshop',
    organizer: 'CSE Department & ACM Chapter'
  },
  {
    id: 'evt-3',
    title: 'Inter-Departmental Badminton & Cricket Tournament',
    date: 'Oct 28, 2026',
    time: '04:00 PM - 07:30 PM',
    location: 'Campus Sports Arena',
    category: 'Sports',
    organizer: 'SOA Sports Council'
  }
];

export const INITIAL_ISSUE_REPORTS: IssueReport[] = [
  {
    id: 'rep-101',
    category: 'IT & Wi-Fi',
    title: 'Intermittent Wi-Fi signal in E-Block 3rd floor corridor',
    description: 'Signal strength fluctuates between 1 and 2 bars near lab E-304 when multiple classes are in session.',
    facilityId: 'fac-1',
    facilityName: 'Advanced AI & Data Analytics Lab (E-304)',
    status: 'In Progress',
    submittedAt: '2026-10-14 11:20',
    submitterName: 'Alex Rivera'
  },
  {
    id: 'rep-102',
    category: 'Maintenance',
    title: 'Air conditioning thermostat issue in Smart Seminar Theater',
    description: 'Rear cooling unit showing sensor error code on wall thermostat.',
    facilityId: 'fac-2',
    facilityName: 'Smart Seminar Theater (E-101)',
    status: 'Resolved',
    submittedAt: '2026-10-11 14:15',
    submitterName: 'Alex Rivera'
  }
];

export const INITIAL_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'bm-1',
    type: 'building',
    itemId: 'bldg-e-block',
    title: 'E-Block (Computer Science & Engineering)',
    subtitle: 'E-BLK • Academic Complex',
    savedAt: '2026-10-12'
  },
  {
    id: 'bm-2',
    type: 'facility',
    itemId: 'fac-1',
    title: 'Advanced AI & Data Analytics Lab',
    subtitle: 'Lab E-304 • E-Block',
    savedAt: '2026-10-11'
  },
  {
    id: 'bm-3',
    type: 'announcement',
    itemId: 'ann-5',
    title: 'Ideasprint 2026 Smart Campus Track Registrations',
    subtitle: 'Events • High Priority',
    savedAt: '2026-10-14'
  }
];

export const CURRENT_USER: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@smartcampus.edu',
  studentId: 'SOA-2026-8849',
  department: 'Computer Science & Engineering',
  role: 'Student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  notificationsEnabled: true,
  emailAlerts: true,
  theme: 'Light'
};

export const SAMPLE_AI_QA_PAIRS = [
  {
    keywords: ['library', 'hours', 'central library', 'book', 'reading room'],
    response: 'The Central Library (Knowledge Center) is open daily from 08:00 AM to 11:00 PM. It features over 150,000 volumes, IEEE digital access stations, and quiet reading floors. For specific book borrowing or reading cubicle access, please consult the help desk on the ground floor.',
    suggestedBuildingId: 'bldg-library',
    suggestedFacilityId: 'fac-3',
    sources: ['SOA Central Library Information Desk (Demo)']
  },
  {
    keywords: ['fee', 'payment', 'tuition', 'semester fee', 'exam fee', 'pay'],
    response: 'In SOA SmartHub, you can view an illustrative demo breakdown of your semester tuition, examination fees, and campus charges in the Student Utilities module. Please note that online fee payment integration is currently an upcoming feature for future releases, and actual transactions must be confirmed through the official SOA accounts section.',
    suggestedBuildingId: 'bldg-admin',
    sources: ['SOA Finance & Accounts Guidelines (Demo)']
  },
  {
    keywords: ['bus', 'transport', 'route', 'shuttle', 'cuttack', 'station'],
    response: 'SOA operates university bus routes covering Cuttack (Badambadi), Master Canteen, Patia, and local feeder routes in Bhubaneswar. You can check sample route timings in the Student Utilities section. For official seat allocations and verified schedules, please consult the Campus Transport Department.',
    suggestedBuildingId: 'bldg-parking',
    sources: ['Campus Transport Overview (Demo)']
  },
  {
    keywords: ['student section', 'bonafide', 'certificate', 'transcript', 'id card'],
    response: 'The Student Section is located on the 1st Floor of the Administrative Block (ADM-BLK). They assist with bonafide certificate requests, academic transcripts, student identity cards, and document verifications. Counters are open Mon-Fri from 10:00 AM to 03:30 PM.',
    suggestedBuildingId: 'bldg-admin',
    suggestedFacilityId: 'fac-6',
    sources: ['SOA Student Section Handbook (Demo)']
  },
  {
    keywords: ['e-block', 'computer science', 'cse', 'lab', 'e block'],
    response: 'E-Block is the primary academic hub for Computer Science & Engineering. It houses state-of-the-art AI & Data Analytics labs (such as E-304), high-performance computing clusters, smart seminar theaters, and faculty consultation rooms.',
    suggestedBuildingId: 'bldg-e-block',
    suggestedFacilityId: 'fac-1',
    sources: ['ITER Campus Directory']
  },
  {
    keywords: ['announcement', 'notice', 'circular', 'exam', 'calendar'],
    response: 'You can browse current demo circulars in the Campus Announcements section, including the Odd Semester Academic Calendar, Semester Exam registration guidelines, library extension notices, and Ideasprint 2026 hackathon details.',
    sources: ['Campus Circular Board (Demo)']
  }
];
