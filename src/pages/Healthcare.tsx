import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { translations, type Language } from '../data/translations';
import {
  MAHARASHTRA_DISTRICTS,
  type HealthcareFacility,
} from '../data/maharashtraHealthData';
import { getStoredFacilities } from '../utils/offlineStorage';
import { OPDTokenModal } from '../components/OPDTokenModal';
import {
  Search,
  PhoneCall,
  Navigation,
  ShieldCheck,
  Building2,
  Bed,
  Pill,
  Clock,
  UserCheck,
  Stethoscope,
  Filter,
  CheckCircle2,
  Ticket,
  Microscope,
  DollarSign,
  Building,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Crosshair,
  MapPin,
  Compass,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface HealthcareProps {
  language: Language;
}

type FacilityDetailTab = 'overview' | 'doctors' | 'charges' | 'labs' | 'director';
type SortOption = 'distance' | 'beds' | 'emergency' | 'default';

// Haversine Distance Calculation (KM)
function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

export const Healthcare: React.FC<HealthcareProps> = ({ language }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language] || translations.en;
  const rawFacilities: HealthcareFacility[] = getStoredFacilities();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [ayushmanOnly, setAyushmanOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [asvOnly, setAsvOnly] = useState(false);

  // GPS & Near Me State
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(0); // 0 = all
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Active Expand / Tab State per Facility Card
  const [activeTabs, setActiveTabs] = useState<Record<string, FacilityDetailTab>>({});
  const [expandedFacilityId, setExpandedFacilityId] = useState<string | null>(null);

  // Token Modal State
  const [tokenModalFacility, setTokenModalFacility] = useState<HealthcareFacility | null>(null);

  // GPS Locator Function
  const handleDetectLocation = (presetCoords?: { lat: number; lng: number; name: string }) => {
    setIsLocating(true);
    setLocationError(null);

    if (presetCoords) {
      setUserCoords({ lat: presetCoords.lat, lng: presetCoords.lng });
      setLocationName(presetCoords.name);
      setSortBy('distance');
      setIsLocating(false);
      return;
    }

    if (!navigator.geolocation) {
      // Fallback preset (Pune) if browser has no GPS
      setUserCoords({ lat: 18.5204, lng: 73.8567 });
      setLocationName('Pune Central (Auto-Fallback)');
      setSortBy('distance');
      setIsLocating(false);
      setLocationError(
        language === 'mr'
          ? 'ब्राउझरमध्ये GPS उपलब्ध नाही. पुणे शहराचे डेमो लोकेशन वापरले आहे.'
          : 'Geolocation not supported. Defaulting to Pune Central coordinates.'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setLocationName(
          `${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E`
        );
        setSortBy('distance');
        setIsLocating(false);
      },
      (error) => {
        // Safe fallback to realistic Maharashtra coordinate
        const fallback = { lat: 18.5284, lng: 73.8742 };
        setUserCoords(fallback);
        setLocationName('Pune District (Demo GPS)');
        setSortBy('distance');
        setIsLocating(false);
        setLocationError(
          language === 'mr'
            ? 'GPS परवानगी मिळाली नाही. पुणे केंद्र स्थानाचा वापर केला आहे.'
            : 'GPS permission denied or timed out. Using Maharashtra Regional Hub coordinates.'
        );
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  // Auto-detect location if URL has ?nearMe=true
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('nearMe') === 'true' || location.search.includes('nearMe')) {
      handleDetectLocation();
    }
  }, [location.search]);

  const handleClearLocation = () => {
    setUserCoords(null);
    setLocationName(null);
    setSortBy('default');
    setSelectedRadius(0);
    setLocationError(null);
  };

  const toggleTab = (facilityId: string, tab: FacilityDetailTab) => {
    setActiveTabs((prev) => ({ ...prev, [facilityId]: tab }));
    setExpandedFacilityId(facilityId);
  };

  // Filter and Sort Facilities with Real-time Distance Calculation
  const processedFacilities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return rawFacilities
      .map((facility) => {
        let calculatedDistance = null;
        let driveTimeMins = null;

        if (userCoords && facility.coordinates) {
          calculatedDistance = calculateHaversineDistanceKm(
            userCoords.lat,
            userCoords.lng,
            facility.coordinates.lat,
            facility.coordinates.lng
          );
          // Estimated driving time at 35 km/h average
          driveTimeMins = Math.max(3, Math.round((calculatedDistance / 35) * 60));
        }

        return {
          ...facility,
          calculatedDistance,
          driveTimeMins,
        };
      })
      .filter((facility) => {
        // Search text matching
        const matchesSearch =
          !q ||
          facility.name.toLowerCase().includes(q) ||
          (facility.marathiName || '').toLowerCase().includes(q) ||
          (facility.hindiName || '').toLowerCase().includes(q) ||
          (facility.taluka || '').toLowerCase().includes(q) ||
          (facility.district || '').toLowerCase().includes(q) ||
          (facility.specialties || []).some((specialty) =>
            specialty.toLowerCase().includes(q)
          ) ||
          (facility.doctors || []).some(
            (d) =>
              d.name.toLowerCase().includes(q) ||
              d.specialization.toLowerCase().includes(q) ||
              (d.conditionsSpecialized || []).some((c) =>
                c.toLowerCase().includes(q)
              )
          );

        // District filter
        const matchesDistrict =
          selectedDistrict === 'All' || facility.district === selectedDistrict;

        // Type filter
        const matchesType =
          selectedType === 'All' || facility.type === selectedType;

        // Verified
        const matchesVerified =
          !verifiedOnly || facility.verifiedStatus === 'verified';

        // Ayushman
        const matchesAyushman =
          !ayushmanOnly || facility.mjpjayEmpanelled;

        // Emergency 24/7
        const matchesEmergency =
          !emergencyOnly || facility.emergencyAvailable;

        // ASV Medicine Available
        const matchesAsv =
          !asvOnly ||
          (facility.medicines || []).some(
            (med) =>
              med.name.toLowerCase().includes('snake') &&
              med.status === 'in_stock'
          );

        // Radius distance filter
        const matchesRadius =
          selectedRadius === 0 ||
          facility.calculatedDistance === null ||
          facility.calculatedDistance <= selectedRadius;

        return (
          matchesSearch &&
          matchesDistrict &&
          matchesType &&
          matchesVerified &&
          matchesAyushman &&
          matchesEmergency &&
          matchesAsv &&
          matchesRadius
        );
      })
      .sort((a, b) => {
        if (sortBy === 'distance') {
          if (a.calculatedDistance === null) return 1;
          if (b.calculatedDistance === null) return -1;
          return a.calculatedDistance - b.calculatedDistance;
        }
        if (sortBy === 'beds') {
          const aBeds = (a.beds?.generalAvailable || 0) + (a.beds?.icuAvailable || 0);
          const bBeds = (b.beds?.generalAvailable || 0) + (b.beds?.icuAvailable || 0);
          return bBeds - aBeds;
        }
        if (sortBy === 'emergency') {
          return (b.emergencyAvailable ? 1 : 0) - (a.emergencyAvailable ? 1 : 0);
        }
        return 0;
      });
  }, [
    rawFacilities,
    searchQuery,
    selectedDistrict,
    selectedType,
    verifiedOnly,
    ayushmanOnly,
    emergencyOnly,
    asvOnly,
    userCoords,
    selectedRadius,
    sortBy,
  ]);

  const openDirections = (facility: HealthcareFacility) => {
    if (!facility.coordinates) return;
    // Direct Google Maps Driving Turn-by-Turn GPS navigation
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const openMapPin = (facility: HealthcareFacility) => {
    if (!facility.coordinates) return;
    // Direct Google Maps Search Pin at exact building coordinates
    const url = `https://www.google.com/maps/search/?api=1&query=${facility.coordinates.lat},${facility.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="finder-page-container">
      {/* Header Banner */}
      <div className="finder-header-banner">
        <div className="gov-seal-badge">
          🏛️ <strong>{t.govTopTag}</strong>
        </div>
        <h1>{t.finderTitle}</h1>
        <p>{t.finderSubtitle}</p>
      </div>

      {/* GPS "FIND NEAR ME" DEDICATED CONTROL BAR */}
      <div className="near-me-gps-command-bar">
        <div className="gps-main-action-col">
          <button
            className={`gps-locate-btn ${isLocating ? 'loading' : ''} ${userCoords ? 'active-location' : ''}`}
            onClick={() => handleDetectLocation()}
            disabled={isLocating}
          >
            <Crosshair size={18} className={isLocating ? 'spin-icon' : ''} />
            <span>
              {isLocating
                ? language === 'mr'
                  ? 'स्थान शोधत आहे...'
                  : 'Detecting Live GPS...'
                : userCoords
                ? language === 'mr'
                  ? '📍 लाइव्ह GPS सक्रिय (पुन्हा शोधा)'
                  : '📍 Live GPS Active (Update Location)'
                : language === 'mr'
                ? '📍 माझ्या जवळील आरोग्य केंद्रे शोधा (GPS)'
                : '📍 Find Healthcare Facilities Near Me (GPS)'}
            </span>
          </button>

          {userCoords && (
            <button className="clear-location-btn" onClick={handleClearLocation}>
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Quick Regional Presets for Instant Demo */}
        <div className="quick-presets-group">
          <span className="preset-label">📍 Quick Region Presets:</span>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 18.5284,
                lng: 73.8742,
                name: 'Pune City (BJMC Sassoon Hub)',
              })
            }
          >
            Pune
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 18.9994,
                lng: 72.8427,
                name: 'Mumbai City (KEM Hospital Hub)',
              })
            }
          >
            Mumbai
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 21.1349,
                lng: 79.0982,
                name: 'Nagpur (GMCH Vidarbha Hub)',
              })
            }
          >
            Nagpur
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 19.9975,
                lng: 73.7898,
                name: 'Nashik (Civil Hospital Hub)',
              })
            }
          >
            Nashik
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 19.8762,
                lng: 75.3433,
                name: 'Chh. Sambhajinagar (Ghati GMCH)',
              })
            }
          >
            Sambhajinagar
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 19.4147,
                lng: 79.9912,
                name: 'Gadchiroli (Aheri Tribal Belt)',
              })
            }
          >
            Gadchiroli
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 19.9723,
                lng: 72.7319,
                name: 'Palghar (Dahanu Coastal Sub-District)',
              })
            }
          >
            Palghar
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 16.6983,
                lng: 74.2238,
                name: 'Kolhapur (CPR Civil Hospital)',
              })
            }
          >
            Kolhapur
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 19.1557,
                lng: 77.3155,
                name: 'Nanded (Dr. SC GMC Hospital)',
              })
            }
          >
            Nanded
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 21.3739,
                lng: 74.2403,
                name: 'Nandurbar (Tribal Civil Hospital)',
              })
            }
          >
            Nandurbar
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 19.1982,
                lng: 72.9984,
                name: 'Thane (CSMH Kalwa Hospital)',
              })
            }
          >
            Thane
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 20.932,
                lng: 77.7523,
                name: 'Amravati (Irwin Civil Hospital)',
              })
            }
          >
            Amravati
          </button>
          <button
            className="preset-pill-btn"
            onClick={() =>
              handleDetectLocation({
                lat: 17.6805,
                lng: 73.9934,
                name: 'Satara (Civil Hospital Hub)',
              })
            }
          >
            Satara
          </button>
        </div>
      </div>

      {/* GPS Active Status / Error Notice */}
      {userCoords && (
        <div className="gps-active-status-strip">
          <div className="status-left">
            <Compass size={16} className="pulse-compass" />
            <span>
              <strong>Location Center:</strong> {locationName} • Showing facilities ordered by <strong>nearest distance</strong>.
            </span>
          </div>

          <div className="status-right-radius">
            <label>Radius:</label>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(Number(e.target.value))}
              className="radius-select"
            >
              <option value={0}>Any Distance</option>
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={25}>Within 25 km</option>
              <option value={50}>Within 50 km</option>
              <option value={100}>Within 100 km</option>
            </select>
          </div>
        </div>
      )}

      {locationError && (
        <div className="location-error-banner">
          <AlertCircle size={16} />
          <span>{locationError}</span>
        </div>
      )}

      {/* Main Search & Filters Card */}
      <div className="finder-controls-card">
        {/* Top Search Input */}
        <div className="search-bar-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="main-search-input"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters & Sort */}
        <div className="dropdowns-filter-row">
          <div className="select-wrap">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="filter-select"
            >
              <option value="All">{t.allDistricts}</option>
              {MAHARASHTRA_DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrap">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="All">{t.allFacilityTypes}</option>
              <option value="Govt Medical College">Govt Medical College (GMC)</option>
              <option value="District Hospital">District Hospital</option>
              <option value="Sub-District Hospital">Sub-District Hospital (SDH)</option>
              <option value="CHC">Community Health Centre (CHC/RH)</option>
              <option value="PHC">Primary Health Centre (PHC)</option>
              <option value="Sub-Centre">Village Sub-Centre</option>
            </select>
          </div>

          <div className="select-wrap sort-select-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="filter-select sort-select"
            >
              <option value="default">Sort: Default Order</option>
              <option value="distance">📍 Sort: Nearest Distance First</option>
              <option value="beds">🛏️ Sort: Most Available Beds</option>
              <option value="emergency">🚨 Sort: 24/7 Emergency First</option>
            </select>
          </div>
        </div>

        {/* Toggle Checkbox Pills */}
        <div className="filter-pills-row">
          <button
            className={`filter-pill-btn ${verifiedOnly ? 'active' : ''}`}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
          >
            <ShieldCheck size={15} />
            <span>{t.filterVerifiedOnly}</span>
          </button>

          <button
            className={`filter-pill-btn ${ayushmanOnly ? 'active' : ''}`}
            onClick={() => setAyushmanOnly(!ayushmanOnly)}
          >
            <CheckCircle2 size={15} />
            <span>{t.filterAyushmanOnly}</span>
          </button>

          <button
            className={`filter-pill-btn ${emergencyOnly ? 'active' : ''}`}
            onClick={() => setEmergencyOnly(!emergencyOnly)}
          >
            <span>{t.filterEmergencyOnly}</span>
          </button>

          <button
            className={`filter-pill-btn ${asvOnly ? 'active' : ''}`}
            onClick={() => setAsvOnly(!asvOnly)}
          >
            <span>{t.filterAsvAvailable}</span>
          </button>
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="results-counter-strip">
        <div>
          <strong>{processedFacilities.length}</strong> {t.facilitiesFound}
          {userCoords && <span> • Sorted by distance to your coordinates</span>}
        </div>

        {sortBy === 'distance' && processedFacilities[0]?.calculatedDistance !== null && (
          <div className="closest-highlight-tag">
            🎯 Closest Facility: <strong>{processedFacilities[0]?.name}</strong> ({processedFacilities[0]?.calculatedDistance} km)
          </div>
        )}
      </div>

      {/* Facilities Cards Grid */}
      <div className="facilities-cards-grid">
        {processedFacilities.length === 0 ? (
          <div className="no-facilities-card">
            <Building2 size={48} className="no-data-icon" />
            <h3>{t.noFacilitiesFound}</h3>
            <p>{t.noFacilitiesSub}</p>
            {selectedRadius > 0 && (
              <button
                className="expand-radius-btn"
                onClick={() => setSelectedRadius(0)}
              >
                Expand Radius to All Distances
              </button>
            )}
          </div>
        ) : (
          processedFacilities.map((facility) => {
            const currentTab = activeTabs[facility.id] || 'overview';

            return (
              <div className="facility-mega-card" key={facility.id}>
                {/* Card Top Title Row */}
                <div className="facility-card-header">
                  <div className="title-left-group">
                    <div className="facility-type-tag">
                      <Building2 size={14} />
                      <span>{facility.type}</span>
                    </div>

                    <h2>
                      {language === 'mr'
                        ? facility.marathiName
                        : language === 'hi'
                        ? facility.hindiName
                        : facility.name}
                    </h2>
                    <div className="facility-english-sub">{facility.name}</div>
                  </div>

                  <div className="badges-right-group">
                    {/* Live Calculated Distance Badge */}
                    {facility.calculatedDistance !== null ? (
                      <span className="badge-pill distance-live-pill">
                        <MapPin size={13} />
                        <strong>{facility.calculatedDistance} km</strong> (~{facility.driveTimeMins} mins drive)
                      </span>
                    ) : (
                      <span className="badge-pill distance-static-pill">
                        <MapPin size={13} />
                        {facility.distance}
                      </span>
                    )}

                    {facility.verifiedStatus === 'verified' && (
                      <span className="badge-pill verified">
                        <ShieldCheck size={13} />
                        {t.badgeGovtVerified}
                      </span>
                    )}

                    {facility.mjpjayEmpanelled && (
                      <span className="badge-pill mjpjay">
                        {t.badgeMjpjay}
                      </span>
                    )}

                    {facility.emergencyAvailable && (
                      <span className="badge-pill emergency">
                        {t.badgeEmergency247}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address & Timings */}
                <div className="facility-meta-address">
                  <div>
                    <strong>{t.addressLabel}</strong> {facility.address} ({facility.taluka}, {facility.district})
                  </div>
                  <div>
                    <Clock size={14} className="meta-inline-icon" />
                    <span>{facility.opdTiming}</span>
                  </div>
                </div>

                {/* Sub-Tabs Bar */}
                <div className="facility-tabs-navbar">
                  <button
                    className={`fac-tab-btn ${currentTab === 'overview' ? 'active' : ''}`}
                    onClick={() => toggleTab(facility.id, 'overview')}
                  >
                    <span>📊 Overview & Beds</span>
                  </button>

                  <button
                    className={`fac-tab-btn ${currentTab === 'doctors' ? 'active' : ''}`}
                    onClick={() => toggleTab(facility.id, 'doctors')}
                  >
                    <Stethoscope size={15} />
                    <span>{t.tabDoctors} ({(facility.doctors || []).length})</span>
                  </button>

                  <button
                    className={`fac-tab-btn ${currentTab === 'charges' ? 'active' : ''}`}
                    onClick={() => toggleTab(facility.id, 'charges')}
                  >
                    <DollarSign size={15} />
                    <span>{t.tabCharges}</span>
                  </button>

                  <button
                    className={`fac-tab-btn ${currentTab === 'labs' ? 'active' : ''}`}
                    onClick={() => toggleTab(facility.id, 'labs')}
                  >
                    <Microscope size={15} />
                    <span>{t.tabLabs} ({(facility.laboratories || []).length})</span>
                  </button>

                  <button
                    className={`fac-tab-btn ${currentTab === 'director' ? 'active' : ''}`}
                    onClick={() => toggleTab(facility.id, 'director')}
                  >
                    <Building size={15} />
                    <span>{t.tabDirector}</span>
                  </button>
                </div>

                {/* TAB 1: OVERVIEW & BEDS */}
                {currentTab === 'overview' && (
                  <div className="tab-pane-content">
                    {/* Live Bed Counts Grid */}
                    <div className="bed-availability-section">
                      <div className="bed-status-heading">
                        <Bed size={16} />
                        <strong>
                          {language === 'mr'
                            ? 'खाटा उपलब्ध'
                            : language === 'hi'
                            ? 'खाटें उपलब्ध'
                            : 'Beds Available'} (लाइव्ह खाटा):
                        </strong>
                      </div>

                      <div className="bed-metrics-grid">
                        <div className="bed-chip">
                          <span>{t.generalBeds}:</span>
                          <strong>
                            {facility.beds?.generalAvailable || 0} / {facility.beds?.generalTotal || 0}
                          </strong>
                        </div>

                        <div className="bed-chip highlight-chip">
                          <span>{t.icuBeds}:</span>
                          <strong>
                            {facility.beds?.icuAvailable || 0} / {facility.beds?.icuTotal || 0}
                          </strong>
                        </div>

                        <div className="bed-chip">
                          <span>{t.oxygenBeds}:</span>
                          <strong>
                            {facility.beds?.oxygenAvailable || 0} / {facility.beds?.oxygenTotal || 0}
                          </strong>
                        </div>

                        <div className="bed-chip">
                          <span>{t.maternityBeds}:</span>
                          <strong>
                            {facility.beds?.maternityAvailable || 0} / {facility.beds?.maternityTotal || 0}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Specialties Pills */}
                    <div className="facility-specialties-row">
                      <span className="spec-row-label">
                        {language === 'mr'
                          ? 'उपलब्ध विभाग व स्पेशालिटी:'
                          : language === 'hi'
                          ? 'उपलब्ध विभाग व विशेषताएं:'
                          : 'Specialties & Departments:'}
                      </span>
                      <div className="specialties-pills-list">
                        {(facility.specialties || []).map((spec, i) => (
                          <span key={i} className="spec-tag">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Critical Medicines Strip */}
                    <div className="medicines-status-section">
                      <div className="med-heading">
                        <Pill size={15} />
                        <span>{t.medicineStockStatus}</span>
                      </div>
                      <div className="medicines-chips-list">
                        {(facility.medicines || []).map((med, idx) => (
                          <div
                            key={idx}
                            className={`med-chip ${med.status === 'in_stock' ? 'in-stock' : 'low-stock'}`}
                          >
                            <span className="med-name">
                              {language === 'mr'
                                ? med.marathiName
                                : language === 'hi'
                                ? ('hindiName' in med && typeof (med as any).hindiName === 'string'
                                    ? (med as any).hindiName
                                    : med.name)
                                : med.name}
                            </span>
                            <span className="med-qty-badge">{med.quantityNote}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ayushman Mitra Desk */}
                    {facility.ayushmanMitra && (
                      <div className="ayushman-mitra-strip">
                        <UserCheck size={16} className="mitra-icon" />
                        <div>
                          <strong>{t.ayushmanMitraDesk}:</strong> {facility.ayushmanMitra.name} (📞 {facility.ayushmanMitra.phone}) • {facility.ayushmanMitra.deskLocation}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: AVAILABLE DOCTORS */}
                {currentTab === 'doctors' && (
                  <div className="tab-pane-content">
                    <div className="doctors-list-grid">
                      {(facility.doctors || []).length > 0 ? (
                        facility.doctors.map((doc) => (
                          <div className="doctor-card-subitem" key={doc.id}>
                            <div className="doc-top-row">
                              <div className="doc-avatar-circle">
                                <Stethoscope size={18} />
                              </div>
                              <div className="doc-name-group">
                                <h4>{doc.name}</h4>
                                <span className="doc-spec-badge">{doc.specialization}</span>
                              </div>
                              <span className={`doc-live-status ${doc.status}`}>
                                {doc.status === 'available' ? '🟢 Available Today' : '🟡 In OT / On Call'}
                              </span>
                            </div>

                            <div className="doc-details-table">
                              <div>
                                <strong>{t.qualificationsLabel}</strong>
                                <span>{doc.qualifications} ({doc.regNumber})</span>
                              </div>
                              <div>
                                <strong>{t.opdScheduleLabel}</strong>
                                <span>{doc.opdDays} • {doc.opdTimings}</span>
                              </div>
                              <div>
                                <strong>{t.experienceLabel}</strong>
                                <span>{doc.experienceYears} Years Clinical Experience</span>
                              </div>
                              <div>
                                <strong>{t.feeLabel}</strong>
                                <span className="free-fee-tag">{doc.consultationFee}</span>
                              </div>
                              <div className="doc-conditions-row">
                                <strong>{t.conditionsTreatedLabel}</strong>
                                <div className="condition-chips">
                                  {(doc.conditionsSpecialized || []).map((cond, ci) => (
                                    <span key={ci} className="cond-chip">{cond}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <button
                              className="doc-book-token-btn"
                              onClick={() => setTokenModalFacility(facility)}
                            >
                              <Ticket size={14} />
                              <span>Book OPD Token with {doc.name.split(' ')[1] || 'Doctor'}</span>
                            </button>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: '#64748b', fontSize: '13px' }}>Government Medical Officers on duty at general OPD.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: HOSPITAL CHARGES */}
                {currentTab === 'charges' && (
                  <div className="tab-pane-content">
                    <div className="charges-transparency-card">
                      <div className="charges-guarantee-strip">
                        <ShieldCheck size={18} />
                        <span>{facility.charges?.mjpjayCashlessNote || '100% Cashless Treatment under MJPJAY 2.0 & Ayushman Bharat'}</span>
                      </div>

                      <div className="charges-table-grid">
                        <div className="charge-row">
                          <span>{t.generalBedCharge}</span>
                          <strong>{facility.charges?.generalBedDaily || '₹0 (Free Govt / MJPJAY)'}</strong>
                        </div>
                        <div className="charge-row">
                          <span>{t.icuBedCharge}</span>
                          <strong>{facility.charges?.icuBedDaily || '₹0 (Free under MJPJAY 2.0)'}</strong>
                        </div>
                        <div className="charge-row">
                          <span>{t.oxygenCharge}</span>
                          <strong>{facility.charges?.oxygenCharges || '₹0 (Free 24x7)'}</strong>
                        </div>
                        <div className="charge-row">
                          <span>{t.opdTokenCharge}</span>
                          <strong>{facility.charges?.opdRegistrationFee || '₹10 (Govt Case Paper)'}</strong>
                        </div>
                        <div className="charge-row">
                          <span>{t.ambulanceCharge}</span>
                          <strong>{facility.charges?.emergencyAmbulance || '₹0 (Free 24x7 108 Service)'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: LABORATORY & DIAGNOSTICS */}
                {currentTab === 'labs' && (
                  <div className="tab-pane-content">
                    {(facility.laboratories || []).length > 0 ? (
                      facility.laboratories.map((lab) => (
                        <div className="lab-card-block" key={lab.id}>
                          <div className="lab-header-row">
                            <div>
                              <h4>{lab.name}</h4>
                              <small>{lab.timing}</small>
                            </div>
                            <span className={`lab-status-badge ${lab.isOpen247 ? 'open' : 'routine'}`}>
                              {lab.isOpen247 ? '🟢 24/7 Emergency Lab Open' : '🟡 Routine Hours'}
                            </span>
                          </div>

                          <div className="tests-catalog-grid">
                            {(lab.tests || []).map((tst, ti) => (
                              <div className="test-catalog-item" key={ti}>
                                <div className="test-name-col">
                                  <strong>{tst.name}</strong>
                                  <small>{tst.category} • Turnaround: {tst.reportTurnaround}</small>
                                </div>
                                <span className="test-price-tag">{tst.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: '#64748b', fontSize: '13px' }}>Emergency Pathology & Diagnostic Lab active 24/7.</p>
                    )}
                  </div>
                )}

                {/* TAB 5: ADMINISTRATION & GRIEVANCE */}
                {currentTab === 'director' && (
                  <div className="tab-pane-content">
                    <div className="director-admin-card">
                      <div className="director-header">
                        <Building size={20} />
                        <div>
                          <h4>{facility.director?.name || 'Medical Superintendent'}</h4>
                          <span className="director-desig">{facility.director?.designation || 'Chief Medical Officer'}</span>
                        </div>
                      </div>

                      <div className="director-details-grid">
                        <div>
                          <strong>Official Phone:</strong> <span>{facility.director?.officialPhone || facility.phone}</span>
                        </div>
                        <div>
                          <strong>Official Email:</strong> <span>{facility.director?.officialEmail || 'superintendent.health@maharashtra.gov.in'}</span>
                        </div>
                        <div>
                          <strong>Superintendent Cabin:</strong> <span>{facility.director?.officeLocation || 'Main Administrative Block, Room 101'}</span>
                        </div>
                        <div>
                          <strong>{t.grievanceCellTitle}</strong> <span>{facility.director?.grievanceOfficeLocation || 'Takarar Nivaran Kaksha, Room 04'}</span>
                        </div>
                      </div>

                      <div className="grievance-direct-action">
                        <button
                          className="file-grievance-btn"
                          onClick={() => navigate('/grievances')}
                        >
                          <span>Submit Grievance to {facility.name}</span>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Facility Card Footer Actions */}
                <div className="facility-actions-footer">
                  <a
                    href={`tel:${facility.emergencyPhone || facility.phone}`}
                    className="facility-call-btn"
                    title="Call 24x7 Emergency Desk"
                  >
                    <PhoneCall size={15} />
                    <span>24x7 Helpline</span>
                  </a>

                  <button
                    className="facility-directions-btn"
                    onClick={() => openDirections(facility)}
                    title="Launch Google Maps Live Driving GPS Navigation"
                  >
                    <Navigation size={15} />
                    <span>
                      {facility.calculatedDistance !== null
                        ? `GPS Navigation (${facility.calculatedDistance} km)`
                        : 'GPS Navigation'}
                    </span>
                  </button>

                  <button
                    className="facility-map-pin-btn"
                    onClick={() => openMapPin(facility)}
                    title="View Exact Hospital Location on Google Maps"
                  >
                    <MapPin size={15} />
                    <span>Map Pin</span>
                  </button>

                  <button
                    className="facility-token-btn"
                    onClick={() => setTokenModalFacility(facility)}
                    title="Book Instant Digital OPD Token"
                  >
                    <Ticket size={15} />
                    <span>{t.btnBookOpd}</span>
                  </button>

                  <button
                    className="facility-referral-btn"
                    onClick={() => navigate('/referrals')}
                    title="Issue Inter-Hospital Digital Referral"
                  >
                    <Stethoscope size={15} />
                    <span>{t.btnCreateReferral}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* OPD Token Booking Modal */}
      {tokenModalFacility && (
        <OPDTokenModal
          isOpen={!!tokenModalFacility}
          onClose={() => setTokenModalFacility(null)}
          language={language}
          facility={tokenModalFacility}
        />
      )}
    </div>
  );
};

export default Healthcare;