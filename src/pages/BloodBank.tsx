import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  BloodBank,
  MAHARASHTRA_DISTRICTS,
} from '../data/maharashtraHealthData';
import { getStoredBloodBanks } from '../utils/offlineStorage';
import {
  Droplets,
  Search,
  MapPin,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface BloodBankProps {
  language: Language;
}

type BloodGroupKey = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const BLOOD_GROUPS: BloodGroupKey[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BloodBankPage: React.FC<BloodBankProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const bloodBanks = getStoredBloodBanks();
  const [selectedGroup, setSelectedGroup] = useState<BloodGroupKey | 'ALL'>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBanks = bloodBanks.filter((bank) => {
    const matchesDistrict = selectedDistrict === 'All' || bank.district === selectedDistrict;
    const matchesSearch =
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.taluka.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedGroup === 'ALL') {
      return matchesDistrict && matchesSearch;
    }

    const groupStock = bank.stocks[selectedGroup];
    return matchesDistrict && matchesSearch && groupStock && groupStock.units > 0;
  });

  return (
    <div className="blood-bank-page-container">
      {/* Top Banner */}
      <div className="blood-header-banner">
        <div className="gov-seal-badge">
          🏛️ <strong>{t.govTopTag}</strong> | e-RaktKosh Sync
        </div>
        <h1>{t.bloodBankTitle}</h1>
        <p>{t.bloodBankSubtitle}</p>

        {/* Blood Group Chips Selector */}
        <div className="blood-group-selector-strip">
          <button
            className={`blood-chip-btn ${selectedGroup === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedGroup('ALL')}
          >
            All Groups
          </button>
          {BLOOD_GROUPS.map((grp) => (
            <button
              key={grp}
              className={`blood-chip-btn ${selectedGroup === grp ? 'active' : ''}`}
              onClick={() => setSelectedGroup(grp)}
            >
              <Droplets size={16} />
              <span>{grp}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="blood-filters-bar">
        <div className="search-input-box">
          <Search size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blood bank by hospital, city or district..."
            className="blood-search-input"
          />
        </div>

        <div className="district-filter-box">
          <Filter size={18} />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="blood-district-select"
          >
            <option value="All">All 36 Districts (सर्व जिल्हे)</option>
            {MAHARASHTRA_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blood Bank Cards Grid */}
      <div className="blood-banks-grid">
        {filteredBanks.length === 0 ? (
          <div className="no-blood-found-card">
            <AlertCircle size={40} className="red-alert-icon" />
            <h3>No matching blood banks with stock found</h3>
            <p>Try switching blood groups or searching another district in Maharashtra.</p>
          </div>
        ) : (
          filteredBanks.map((bank) => (
            <div className="blood-bank-card" key={bank.id}>
              {/* Card Header */}
              <div className="bank-card-header">
                <div>
                  <div className="bank-type-pill">
                    <ShieldCheck size={14} />
                    <span>{bank.isGovt ? 'Govt Regional Blood Bank' : 'Empanelled Blood Bank'}</span>
                  </div>
                  <h3>{bank.name}</h3>
                  <div className="bank-location-row">
                    <MapPin size={14} />
                    <span>
                      {bank.taluka}, {bank.district} — {bank.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Units Matrix */}
              <div className="bank-units-matrix">
                <div className="matrix-title">
                  <strong>{t.unitsAvailableLabel}</strong>
                  <span className="live-pulse-dot">Live e-RaktKosh Feed</span>
                </div>

                <div className="units-chips-grid">
                  {BLOOD_GROUPS.map((grp) => {
                    const stock = bank.stocks[grp];
                    const isSelected = selectedGroup === grp;
                    return (
                      <div
                        key={grp}
                        className={`unit-badge-box ${isSelected ? 'highlighted' : ''} ${stock.status.toLowerCase()}`}
                      >
                        <span className="grp-label">{grp}</span>
                        <strong className="unit-num">{stock.units} Units</strong>
                        <small className="unit-stat">{stock.status}</small>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Components */}
              <div className="bank-components-box">
                <strong>{t.componentsAvailableLabel}</strong>
                <div className="components-tags">
                  {bank.componentsAvailable.map((comp, i) => (
                    <span className="component-pill" key={i}>
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bank-footer-actions">
                <a href={`tel:${bank.contactNumber.split('/')[0].trim()}`} className="bank-call-btn">
                  <PhoneCall size={16} />
                  <span>Call {bank.contactNumber}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${bank.name} ${bank.district}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bank-maps-btn"
                >
                  <span>Directions</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BloodBankPage;
