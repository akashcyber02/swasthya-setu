import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  DigitalReferral,
} from '../data/maharashtraHealthData';
import {
  getRegisteredPatients,
  saveRegisteredPatient,
  saveReferral,
  RegisteredPatient,
  getStoredFacilities,
  updateFacilityStock,
} from '../utils/offlineStorage';
import {
  Users,
  UserPlus,
  GitPullRequest,
  Video,
  Pill,
  CheckCircle2,
} from 'lucide-react';

interface PatientProps {
  language: Language;
}

export const Patient: React.FC<PatientProps> = ({ language }) => {
  const t = translations[language] || translations.mr;
  const facilities = getStoredFacilities();
  const [activeTab, setActiveTab] = useState<'register' | 'referral' | 'teleconsult' | 'stock'>('register');

  // Patient Registration Form State
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [mobile, setMobile] = useState('');
  const [village, setVillage] = useState('Kuran Budruk');
  const [taluka, setTaluka] = useState('Bhor');
  const [district, setDistrict] = useState('Pune');
  const [rationCard, setRationCard] = useState<'yellow' | 'orange' | 'white'>('orange');
  const [registeredSuccess, setRegisteredSuccess] = useState<RegisteredPatient | null>(null);

  // Smart Referral Issuance State
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [sourceFacilityId, setSourceFacilityId] = useState(facilities[0]?.id || '');
  const [destFacilityId, setDestFacilityId] = useState(facilities[1]?.id || '');
  const [referralReason, setReferralReason] = useState('');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'emergency'>('urgent');
  const [bp, setBp] = useState('130/85');
  const [spo2, setSpo2] = useState('98');
  const [pulse, setPulse] = useState('78');
  const [referralCreatedSuccess, setReferralCreatedSuccess] = useState<DigitalReferral | null>(null);

  // Stock Updater State
  const [stockFacilityId, setStockFacilityId] = useState(facilities[0]?.id || '');
  const [stockMedicineName, setStockMedicineName] = useState('Anti-Snake Venom (ASV Polyvalent)');
  const [newStockStatus, setNewStockStatus] = useState<'in_stock' | 'low' | 'out_of_stock'>('in_stock');
  const [stockSuccess, setStockSuccess] = useState(false);

  // Teleconsultation State
  const [teleconsultActive, setTeleconsultActive] = useState(false);

  const registeredPatients = getRegisteredPatients();

  // Handle New Patient Registration
  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile) {
      alert(
        language === 'mr'
          ? 'कृपया रुग्णाचे नाव आणि मोबाईल नंबर भरा.'
          : language === 'hi'
          ? 'कृपया मरीज का नाम और मोबाइल नंबर दर्ज करें।'
          : 'Please enter patient full name and mobile number.'
      );
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAbha = `91-${randomSuffix}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPatient: RegisteredPatient = {
      id: `PAT-MH-${Date.now().toString().slice(-4)}`,
      fullName,
      age: parseInt(age) || 28,
      gender,
      mobile,
      village,
      taluka,
      district,
      abhaId: newAbha,
      rationCardType: rationCard,
      registeredAt: new Date().toLocaleDateString('en-GB'),
    };

    saveRegisteredPatient(newPatient);
    setRegisteredSuccess(newPatient);
    setFullName('');
    setAge('');
    setMobile('');
  };

  // Handle Smart Digital Referral Creation
  const handleIssueReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralReason) {
      alert(
        language === 'mr'
          ? 'कृपया रेफरलचे कारण आणि निदान नमूद करा.'
          : language === 'hi'
          ? 'कृपया रेफरल का कारण और निदान दर्ज करें।'
          : 'Please state the referral reason and provisional diagnosis.'
      );
      return;
    }

    const patient =
      registeredPatients.find((p) => p.id === selectedPatientId) ||
      registeredPatients[0] || {
        fullName: 'Sunita Ravindra Jadhav',
        age: 29,
        gender: 'Female',
        mobile: '98221-44910',
        village: 'Kuran Budruk',
        taluka: 'Bhor',
        district: 'Pune',
        abhaId: '91-8842-1920-5512',
      };

    const sourceFac = facilities.find((f) => f.id === sourceFacilityId) || facilities[0];
    const destFac = facilities.find((f) => f.id === destFacilityId) || facilities[1];

    const refId = `MH-REF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReferral: DigitalReferral = {
      id: refId,
      patientName: patient.fullName,
      patientAge: patient.age,
      patientGender: patient.gender,
      patientMobile: patient.mobile,
      village: patient.village,
      taluka: patient.taluka,
      district: patient.district,
      abhaId: patient.abhaId,
      sourceFacilityId: sourceFac.id,
      sourceFacilityName: sourceFac.name,
      destinationFacilityId: destFac.id,
      destinationFacilityName: destFac.name,
      referralReason,
      urgency,
      createdAt: new Date().toLocaleString(),
      status: 'created',
      vitals: {
        bp: `${bp} mmHg`,
        spo2: `${spo2}%`,
        pulse: `${pulse} bpm`,
      },
    };

    saveReferral(newReferral);
    setReferralCreatedSuccess(newReferral);
    setReferralReason('');
  };

  // Handle Stock Update
  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    updateFacilityStock(stockFacilityId, stockMedicineName, newStockStatus);
    setStockSuccess(true);
    setTimeout(() => setStockSuccess(false), 3000);
  };

  return (
    <div className="worker-portal-container">
      {/* Top Banner */}
      <div className="worker-header-banner">
        <div>
          <span className="gov-worker-badge">
            🩺 {t.govTopTag} | {t.workerPortal}
          </span>
          <h1>{t.workerTitle}</h1>
          <p>{t.workerSubtitle}</p>
        </div>

        <div className="worker-profile-pill">
          <Users size={18} />
          <div>
            <strong>
              {language === 'mr'
                ? 'मंदाकिनी कदम (ASHA Worker)'
                : language === 'hi'
                ? 'मंदाकिनी कदम (ASHA Worker)'
                : 'Mandakini Kadam (ASHA Worker)'}
            </strong>
            <small>
              {language === 'mr'
                ? 'उपकेंद्र कुरण बुद्रुक | PHC भोर'
                : language === 'hi'
                ? 'उप-केंद्र कुरण | PHC भोर'
                : 'Sub-Centre Kuran | PHC Bhor (Pune)'}
            </small>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="worker-tabs-row">
        <button
          className={`worker-tab ${activeTab === 'register' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          <UserPlus size={18} />
          <span>{t.tabRegisterPatient}</span>
        </button>

        <button
          className={`worker-tab ${activeTab === 'referral' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('referral')}
        >
          <GitPullRequest size={18} />
          <span>{t.tabCreateReferral}</span>
        </button>

        <button
          className={`worker-tab ${activeTab === 'teleconsult' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('teleconsult')}
        >
          <Video size={18} />
          <span>{t.tabTeleconsult}</span>
        </button>

        <button
          className={`worker-tab ${activeTab === 'stock' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('stock')}
        >
          <Pill size={18} />
          <span>{t.tabUpdateStock}</span>
        </button>
      </div>

      {/* Tab 1: Register Patient */}
      {activeTab === 'register' && (
        <div className="worker-tab-content">
          <div className="form-card">
            <h3>{t.tabRegisterPatient}</h3>
            <p>
              {language === 'mr'
                ? 'ग्रामीण लाभार्थ्यांची नोंदणी करा. इंटरनेट नसतानाही हा डेटा ऑफलाइन सेव्ह होतो.'
                : language === 'hi'
                ? 'ग्रामीण लाभार्थियों का पंजीकरण करें। बिना इंटरनेट भी डेटा ऑफलाइन सुरक्षित रहेगा।'
                : 'Register rural patients and generate ABHA ID. Data persists offline automatically.'}
            </p>

            <form onSubmit={handleRegisterPatient} className="worker-form-grid">
              <div className="form-group">
                <label>{t.formFullName}</label>
                <input
                  type="text"
                  required
                  placeholder={
                    language === 'mr'
                      ? 'उदा. मंदाकिनी सुरेश शिंदे'
                      : language === 'hi'
                      ? 'उदा. मंदाकिनी सुरेश शिंदे'
                      : 'e.g. Mandakini Suresh Shinde'
                  }
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>{t.formAgeGender}</label>
                <div className="age-gender-row">
                  <input
                    type="number"
                    required
                    placeholder={
                      language === 'mr'
                        ? 'वय (उदा. 32)'
                        : language === 'hi'
                        ? 'उम्र (उदा. 32)'
                        : 'Age (e.g. 32)'
                    }
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                  >
                    <option value="Female">
                      {language === 'mr' ? 'स्त्री (Female)' : language === 'hi' ? 'महिला (Female)' : 'Female'}
                    </option>
                    <option value="Male">
                      {language === 'mr' ? 'पुरुष (Male)' : language === 'hi' ? 'पुरुष (Male)' : 'Male'}
                    </option>
                    <option value="Other">
                      {language === 'mr' ? 'इतर (Other)' : language === 'hi' ? 'अन्य (Other)' : 'Other'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t.formMobileNumber}</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>{t.formVillageTaluka}</label>
                <div className="village-row">
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'गाव (उदा. कुरण)' : 'Village'}
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'तालुका (उदा. भोर)' : 'Taluka'}
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'जिल्हा (उदा. पुणे)' : 'District'}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.formRationCard}</label>
                <select
                  value={rationCard}
                  onChange={(e) => setRationCard(e.target.value as any)}
                >
                  <option value="orange">🟠 {t.rationOrange}</option>
                  <option value="yellow">🟡 {t.rationYellow}</option>
                  <option value="white">⚪ {t.rationWhite}</option>
                </select>
              </div>

              <button type="submit" className="worker-submit-btn">
                <CheckCircle2 size={18} />
                <span>{t.btnRegisterPatient}</span>
              </button>
            </form>

            {registeredSuccess && (
              <div className="success-registered-card">
                <CheckCircle2 size={24} className="green-icon" />
                <div>
                  <h4>
                    {language === 'mr'
                      ? 'रुग्ण नोंदणी यशस्वी झाली!'
                      : language === 'hi'
                      ? 'मरीज पंजीकरण सफल रहा!'
                      : 'Patient Registered Successfully!'}
                  </h4>
                  <p>
                    {t.patientName} <strong>{registeredSuccess.fullName}</strong> | {t.abhaIdLabel}{' '}
                    <strong>{registeredSuccess.abhaId}</strong>
                  </p>
                  <small>
                    {language === 'mr'
                      ? 'डेटा स्थानिक कॅशमध्ये सुरक्षित जतन केला आहे.'
                      : language === 'hi'
                      ? 'डेटा स्थानीय कैश में सुरक्षित है।'
                      : 'Data cached safely in offline local storage.'}
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Create Smart Referral */}
      {activeTab === 'referral' && (
        <div className="worker-tab-content">
          <div className="form-card">
            <h3>{t.tabCreateReferral}</h3>
            <p>
              {language === 'mr'
                ? 'उपकेंद्र / PHC वरून ग्रामीण रुग्णालय किंवा जिल्हा रुग्णालयाकडे थेट रेफरल पाठवा.'
                : language === 'hi'
                ? 'उप-केंद्र / PHC से ग्रामीण अस्पताल या जिला अस्पताल को सीधा डिजिटल रेफरल भेजें।'
                : 'Issue direct digital referral from Village / PHC to CHC or District Hospital.'}
            </p>

            <form onSubmit={handleIssueReferral} className="worker-form-grid">
              <div className="form-group">
                <label>
                  {language === 'mr'
                    ? 'नोंदणीकृत रुग्ण निवडा:'
                    : language === 'hi'
                    ? 'पंजीकृत मरीज चुनें:'
                    : 'Select Registered Patient:'}
                </label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                >
                  {registeredPatients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.age} Yrs, {p.gender}) - {p.village}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.selectSourceFacility}</label>
                <select
                  value={sourceFacilityId}
                  onChange={(e) => setSourceFacilityId(e.target.value)}
                >
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.type} - {f.district})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.selectDestinationFacility}</label>
                <select
                  value={destFacilityId}
                  onChange={(e) => setDestFacilityId(e.target.value)}
                >
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>
                      🏥 {f.name} ({f.type} - {f.district})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.urgencyTier}</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                >
                  <option value="routine">
                    {language === 'mr'
                      ? '🟢 नियमित (Routine OPD Referral)'
                      : language === 'hi'
                      ? '🟢 सामान्य (Routine OPD Referral)'
                      : '🟢 Routine OPD Referral'}
                  </option>
                  <option value="urgent">
                    {language === 'mr'
                      ? '⚡ तातडीचे २४ तासांच्या आत (Urgent 24h)'
                      : language === 'hi'
                      ? '⚡ त्वरित २४ घंटे (Urgent 24h)'
                      : '⚡ Urgent (Within 24 Hours)'}
                  </option>
                  <option value="emergency">
                    {language === 'mr'
                      ? '🚨 अति-तातडीचे (Emergency 108 Transfer)'
                      : language === 'hi'
                      ? '🚨 अति-गंभीर (Emergency 108 Transfer)'
                      : '🚨 Critical Emergency (108 Ambulance)'}
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  {language === 'mr'
                    ? 'शारीरिक पॅरामीटर्स (Vitals at Source):'
                    : language === 'hi'
                    ? 'शारीरिक माप (Vitals at Source):'
                    : 'Patient Vitals at Source:'}
                </label>
                <div className="vitals-input-row">
                  <input
                    type="text"
                    placeholder="BP (e.g. 140/90)"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="SpO2 % (e.g. 97)"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Pulse (e.g. 84)"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>{t.referralReason}</label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    language === 'mr'
                      ? 'उदा. गरोदरपणातील गुंतागुंत, रक्तदाब जास्त आणि पायावर सूज...'
                      : language === 'hi'
                      ? 'उदा. गर्भावस्था में जटिलता, उच्च रक्तचाप व विशेषज्ञ सोनोग्राफी रेफरल...'
                      : 'e.g., Pregnancy complication, elevated BP, requiring specialist USG and C-section readiness...'
                  }
                  value={referralReason}
                  onChange={(e) => setReferralReason(e.target.value)}
                />
              </div>

              <button type="submit" className="worker-submit-btn">
                <GitPullRequest size={18} />
                <span>{t.btnIssueReferral}</span>
              </button>
            </form>

            {referralCreatedSuccess && (
              <div className="success-registered-card">
                <CheckCircle2 size={24} className="green-icon" />
                <div>
                  <h4>
                    {language === 'mr'
                      ? 'डिजिटल रेफरल यशस्वीरीत्या तयार झाला!'
                      : language === 'hi'
                      ? 'डिजिटल रेफरल सफलतापूर्वक बनाया गया!'
                      : 'Digital Referral Created Successfully!'}
                  </h4>
                  <p>
                    {t.tableRefId}: <strong>{referralCreatedSuccess.id}</strong> | {t.targetFacility}:{' '}
                    <strong>{referralCreatedSuccess.destinationFacilityName}</strong>
                  </p>
                  <small>
                    {language === 'mr'
                      ? "QR कोडसह पावती 'रेफरल ट्रॅकिंग' मेनूमध्ये उपलब्ध आहे."
                      : language === 'hi'
                      ? "QR कोड सहित पर्ची 'रेफरल ट्रैकिंग' मेनू में उपलब्ध है।"
                      : "Referral slip with QR code is accessible under 'Referrals' tab."}
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: e-Sanjeevani Teleconsultation */}
      {activeTab === 'teleconsult' && (
        <div className="worker-tab-content">
          <div className="form-card">
            <h3>📹 e-Sanjeevani National Teleconsultation</h3>
            <p>
              {language === 'mr'
                ? 'दुर्गम गावातील रुग्णाला थेट जिल्हा सामान्य रुग्णालयातील विशेषज्ञ डॉक्टरांशी व्हिडिओ कॉलद्वारे जोडा.'
                : language === 'hi'
                ? 'ग्रामीण मरीज को सीधे जिला अस्पताल के विशेषज्ञ डॉक्टर से वीडियो कॉल पर जोड़ें।'
                : 'Connect rural village patients directly to District Hospital specialist doctors via video teleconsultation.'}
            </p>

            {!teleconsultActive ? (
              <div className="teleconsult-waiting-box">
                <div className="doctor-status-strip">
                  <div className="doc-avatar">👨‍⚕️</div>
                  <div>
                    <strong>Dr. Smita Shinde (MD Medicine)</strong>
                    <span>
                      {language === 'mr'
                        ? 'जिल्हा रुग्णालय टेलीमेडिसिन युनिट | Online Available'
                        : language === 'hi'
                        ? 'जिला अस्पताल टेलीमेडिसिन यूनिट | Online Available'
                        : 'District Hospital Telemedicine Unit | Online Available'}
                    </span>
                  </div>
                  <span className="online-tag">● Live Connected</span>
                </div>

                <div className="queue-info-card">
                  <span>{t.teleconsultActiveQueue}</span>
                  <strong>
                    {language === 'mr'
                      ? '२ रुग्ण प्रतीक्षेत (अपेक्षित वेळ: ३ मिनिटे)'
                      : language === 'hi'
                      ? '२ मरीज प्रतीक्षा में (अनुमानित समय: ३ मिनट)'
                      : '2 Patients in queue (Est. wait: 3 mins)'}
                  </strong>
                </div>

                <button
                  className="start-call-btn"
                  onClick={() => setTeleconsultActive(true)}
                >
                  <Video size={20} />
                  <span>{t.btnStartTeleconsult}</span>
                </button>
              </div>
            ) : (
              <div className="teleconsult-call-screen">
                <div className="video-stream-mock">
                  <div className="remote-doc-video">
                    <div className="doc-video-badge">👨‍⚕️ Dr. Smita Shinde (District Hospital)</div>
                    <p className="sim-consult-text">
                      {language === 'mr'
                        ? '"रुग्णाची लक्षणे ऐकली आहेत. मी डिजिटल प्रिस्क्रिप्शन जारी करत आहे."'
                        : language === 'hi'
                        ? '"मरीज के लक्षण समझ लिए हैं। डिजिटल पर्ची जारी कर दी गई है।"'
                        : '"Reviewed patient symptoms. Issuing digital prescription to ABHA locker."'}
                    </p>
                  </div>
                  <div className="local-asha-pip">
                    <span>
                      👩‍⚕️{' '}
                      {language === 'mr'
                        ? 'आशा: मंदाकिनी'
                        : language === 'hi'
                        ? 'आशा: मंदाकिनी'
                        : 'ASHA: Mandakini'}
                    </span>
                  </div>
                </div>

                <div className="call-actions-bar">
                  <button
                    className="end-call-btn"
                    onClick={() => {
                      setTeleconsultActive(false);
                      alert(
                        language === 'mr'
                          ? 'टेलीकन्सल्टेशन पूर्ण झाले. ई-प्रिस्क्रिप्शन रुग्णाच्या आभा लॉकरमध्ये जतन केले!'
                          : language === 'hi'
                          ? 'टेलीपरामर्श पूरा हुआ। ई-पर्ची मरीज के आभा लॉकर में सुरक्षित कर दी गई!'
                          : 'Teleconsultation completed. Digital e-Prescription saved to patient ABHA locker!'
                      );
                    }}
                  >
                    {language === 'mr'
                      ? 'कॉल पूर्ण करा व प्रिस्क्रिप्शन जतन करा (End Call)'
                      : language === 'hi'
                      ? 'कॉल समाप्त करें व पर्ची सुरक्षित करें (End Call)'
                      : 'End Call & Save e-Prescription'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Update PHC Medicine Stocks */}
      {activeTab === 'stock' && (
        <div className="worker-tab-content">
          <div className="form-card">
            <h3>{t.tabUpdateStock}</h3>
            <p>
              {language === 'mr'
                ? 'प्राथमिक आरोग्य केंद्र किंवा उपकेंद्रातील अत्यावश्यक औषध साठ्याची स्थिती त्वरित अपडेट करा.'
                : language === 'hi'
                ? 'प्राथमिक स्वास्थ्य केंद्र में आवश्यक दवाओं का स्टॉक तुरंत अपडेट करें।'
                : 'Update live medicine and bed inventory for Primary Health Centre / Sub-Centre.'}
            </p>

            <form onSubmit={handleUpdateStock} className="worker-form-grid">
              <div className="form-group">
                <label>
                  {language === 'mr'
                    ? 'आरोग्य केंद्र निवडा:'
                    : language === 'hi'
                    ? 'स्वास्थ्य केंद्र चुनें:'
                    : 'Select Facility:'}
                </label>
                <select
                  value={stockFacilityId}
                  onChange={(e) => setStockFacilityId(e.target.value)}
                >
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.district})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  {language === 'mr'
                    ? 'औषधाचे नाव:'
                    : language === 'hi'
                    ? 'दवा का नाम:'
                    : 'Medicine Name:'}
                </label>
                <select
                  value={stockMedicineName}
                  onChange={(e) => setStockMedicineName(e.target.value)}
                >
                  <option value="Anti-Snake Venom (ASV Polyvalent)">
                    🐍 Anti-Snake Venom (ASV Polyvalent)
                  </option>
                  <option value="Rabies Immunoglobulin & Vaccine">
                    🐕 Rabies Vaccine & Immunoglobulin
                  </option>
                  <option value="Iron & Folic Acid (IFA) Tablets">
                    🩸 Iron & Folic Acid (IFA) Tablets
                  </option>
                  <option value="Oral Rehydration Salts (ORS)">
                    💧 Oral Rehydration Salts (ORS)
                  </option>
                  <option value="Insulin Glargine / Regular">
                    💉 Insulin (Regular / Glargine)
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  {language === 'mr'
                    ? 'साठ्याची सद्यस्थिती:'
                    : language === 'hi'
                    ? 'स्टॉक की स्थिति:'
                    : 'Stock Status:'}
                </label>
                <select
                  value={newStockStatus}
                  onChange={(e) => setNewStockStatus(e.target.value as any)}
                >
                  <option value="in_stock">🟢 {t.inStock}</option>
                  <option value="low">🟡 {t.lowStock}</option>
                  <option value="out_of_stock">🔴 {t.outOfStock}</option>
                </select>
              </div>

              <button type="submit" className="worker-submit-btn">
                <CheckCircle2 size={18} />
                <span>
                  {language === 'mr'
                    ? 'साठा अद्ययावत करा (Save Update)'
                    : language === 'hi'
                    ? 'स्टॉक सुरक्षित करें (Save Update)'
                    : 'Save Stock Update'}
                </span>
              </button>
            </form>

            {stockSuccess && (
              <div className="success-registered-card">
                <CheckCircle2 size={24} className="green-icon" />
                <div>
                  <h4>
                    {language === 'mr'
                      ? 'औषध साठा यशस्वीरीत्या अपडेट झाला!'
                      : language === 'hi'
                      ? 'दवा स्टॉक सफलतापूर्वक अपडेट हुआ!'
                      : 'Medicine Stock Updated Successfully!'}
                  </h4>
                  <p>
                    {language === 'mr'
                      ? 'राज्य आरोग्य नियंत्रण कक्षाला नवीन साठ्याची माहिती पाठवण्यात आली आहे.'
                      : language === 'hi'
                      ? 'राज्य स्वास्थ्य नियंत्रण कक्ष को नया डेटा भेज दिया गया है।'
                      : 'Updated inventory synchronized with State Health Command Center.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
