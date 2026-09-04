import React, { useState } from 'react';
import { Language } from '../data/translations';
import { HealthcareFacility, OPDToken } from '../data/maharashtraHealthData';
import { saveOPDToken, getStoredOPDTokens } from '../utils/offlineStorage';
import {
  Ticket,
  Clock,
  User,
  Calendar,
  CheckCircle2,
  X,
  Building,
  Printer,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface OPDTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  facility?: HealthcareFacility;
}

export const OPDTokenModal: React.FC<OPDTokenModalProps> = ({
  isOpen,
  onClose,
  language,
  facility,
}) => {
  const [patientName, setPatientName] = useState('Sunita Ravindra Jadhav');
  const [patientMobile, setPatientMobile] = useState('9822144910');
  const [selectedDoctor, setSelectedDoctor] = useState(
    facility?.doctors[0]?.name || 'Dr. Kiran Jadhav'
  );
  const [selectedDept, setSelectedDept] = useState(
    facility?.specialties[0] || 'General Medicine'
  );
  const [selectedDate, setSelectedDate] = useState('2026-09-01');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:30 AM - 11:00 AM');
  const [generatedToken, setGeneratedToken] = useState<OPDToken | null>(null);

  if (!isOpen) return null;

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    const existingTokens = getStoredOPDTokens();
    const nextTokenNumber = existingTokens.length + 27;

    const token: OPDToken = {
      id: `TOK-${(facility?.district || 'MH').slice(0, 3).toUpperCase()}-${String(nextTokenNumber).padStart(3, '0')}`,
      tokenNumber: nextTokenNumber,
      patientName,
      patientMobile,
      facilityId: facility?.id || 'fac-pun-01',
      facilityName: facility?.name || 'Sassoon General Hospital Pune',
      department: selectedDept,
      doctorName: selectedDoctor,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      currentServingToken: nextTokenNumber - 5 > 0 ? nextTokenNumber - 5 : 1,
      estimatedWaitMinutes: 18,
      status: 'waiting',
      createdAt: new Date().toLocaleString(),
    };

    saveOPDToken(token);
    setGeneratedToken(token);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop-blur">
      <div className="opd-token-modal-box">
        {/* Header */}
        <div className="token-modal-header">
          <div className="token-header-title">
            <Ticket size={24} className="gold-ticket-icon" />
            <div>
              <h3>
                {language === 'mr'
                  ? 'स्मार्ट OPD टोकन व अपॉइंटमेंट बुकिंग'
                  : language === 'hi'
                  ? 'स्मार्ट OPD टोकन एवं अपॉइंटमेंट बुकिंग'
                  : 'Smart OPD Appointment & Live Token Queue'}
              </h3>
              <span>{facility?.name || 'Government Public Hospital'}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="token-modal-body">
          {generatedToken ? (
            <div className="token-success-slip">
              <div className="slip-top-badge">
                <CheckCircle2 size={18} />
                <span>
                  {language === 'mr'
                    ? 'OPD टोकन यशस्वीरीत्या जारी झाला!'
                    : language === 'hi'
                    ? 'OPD टोकन सफलतापूर्वक जारी हुआ!'
                    : 'OPD Token Confirmed & Allocated!'}
                </span>
              </div>

              {/* Big Token Number Display */}
              <div className="token-number-hero">
                <small>
                  {language === 'mr'
                    ? 'तुमचा टोकन क्रमांक'
                    : language === 'hi'
                    ? 'आपका टोकन नंबर'
                    : 'YOUR OPD TOKEN NUMBER'}
                </small>
                <h1>#{generatedToken.tokenNumber}</h1>
                <div className="token-id-code">{generatedToken.id}</div>
              </div>

              {/* Live Waiting Counter Widget */}
              <div className="live-waiting-counter-widget">
                <div className="counter-col">
                  <span>
                    {language === 'mr'
                      ? 'सध्या तपासणी सुरू'
                      : language === 'hi'
                      ? 'वर्तमान में चल रहा टोकन'
                      : 'Now Serving Token:'}
                  </span>
                  <strong>#{generatedToken.currentServingToken}</strong>
                </div>
                <div className="counter-divider"></div>
                <div className="counter-col highlight-wait">
                  <span>
                    {language === 'mr'
                      ? 'अपेक्षित प्रतीक्षा वेळ'
                      : language === 'hi'
                      ? 'अनुमानित प्रतीक्षा समय'
                      : 'Estimated Wait:'}
                  </span>
                  <strong>~{generatedToken.estimatedWaitMinutes} Mins</strong>
                </div>
              </div>

              {/* Details Grid */}
              <div className="token-details-grid">
                <div>
                  <strong>{language === 'mr' ? 'रुग्ण:' : language === 'hi' ? 'मरीज:' : 'Patient:'}</strong>{' '}
                  <span>{generatedToken.patientName}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'मोबाईल:' : language === 'hi' ? 'मोबाइल:' : 'Mobile:'}</strong>{' '}
                  <span>+91 {generatedToken.patientMobile}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'रुग्णालय:' : language === 'hi' ? 'अस्पताल:' : 'Hospital:'}</strong>{' '}
                  <span>{generatedToken.facilityName}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'तज्ज्ञ डॉक्टर:' : language === 'hi' ? 'डॉक्टर:' : 'Doctor:'}</strong>{' '}
                  <span>{generatedToken.doctorName}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'तारीख व वेळ:' : language === 'hi' ? 'दिनांक व समय:' : 'Date & Slot:'}</strong>{' '}
                  <span>{generatedToken.date} • {generatedToken.timeSlot}</span>
                </div>
                <div>
                  <strong>{language === 'mr' ? 'शुल्क:' : language === 'hi' ? 'शुल्क:' : 'Fee:'}</strong>{' '}
                  <span className="free-token-badge">₹0 (Free Govt / MJPJAY)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="token-actions-row">
                <button className="print-token-btn" onClick={handlePrint}>
                  <Printer size={16} />
                  <span>
                    {language === 'mr'
                      ? 'पावती प्रिंट / सेव्ह करा'
                      : language === 'hi'
                      ? 'पर्ची प्रिंट / सेव करें'
                      : 'Print / Save Digital Token'}
                  </span>
                </button>
                <button className="done-token-btn" onClick={onClose}>
                  {language === 'mr' ? 'पूर्ण' : language === 'hi' ? 'पूर्ण' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerateToken} className="opd-booking-form">
              <div className="opd-notice-strip">
                <Sparkles size={16} />
                <span>
                  {language === 'mr'
                    ? 'शासकीय OPD टोकन मोफत आहे. रांगेत उभे न राहता घरबसल्या नंबर मिळवा.'
                    : language === 'hi'
                    ? 'सरकारी OPD टोकन पूरी तरह निःशुल्क है। कतार में लगे बिना टोकन पाएं।'
                    : 'Zero booking fee for Govt Hospital OPDs. Reduce hospital waiting room crowds.'}
                </span>
              </div>

              {/* Patient Name */}
              <div className="form-group-item">
                <label>
                  {language === 'mr' ? 'रुग्णाचे पूर्ण नाव:' : language === 'hi' ? 'मरीज का पूरा नाम:' : 'Patient Full Name:'}
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="token-input"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="form-group-item">
                <label>
                  {language === 'mr' ? 'मोबाईल नंबर (SMS साठी):' : language === 'hi' ? 'मोबाइल नंबर (SMS हेतु):' : 'Mobile Number (for Token SMS):'}
                </label>
                <input
                  type="tel"
                  value={patientMobile}
                  onChange={(e) => setPatientMobile(e.target.value)}
                  className="token-input"
                  required
                />
              </div>

              {/* Doctor Select */}
              <div className="form-group-item">
                <label>
                  {language === 'mr' ? 'तज्ज्ञ डॉक्टर निवडा:' : language === 'hi' ? 'उपलब्ध डॉक्टर चुनें:' : 'Select Available Doctor:'}
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="token-select"
                >
                  {facility?.doctors && facility.doctors.length > 0 ? (
                    facility.doctors.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.specialization} • {d.opdTimings})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Dr. Kiran Jadhav (MD Cardiology)">Dr. Kiran Jadhav (MD Cardiology)</option>
                      <option value="Dr. Sneha Madavi (OBGY FRU)">Dr. Sneha Madavi (OBGY FRU)</option>
                      <option value="Dr. Pravin Gedam (Civil Surgeon)">Dr. Pravin Gedam (Civil Surgeon)</option>
                    </>
                  )}
                </select>
              </div>

              {/* Date & Slot */}
              <div className="two-col-inputs">
                <div className="form-group-item">
                  <label>
                    {language === 'mr' ? 'तारीख:' : language === 'hi' ? 'दिनांक:' : 'Date:'}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="token-input"
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>
                    {language === 'mr' ? 'वेळ स्लॉट:' : language === 'hi' ? 'समय स्लॉट:' : 'Time Slot:'}
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="token-select"
                  >
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                    <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="generate-token-btn">
                <Ticket size={18} />
                <span>
                  {language === 'mr'
                    ? 'मोफत डिजिटल OPD टोकन मिळवा'
                    : language === 'hi'
                    ? 'मुफ्त डिजिटल OPD टोकन प्राप्त करें'
                    : 'Generate Digital OPD Token'}
                </span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OPDTokenModal;
