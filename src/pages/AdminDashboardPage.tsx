import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, Building, Layers, BellRing, Bot, FileText, Check, Lock } from 'lucide-react';
import { Building as BuildingType, Facility, Announcement, IssueReport } from '../types';
import { 
  BuildingService, 
  FacilityService, 
  AnnouncementService, 
  IssueReportService, 
  AdminService 
} from '../services/campusServices';
import { useAuth } from '../context/AuthContext';

export const AdminDashboardPage: React.FC = () => {
  const { isAdmin, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'buildings' | 'facilities' | 'announcements' | 'issues'>('overview');

  const [stats, setStats] = useState({ totalBuildings: 0, totalFacilities: 0, totalAnnouncements: 0, openIssueReports: 0, activeUsersToday: 0 });
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [issues, setIssues] = useState<IssueReport[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // New building form state
  const [newBldgName, setNewBldgName] = useState('');
  const [newBldgCode, setNewBldgCode] = useState('');
  const [newBldgCategory, setNewBldgCategory] = useState<BuildingType['category']>('academic');

  // New announcement form state
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<Announcement['category']>('Events');

  const loadData = async () => {
    if (!isAdmin) return;
    setStats(await AdminService.getOverviewStats());
    setBuildings(await BuildingService.getAll());
    setFacilities(await FacilityService.getAll());
    setAnnouncements(await AnnouncementService.getAll());
    setIssues(await IssueReportService.getAll());
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Administrator Access Restricted</h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          You are currently {currentUser ? <>signed in as <strong>{currentUser.name}</strong> with student privileges</> : <>browsing as a <strong>Guest</strong></>}. Administrative operations are strictly restricted to verified campus administration accounts.
        </p>
        <div className="pt-2">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
            Role: {currentUser?.role || 'Guest'}
          </span>
        </div>
      </div>
    );
  }

  const handleAddBuilding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBldgName || !newBldgCode) return;
    await BuildingService.create({
      name: newBldgName,
      code: newBldgCode.toUpperCase(),
      category: newBldgCategory,
      description: 'Newly added campus building via admin console prototype.',
      floors: 4,
      openHours: '08:00 AM - 10:00 PM',
      status: 'Open',
      coordinates: { x: 50, y: 50 },
      facilitiesCount: 5,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      features: ['Wi-Fi 7 Hub', 'Smart Lighting']
    });
    setNewBldgName('');
    setNewBldgCode('');
    setSuccessMsg('Building successfully added to prototype mock database!');
    loadData();
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleDeleteBuilding = async (id: string) => {
    await BuildingService.delete(id);
    setSuccessMsg('Building deleted.');
    loadData();
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnSummary) return;
    await AnnouncementService.create({
      title: newAnnTitle,
      summary: newAnnSummary,
      content: 'Detailed circular content published via admin portal demonstration.',
      category: newAnnCategory,
      priority: 'Normal',
      date: new Date().toISOString().substring(0, 10),
      author: 'Campus Administrator',
      status: 'Published',
      targetAudience: 'All Campus'
    });
    setNewAnnTitle('');
    setNewAnnSummary('');
    setSuccessMsg('Announcement successfully published!');
    loadData();
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleUpdateIssueStatus = async (id: string, status: IssueReport['status']) => {
    await IssueReportService.updateStatus(id, status);
    setSuccessMsg(`Issue report status updated to ${status}.`);
    loadData();
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrative Control Center (Supabase Secured)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">SOA SmartHub Admin Portal</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Demonstrate full CRUD operations across buildings, facilities, announcements, and issue resolution dispatch queues.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl backdrop-blur-md border border-slate-700">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'buildings', label: 'Buildings' },
            { id: 'facilities', label: 'Facilities' },
            { id: 'announcements', label: 'Announcements' },
            { id: 'issues', label: 'Issues' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${activeTab === t.id ? 'bg-[#176B4D] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Buildings</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono">{stats.totalBuildings}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Facilities</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono">{stats.totalFacilities}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Announcements</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 font-mono">{stats.totalAnnouncements}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Issue Reports</span>
              <p className="text-3xl font-extrabold text-rose-600 mt-2 font-mono">{stats.openIssueReports}</p>
            </div>
          </div>
        </div>
      )}

      {/* BUILDINGS CRUD TAB */}
      {activeTab === 'buildings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#176B4D]" /> Add New Building
            </h3>
            <form onSubmit={handleAddBuilding} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Building Name</label>
                <input
                  type="text"
                  placeholder="e.g. Quantum Science Center"
                  value={newBldgName}
                  onChange={(e) => setNewBldgName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Building Code</label>
                <input
                  type="text"
                  placeholder="e.g. QSC"
                  value={newBldgCode}
                  onChange={(e) => setNewBldgCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newBldgCategory}
                  onChange={(e) => setNewBldgCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden capitalize"
                >
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                  <option value="library">Library</option>
                  <option value="recreational">Recreational</option>
                  <option value="dining">Dining</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white font-semibold text-xs transition-colors shadow-2xs"
              >
                Create Building
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs overflow-hidden">
            <h3 className="text-base font-bold text-slate-900 mb-4">Existing Campus Buildings ({buildings.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {buildings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#176B4D]">{b.code}</td>
                      <td className="p-3 font-semibold text-slate-900">{b.name}</td>
                      <td className="p-3 capitalize text-slate-600">{b.category}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteBuilding(b.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Building"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FACILITIES TAB */}
      {activeTab === 'facilities' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Campus Facilities & Labs Directory ({facilities.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="p-3">Facility Name</th>
                  <th className="p-3">Building</th>
                  <th className="p-3">Floor</th>
                  <th className="p-3">Capacity</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facilities.map(f => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{f.name}</td>
                    <td className="p-3 text-slate-600">{f.buildingName}</td>
                    <td className="p-3 font-mono text-emerald-800">{f.floor}</td>
                    <td className="p-3 text-slate-600">{f.capacity} seats</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#176B4D]" /> Publish Announcement
            </h3>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Announcement title..."
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newAnnCategory}
                  onChange={(e) => setNewAnnCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                >
                  <option value="Events">Events</option>
                  <option value="Academic">Academic</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Summary</label>
                <textarea
                  rows={3}
                  placeholder="Short brief summary..."
                  value={newAnnSummary}
                  onChange={(e) => setNewAnnSummary(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white font-semibold text-xs transition-colors shadow-2xs"
              >
                Publish Notice
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Announcements Feed ({announcements.length})</h3>
            <div className="space-y-3">
              {announcements.map(a => (
                <div key={a.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">{a.category}</span>
                      <span className="text-xs text-slate-400">{a.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{a.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-1">{a.summary}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${a.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ISSUES RESOLUTION TAB */}
      {activeTab === 'issues' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Issue Reports Resolution Queue ({issues.length})</h3>
          <div className="space-y-3">
            {issues.map(iss => (
              <div key={iss.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#176B4D] bg-emerald-50 px-2 py-0.5 rounded">{iss.id}</span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">{iss.category}</span>
                    <span className="text-xs text-slate-400">{iss.submittedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{iss.title}</h4>
                  <p className="text-xs text-slate-600">{iss.description} • <em>Location: {iss.facilityName}</em></p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={iss.status}
                    onChange={(e) => handleUpdateIssueStatus(iss.id, e.target.value as any)}
                    className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="In Review">In Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
