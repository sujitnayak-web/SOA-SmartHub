import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Image as ImageIcon, Send, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { IssueReport, Facility } from '../types';
import { IssueReportService } from '../services/campusServices';

interface ReportIssuePageProps {
  facilities: Facility[];
  issueReports: IssueReport[];
  onReportSubmitted: () => void;
  isGuest?: boolean;
  onRequireAuth?: (featureName: string) => void;
}

export const ReportIssuePage: React.FC<ReportIssuePageProps> = ({ 
  facilities, 
  issueReports, 
  onReportSubmitted,
  isGuest,
  onRequireAuth
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');

  const [category, setCategory] = useState<IssueReport['category']>('Maintenance');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [facilityId, setFacilityId] = useState(facilities[0]?.id || '');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categories: IssueReport['category'][] = ['Maintenance', 'IT & Wi-Fi', 'Cleanliness', 'Safety', 'Accessibility', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) {
      onRequireAuth?.('Submit a campus issue report');
      return;
    }
    if (!title.trim() || !description.trim()) {
      setErrorMessage('Please fill in both title and description before submitting.');
      return;
    }

    const selectedFacility = facilities.find(f => f.id === facilityId);

    await IssueReportService.create({
      category,
      title,
      description,
      facilityId,
      facilityName: selectedFacility ? selectedFacility.name : 'General Campus Area',
      imageUrl: imageUrl || undefined,
      submitterName: 'Alex Rivera'
    });

    setSuccessMessage('Issue report successfully submitted to prototype queue! Facilities & IT team notified.');
    setErrorMessage('');
    setTitle('');
    setDescription('');
    setImageUrl('');
    onReportSubmitted();

    setTimeout(() => {
      setSuccessMessage('');
      setActiveTab('history');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#176B4D] uppercase tracking-wider mb-1">
            <AlertCircle className="w-4 h-4" /> Facilities & IT Dispatch
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Report a Campus Issue</h2>
          <p className="text-sm text-slate-500 mt-1">
            Encountered a maintenance issue, Wi-Fi outage, or cleanliness concern? Submit a report for rapid resolution.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'submit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Submit New Report
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            My Submitted Reports ({issueReports.length})
          </button>
        </div>
      </div>

      {isGuest && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>You are browsing in <strong>Guest Mode</strong>. Submitting campus reports and viewing personal history requires student login.</span>
          </div>
          <button
            onClick={() => onRequireAuth?.('Submit an issue report')}
            className="px-3 py-1.5 rounded-lg bg-amber-800 text-white font-semibold text-xs hover:bg-amber-900 shrink-0 shadow-2xs"
          >
            Sign In
          </button>
        </div>
      )}

      {activeTab === 'submit' ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Issue Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center ${category === cat ? 'border-[#176B4D] bg-[#E7F3ED] text-[#176B4D] shadow-2xs' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Facility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g. Projector bulb burned out in lecture hall"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Related Facility / Room</label>
                <select
                  value={facilityId}
                  onChange={(e) => setFacilityId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                >
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>{f.buildingName} - {f.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detailed Description</label>
              <textarea
                rows={4}
                placeholder="Provide precise location details, equipment number, or urgency notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
              />
            </div>

            {/* Optional Image Attachment Simulation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Optional Photo Attachment URL</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... (optional photo URL)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden"
                />
                <div className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Sample Image
                </div>
              </div>
              {imageUrl && (
                <div className="mt-3 w-32 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={imageUrl} alt="Attachment preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#176B4D] hover:bg-[#145a3f] text-white font-semibold text-sm shadow-md flex items-center gap-2 transition-colors"
              >
                <span>Submit Issue Report</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {issueReports.map((rep) => (
            <div key={rep.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#176B4D] bg-emerald-50 px-2 py-0.5 rounded">{rep.id}</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{rep.category}</span>
                  <span className="text-xs text-slate-400">{rep.submittedAt}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{rep.title}</h3>
                <p className="text-xs text-slate-600">{rep.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{rep.facilityName}</span>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${rep.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : rep.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                  {rep.status}
                </span>
                <span className="text-[11px] text-slate-400">By {rep.submitterName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
