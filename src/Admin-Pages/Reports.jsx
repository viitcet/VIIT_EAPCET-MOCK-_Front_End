import { useState, useEffect } from "react";
import Papa from "papaparse";
import NavBarMain from "../components/NavBarMain";
import AdminSideBar from "../components/AdminSiderBar";
import Footer from "../components/Footer";
import { Menu as MenuIcon, X } from "lucide-react";
import logo from "../assets/LogoV1.png";

// Voucher Modal Component
const VoucherModal = ({ paperId, topStudents, onClose, onSubmit }) => {
  const [vouchers, setVouchers] = useState(
    topStudents.map((_, index) => ({ rank: index + 1, code: '' }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setVouchers(topStudents.map((_, index) => ({ rank: index + 1, code: '' })));
  }, [topStudents]);

  const handleVoucherChange = (index, value) => {
    const updated = [...vouchers];
    updated[index].code = value;
    setVouchers(updated);
  };

  const handleSubmit = async () => {
    if (vouchers.some(v => !v.code.trim())) {
      alert('Please enter voucher codes for all students.');
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(vouchers);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh]">
        <div className="bg-[#003973] px-6 py-4 flex justify-between items-center border-b border-blue-800 shrink-0">
          <h3 className="text-lg font-bold text-white uppercase tracking-tight">Send Results & Vouchers</h3>
          <button className="text-white hover:bg-white/10 p-1 rounded-full transition-colors" onClick={onClose} disabled={isSubmitting}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
            <p className="text-xs text-blue-800 leading-relaxed font-medium">
              Enter Amazon voucher codes for the top 5 students. These will be sent automatically in their result emails.
            </p>
          </div>

          <div className="space-y-4">
            {topStudents.map((student, index) => (
              <div key={index} className="space-y-2 group">
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-gray-800">Rank {index + 1}</span>
                  <span className="text-xs font-medium text-gray-500">{student.name} • {student.score} pts</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter code (e.g., AMZN-1234-5678)"
                  value={vouchers[index]?.code || ''}
                  onChange={(e) => handleVoucherChange(index, e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003973] focus:border-transparent outline-none transition-all group-hover:border-gray-400"
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 border-t shrink-0">
          <button className="w-full sm:w-auto px-6 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-semibold text-sm disabled:opacity-50" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button className="w-full flex-1 px-6 py-2 rounded-xl bg-[#003973] text-white hover:bg-[#002d5a] transition-all transform hover:scale-[1.02] active:scale-95 font-semibold text-sm disabled:opacity-50 shadow-lg shadow-blue-900/20" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Send Results & Vouchers'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Reports() {
  const [isAdminSideBarOpen, setIsAdminSideBarOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voucherModal, setVoucherModal] = useState({ show: false, paperId: null, topStudents: [] });
  const [isSubmittingMail, setIsSubmittingMail] = useState(false);
  const [exporting, setExporting] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const API = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/api/admin/reports`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch reports");
      setReports(data.reports || []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || String(err));
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMails = async (paperId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/api/admin/top-students/${paperId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.message}`);
        return;
      }
      setVoucherModal({
        show: true,
        paperId,
        topStudents: (data.topStudents || []).slice(0, 5),
      });
    } catch (err) {
      console.error("Failed to fetch top students:", err);
      alert("An error occurred while fetching top students.");
    }
  };

  const handleSubmitVouchers = async (vouchers) => {
    try {
      setIsSubmittingMail(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/api/admin/send-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paperId: voucherModal.paperId, vouchers }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Mails sent");
        setVoucherModal({ show: false, paperId: null, topStudents: [] });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Failed to send mails with vouchers:", err);
      alert("An error occurred while sending emails.");
    } finally {
      setIsSubmittingMail(false);
    }
  };

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const handleExport = async (paperId, title) => {
    try {
      setExporting((s) => ({ ...s, [paperId]: true }));
      const token = localStorage.getItem("token");

      // First try streaming Excel from backend
      const primaryUrl = `${API}/api/admin/reports/${paperId}/results`;
      const res = await fetch(primaryUrl, { headers: { Authorization: `Bearer ${token}` } });

      if (!res.ok) {
        // If backend responds with an error, try to parse message
        let errMsg = 'Export failed';
        try {
          const ej = await res.json();
          if (ej && ej.message) errMsg = ej.message;
        } catch (e) {
          /* ignore */
        }
        alert(errMsg);
        return;
      }

      const contentType = (res.headers.get('content-type') || '').toLowerCase();

      // If backend returned an Excel file stream, download it directly
      if (contentType.includes('spreadsheet') || contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        const blob = await res.blob();
        const disposition = res.headers.get('content-disposition') || '';
        let filename = `${slugify(title || paperId)}_results.xlsx`;
        const m = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";\n]+)/i);
        if (m && m[1]) filename = m[1];

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        return;
      }

      // Otherwise assume JSON payload and fall back to CSV
      const json = await res.json();
      let data = null;
      if (Array.isArray(json)) data = json;
      else if (Array.isArray(json.results)) data = json.results;
      else if (Array.isArray(json.students)) data = json.students;
      else if (Array.isArray(json.data)) data = json.data;

      if (!data) {
        alert("Unable to fetch report results for export. Please check the API endpoint.");
        return;
      }

      // Convert to CSV using PapaParse
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const filename = `${slugify(title || paperId)}_results.csv`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. See console for details.");
    } finally {
      setExporting((s) => ({ ...s, [paperId]: false }));
    }
  };

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(reports.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageReports = reports.slice(start, start + PAGE_SIZE);
  const featured = pageReports[0];
  const others = pageReports.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
      <NavBarMain />

      <div className="flex flex-1">
        <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${isAdminSideBarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <AdminSideBar isAdminSideBarOpen={isAdminSideBarOpen} setIsAdminSideBarOpen={setIsAdminSideBarOpen} />
        </aside>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          <button className="lg:hidden mb-4 text-[#003973] flex items-center gap-2" onClick={() => setIsAdminSideBarOpen(!isAdminSideBarOpen)}>
            <MenuIcon size={24} />
          </button>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Reports</h2>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-20 w-20">
                  <img src={logo} alt="Loading..." />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium">Error: {error}</p>
                <button onClick={fetchReports} className="mt-2 text-sm text-red-600 hover:text-red-800 underline">Try again</button>
              </div>
            )}

            {!loading && !error && reports.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600 text-lg">No reports available yet.</p>
                <p className="text-gray-500 text-sm mt-2">Reports will appear here once exams are created and attempted.</p>
              </div>
            )}

            {!loading && !error && reports.length > 0 && (
              <>
                {featured && (
                  <div className="bg-[#eaf6ff] rounded-xl shadow-md p-6 border border-blue-100 mb-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">{featured.title}</h3>

                    <div className="text-base text-gray-700 space-y-1 mb-6">
                      <div>Start Date: <span className="font-medium">{formatDate(featured.startDate)}</span></div>
                      <div>Total Students: <span className="font-medium">{featured.completed}</span></div>
                      <div>Avg Score: <span className="font-medium">{featured.avgScore}</span></div>
                      <div>Status: <span className="font-medium">{featured.status}</span></div>
                    </div>

                    {Array.isArray(featured.subjectAnalytics) && featured.subjectAnalytics.length > 0 && (
                      <div className="flex justify-center mb-6">
                        <div className="bg-[#eaf6ff] rounded-xl border border-gray-800 shadow-sm p-6 w-full max-w-4xl overflow-hidden">
                          <div className="text-lg font-medium text-gray-700 mb-4">Subject-Wise Analytics Report</div>
                          <div className="overflow-auto">
                            <table className="w-full text-lg text-left border-collapse">
                              <thead>
                                <tr>
                                  <th className="py-3 px-4 border border-gray-800">Subject</th>
                                  <th className="py-3 px-4 border border-gray-800">Avg Score</th>
                                  <th className="py-3 px-4 border border-gray-800">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {featured.subjectAnalytics.map((subject, idx) => (
                                  <tr key={idx}>
                                    <td className="py-3 px-4 border border-gray-800 capitalize">{subject.subject.toLowerCase()}</td>
                                    <td className="py-3 px-4 border border-gray-800">{subject.avgScore}/{subject.maxMarks}</td>
                                    <td className="py-3 px-4 border border-gray-800">{subject.maxMarks}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-base text-gray-700 space-y-1 mb-4">
                      <div>Registered: <span className="font-medium">{featured.registered}</span></div>
                      <div>Attempted: <span className="font-medium">{featured.attempted}</span></div>
                      <div>Attempt: <span className="font-medium">{featured.attemptPercentage}%</span></div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button onClick={() => handleSendMails(featured.id)} disabled={featured.mailSent} className={`bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 shadow-sm ${featured.mailSent ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                        {featured.mailSent ? 'Mails Sent' : '+ Send Mails'}
                      </button>

                      <button onClick={() => handleExport(featured.id, featured.title)} disabled={!!exporting[featured.id]} className={`bg-[#003973] text-white rounded-md px-4 py-2 shadow-sm hover:bg-[#002d5a] flex items-center gap-2 ${exporting[featured.id] ? 'opacity-70 cursor-wait' : ''}`}>
                        {exporting[featured.id] ? 'Exporting...' : 'Export to Excel'}
                      </button>
                    </div>
                  </div>
                )}

                {others.length > 0 && (
                  <div className="space-y-2">
                    {others.map((report) => (
                      <details key={report.id} className="p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-gray-300 transition">
                        <summary className="cursor-pointer text-gray-800 font-medium">+ Results For {report.title}</summary>
                        <div className="mt-3 border-t border-gray-200 pt-3">
                          <div className="text-base text-gray-700 space-y-1 mb-4">
                            <div>Start Date: <span className="font-medium">{formatDate(report.startDate)}</span></div>
                            <div>Total Students: <span className="font-medium">{report.totalStudents}</span></div>
                            <div>Registered: <span className="font-medium">{report.registered}</span></div>
                            <div>Attempted: <span className="font-medium">{report.attempted}</span></div>
                            <div>Completed: <span className="font-medium">{report.completed}</span></div>
                            <div>Avg Score: <span className="font-medium">{report.avgScore}</span></div>
                            <div>Status: <span className="font-medium">{report.isActive ? 'Active' : 'Complete'}</span></div>
                          </div>

                          {Array.isArray(report.subjectAnalytics) && report.subjectAnalytics.length > 0 && (
                            <div className="flex justify-center mb-4">
                              <div className="bg-[#eaf6ff] rounded-xl border border-gray-800 shadow-sm p-6 w-full max-w-4xl overflow-hidden">
                                <div className="text-lg font-medium text-gray-700 mb-4">Subject-Wise Analytics Report</div>
                                <div className="overflow-auto">
                                  <table className="w-full text-lg text-left border-collapse">
                                    <thead>
                                      <tr>
                                        <th className="py-3 px-4 border border-gray-800">Subject</th>
                                        <th className="py-3 px-4 border border-gray-800">Avg Score</th>
                                        <th className="py-3 px-4 border border-gray-800">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {report.subjectAnalytics.map((subject, idx) => (
                                        <tr key={idx}>
                                          <td className="py-3 px-4 border border-gray-800 capitalize">{subject.subject.toLowerCase()}</td>
                                          <td className="py-3 px-4 border border-gray-800">{subject.avgScore}/{subject.maxMarks}</td>
                                          <td className="py-3 px-4 border border-gray-800">{subject.maxMarks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mt-2 flex items-center gap-3">
                            <button onClick={() => handleSendMails(report.id)} disabled={report.mailSent} className={`bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 shadow-sm ${report.mailSent ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                              {report.mailSent ? 'Mails Sent' : '+ Send Mails'}
                            </button>

                            <button onClick={() => handleExport(report.id, report.title)} disabled={!!exporting[report.id]} className={`bg-[#003973] text-white rounded-md px-4 py-2 shadow-sm hover:bg-[#002d5a] flex items-center gap-2 ${exporting[report.id] ? 'opacity-70 cursor-wait' : ''}`}>
                              {exporting[report.id] ? 'Exporting...' : 'Export to Excel'}
                            </button>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-2 rounded-md bg-white border">Prev</button>
                  <div className="px-3 py-2">Page {currentPage} of {totalPages}</div>
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-2 rounded-md bg-white border">Next</button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {voucherModal.show && (
        <VoucherModal
          paperId={voucherModal.paperId}
          topStudents={voucherModal.topStudents}
          onClose={() => setVoucherModal({ show: false, paperId: null, topStudents: [] })}
          onSubmit={handleSubmitVouchers}
        />
      )}
    </div>
  );
}