import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  DISTRICT_HEALTH_METRICS,
  MAHARASHTRA_FACILITIES,
} from '../data/maharashtraHealthData';
import { getStoredGrievances } from '../utils/offlineStorage';
import {
  Building2,
  Users,
  GitPullRequest,
  ShieldAlert,
  Bed,
  AlertTriangle,
  Download,
  TrendingUp,
  Activity,
  CheckCircle2,
  Filter,
  BarChart3,
  MapPin,
  Ambulance,
  PhoneCall,
  Droplets,
  Clock,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchDistrict, setSearchDistrict] = useState<string>('');
  const grievances = getStoredGrievances();

  const filteredDistricts = DISTRICT_HEALTH_METRICS.filter((dist) => {
    const matchesRegion = selectedRegion === 'All' || dist.region === selectedRegion;
    const matchesSearch = dist.districtName
      .toLowerCase()
      .includes(searchDistrict.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'District,Region,Facilities,Vulnerability,ActiveReferrals,BedOccupancy,ASV_Status,Emergency108_24h,ICUBedsAvailable,PendingGrievances\n' +
      DISTRICT_HEALTH_METRICS.map(
        (d) =>
          `"${d.districtName}","${d.region}",${d.totalFacilities},"${d.vulnerabilityIndex}",${d.activeReferrals},"${d.bedOccupancyRate}%","${d.asvStockStatus}",${d.emergency108Calls24h},${d.icuBedsAvailable},${d.pendingGrievances}`
      ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Maharashtra_Health_Command_Report_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Top Banner */}
      <div className="admin-header-strip">
        <div>
          <div className="gov-admin-tag">🏛️ सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन</div>
          <h1>{t.adminTitle}</h1>
          <p>{t.adminSubtitle}</p>
        </div>

        <button className="export-report-btn" onClick={handleExport}>
          <Download size={16} />
          <span>{t.exportReport}</span>
        </button>
      </div>

      {/* State-wide KPI Counters */}
      <div className="kpi-grid">
        <div className="kpi-card blue-border">
          <div className="kpi-icon-box blue-kpi">
            <Users size={24} />
          </div>
          <div className="kpi-data">
            <span>{t.kpiTotalPatients}</span>
            <h2>1,48,290</h2>
            <small className="trend-up">↑ +14% vs Last Month</small>
          </div>
        </div>

        <div className="kpi-card purple-border">
          <div className="kpi-icon-box purple-kpi">
            <GitPullRequest size={24} />
          </div>
          <div className="kpi-data">
            <span>{t.kpiActiveReferrals}</span>
            <h2>1,580</h2>
            <small>94% In-Transit with Live GPS</small>
          </div>
        </div>

        <div className="kpi-card red-border">
          <div className="kpi-icon-box red-kpi">
            <ShieldAlert size={24} />
          </div>
          <div className="kpi-data">
            <span>{t.kpiEmergencySos}</span>
            <h2>438</h2>
            <small>Avg response time: 14 mins</small>
          </div>
        </div>

        <div className="kpi-card green-border">
          <div className="kpi-icon-box green-kpi">
            <Bed size={24} />
          </div>
          <div className="kpi-data">
            <span>{t.kpiBedOccupancy}</span>
            <h2>84.2%</h2>
            <small>3,420 Beds Live Available</small>
          </div>
        </div>

        <div className="kpi-card orange-border">
          <div className="kpi-icon-box orange-kpi">
            <AlertTriangle size={24} />
          </div>
          <div className="kpi-data">
            <span>Critical ASV Alerts</span>
            <h2>2 Districts</h2>
            <small className="trend-down">Palghar & Gadchiroli buffer low</small>
          </div>
        </div>
      </div>

      {/* Critical Resource Alert Banner */}
      <div className="critical-resource-command-banner">
        <div className="alert-head-col">
          <AlertTriangle size={24} className="gold-alert-icon" />
          <div>
            <strong>🚨 High-Priority District Resource Alerts (Command Directive):</strong>
            <p>
              Palghar & Gadchiroli tribal belts have triggered automated buffer replenishment requests for Anti-Snake Venom (ASV Polyvalent) & Artesunate injections.
            </p>
          </div>
        </div>
        <button className="dispatch-supplies-btn" onClick={() => alert('Emergency buffer replenishment dispatched from Pune Central Medical Store.')}>
          Dispatch Supplies Now →
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="admin-two-col-grid">
        {/* Left Column: District Health Metrics Table */}
        <div className="admin-table-card">
          <div className="table-filter-header">
            <div className="table-title">
              <BarChart3 size={20} className="table-icon" />
              <h3>{t.districtVulnerabilityTitle}</h3>
            </div>

            <div className="table-controls">
              <input
                type="text"
                placeholder="Search District..."
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="admin-search-input"
              />

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="region-filter-select"
              >
                <option value="All">All Regions</option>
                <option value="Vidarbha">Vidarbha</option>
                <option value="Konkan">Konkan</option>
                <option value="Western Maharashtra">Western Maharashtra</option>
                <option value="North Maharashtra">North Maharashtra</option>
                <option value="Marathwada">Marathwada</option>
              </select>
            </div>
          </div>

          <div className="admin-table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Region</th>
                  <th>Facilities</th>
                  <th>Vulnerability</th>
                  <th>Bed Occupancy</th>
                  <th>ASV Status</th>
                  <th>108 Calls (24h)</th>
                  <th>Pending Complaints</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistricts.map((d) => (
                  <tr key={d.districtName}>
                    <td>
                      <strong>{d.districtName}</strong>
                    </td>
                    <td>{d.region}</td>
                    <td>{d.totalFacilities}</td>
                    <td>
                      <span
                        className={`vulnerability-badge ${
                          d.vulnerabilityIndex.includes('High')
                            ? 'vuln-high'
                            : d.vulnerabilityIndex.includes('Moderate')
                            ? 'vuln-mod'
                            : 'vuln-low'
                        }`}
                      >
                        {d.vulnerabilityIndex}
                      </span>
                    </td>
                    <td>
                      <div className="occupancy-bar-wrap">
                        <div
                          className="occupancy-bar-fill"
                          style={{
                            width: `${d.bedOccupancyRate}%`,
                            backgroundColor:
                              d.bedOccupancyRate > 85 ? '#ef4444' : '#10b981',
                          }}
                        ></div>
                        <span>{d.bedOccupancyRate}%</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`asv-status-badge ${
                          d.asvStockStatus === 'Critical Shortage'
                            ? 'asv-crit'
                            : 'asv-ok'
                        }`}
                      >
                        {d.asvStockStatus}
                      </span>
                    </td>
                    <td>
                      <div className="metric-cell">
                        <Ambulance size={14} />
                        <span>{d.emergency108Calls24h}</span>
                      </div>
                    </td>
                    <td>
                      <span className="pending-grv-chip">{d.pendingGrievances} Cases</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Live Grievances Radar & 108 Emergency Feed */}
        <div className="admin-side-analytics">
          {/* Grievance Escalation Monitor */}
          <div className="admin-card-box">
            <div className="card-box-header">
              <ShieldAlert size={18} className="red-icon" />
              <h4>Grievance Auto-Escalation Radar</h4>
            </div>

            <div className="grievance-mini-list">
              {grievances.map((g) => (
                <div key={g.id} className="grievance-mini-item">
                  <div className="mini-top">
                    <strong>{g.id}</strong>
                    <span className={`status-tag ${g.status}`}>{g.status.toUpperCase()}</span>
                  </div>
                  <div className="mini-fac">{g.facilityName} ({g.district})</div>
                  <p className="mini-cat">{g.category}: "{g.description.slice(0, 60)}..."</p>
                  <small>{g.currentLevel}</small>
                </div>
              ))}
            </div>
          </div>

          {/* 108 Live Dispatch Feed */}
          <div className="admin-card-box">
            <div className="card-box-header">
              <Activity size={18} className="green-icon" />
              <h4>Live 108 Emergency Dispatch Stream</h4>
            </div>

            <div className="live-stream-items">
              <div className="stream-item">
                <div className="stream-time">Just now</div>
                <div className="stream-msg">
                  <strong>MH-12-AMB-108</strong> dispatched to Bhor for High-Risk Maternity emergency.
                </div>
              </div>
              <div className="stream-item">
                <div className="stream-time">8 mins ago</div>
                <div className="stream-msg">
                  <strong>Gadchiroli Unit 4</strong> arrived at Aheri SDH with snakebite emergency. ASV administered.
                </div>
              </div>
              <div className="stream-item">
                <div className="stream-time">22 mins ago</div>
                <div className="stream-msg">
                  <strong>Palghar Mobile Medical Unit</strong> completed antenatal screenings at Jawhar tribal cluster.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
