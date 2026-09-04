import React, { useState, useEffect } from 'react';
import { Language, translations } from '../data/translations';
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  Ambulance,
  HeartPulse,
  Activity,
  X,
  CheckCircle2,
  Clock,
  AlertOctagon,
  LifeBuoy,
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];
  const [emergencyType, setEmergencyType] = useState('snakebite');
  const [selectedLocation, setSelectedLocation] = useState('Aheri, Gadchiroli (Tribal Belt)');
  const [patientPhone, setPatientPhone] = useState('98221-XXXXX');
  const [isDispatched, setIsDispatched] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(8);
  const [incidentId, setIncidentId] = useState('');

  useEffect(() => {
    let interval: any;
    if (isDispatched && etaMinutes > 1) {
      interval = setInterval(() => {
        setEtaMinutes((prev) => Math.max(1, prev - 1));
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [isDispatched, etaMinutes]);

  const handleTriggerSOS = () => {
    const id = `MH-108-${Math.floor(100000 + Math.random() * 900000)}`;
    setIncidentId(id);
    setIsDispatched(true);
    setEtaMinutes(7);
  };

  const handleReset = () => {
    setIsDispatched(false);
    setIncidentId('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="sos-modal-card">
        {/* Header */}
        <div className="sos-modal-header">
          <div className="sos-header-title">
            <ShieldAlert size={26} className="sos-pulse-icon" />
            <div>
              <h2>{t.sosTitle}</h2>
              <span>{t.sosSubtitle}</span>
            </div>
          </div>
          <button className="modal-close-icon-btn white-icon" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="sos-modal-body">
          {!isDispatched ? (
            <div className="sos-setup-view">
              <div className="sos-warning-alert">
                <AlertOctagon size={20} />
                <p>{t.sosDisclaimer}</p>
              </div>

              {/* Emergency Classification */}
              <div className="sos-form-group">
                <label>
                  <strong>1. आपत्कालीन प्रकार निवडा / Emergency Type:</strong>
                </label>
                <div className="emergency-type-chips">
                  <button
                    className={`type-chip ${emergencyType === 'snakebite' ? 'selected-chip' : ''}`}
                    onClick={() => setEmergencyType('snakebite')}
                  >
                    🐍 सर्पदंश / Snakebite
                  </button>
                  <button
                    className={`type-chip ${emergencyType === 'cardiac' ? 'selected-chip' : ''}`}
                    onClick={() => setEmergencyType('cardiac')}
                  >
                    ❤️ हृदयविकार / Cardiac Pain
                  </button>
                  <button
                    className={`type-chip ${emergencyType === 'trauma' ? 'selected-chip' : ''}`}
                    onClick={() => setEmergencyType('trauma')}
                  >
                    🩸 अपघात / Accident Trauma
                  </button>
                  <button
                    className={`type-chip ${emergencyType === 'maternal' ? 'selected-chip' : ''}`}
                    onClick={() => setEmergencyType('maternal')}
                  >
                    🤰 प्रसूती कळा / Active Labor
                  </button>
                  <button
                    className={`type-chip ${emergencyType === 'breathing' ? 'selected-chip' : ''}`}
                    onClick={() => setEmergencyType('breathing')}
                  >
                    🫁 श्वसन त्रास / Stroke / Severe
                  </button>
                </div>
              </div>

              {/* GPS / Location capture */}
              <div className="sos-form-group">
                <label>
                  <strong>2. स्थान (GPS Detected Location):</strong>
                </label>
                <div className="location-picker-row">
                  <MapPin size={18} className="green-pin" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="sos-select"
                  >
                    <option value="Aheri, Gadchiroli (Tribal Belt)">
                      📍 Aheri, Gadchiroli (Tribal Belt - Near SDH)
                    </option>
                    <option value="Bhamragad, Gadchiroli">
                      📍 Bhamragad Village, Gadchiroli (PHC Zone)
                    </option>
                    <option value="Bhor, Pune Rural">
                      📍 Bhor Tehsil, Pune Rural (Near CHC Bhor)
                    </option>
                    <option value="Jawhar, Palghar (Tribal Area)">
                      📍 Jawhar, Palghar (Tribal Belt)
                    </option>
                    <option value="Akkalkuwa, Nandurbar">
                      📍 Akkalkuwa, Nandurbar (Tribal Zone)
                    </option>
                    <option value="Pune City (Sassoon Area)">
                      📍 Pune City (Station Road, Sassoon)
                    </option>
                  </select>
                </div>
              </div>

              {/* Direct Trigger Button */}
              <button className="big-sos-trigger-btn" onClick={handleTriggerSOS}>
                <ShieldAlert size={28} />
                <span>{t.sosTriggerBtn}</span>
              </button>

              {/* Emergency Helplines Direct Dial */}
              <div className="direct-helpline-grid">
                <a href="tel:108" className="helpline-card highlight-red">
                  <PhoneCall size={20} />
                  <div>
                    <strong>१०८ (108)</strong>
                    <small>मोफत रुग्णवाहिका / Ambulance</small>
                  </div>
                </a>
                <a href="tel:104" className="helpline-card">
                  <HeartPulse size={20} />
                  <div>
                    <strong>१०४ (104)</strong>
                    <small>शासकीय आरोग्य सल्ला / Advice</small>
                  </div>
                </a>
                <a href="tel:102" className="helpline-card">
                  <LifeBuoy size={20} />
                  <div>
                    <strong>१०२ (102)</strong>
                    <small>मातृ व शिशू रुग्णवाहिका</small>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            /* Live Ambulance Dispatched Simulation State */
            <div className="sos-dispatched-view">
              <div className="dispatch-success-banner">
                <CheckCircle2 size={28} className="success-icon" />
                <div>
                  <h3>{t.sosDispatchStatus}</h3>
                  <p>
                    आपत्कालीन आयडी / Incident ID: <strong>{incidentId}</strong>
                  </p>
                </div>
              </div>

              <div className="dispatch-details-card">
                <div className="dispatch-metric-row">
                  <div className="metric-box">
                    <Clock size={20} className="clock-icon" />
                    <span>{t.sosEta}</span>
                    <strong>{etaMinutes} मिनिटे (Minutes)</strong>
                  </div>

                  <div className="metric-box">
                    <Ambulance size={20} className="amb-icon" />
                    <span>{t.sosAmbulanceAllocated}</span>
                    <strong>MH-12-AMB-108</strong>
                  </div>
                </div>

                <div className="driver-contact-box">
                  <div>
                    <span>{t.sosDriverContact}</span>
                    <strong>Mahesh Patil (EMT Paramedic)</strong>
                  </div>
                  <a href="tel:9822110808" className="call-driver-btn">
                    <PhoneCall size={16} />
                    <span>Call 108 EMT</span>
                  </a>
                </div>

                <div className="trauma-centre-alert-box">
                  <Activity size={18} className="pulse-red" />
                  <div>
                    <span>{t.sosNearestTrauma}</span>
                    <strong>Sub-District Hospital Aheri / Sassoon GH Pune (Alerted)</strong>
                    <small>Trauma Unit & ICU Bed reserved with Anti-Snake Venom ready.</small>
                  </div>
                </div>
              </div>

              <button className="reset-sos-btn" onClick={handleReset}>
                नवीन आपत्कालीन विनंती करा / Reset Simulation
              </button>
            </div>
          )}

          {/* First-Aid Protocols for Bystanders */}
          <div className="first-aid-section">
            <h4>{t.sosFirstAidTitle}</h4>
            <div className="first-aid-cards-grid">
              <div className="fa-card">
                <p>{t.sosFirstAidSnakebite}</p>
              </div>
              <div className="fa-card">
                <p>{t.sosFirstAidCpr}</p>
              </div>
              <div className="fa-card">
                <p>{t.sosFirstAidBleeding}</p>
              </div>
              <div className="fa-card">
                <p>{t.sosFirstAidMaternal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
