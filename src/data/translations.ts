export type Language = 'mr' | 'hi' | 'en';

export interface Translations {
  // Brand & Nav
  govBrand: string;
  govSubBrand: string;
  govTopTag: string;
  sihBadge: string;
  home: string;
  findHealthcare: string;
  schemes: string;
  referrals: string;
  workerPortal: string;
  adminDashboard: string;
  abhaLocker: string;
  sosEmergency: string;
  onlineMode: string;
  offlineMode: string;
  rolePatient: string;
  roleWorker: string;
  roleAdmin: string;
  switchRole: string;

  // New Navigation Links
  navBloodBank: string;
  navGrievances: string;
  navTreatmentTracker: string;
  navDoctorPortal: string;
  navLoginOtp: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  btnFindFacilities: string;
  btnTalkAi: string;
  btnEmergencySOS: string;
  featureOffline: string;
  featureOfflineDesc: string;
  featureMultilingual: string;
  featureMultilingualDesc: string;
  featureSchemes: string;
  featureSchemesDesc: string;
  featureReferral: string;
  featureReferralDesc: string;
  liveStatusTitle: string;
  districtsConnected: string;
  bedsAvailableCount: string;
  ambulanceActiveCount: string;

  // Quick Services
  quickAccessTitle: string;
  quickAccessSubtitle: string;
  cardHospitalsTitle: string;
  cardHospitalsDesc: string;
  cardSchemesTitle: string;
  cardSchemesDesc: string;
  cardReferralTitle: string;
  cardReferralDesc: string;
  cardAiNavTitle: string;
  cardAiNavDesc: string;
  cardAbhaTitle: string;
  cardAbhaDesc: string;
  cardSosTitle: string;
  cardSosDesc: string;
  btnExplore: string;
  btnCheck: string;
  btnTrack: string;
  btnOpen: string;

  // Referral Pathway on Home
  referralFlowHeading: string;
  referralFlowDesc: string;
  refHighlight1: string;
  refHighlight2: string;
  refHighlight3: string;
  btnTrackFlow: string;
  flowStep1Title: string;
  flowStep1Desc: string;
  flowStep2Title: string;
  flowStep2Desc: string;
  flowStep3Title: string;
  flowStep3Desc: string;
  flowStep4Title: string;
  flowStep4Desc: string;
  offlineStripTitle: string;
  offlineStripDesc: string;
  offlineReadyTag: string;

  // Facility Finder & Extended Hospital Details
  finderTitle: string;
  finderSubtitle: string;
  searchPlaceholder: string;
  allDistricts: string;
  selectDistrict: string;
  allFacilityTypes: string;
  filterVerifiedOnly: string;
  filterAyushmanOnly: string;
  filterEmergencyOnly: string;
  filterMedicineAvailable: string;
  filterAsvAvailable: string;
  facilitiesFound: string;
  noFacilitiesFound: string;
  noFacilitiesSub: string;
  badgeGovtVerified: string;
  badgeUpdated: string;
  badgeRequiresVerification: string;
  badgeMjpjay: string;
  badgeAyushman: string;
  badgeEmergency247: string;
  bedsAvailable: string;
  icuBeds: string;
  generalBeds: string;
  oxygenBeds: string;
  maternityBeds: string;
  medicineStockStatus: string;
  inStock: string;
  lowStock: string;
  outOfStock: string;
  btnContact: string;
  btnDirections: string;
  btnCreateReferral: string;
  btnBookOpd: string;
  ayushmanMitraDesk: string;
  addressLabel: string;
  distanceLabel: string;

  // Doctors & Charges & Labs Tab labels on Facility
  tabDoctors: string;
  tabCharges: string;
  tabLabs: string;
  tabDirector: string;
  specializationLabel: string;
  conditionsTreatedLabel: string;
  opdScheduleLabel: string;
  experienceLabel: string;
  feeLabel: string;
  qualificationsLabel: string;
  generalBedCharge: string;
  icuBedCharge: string;
  oxygenCharge: string;
  opdTokenCharge: string;
  ambulanceCharge: string;
  labTestCatalog: string;
  testTurnaround: string;
  labOpenStatus: string;
  directorTitle: string;
  grievanceCellTitle: string;

  // Grievance Portal & Escalation
  grievanceTitle: string;
  grievanceSubtitle: string;
  btnSubmitGrievance: string;
  trackGrievanceTitle: string;
  grievanceIdPlaceholder: string;
  grievanceCategory: string;
  grievanceDescription: string;
  grievanceSubmittedSuccess: string;
  grievanceEscalationTimeline: string;
  level1Hospital: string;
  level2DHO: string;
  level3Commissioner: string;
  grievanceResolvedBadge: string;
  grievanceReviewBadge: string;
  grievanceEscalatedBadge: string;
  complaintHelpline: string;
  complaintEmail: string;

  // Blood Bank
  bloodBankTitle: string;
  bloodBankSubtitle: string;
  selectBloodGroup: string;
  unitsAvailableLabel: string;
  componentsAvailableLabel: string;
  bloodBankContact: string;

  // OPD Token & Queue
  opdTokenTitle: string;
  opdTokenSubtitle: string;
  nowServingToken: string;
  yourTokenNumber: string;
  estimatedWaitTime: string;
  btnDownloadToken: string;

  // 9-Stage Treatment Tracking ("इलाज हुआ है या नहीं")
  treatmentTrackerTitle: string;
  treatmentTrackerSubtitle: string;
  currentStageStatus: string;
  treatmentCompletedCelebration: string;

  // Doctor Portal
  doctorPortalTitle: string;
  doctorPortalSubtitle: string;
  assignedPatientsQueue: string;
  btnCompleteConsultation: string;
  btnOrderLabTests: string;

  // AI Navigator
  aiNavTitle: string;
  aiNavSubtitle: string;
  aiNavDisclaimer: string;
  aiListening: string;
  aiSpeaking: string;
  aiAskPlaceholder: string;
  aiStartVoice: string;
  aiStopVoice: string;
  aiSuggestedPrompt1: string;
  aiSuggestedPrompt2: string;
  aiSuggestedPrompt3: string;
  aiSuggestedPrompt4: string;
  aiRecommendedFacility: string;
  aiEmergencyDetected: string;
  aiUrgencyLevel: string;
  aiNormal: string;
  aiModerate: string;
  aiCritical: string;

  // SOS Emergency
  sosTitle: string;
  sosSubtitle: string;
  sosDisclaimer: string;
  sosTriggerBtn: string;
  sosActiveCall: string;
  sosDispatchStatus: string;
  sosAmbulanceAllocated: string;
  sosEta: string;
  sosDriverContact: string;
  sosNearestTrauma: string;
  sosFirstAidTitle: string;
  sosFirstAidSnakebite: string;
  sosFirstAidCpr: string;
  sosFirstAidBleeding: string;
  sosFirstAidMaternal: string;
  sosHelplineNumbers: string;

  // Schemes (MJPJAY & PM-JAY)
  schemesTitle: string;
  schemesSubtitle: string;
  mjpjayTitle: string;
  mjpjayDesc: string;
  mjpjayCover: string;
  pmjayTitle: string;
  pmjayDesc: string;
  eligibilityCheckerTitle: string;
  calcDesc: string;
  selectRationCard: string;
  rationYellow: string;
  rationOrange: string;
  rationWhite: string;
  annualIncome: string;
  checkEligibilityBtn: string;
  eligibleSchemes: string;
  requiredDocuments: string;
  availableDocs: string;
  docAadhaar: string;
  docIncomeCert: string;
  docRationCardNote: string;
  docAadhaarNote: string;
  docHospitalEntryNote: string;
  allSchemesTitle: string;
  keyBenefitsTitle: string;
  schemeCoverageLimit: string;
  tollFreeHelpline: string;
  officialPortal: string;
  howToGetTreatment: string;
  step1HospitalTitle: string;
  step1HospitalDesc: string;
  step2HospitalTitle: string;
  step2HospitalDesc: string;
  step3HospitalTitle: string;
  step3HospitalDesc: string;
  step4HospitalTitle: string;
  step4HospitalDesc: string;

  // Referral System
  referralNetworkKicker: string;
  referralTitle: string;
  referralSubtitle: string;
  trackReferralTitle: string;
  referralIdPlaceholder: string;
  btnTrackReferral: string;
  referralJourney: string;
  stepCreated: string;
  stepAccepted: string;
  stepInTransit: string;
  stepCompleted: string;
  bedReservedNote: string;
  ambulance108Coord: string;
  liveGpsTracking: string;
  specialistExamDone: string;
  freeMedicineUnderMjpjay: string;
  referralSlipTitle: string;
  patientName: string;
  referralReason: string;
  referralFrom: string;
  referralTo: string;
  urgencyTier: string;
  btnPrintSlip: string;
  ageAndGender: string;
  yearsOld: string;
  villageAndTaluka: string;
  abhaIdLabel: string;
  originSource: string;
  targetFacility: string;
  provisionalDiagnosis: string;
  clinicalNotes: string;
  receivingOfficer: string;
  otherActiveReferrals: string;
  tableRefId: string;
  tablePatientName: string;
  tableVillageDistrict: string;
  tableFrom: string;
  tableTo: string;
  tableUrgency: string;
  tableStatus: string;
  tableView: string;

  // Healthcare Worker
  workerTitle: string;
  workerSubtitle: string;
  tabRegisterPatient: string;
  tabCreateReferral: string;
  tabTeleconsult: string;
  tabUpdateStock: string;
  formFullName: string;
  formAgeGender: string;
  formVillageTaluka: string;
  formMobileNumber: string;
  formAbhaId: string;
  formRationCard: string;
  btnRegisterPatient: string;
  selectSourceFacility: string;
  selectDestinationFacility: string;
  vitalsBp: string;
  vitalsSpo2: string;
  vitalsPulse: string;
  btnIssueReferral: string;
  teleconsultActiveQueue: string;
  btnStartTeleconsult: string;

  // Admin Dashboard
  adminTitle: string;
  adminSubtitle: string;
  kpiTotalPatients: string;
  kpiActiveReferrals: string;
  kpiEmergencySos: string;
  kpiBedOccupancy: string;
  kpiMedicineShortage: string;
  districtVulnerabilityTitle: string;
  medicineShortageRadar: string;
  referralBottleneckTitle: string;
  emergencyFeedTitle: string;
  exportReport: string;

  // Footer & Common
  footerAbout: string;
  footerRights: string;
  emergencyHelpline108: string;
  healthHelpline104: string;
  close: string;
  confirm: string;
  save: string;
  copied: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Brand & Nav
    govBrand: 'Public Health Department',
    govSubBrand: 'Government of Maharashtra | Swasthya Setu',
    govTopTag: 'Public Health Department, Government of Maharashtra',
    sihBadge: 'Universal Public Healthcare Access Portal',
    home: 'Home',
    findHealthcare: 'Hospitals & PHCs',
    schemes: 'Govt Schemes (MJPJAY)',
    referrals: 'Referral Tracking',
    workerPortal: 'ASHA / Worker',
    adminDashboard: 'Command Dashboard',
    abhaLocker: 'ABHA Locker',
    sosEmergency: '108 Emergency SOS',
    onlineMode: 'Online (Live)',
    offlineMode: 'Offline Mode',
    rolePatient: 'Citizen / Patient',
    roleWorker: 'ASHA / ANM Worker',
    roleAdmin: 'Health Administrator',
    switchRole: 'Switch Role',

    // New Navigation Links
    navBloodBank: '🩸 Blood Bank',
    navGrievances: '📝 Grievances',
    navTreatmentTracker: '🩺 Treatment Journey',
    navDoctorPortal: '👨‍⚕️ Doctor Portal',
    navLoginOtp: '🔐 OTP Login',

    // Hero Section
    heroBadge: '🇮🇳 Maharashtra Public Healthcare Platform',
    heroTitle1: 'Quality healthcare access for every citizen,',
    heroTitleHighlight: ' right to the last mile.',
    heroSubtitle: 'Find nearby Primary Health Centres (PHC), Community Health Centres (CHC), Sub-District and District Hospitals, check doctor OPD timings, live medicine stocks, blood availability, access MJPJAY 2.0 cashless benefits, and track referrals.',
    btnFindFacilities: 'Find Healthcare Near Me →',
    btnTalkAi: '🎙️ AI Health Navigator',
    btnEmergencySOS: '🚨 108 Emergency SOS',
    featureOffline: 'Offline-First Engine',
    featureOfflineDesc: 'Essential data cached for low-connectivity rural belts',
    featureMultilingual: 'English, Marathi & Hindi',
    featureMultilingualDesc: 'Voice-assisted triage in local languages',
    featureSchemes: 'MJPJAY 2.0 & Ayushman',
    featureSchemesDesc: '₹5 Lakh universal cashless coverage',
    featureReferral: 'Smart Digital Referrals',
    featureReferralDesc: 'Seamless Village ➔ PHC ➔ CHC ➔ DH tracking',
    liveStatusTitle: 'Maharashtra Public Health Live Network',
    districtsConnected: '36 Districts Connected',
    bedsAvailableCount: '3,420 Beds Available',
    ambulanceActiveCount: '108 Ambulances Active',

    // Quick Services
    quickAccessTitle: 'QUICK ACCESS',
    quickAccessSubtitle: 'What healthcare service do you need today?',
    cardHospitalsTitle: 'Find Hospitals & Doctors',
    cardHospitalsDesc: 'Verified OPD schedules, specialist profiles, live bed counters, test prices, and medicine stocks.',
    cardSchemesTitle: 'MJPJAY 2.0 & Ayushman',
    cardSchemesDesc: 'Check ₹5 Lakh cashless coverage eligibility by ration card & find empanelled hospitals.',
    cardReferralTitle: 'Smart Referral Pathway',
    cardReferralDesc: 'Track your referral journey from Sub-Centre ➔ PHC ➔ CHC ➔ District Hospital in real-time.',
    cardAiNavTitle: 'AI Healthcare Navigator',
    cardAiNavDesc: 'Voice & text symptom navigator guiding you to the right care tier and Ayushman benefits.',
    cardAbhaTitle: 'ABHA Digital Health Locker',
    cardAbhaDesc: 'Securely store and share digital prescriptions, vaccination slips, and lab reports offline.',
    cardSosTitle: '108 Emergency Medical SOS',
    cardSosDesc: '1-click GPS SOS alert, automated ambulance dispatch simulation, and critical first-aid.',
    btnExplore: 'Explore →',
    btnCheck: 'Check Scheme →',
    btnTrack: 'Track Referral →',
    btnOpen: 'Open →',

    // Referral Pathway on Home
    referralFlowHeading: 'Digital referral network routing patients to the right care at the right time',
    referralFlowDesc: 'End-to-end transparent journey from village ASHA / Sub-Centre to PHC, CHC, and District Hospital / GMC.',
    refHighlight1: 'Official Digital Referral Slip with QR Code',
    refHighlight2: '108 Ambulance coordination & pre-allocated hospital bed',
    refHighlight3: 'Guaranteed ₹5 Lakh cashless coverage under MJPJAY',
    btnTrackFlow: 'Track Referral Live →',
    flowStep1Title: '1. Village Sub-Centre (ASHA Worker)',
    flowStep1Desc: 'Clinical assessment & digital ABHA registration by ASHA/ANM',
    flowStep2Title: '2. Primary Health Centre (PHC)',
    flowStep2Desc: 'Medical Officer evaluation, essential diagnostics & referral decision',
    flowStep3Title: '3. Community Health Centre (CHC / FRU)',
    flowStep3Desc: 'Specialist doctors, USG sonography, blood storage & C-section surgeries',
    flowStep4Title: '4. District Hospital / Medical College (GMC)',
    flowStep4Desc: 'Super-specialty ICU, Cath Lab, oncology, neurosurgery & MJPJAY operations',
    offlineStripTitle: 'Offline-First Design for Rural & Remote Maharashtra',
    offlineStripDesc: 'All hospital directories, emergency contacts, first-aid protocols, and saved referrals remain accessible without internet.',
    offlineReadyTag: 'Offline Ready',

    // Facility Finder
    finderTitle: 'Maharashtra Public Healthcare Directory',
    finderSubtitle: 'Government-verified Primary Health Centres, CHCs, Sub-District and District Hospitals.',
    searchPlaceholder: 'Search hospital, doctor, specialty, taluka, or medicine...',
    allDistricts: 'All Districts (36 Districts)',
    selectDistrict: 'Select District',
    allFacilityTypes: 'All Facility Types',
    filterVerifiedOnly: '🟢 Officially Verified Only',
    filterAyushmanOnly: '💳 MJPJAY / Ayushman Empanelled',
    filterEmergencyOnly: '🚑 24/7 Emergency / Trauma',
    filterMedicineAvailable: '💊 Medicine In-Stock',
    filterAsvAvailable: '🐍 Anti-Snake Venom (ASV) Ready',
    facilitiesFound: 'Healthcare facilities found',
    noFacilitiesFound: 'No facilities found',
    noFacilitiesSub: 'Try adjusting your search query or filters.',
    badgeGovtVerified: 'Govt Verified',
    badgeUpdated: 'Recently Updated',
    badgeRequiresVerification: 'Verification Pending',
    badgeMjpjay: 'MJPJAY ₹5L Cashless',
    badgeAyushman: 'PM-JAY Empanelled',
    badgeEmergency247: '24/7 Emergency & Trauma',
    bedsAvailable: 'Available Beds',
    icuBeds: 'ICU Beds',
    generalBeds: 'General Beds',
    oxygenBeds: 'Oxygen Beds',
    maternityBeds: 'Maternity Beds',
    medicineStockStatus: 'Live Essential Medicine Stock',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Stockout',
    btnContact: '📞 Contact Facility',
    btnDirections: '🧭 Google Maps',
    btnCreateReferral: '🩺 Issue Referral',
    btnBookOpd: '🎫 Book OPD Token',
    ayushmanMitraDesk: 'Ayushman Mitra Helpdesk',
    addressLabel: 'Address:',
    distanceLabel: 'Distance:',

    // Facility Tabs
    tabDoctors: '👨‍⚕️ Available Doctors',
    tabCharges: '💰 Hospital Charges',
    tabLabs: '🔬 Diagnostic Labs & Tests',
    tabDirector: '🏛️ Administration & Grievance Cell',
    specializationLabel: 'Specialization:',
    conditionsTreatedLabel: 'Specialized In:',
    opdScheduleLabel: 'OPD Schedule:',
    experienceLabel: 'Experience:',
    feeLabel: 'Consultation Fee:',
    qualificationsLabel: 'Qualifications:',
    generalBedCharge: 'General Ward Bed:',
    icuBedCharge: 'ICU / HDU Bed:',
    oxygenCharge: 'Medical Oxygen:',
    opdTokenCharge: 'OPD Registration Token:',
    ambulanceCharge: '108 Emergency Ambulance:',
    labTestCatalog: 'Available Diagnostic Tests & Turnaround:',
    testTurnaround: 'Turnaround Time:',
    labOpenStatus: 'Operating Status:',
    directorTitle: 'Medical Superintendent / Dean:',
    grievanceCellTitle: 'Hospital Grievance Cell Location:',

    // Grievances
    grievanceTitle: 'Patient Grievance Redressal & Auto-Escalation',
    grievanceSubtitle: 'Public Health Department, Maharashtra — Transparent Complaint Resolution with 4-Level Automatic Escalation',
    btnSubmitGrievance: 'Submit New Grievance',
    trackGrievanceTitle: 'Track Grievance Status',
    grievanceIdPlaceholder: 'Enter Grievance Reference ID (e.g. MH-GRV-2026-1049)...',
    grievanceCategory: 'Grievance Category:',
    grievanceDescription: 'Detailed Complaint Description:',
    grievanceSubmittedSuccess: 'Grievance Registered Successfully!',
    grievanceEscalationTimeline: '4-Stage Automated Escalation Pathway:',
    level1Hospital: 'Level 1: Hospital Grievance Cell (48h SLA)',
    level2DHO: 'Level 2: District Health Officer (Day 5 Auto-Escalated)',
    level3Commissioner: 'Level 3: State Health Commissioner (Day 10 Apex)',
    grievanceResolvedBadge: 'Resolved with ATR',
    grievanceReviewBadge: 'Under Review',
    grievanceEscalatedBadge: 'Escalated to DHO',
    complaintHelpline: 'Grievance Toll-Free Helpline: 104 / 1800 123 2211',
    complaintEmail: 'Official Grievance Email: grievance.health@maharashtra.gov.in',

    // Blood Bank
    bloodBankTitle: 'Maharashtra e-RaktKosh Blood Bank Finder',
    bloodBankSubtitle: 'Live Blood Group & Component Availability across 36 Districts of Maharashtra',
    selectBloodGroup: 'Select Required Blood Group:',
    unitsAvailableLabel: 'Live Units Available:',
    componentsAvailableLabel: 'Available Blood Components:',
    bloodBankContact: '24x7 Blood Bank Helpline:',

    // OPD Token
    opdTokenTitle: 'Smart OPD Appointment & Live Token Queue',
    opdTokenSubtitle: 'Book appointments at Government Hospitals & reduce waiting room overcrowding',
    nowServingToken: 'Now Serving Token:',
    yourTokenNumber: 'Your Token Number:',
    estimatedWaitTime: 'Approximate Wait Time:',
    btnDownloadToken: 'Download Digital Token Slip',

    // 9-Stage Treatment Tracking
    treatmentTrackerTitle: 'Patient Treatment Journey Tracker ("इलाज हुआ है या नहीं")',
    treatmentTrackerSubtitle: 'End-to-End Visual Audit: From Village ASHA Referral to Hospital Surgery & Post-Discharge Follow-up',
    currentStageStatus: 'Current Treatment Stage:',
    treatmentCompletedCelebration: 'Treatment Successfully Completed & Verified under MJPJAY 2.0',

    // Doctor Portal
    doctorPortalTitle: 'Government Doctor Clinical Portal',
    doctorPortalSubtitle: 'Authorized Medical Officer Dashboard — Manage assigned patients, order tests & update treatment stages',
    assignedPatientsQueue: 'Referred Patients Under Care:',
    btnCompleteConsultation: 'Record Consultation & Prescribe',
    btnOrderLabTests: 'Order Laboratory & Radiology Tests',

    // AI Navigator
    aiNavTitle: 'AI Healthcare Navigator',
    aiNavSubtitle: 'Speak or type in your language — navigate to the right public healthcare facility',
    aiNavDisclaimer: '⚠️ Medical Disclaimer: This AI Navigator acts as a healthcare triage guide and is NOT a substitute for a qualified doctor or emergency medical service. In emergencies, call 108 immediately.',
    aiListening: 'Listening to your voice... (Speak now)',
    aiSpeaking: 'AI speaking response...',
    aiAskPlaceholder: 'e.g., "I have acute chest pain and high fever, where should I go?"...',
    aiStartVoice: '🎙️ Start Voice Input',
    aiStopVoice: '⏹️ Stop Voice',
    aiSuggestedPrompt1: 'I have acute chest pain and difficulty breathing',
    aiSuggestedPrompt2: 'Where can I get free antenatal checkup & sonography?',
    aiSuggestedPrompt3: 'Someone got bitten by a snake in my village, where is ASV available?',
    aiSuggestedPrompt4: 'I have a Yellow/Orange ration card, where can I get free surgery?',
    aiRecommendedFacility: 'Recommended Healthcare Level:',
    aiEmergencyDetected: '🚨 Red Flag Emergency Detected - Immediate Care Needed!',
    aiUrgencyLevel: 'Urgency Tier:',
    aiNormal: 'Routine / Non-Urgent (Sub-Centre / PHC)',
    aiModerate: 'Urgent within 24h (CHC / Rural Hospital)',
    aiCritical: 'Critical Emergency (District Hospital / Call 108)',

    // SOS Emergency
    sosTitle: '108 Emergency Medical Assistance',
    sosSubtitle: 'Government of Maharashtra Emergency Medical Response System (Simulation)',
    sosDisclaimer: '1-click SOS triggers GPS coordinates to the nearest 108 Ambulance cluster and alerts the receiving District Trauma Unit.',
    sosTriggerBtn: '🚨 Trigger 108 SOS Now',
    sosActiveCall: 'Dispatching Emergency Alert...',
    sosDispatchStatus: '108 Ambulance Dispatched!',
    sosAmbulanceAllocated: 'Allocated 108 Ambulance:',
    sosEta: 'Estimated Time of Arrival (ETA):',
    sosDriverContact: 'EMT / Driver Contact:',
    sosNearestTrauma: 'Nearest Emergency Trauma Centre:',
    sosFirstAidTitle: 'Critical Life-Saving First-Aid:',
    sosFirstAidSnakebite: '🐍 Snakebite: Keep victim calm and immobilize the bitten limb. Do NOT cut or tourniquet. Rush to nearest PHC with ASV.',
    sosFirstAidCpr: '❤️ Cardiac Arrest / CPR: If unresponsive, deliver 100-120 hard and fast chest compressions per minute in the center of the chest.',
    sosFirstAidBleeding: '🩸 Severe Hemorrhage: Apply firm, direct and continuous pressure with a clean cloth.',
    sosFirstAidMaternal: '🤰 Labor Emergency: Keep patient comfortable and call 102/108 immediately for institutional transit.',
    sosHelplineNumbers: 'Helplines: 108 (Ambulance) | 104 (Health Advice) | 102 (Maternal & Child)',

    // Schemes (MJPJAY & PM-JAY)
    schemesTitle: 'Maharashtra Public Health Schemes',
    schemesSubtitle: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY 2.0) & Ayushman Bharat Comprehensive Guide',
    mjpjayTitle: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY 2.0)',
    mjpjayDesc: 'Universal health insurance coverage of ₹5 Lakhs per family per year for all Maharashtra ration card holders across 996+ medical & surgical procedures.',
    mjpjayCover: '₹5,00,000 per family / year',
    pmjayTitle: 'Ayushman Bharat - PM-JAY',
    pmjayDesc: 'National cashless coverage up to ₹5 Lakhs at all empanelled public and private hospitals across India.',
    eligibilityCheckerTitle: 'Scheme Eligibility & Document Checker',
    calcDesc: 'Select your ration card color to check ₹5 Lakh cashless treatment eligibility.',
    selectRationCard: 'Select Your Maharashtra Ration Card Color:',
    rationYellow: 'Yellow Ration Card (BPL / Antyodaya)',
    rationOrange: 'Kesari / Orange Ration Card (No Income Cap)',
    rationWhite: 'White Ration Card (Eligible under MJPJAY 2.0)',
    annualIncome: 'Annual Family Income:',
    checkEligibilityBtn: 'Check Eligibility & Required Documents',
    eligibleSchemes: 'Schemes You Are Eligible For:',
    requiredDocuments: 'Mandatory Documents Needed at Hospital:',
    availableDocs: 'Available Documents:',
    docAadhaar: "Patient's Aadhaar Card",
    docIncomeCert: 'Tehsildar Income Certificate (if applicable)',
    docRationCardNote: 'Maharashtra Ration Card (Original or Smart Digital Card)',
    docAadhaarNote: 'Aadhaar Card for biometric patient authentication',
    docHospitalEntryNote: "Direct registration at hospital's Ayushman Mitra Helpdesk",
    allSchemesTitle: 'Comprehensive Guide to Maharashtra Public Health Schemes',
    keyBenefitsTitle: 'Key Benefits & Features:',
    schemeCoverageLimit: 'Coverage Limit:',
    tollFreeHelpline: 'Toll-Free Helpline:',
    officialPortal: 'Official Portal',
    howToGetTreatment: 'How to Get Cashless Treatment at Hospital (Step-by-Step)',
    step1HospitalTitle: '1. Visit Hospital',
    step1HospitalDesc: 'Visit the reception of any MJPJAY / PM-JAY empanelled public or private hospital in Maharashtra.',
    step2HospitalTitle: '2. Meet Ayushman Mitra',
    step2HospitalDesc: 'Show your Ration Card & Aadhaar card at the Ayushman Mitra desk for instant cashless registration.',
    step3HospitalTitle: '3. Cashless Treatment',
    step3HospitalDesc: 'Undergo surgery, diagnostics, and ICU care without paying any advance deposit.',
    step4HospitalTitle: '4. Discharge & Free Medicines',
    step4HospitalDesc: 'Receive 10 days of post-discharge medicines at zero out-of-pocket cost.',

    // Referral System
    referralNetworkKicker: 'MAHARASHTRA SMART REFERRAL NETWORK',
    referralTitle: 'Smart Digital Referral System',
    referralSubtitle: 'Digital Patient Pathway: Village Sub-Centre ➔ PHC ➔ CHC ➔ District Hospital',
    trackReferralTitle: 'Track Active Referral',
    referralIdPlaceholder: 'Enter Referral ID (e.g. MH-REF-2026-8841)...',
    btnTrackReferral: 'Track Referral',
    referralJourney: 'Referral Journey Milestones:',
    stepCreated: '1. Referral Created',
    stepAccepted: '2. Hospital Accepted',
    stepInTransit: '3. Patient In-Transit',
    stepCompleted: '4. Treatment Completed',
    bedReservedNote: 'Bed & Doctor Reserved',
    ambulance108Coord: '108 Ambulance Coordination',
    liveGpsTracking: 'Live GPS Tracking',
    specialistExamDone: 'Specialist Examination Completed',
    freeMedicineUnderMjpjay: 'Free MJPJAY Medicines Provided',
    referralSlipTitle: 'Maharashtra Digital Referral Slip',
    patientName: 'Patient Name:',
    referralReason: 'Reason / Provisional Diagnosis:',
    referralFrom: 'Originating Facility:',
    referralTo: 'Target Facility & Department:',
    urgencyTier: 'Clinical Urgency:',
    btnPrintSlip: '🖨️ Download / Print Referral Slip',
    ageAndGender: 'Age & Gender:',
    yearsOld: 'Yrs',
    villageAndTaluka: 'Village & Taluka:',
    abhaIdLabel: 'ABHA Number:',
    originSource: 'Originating Facility (Source):',
    targetFacility: 'Target Facility & Department:',
    provisionalDiagnosis: 'Clinical Provisional Diagnosis:',
    clinicalNotes: 'Clinical Observations & Notes:',
    receivingOfficer: 'Authorized Receiving Officer:',
    otherActiveReferrals: 'Other Active Referrals',
    tableRefId: 'Referral ID',
    tablePatientName: 'Patient Name',
    tableVillageDistrict: 'Village / District',
    tableFrom: 'From',
    tableTo: 'To',
    tableUrgency: 'Urgency',
    tableStatus: 'Status',
    tableView: 'View',

    // Healthcare Worker
    workerTitle: 'Frontline Healthcare Worker (ASHA / ANM) Portal',
    workerSubtitle: 'Rural Patient Registration, Smart Digital Referral Issuance & e-Sanjeevani Teleconsultation',
    tabRegisterPatient: '📝 Register Patient (ABHA)',
    tabCreateReferral: '🩺 Issue Smart Referral',
    tabTeleconsult: '📹 e-Sanjeevani Teleconsult',
    tabUpdateStock: '📦 Update Medicine & Beds',
    formFullName: 'Patient Full Name:',
    formAgeGender: 'Age & Gender:',
    formVillageTaluka: 'Village & Taluka / District:',
    formMobileNumber: 'Mobile Number:',
    formAbhaId: 'ABHA ID (if available):',
    formRationCard: 'Ration Card Category:',
    btnRegisterPatient: 'Register Patient & Generate ABHA Card',
    selectSourceFacility: 'Current Source Facility:',
    selectDestinationFacility: 'Target Referral Facility:',
    vitalsBp: 'Blood Pressure (BP):',
    vitalsSpo2: 'Oxygen (SpO2 %):',
    vitalsPulse: 'Pulse Rate:',
    btnIssueReferral: 'Generate Digital Referral with QR Code',
    teleconsultActiveQueue: 'Pending Teleconsultation Queue:',
    btnStartTeleconsult: 'Connect with District Medical Specialist',

    // Admin Dashboard
    adminTitle: 'Govt of Maharashtra - Public Health Command Center',
    adminSubtitle: 'Public Health Department — 36 Districts Real-Time Surveillance & Health Analytics',
    kpiTotalPatients: 'Total Patients Served',
    kpiActiveReferrals: 'Active Digital Referrals',
    kpiEmergencySos: '108 Emergency Incidents',
    kpiBedOccupancy: 'Average Bed Occupancy',
    kpiMedicineShortage: 'Critical Stockout Alerts',
    districtVulnerabilityTitle: 'District Health Vulnerability & Tribal Belt Index',
    medicineShortageRadar: 'Anti-Snake Venom (ASV) & Critical Medicine Radar',
    referralBottleneckTitle: 'Referral Bottleneck & GMC Overload Analytics',
    emergencyFeedTitle: 'Live 108 Emergency Dispatch Feed',
    exportReport: '📊 Export Health Analytics (CSV/PDF)',

    // Footer & Common
    footerAbout: 'Developed in partnership with Public Health Department, Government of Maharashtra.',
    footerRights: '© 2026 Swasthya Setu Maharashtra. All rights reserved.',
    emergencyHelpline108: '108 - Free Emergency Ambulance Service / 24x7',
    healthHelpline104: '104 - Maharashtra Health Advice Helpline',
    close: 'Close',
    confirm: 'Confirm',
    save: 'Save',
    copied: 'Copied to clipboard!',
  },

  hi: {
    // Brand & Nav
    govBrand: 'सार्वजनिक स्वास्थ्य विभाग',
    govSubBrand: 'महाराष्ट्र शासन | स्वास्थ्य सेतु',
    govTopTag: 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र शासन',
    sihBadge: 'सार्वजनिक स्वास्थ्य एवं डिजिटल आरोग्य सेवा पोर्टल',
    home: 'होम',
    findHealthcare: 'अस्पताल व डॉक्टर',
    schemes: 'सरकारी योजनाएं (MJPJAY)',
    referrals: 'रेफरल ट्रैकिंग',
    workerPortal: 'आशा / कार्यकर्ता',
    adminDashboard: 'कमान डैशबोर्ड',
    abhaLocker: 'आभा लॉकर',
    sosEmergency: '१०८ आपातकालीन SOS',
    onlineMode: 'ऑनलाइन (लाइव)',
    offlineMode: 'ऑफलाइन मोड',
    rolePatient: 'नागरिक / मरीज',
    roleWorker: 'आशा / ANM कार्यकर्ता',
    roleAdmin: 'स्वास्थ्य अधिकारी',
    switchRole: 'भूमिका बदलें',

    // New Navigation Links
    navBloodBank: '🩸 ब्लड बैंक',
    navGrievances: '📝 शिकायत निवारण',
    navTreatmentTracker: '🩺 इलाज ट्रैकर',
    navDoctorPortal: '👨‍⚕️ डॉक्टर पोर्टल',
    navLoginOtp: '🔐 OTP लॉगिन',

    // Hero Section
    heroBadge: '🇮🇳 महाराष्ट्र सार्वजनिक स्वास्थ्य सेवा मंच',
    heroTitle1: 'हर नागरिक तक पहुंचे उत्तम स्वास्थ्य सेवा,',
    heroTitleHighlight: ' सुदूर गांवों तक निरंतर।',
    heroSubtitle: 'निकटतम प्राथमिक स्वास्थ्य केंद्र (PHC), ग्रामीण अस्पताल (RH), उप-जिला एवं जिला अस्पताल खोजें, डॉक्टरों की OPD टाइमिंग देखें, ब्लड बैंक उपलब्धता जांचें, MJPJAY २.० मुफ्त योजना का लाभ लें।',
    btnFindFacilities: 'निकटतम अस्पताल खोजें →',
    btnTalkAi: '🎙️ AI स्वास्थ्य मार्गदर्शक',
    btnEmergencySOS: '🚨 १०८ आपातकालीन सहायता',
    featureOffline: 'ऑफलाइन सक्षम',
    featureOfflineDesc: 'ग्रामीण क्षेत्रों में बिना इंटरनेट भी डेटा उपलब्ध',
    featureMultilingual: 'हिंदी, मराठी व अंग्रेजी',
    featureMultilingualDesc: 'आवाज द्वारा आसान नेविगेशन',
    featureSchemes: 'MJPJAY व आयुष्मान',
    featureSchemesDesc: '५ लाख रुपये तक कैशलेस इलाज की जानकारी',
    featureReferral: 'स्मार्ट रेफरल',
    featureReferralDesc: 'गांव से लेकर जिला अस्पताल तक डिजिटल ट्रैकिंग',
    liveStatusTitle: 'महाराष्ट्र सार्वजनिक स्वास्थ्य लाइव स्थिति',
    districtsConnected: '३६ जिले कनेक्टेड',
    bedsAvailableCount: '३,४२० बेड्स उपलब्ध',
    ambulanceActiveCount: '१०८ एम्बुलेंस सक्रिय',

    // Quick Services
    quickAccessTitle: 'त्वरित सेवाएं',
    quickAccessSubtitle: 'आपको किस सेवा की आवश्यकता है?',
    cardHospitalsTitle: 'अस्पताल, डॉक्टर व जांच',
    cardHospitalsDesc: 'सत्यापित डॉक्टर OPD समय, लैब टेस्ट के रेट, लाइव बेड स्थिति और दवा स्टॉक।',
    cardSchemesTitle: 'महात्मा फुले जन आरोग्य (MJPJAY)',
    cardSchemesDesc: 'राशन कार्ड के आधार पर ₹५ लाख तक मुफ्त उपचार पात्रता व अस्पताल सूची।',
    cardReferralTitle: 'स्मार्ट रेफरल ट्रैकिंग',
    cardReferralDesc: 'उप-केंद्र ➔ PHC ➔ CHC ➔ जिला अस्पताल की लाइव स्थिति देखें।',
    cardAiNavTitle: 'AI स्वास्थ्य सहायक (Navigator)',
    cardAiNavDesc: 'लक्षणों के आधार पर उपयुक्त स्वास्थ्य केंद्र की सिफारिश और प्राथमिक सलाह।',
    cardAbhaTitle: 'आभा (ABHA) हेल्थ कार्ड',
    cardAbhaDesc: 'डिजिटल पर्ची, टीकाकरण रिकॉर्ड और लैब रिपोर्ट सुरक्षित रखें।',
    cardSosTitle: '१०८ एम्बुलेंस SOS',
    cardSosDesc: '१-क्लिक आपातकालीन मदद, लाइव एम्बुलेंस आवंटन और प्राथमिक उपचार गाइड।',
    btnExplore: 'खोजें →',
    btnCheck: 'पात्रता जांचें →',
    btnTrack: 'ट्रैक करें →',
    btnOpen: 'शुरू करें →',

    // Referral Pathway on Home
    referralFlowHeading: 'मरीज को सही समय पर सही स्वास्थ्य केंद्र तक पहुंचाने वाली डिजिटल प्रणाली',
    referralFlowDesc: 'गांव के आशा/उप-केंद्र से लेकर PHC, CHC और जिला अस्पताल तक मरीज की यात्रा पूरी तरह पारदर्शी और ट्रैक करने योग्य।',
    refHighlight1: 'QR कोड युक्त आधिकारिक रेफरल पर्ची',
    refHighlight2: '१०८ एम्बुलेंस समन्वय व बेड आरक्षण',
    refHighlight3: 'MJPJAY ₹५ लाख कैशलेस मुफ्त इलाज',
    btnTrackFlow: 'रेफरल ट्रैक करें →',
    flowStep1Title: '१. गांव / उप-केंद्र (Village Health Worker)',
    flowStep1Desc: 'आशा कार्यकर्ता / ANM द्वारा मरीज जांच व डिजिटल ABHA पंजीकरण',
    flowStep2Title: '२. प्राथमिक स्वास्थ्य केंद्र (PHC)',
    flowStep2Desc: 'डॉक्टर द्वारा प्राथमिक जांच, दवाएं व रेफरल निर्णय',
    flowStep3Title: '३. ग्रामीण अस्पताल / CHC (First Referral Unit)',
    flowStep3Desc: 'विशेषज्ञ डॉक्टर, सोनोग्राफी, खून जांच व प्रसव सर्जरी',
    flowStep4Title: '४. जिला अस्पताल / मेडिकल कॉलेज (GMC)',
    flowStep4Desc: 'सुपर-स्पेशियलिटी, ICU, कैथ लैब व MJPJAY मुफ्त सर्जरी',
    offlineStripTitle: 'ग्रामीण महाराष्ट्र के लिए विशेष "ऑफलाइन-फर्स्ट" तकनीक',
    offlineStripDesc: 'इंटरनेट न होने पर भी सभी अस्पतालों के पते, फोन, फर्स्ट-एड और रेफरल फोन में सुरक्षित रहते हैं।',
    offlineReadyTag: 'Offline Ready',

    // Facility Finder
    finderTitle: 'महाराष्ट्र स्वास्थ्य सुविधा एवं डॉक्टर डायरेक्टरी',
    finderSubtitle: 'सरकारी सत्यापित प्राथमिक स्वास्थ्य केंद्र, CHC, उप-जिला और जिला अस्पताल खोजें।',
    searchPlaceholder: 'अस्पताल, डॉक्टर, स्पेशलिटी, तालुका या दवा का नाम खोजें...',
    allDistricts: 'सभी जिले (३६ जिले)',
    selectDistrict: 'जिला चुनें',
    allFacilityTypes: 'सभी सुविधा प्रकार',
    filterVerifiedOnly: '🟢 केवल सरकारी सत्यापित',
    filterAyushmanOnly: '💳 MJPJAY / आयुष्मान लागू',
    filterEmergencyOnly: '🚑 २४/७ आपातकालीन सेवा',
    filterMedicineAvailable: '💊 दवा स्टॉक उपलब्ध',
    filterAsvAvailable: '🐍 एंटी-स्नेक वेनम (ASV) उपलब्ध',
    facilitiesFound: 'स्वास्थ्य केंद्र उपलब्ध',
    noFacilitiesFound: 'कोई स्वास्थ्य केंद्र नहीं मिला',
    noFacilitiesSub: 'कृपया खोज शब्द या फ़िल्टर बदलकर दोबारा जांचें।',
    badgeGovtVerified: 'सरकारी सत्यापित',
    badgeUpdated: 'हाल ही में अपडेट',
    badgeRequiresVerification: 'सत्यापन लंबित',
    badgeMjpjay: 'MJPJAY ₹५ लाख मुफ्त',
    badgeAyushman: 'आयुष्मान भारत (PM-JAY)',
    badgeEmergency247: '२४x७ आपातकालीन / ट्रॉमा',
    bedsAvailable: 'उपलब्ध बेड',
    icuBeds: 'ICU बेड',
    generalBeds: 'सामान्य बेड',
    oxygenBeds: 'ऑक्सीजन बेड',
    maternityBeds: 'प्रसव (Maternity) बेड',
    medicineStockStatus: 'महत्वपूर्ण दवा स्टॉक (लाइव)',
    inStock: 'उपलब्ध',
    lowStock: 'सीमित स्टॉक',
    outOfStock: 'स्टॉक समाप्त',
    btnContact: '📞 सीधे संपर्क करें',
    btnDirections: '🧭 गूगल मैप्स',
    btnCreateReferral: '🩺 रेफरल बनाएं',
    btnBookOpd: '🎫 OPD टोकन लें',
    ayushmanMitraDesk: 'आयुष्मान मित्र हेल्पडेस्क',
    addressLabel: 'पता:',
    distanceLabel: 'दूरी:',

    // Facility Tabs
    tabDoctors: '👨‍⚕️ उपलब्ध डॉक्टर',
    tabCharges: '💰 अस्पताल शुल्क',
    tabLabs: '🔬 पैथोलॉजी लैब व जांच',
    tabDirector: '🏛️ अस्पताल प्रशासन व शिकायत कक्ष',
    specializationLabel: 'विशेषज्ञता (Specialization):',
    conditionsTreatedLabel: 'प्रमुख उपचार क्षेत्र:',
    opdScheduleLabel: 'OPD दिन व समय:',
    experienceLabel: 'अनुभव:',
    feeLabel: 'परामर्श शुल्क:',
    qualificationsLabel: 'योग्यता व पंजीकरण:',
    generalBedCharge: 'जनरल वार्ड बेड:',
    icuBedCharge: 'ICU / HDU बेड:',
    oxygenCharge: 'मेडिकल ऑक्सीजन:',
    opdTokenCharge: 'OPD पंजीकरण शुल्क:',
    ambulanceCharge: '१०८ आपातकालीन एम्बुलेंस:',
    labTestCatalog: 'उपलब्ध जांच एवं रिपोर्ट का समय:',
    testTurnaround: 'रिपोर्ट मिलने का समय:',
    labOpenStatus: 'कार्यरत स्थिति:',
    directorTitle: 'अधीक्षक / डीन:',
    grievanceCellTitle: 'शिकायत निवारण कक्ष:',

    // Grievances
    grievanceTitle: 'मरीज शिकायत निवारण एवं स्वतः-एस्केलेशन प्रणाली',
    grievanceSubtitle: 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र शासन — पारदर्शी शिकायत निवारण एवं ४-स्तरीय ऑटोमैटिक एस्केलेशन',
    btnSubmitGrievance: 'नई शिकायत दर्ज करें',
    trackGrievanceTitle: 'शिकायत की स्थिति जांचें',
    grievanceIdPlaceholder: 'शिकायत संदर्भ संख्या दर्ज करें (उदा. MH-GRV-2026-1049)...',
    grievanceCategory: 'शिकायत श्रेणी:',
    grievanceDescription: 'शिकायत का संपूर्ण विवरण:',
    grievanceSubmittedSuccess: 'शिकायत सफलतापूर्वक दर्ज हुई!',
    grievanceEscalationTimeline: '४-स्तरीय स्वतः-एस्केलेशन टाइमलाइन:',
    level1Hospital: 'स्तर १: अस्पताल शिकायत सेल (४८ घंटे की समय-सीमा)',
    level2DHO: 'स्तर २: जिला स्वास्थ्य अधिकारी (DHO) (५ दिन में ऑटो-एस्केलेट)',
    level3Commissioner: 'स्तर ३: राज्य स्वास्थ्य आयुक्त (१० दिन में शीर्ष स्तर)',
    grievanceResolvedBadge: 'समाधान संपन्न (ATR)',
    grievanceReviewBadge: 'जांच जारी है',
    grievanceEscalatedBadge: 'DHO को प्रेषित',
    complaintHelpline: 'शिकायत टोल-फ्री हेल्पलाइन: १०४ / १८०० १२३ २२११',
    complaintEmail: 'शिकायत ईमेल: grievance.health@maharashtra.gov.in',

    // Blood Bank
    bloodBankTitle: 'महाराष्ट्र e-RaktKosh ब्लड बैंक खोजक',
    bloodBankSubtitle: 'महाराष्ट्र के ३६ जिलों में रक्त समूह और घटकों (PRBC, FFP, Platelets) की लाइव उपलब्धता',
    selectBloodGroup: 'आवश्यक ब्लड ग्रुप चुनें:',
    unitsAvailableLabel: 'उपलब्ध यूनिट्स:',
    componentsAvailableLabel: 'उपलब्ध रक्त घटक:',
    bloodBankContact: '२४x७ ब्लड बैंक संपर्क:',

    // OPD Token
    opdTokenTitle: 'स्मार्ट OPD टोकन एवं लाइव कतार प्रणाली',
    opdTokenSubtitle: 'सरकारी अस्पतालों में कतार से बचें — घर बैठे OPD टोकन प्राप्त करें',
    nowServingToken: 'वर्तमान में चल रहा टोकन:',
    yourTokenNumber: 'आपका टोकन नंबर:',
    estimatedWaitTime: 'अनुमानित प्रतीक्षा समय:',
    btnDownloadToken: 'डिजिटल टोकन पर्ची डाउनलोड करें',

    // 9-Stage Treatment Tracking
    treatmentTrackerTitle: 'मरीज इलाज ट्रैकर ("इलाज हुआ है या नहीं")',
    treatmentTrackerSubtitle: 'आशा रेफरल से लेकर अस्पताल में ऑपरेशन, डिस्चार्ज और १० दिन की मुफ्त दवा तक संपूर्ण ट्रैकिंग',
    currentStageStatus: 'वर्तमान इलाज चरण:',
    treatmentCompletedCelebration: 'उपचार सफलतापूर्वक पूर्ण हुआ — MJPJAY २.० के तहत निःशुल्क',

    // Doctor Portal
    doctorPortalTitle: 'सरकारी डॉक्टर क्लीनिकल पोर्टल',
    doctorPortalSubtitle: 'अधिकृत चिकित्सा अधिकारी डैशबोर्ड — मरीज जांच, लैब ऑर्डर और इलाज का रिकॉर्ड रखें',
    assignedPatientsQueue: 'उपचार हेतु आवंटित मरीज:',
    btnCompleteConsultation: 'जांच पूर्ण करें व पर्ची जारी करें',
    btnOrderLabTests: 'लैब व एक्स-रे जांच ऑर्डर करें',

    // AI Navigator
    aiNavTitle: 'AI स्वास्थ्य मार्गदर्शक (Healthcare Navigator)',
    aiNavSubtitle: 'हिंदी में बोलें या लिखें - सही स्वास्थ्य केंद्र की जानकारी पाएं',
    aiNavDisclaimer: '⚠️ चेतावनी: यह AI केवल प्राथमिक मार्गदर्शन के लिए है। यह डॉक्टर के परीक्षण या इलाज का विकल्प नहीं है। गंभीर स्थिति में तुरंत १०८ पर कॉल करें।',
    aiListening: 'आपकी आवाज सुन रहे हैं... (हिंदी में बोलें)',
    aiSpeaking: 'AI उत्तर पढ़ रहा है...',
    aiAskPlaceholder: 'उदा. "मुझे सीने में तेज दर्द है, निकटतम अस्पताल कौन सा है?"...',
    aiStartVoice: '🎙️ बोलना शुरू करें',
    aiStopVoice: '⏹️ आवाज रोकें',
    aiSuggestedPrompt1: 'मेरे सीने में दर्द है और सांस लेने में तकलीफ हो रही है',
    aiSuggestedPrompt2: 'गर्भावस्था की जांच और मुफ्त सोनोग्राफी कहाँ होगी?',
    aiSuggestedPrompt3: 'गांव में सांप ने काट लिया है, एंटी-स्नेक वेनम कहाँ मिलेगा?',
    aiSuggestedPrompt4: 'पीला/नारंगी राशन कार्ड है, मुफ्त ऑपरेशन कहाँ होगा?',
    aiRecommendedFacility: 'सिफारिश किया गया स्वास्थ्य केंद्र:',
    aiEmergencyDetected: '🚨 आपातकालीन लक्षण मिले - तुरंत सहायता लें!',
    aiUrgencyLevel: 'आपातकाल स्तर:',
    aiNormal: 'सामान्य (PHC / उप-केंद्र)',
    aiModerate: 'मध्यम (ग्रामीण अस्पताल / CHC)',
    aiCritical: 'अति-गंभीर (जिला अस्पताल / १०८ एम्बुलेंस)',

    // SOS Emergency
    sosTitle: '१०८ आपातकालीन चिकित्सा सहायता',
    sosSubtitle: 'महाराष्ट्र शासन आपातकालीन प्रतिक्रिया प्रणाली (सिमुलेशन)',
    sosDisclaimer: 'आपातकाल में एक क्लिक पर निकटतम १०८ एम्बुलेंस व ट्रॉमा सेंटर को अलर्ट भेजा जाता है।',
    sosTriggerBtn: '🚨 तुरंत १०८ SOS सक्रिय करें',
    sosActiveCall: 'आपातकालीन संदेश भेजा जा रहा है...',
    sosDispatchStatus: 'एम्बुलेंस रवाना कर दी गई है!',
    sosAmbulanceAllocated: 'आवंटित १०८ एम्बुलेंस:',
    sosEta: 'अनुमानित आगमन समय (ETA):',
    sosDriverContact: 'चालक / EMT संपर्क:',
    sosNearestTrauma: 'निकटतम आपातकालीन ट्रॉमा सेंटर:',
    sosFirstAidTitle: 'तत्काल जीवनरक्षक प्राथमिक उपचार:',
    sosFirstAidSnakebite: '🐍 सर्पदंश: मरीज को शांत रखें, डंक लगे अंग को स्थिर रखें, चीरा न लगाएं। तुरंत PHC में ASV के लिए ले जाएं।',
    sosFirstAidCpr: '❤️ दिल का दौरा/CPR: यदि मरीज बेहोश है, तो छाती के बीच में प्रति मिनट १००-१२० बार तेजी से दबाएं।',
    sosFirstAidBleeding: '🩸 गंभीर रक्तस्राव: साफ कपड़े से घाव पर सीधा और निरंतर दबाव बनाएं।',
    sosFirstAidMaternal: '🤰 प्रसव पीड़ा: मरीज को सुरक्षित रखें, तुरंत १०२/१०८ को कॉल करें।',
    sosHelplineNumbers: 'हेल्पलाइन: १०८ (एम्बुलेंस) | १०४ (स्वास्थ्य सलाह) | १०२ (मातृ-शिशु)',

    // Schemes (MJPJAY & PM-JAY)
    schemesTitle: 'महाराष्ट्र सरकारी स्वास्थ्य योजनाएं',
    schemesSubtitle: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY) एवं आयुष्मान भारत संपूर्ण मार्गदर्शिका',
    mjpjayTitle: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY २.०)',
    mjpjayDesc: 'महाराष्ट्र के सभी राशन कार्ड धारक परिवारों को प्रति वर्ष ₹५ लाख तक का पूरी तरह मुफ्त एवं कैशलेस इलाज (९९६+ प्रक्रियाएं शामिल)।',
    mjpjayCover: '₹५,००,००० प्रति परिवार/वर्ष',
    pmjayTitle: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    pmjayDesc: 'देशभर के सूचीबद्ध सरकारी व निजी अस्पतालों में ₹५ लाख तक मुफ्त उपचार।',
    eligibilityCheckerTitle: 'योजना पात्रता एवं दस्तावेज कैलकुलेटर',
    calcDesc: 'अपना राशन कार्ड चुनें और ₹५ लाख तक मुफ्त इलाज की पात्रता जांचें।',
    selectRationCard: 'अपना राशन कार्ड प्रकार चुनें:',
    rationYellow: 'पीला राशन कार्ड (BPL / अंत्योदय)',
    rationOrange: 'नारंगी (केसरी) राशन कार्ड (आय सीमा नहीं)',
    rationWhite: 'सफेद राशन कार्ड (MJPJAY २.० के तहत पात्र)',
    annualIncome: 'वार्षिक आय:',
    checkEligibilityBtn: 'पात्रता व जरूरी दस्तावेज जांचें',
    eligibleSchemes: 'आप इन योजनाओं के लिए पात्र हैं:',
    requiredDocuments: 'आवश्यक दस्तावेज:',
    availableDocs: 'उपलब्ध दस्तावेज / Available Documents:',
    docAadhaar: 'मरीज का आधार कार्ड (Aadhaar Card)',
    docIncomeCert: 'तहसीलदार आय प्रमाण पत्र',
    docRationCardNote: 'महाराष्ट्र राशन कार्ड: मूल या डिजिटल कार्ड',
    docAadhaarNote: 'आधार कार्ड: बायोमेट्रिक सत्यापन के लिए',
    docHospitalEntryNote: 'अस्पताल में "आयुष्मान मित्र" डेस्क पर सीधी निःशुल्क पंजीकरण',
    allSchemesTitle: 'महाराष्ट्र सरकारी स्वास्थ्य योजनाओं का संपूर्ण विवरण',
    keyBenefitsTitle: 'मुख्य लाभ एवं विशेषताएं:',
    schemeCoverageLimit: 'उपचार सीमा:',
    tollFreeHelpline: 'टोल-फ्री हेल्पलाइन:',
    officialPortal: 'आधिकारिक पोर्टल',
    howToGetTreatment: 'अस्पताल में मुफ्त इलाज कैसे पाएं? (Step-by-Step)',
    step1HospitalTitle: '१. अस्पताल पहुंचें',
    step1HospitalDesc: 'किसी भी MJPJAY संबद्ध सरकारी या निजी अस्पताल के मुख्य द्वार पर जाएं।',
    step2HospitalTitle: '२. आयुष्मान मित्र से मिलें',
    step2HospitalDesc: '"आयुष्मान मित्र" डेस्क पर राशन कार्ड व आधार कार्ड दिखाकर १ मिनट में मुफ्त पंजीकरण कराएं।',
    step3HospitalTitle: '३. कैशलेस उपचार व सर्जरी',
    step3HospitalDesc: 'बिना किसी अग्रिम शुल्क के मुफ्त जांच, दवाइयां व ऑपरेशन कराएं।',
    step4HospitalTitle: '४. डिस्चार्ज व मुफ्त दवाएं',
    step4HospitalDesc: 'डिस्चार्ज के समय १० दिन की मुफ्त दवाइयां मिलती हैं।',

    // Referral System
    referralNetworkKicker: 'महाराष्ट्र स्मार्ट रेफरल नेटवर्क',
    referralTitle: 'स्मार्ट डिजिटल रेफरल प्रणाली',
    referralSubtitle: 'मरीज का सफर: उप-केंद्र ➔ PHC ➔ CHC ➔ जिला अस्पताल',
    trackReferralTitle: 'रेफरल स्थिति ट्रैक करें',
    referralIdPlaceholder: 'रेफरल आईडी दर्ज करें (उदा. MH-REF-2026-8841)...',
    btnTrackReferral: 'रेफरल खोजें',
    referralJourney: 'रेफरल यात्रा चरण:',
    stepCreated: '१. रेफरल बनाया गया',
    stepAccepted: '२. अस्पताल ने स्वीकार किया',
    stepInTransit: '३. मरीज रास्ते में',
    stepCompleted: '४. उपचार पूर्ण एवं डिस्चार्ज',
    bedReservedNote: 'बेड व डॉक्टर आरक्षित',
    ambulance108Coord: '१०८ एम्बुलेंस समन्वय',
    liveGpsTracking: 'GPS ट्रैकिंग लाइव',
    specialistExamDone: 'विशेषज्ञ जांच पूर्ण',
    freeMedicineUnderMjpjay: 'MJPJAY मुफ्त दवाएं',
    referralSlipTitle: 'महाराष्ट्र डिजिटल रेफरल पर्ची',
    patientName: 'मरीज का नाम / Patient Name:',
    referralReason: 'रेफरल का कारण / लक्षण:',
    referralFrom: 'भेजने वाला स्वास्थ्य केंद्र:',
    referralTo: 'लक्ष्य अस्पताल / विभाग:',
    urgencyTier: 'आपातकाल श्रेणी:',
    btnPrintSlip: '🖨️ रेफरल पर्ची डाउनलोड / प्रिंट करें',
    ageAndGender: 'उम्र और लिंग / Age & Gender:',
    yearsOld: 'वर्ष',
    villageAndTaluka: 'गांव और तालुका / Village & Taluka:',
    abhaIdLabel: 'आभा आईडी / ABHA Number:',
    originSource: 'भेजने वाला केंद्र (Origin Source):',
    targetFacility: 'लक्ष्य अस्पताल (Target Facility):',
    provisionalDiagnosis: 'निदान एवं कारण (Provisional Diagnosis):',
    clinicalNotes: 'चिकित्सीय टिप्पणी (Clinical Notes):',
    receivingOfficer: 'स्वीकृति अधिकारी:',
    otherActiveReferrals: 'अन्य सक्रिय रेफरल',
    tableRefId: 'रेफरल आईडी',
    tablePatientName: 'मरीज का नाम',
    tableVillageDistrict: 'गांव / जिला',
    tableFrom: 'कहाँ से (From)',
    tableTo: 'कहाँ को (To)',
    tableUrgency: 'आपातकाल श्रेणी',
    tableStatus: 'स्थिति',
    tableView: 'देखें',

    // Healthcare Worker
    workerTitle: 'आशा / ANM स्वास्थ्य कार्यकर्ता पोर्टल',
    workerSubtitle: 'ग्रामीण मरीज पंजीकरण, डिजिटल रेफरल और ई-संजीवनी टेलीपरामर्श',
    tabRegisterPatient: '📝 नया मरीज पंजीकरण (ABHA)',
    tabCreateReferral: '🩺 डिजिटल रेफरल जारी करें',
    tabTeleconsult: '📹 ई-संजीवनी टेलीकन्सल्टेशन',
    tabUpdateStock: '📦 दवा व बेड स्टॉक अपडेट',
    formFullName: 'मरीज का पूरा नाम:',
    formAgeGender: 'उम्र और लिंग:',
    formVillageTaluka: 'गांव और तालुका / जिला:',
    formMobileNumber: 'मोबाइल नंबर:',
    formAbhaId: 'आभा आईडी (ABHA ID):',
    formRationCard: 'राशन कार्ड प्रकार:',
    btnRegisterPatient: 'मरीज पंजीकृत करें एवं आभा कार्ड बनाएं',
    selectSourceFacility: 'वर्तमान केंद्र (Source):',
    selectDestinationFacility: 'रेफरल लक्ष्य केंद्र (Destination):',
    vitalsBp: 'रक्तचाप (BP):',
    vitalsSpo2: 'ऑक्सीजन (SpO2 %):',
    vitalsPulse: 'पल्स रेट (Pulse):',
    btnIssueReferral: 'QR कोड सहित डिजिटल रेफरल जारी करें',
    teleconsultActiveQueue: 'प्रतीक्षारत टेलीकन्सल्टेशन मरीज:',
    btnStartTeleconsult: 'विशेषज्ञ डॉक्टर से वीडियो कॉल शुरू करें',

    // Admin Dashboard
    adminTitle: 'महाराष्ट्र शासन - स्वास्थ्य कमान केंद्र (Command Center)',
    adminSubtitle: 'सार्वजनिक स्वास्थ्य विभाग - ३६ जिलों की लाइव निगरानी एवं विश्लेषण',
    kpiTotalPatients: 'कुल लाभान्वित मरीज',
    kpiActiveReferrals: 'सक्रिय डिजिटल रेफरल',
    kpiEmergencySos: '१०८ आपातकालीन घटनाएं',
    kpiBedOccupancy: 'औसत बेड उपलब्धता',
    kpiMedicineShortage: 'महत्वपूर्ण दवा कमी अलर्ट',
    districtVulnerabilityTitle: 'जिलावार स्वास्थ्य भार एवं दुर्गम क्षेत्र सूचकांक',
    medicineShortageRadar: 'एंटी-स्नेक वेनम (ASV) एवं आवश्यक दवा रडार',
    referralBottleneckTitle: 'रेफरल बॉटलनेक व अस्पताल भार विश्लेषण',
    emergencyFeedTitle: 'लाइव १०८ आपातकालीन डिस्पैच फीड',
    exportReport: '📊 स्वास्थ्य रिपोर्ट डाउनलोड करें (CSV/PDF)',

    // Footer & Common
    footerAbout: 'सार्वजनिक स्वास्थ्य विभाग, महाराष्ट्र शासन के सहयोग से विकसित।',
    footerRights: '© २०२६ स्वास्थ्य सेतु महाराष्ट्र. सर्वाधिकार सुरक्षित।',
    emergencyHelpline108: '१०८ - मुफ्त आपातकालीन एम्बुलेंस / 24x7 Ambulance',
    healthHelpline104: '१०४ - सरकारी स्वास्थ्य सलाह हेल्पलाइन',
    close: 'बंद करें',
    confirm: 'पुष्टि करें',
    save: 'सुरक्षित करें',
    copied: 'कॉपी किया गया!',
  },

  mr: {
    // Brand & Nav
    govBrand: 'सार्वजनिक आरोग्य विभाग',
    govSubBrand: 'महाराष्ट्र शासन | आरोग्य सेतू',
    govTopTag: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन',
    sihBadge: 'सार्वजनिक आरोग्य व डिजिटल सेवा पोर्टल',
    home: 'मुख्य पृष्ठ',
    findHealthcare: 'रुग्णालये व डॉक्टर्स',
    schemes: 'शासकीय योजना (MJPJAY)',
    referrals: 'रेफरल ट्रॅकिंग',
    workerPortal: 'आशा / आरोग्य सेवक',
    adminDashboard: 'शासन डॅशबोर्ड',
    abhaLocker: 'आभा डिजिटल लॉकर',
    sosEmergency: '१०८ आपत्कालीन SOS',
    onlineMode: 'ऑनलाइन (लाइव्ह)',
    offlineMode: 'ऑफलाइन मोड',
    rolePatient: 'नागरिक / रुग्ण',
    roleWorker: 'आशा / आरोग्य कर्मचारी',
    roleAdmin: 'जिल्हा आरोग्य अधिकारी',
    switchRole: 'भूमिका बदला',

    // New Navigation Links
    navBloodBank: '🩸 रक्तपेढी (Blood Bank)',
    navGrievances: '📝 तक्रार निवारण',
    navTreatmentTracker: '🩺 उपचार ट्रॅकर',
    navDoctorPortal: '👨‍⚕️ डॉक्टर पोर्टल',
    navLoginOtp: '🔐 OTP लॉगिन',

    // Hero Section
    heroBadge: '🇮🇳 महाराष्ट्र सार्वजनिक आरोग्य सेवा व्यासपीठ',
    heroTitle1: 'प्रत्येक नागरिकासाठी दर्जेदार आरोग्य सेवा,',
    heroTitleHighlight: ' अगदी शेवटच्या गावापर्यंत.',
    heroSubtitle: 'जवळचे प्राथमिक आरोग्य केंद्र (PHC), ग्रामीण रुग्णालय (RH), उपजिल्हा व जिल्हा रुग्णालय शोधा, उपलब्ध तज्ज्ञ डॉक्टर्स व OPD वेळा तपासा, रक्तपेढी साठा तपासा आणि थेट रेफरल ट्रॅक करा.',
    btnFindFacilities: 'जवळचे रुग्णालय शोधा →',
    btnTalkAi: '🎙️ AI आरोग्य सहाय्यक',
    btnEmergencySOS: '🚨 १०८ आपत्कालीन मदत',
    featureOffline: 'ऑफलाइन कार्यक्षम',
    featureOfflineDesc: 'दुर्गम भागात इंटरनेट नसतानाही माहिती उपलब्ध',
    featureMultilingual: 'मराठी, हिंदी व इंग्रजी',
    featureMultilingualDesc: 'मराठी आवाज व संवादात्मक मार्गदर्शन',
    featureSchemes: 'MJPJAY व आयुष्यमान',
    featureSchemesDesc: '५ लाख रुपयांपर्यंत मोफत उपचार माहिती',
    featureReferral: 'डिजिटल रेफरल',
    featureReferralDesc: 'गावापासून जिल्हा रुग्णालयापर्यंत थेट ट्रॅकिंग',
    liveStatusTitle: 'महाराष्ट्र सार्वजनिक आरोग्य थेट स्थिती',
    districtsConnected: '३६ जिल्हे कनेक्टेड',
    bedsAvailableCount: '३,४२० खाटा उपलब्ध',
    ambulanceActiveCount: '१०८ रुग्णवाहिका सक्रिय',

    // Quick Services
    quickAccessTitle: 'त्वरित सुविधा',
    quickAccessSubtitle: 'तुम्हाला नेमकी कशाची आवश्यकता आहे?',
    cardHospitalsTitle: 'रुग्णालये, डॉक्टर्स व चाचण्या',
    cardHospitalsDesc: 'वेरिफाइड संपर्क, तज्ज्ञ डॉक्टरांच्या वेळा, खाटांची संख्या, चाचण्यांचे दर आणि औषध साठा.',
    cardSchemesTitle: 'महात्मा फुले जन आरोग्य (MJPJAY)',
    cardSchemesDesc: 'रेशन कार्डनुसार ५ लाख रुपयांपर्यंत मोफत उपचार पात्रता व रुग्णालय सूची.',
    cardReferralTitle: 'स्मार्ट रेफरल ट्रॅकिंग',
    cardReferralDesc: 'उप-केंद्र ➔ PHC ➔ ग्रामीण रुग्णालय ➔ जिल्हा रुग्णालय प्रवासाचे थेट अपडेट्स.',
    cardAiNavTitle: 'AI आरोग्य वाटाड्या (Navigator)',
    cardAiNavDesc: 'लक्षणांनुसार योग्य रुग्णालयाची शिफारस आणि प्राथमिक सल्ला (आवाज आधारित).',
    cardAbhaTitle: 'आभा (ABHA) हेल्थ कार्ड',
    cardAbhaDesc: 'डिजिटल प्रिस्क्रिप्शन, लसीकरण नोंद आणि चाचण्यांचे अहवाल सुरक्षित साठवा.',
    cardSosTitle: '१०८ रुग्णवाहिका SOS',
    cardSosDesc: '१-क्लिक आपत्कालीन मदत, थेट रुग्णवाहिका डिस्पॅच आणि प्रथमोपचार मार्गदर्शन.',
    btnExplore: 'शोधा →',
    btnCheck: 'पात्रता तपासा →',
    btnTrack: 'ट्रॅक करा →',
    btnOpen: 'सुरू करा →',

    // Referral Pathway on Home
    referralFlowHeading: 'रुग्णाला योग्य वेळी योग्य आरोग्य केंद्रात पोहोचवणारी डिजिटल प्रणाली',
    referralFlowDesc: 'गावातील आशा / उपकेंद्रापासून प्राथमिक आरोग्य केंद्र (PHC), ग्रामीण रुग्णालय (RH/CHC) आणि जिल्हा रुग्णालय किंवा शासकीय मेडिकल कॉलेजपर्यंत रुग्णाचा संपूर्ण प्रवास पारदर्शक व ट्रॅक करण्याजोगा.',
    refHighlight1: 'QR कोडसह अधिकृत डिजिटल रेफरल पावती',
    refHighlight2: '१०८ रुग्णवाहिका समन्वय आणि बेड आरक्षण',
    refHighlight3: 'MJPJAY ५ लाख कॅशलेस मोफत उपचारांची हमी',
    btnTrackFlow: 'थेट रेफरल ट्रॅक करा →',
    flowStep1Title: '१. गाव / उप-केंद्र (Village Health Worker)',
    flowStep1Desc: 'आशा कार्यकर्ती / ANM द्वारे रुग्ण तपासणी व डिजिटल नोंदणी (ABHA)',
    flowStep2Title: '२. प्राथमिक आरोग्य केंद्र (PHC)',
    flowStep2Desc: 'वैद्यकीय अधिकाऱ्यांमार्फत प्राथमिक तपासणी, औषधे व रेफरल निर्णय',
    flowStep3Title: '३. ग्रामीण रुग्णालय / CHC (First Referral Unit)',
    flowStep3Desc: 'तज्ज्ञ डॉक्टर, सोनोग्राफी, रक्त तपासणी व प्रसूती शस्त्रक्रिया',
    flowStep4Title: '४. जिल्हा रुग्णालय / शासकीय मेडिकल कॉलेज (GMC)',
    flowStep4Desc: 'अतिविशेषोपचार, आयसीयू (ICU), कॅथ लॅब व MJPJAY मोफत शस्त्रक्रिया',
    offlineStripTitle: 'दुर्गम व ग्रामीण महाराष्ट्रासाठी विशेष "ऑफलाइन-फर्स्ट" रचना',
    offlineStripDesc: 'इंटरनेट कनेक्टिव्हिटी कमी किंवा नसतानाही सर्व आरोग्य केंद्रांचे पत्ते, आपत्कालीन फोन नंबर, प्रथमोपचार माहिती उपलब्ध राहते.',
    offlineReadyTag: 'Offline Ready',

    // Facility Finder
    finderTitle: 'महाराष्ट्र आरोग्य सुविधा व डॉक्टर शोधक',
    finderSubtitle: 'शासकीय पडताळणी झालेले प्राथमिक आरोग्य केंद्र, CHC, उप-जिल्हा व जिल्हा रुग्णालये शोधा.',
    searchPlaceholder: 'रुग्णालय, डॉक्टर, आजार, तालुका किंवा औषध शोधा...',
    allDistricts: 'सर्व जिल्हे (३६ जिल्हे)',
    selectDistrict: 'जिल्हा निवडा',
    allFacilityTypes: 'सर्व सुविधा प्रकार',
    filterVerifiedOnly: '🟢 फक्त शासकीय पडताळणी झालेले',
    filterAyushmanOnly: '💳 MJPJAY / आयुष्यमान लागू',
    filterEmergencyOnly: '🚑 २४/७ आपत्कालीन सेवा',
    filterMedicineAvailable: '💊 औषध साठा उपलब्ध',
    filterAsvAvailable: '🐍 अँटी-स्नेक व्हेनम (ASV) उपलब्ध',
    facilitiesFound: 'आरोग्य केंद्रे उपलब्ध',
    noFacilitiesFound: 'कोणतेही आरोग्य केंद्र सापडले नाही',
    noFacilitiesSub: 'कृपया सर्च शब्द किंवा फिल्टर्स बदलून पुन्हा तपासा.',
    badgeGovtVerified: 'शासकीय पडताळणीकृत',
    badgeUpdated: 'नुकतेच अद्ययावत',
    badgeRequiresVerification: 'पडताळणी प्रलंबित',
    badgeMjpjay: 'MJPJAY ५ लाख मोफत',
    badgeAyushman: 'आयुष्यमान भारत (PM-JAY)',
    badgeEmergency247: '२४x७ आपत्कालीन / ट्रॉमा',
    bedsAvailable: 'उपलब्ध खाटा',
    icuBeds: 'ICU खाटा',
    generalBeds: 'सर्वसाधारण खाटा',
    oxygenBeds: 'ऑक्सिजन खाटा',
    maternityBeds: 'प्रसूती खाटा',
    medicineStockStatus: 'महत्त्वाचा औषध साठा (लाइव्ह)',
    inStock: 'साठा उपलब्ध',
    lowStock: 'मर्यादित साठा',
    outOfStock: 'साठा संपला',
    btnContact: '📞 थेट संपर्क करा',
    btnDirections: '🧭 गूगल नकाशा',
    btnCreateReferral: '🩺 रेफरल तयार करा',
    btnBookOpd: '🎫 OPD टोकन घ्या',
    ayushmanMitraDesk: 'आयुष्मान मित्र कक्ष',
    addressLabel: 'पत्ता:',
    distanceLabel: 'अंतर:',

    // Facility Tabs
    tabDoctors: '👨‍⚕️ उपलब्ध तज्ज्ञ डॉक्टर्स',
    tabCharges: '💰 रुग्णालय दर व शुल्क',
    tabLabs: '🔬 प्रयोगशाळा व तपासण्या',
    tabDirector: '🏛️ रुग्णालय प्रशासन व तक्रार निवारण',
    specializationLabel: 'वैद्यकीय विशेषज्ज्ञता:',
    conditionsTreatedLabel: 'उपचार विषयक कौशल्य:',
    opdScheduleLabel: 'OPD दिवस व वेळ:',
    experienceLabel: 'अनुभव:',
    feeLabel: 'तपासणी शुल्क:',
    qualificationsLabel: 'शिक्षण व नोंदणी:',
    generalBedCharge: 'जनरल वॉर्ड खाट दर:',
    icuBedCharge: 'ICU / अतिदक्षता खाट दर:',
    oxygenCharge: 'ऑक्सिजन पुरवठा:',
    opdTokenCharge: 'OPD केसपेपर नोंदणी:',
    ambulanceCharge: '१०८ आपत्कालीन रुग्णवाहिका:',
    labTestCatalog: 'उपलब्ध रक्त व इतर तपासण्या:',
    testTurnaround: 'अहवाल मिळण्याचा वेळ:',
    labOpenStatus: 'सद्यस्थिती:',
    directorTitle: 'वैद्यकीय अधीक्षक / डीन:',
    grievanceCellTitle: 'तक्रार निवारण कक्ष:',

    // Grievances
    grievanceTitle: 'रुग्ण तक्रार निवारण व स्वयंचलित एस्केलेशन',
    grievanceSubtitle: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन — पारदर्शक तक्रार निवारण व ४-स्तरीय थेट पाठपुरावा',
    btnSubmitGrievance: 'नवीन तक्रार नोंदवा',
    trackGrievanceTitle: 'तक्रार स्थिती तपासा',
    grievanceIdPlaceholder: 'तक्रार संदर्भ क्रमांक टाका (उदा. MH-GRV-2026-1049)...',
    grievanceCategory: 'तक्रारीचे स्वरूप / प्रवर्ग:',
    grievanceDescription: 'तक्रारीचा सविस्तर तपशील:',
    grievanceSubmittedSuccess: 'तक्रार यशस्वीरीत्या नोंदवली गेली!',
    grievanceEscalationTimeline: '४-स्तरीय स्वयंचलित एस्केलेशन टप्पे:',
    level1Hospital: 'स्तर १: रुग्णालय तक्रार कक्ष (४८ तास मुदत)',
    level2DHO: 'स्तर २: जिल्हा आरोग्य अधिकारी (५ दिवसांत एस्केलेट)',
    level3Commissioner: 'स्तर ३: राज्य आरोग्य आयुक्त (१० दिवसांत शीर्ष स्तर)',
    grievanceResolvedBadge: 'तक्रार निवारण पूर्ण (ATR)',
    grievanceReviewBadge: 'चौकशी सुरू',
    grievanceEscalatedBadge: 'DHO कडे पाठवले',
    complaintHelpline: 'तक्रार टोल-फ्री हेल्पलाइन: १०४ / १८०० १२३ २२११',
    complaintEmail: 'तक्रार ईमेल: grievance.health@maharashtra.gov.in',

    // Blood Bank
    bloodBankTitle: 'महाराष्ट्र e-RaktKosh रक्तपेढी शोधक',
    bloodBankSubtitle: '३६ जिल्ह्यांमधील रक्तगट व घटक (PRBC, FFP, Platelets) लाइव्ह उपलब्धता',
    selectBloodGroup: 'आवश्यक रक्तगट निवडा:',
    unitsAvailableLabel: 'उपलब्ध युनिट्स:',
    componentsAvailableLabel: 'उपलब्ध रक्त घटक:',
    bloodBankContact: '२४x७ रक्तपेढी संपर्क:',

    // OPD Token
    opdTokenTitle: 'स्मार्ट OPD टोकन व लाइव्ह रांग प्रणाली',
    opdTokenSubtitle: 'शासकीय रुग्णालयात गर्दी टाळा — घरबसल्या OPD टोकन मिळवा',
    nowServingToken: 'सध्या सुरू असलेला टोकन:',
    yourTokenNumber: 'तुमचा टोकन क्रमांक:',
    estimatedWaitTime: 'अपेक्षित प्रतीक्षा वेळ:',
    btnDownloadToken: 'डिजिटल टोकन पावती डाउनलोड करा',

    // 9-Stage Treatment Tracking
    treatmentTrackerTitle: 'रुग्ण उपचार प्रवास ट्रॅकर ("इलाज झाला की नाही")',
    treatmentTrackerSubtitle: 'आशा रेफरलपासून रुग्णालयातील शस्त्रक्रिया, डिस्चार्ज व १० दिवसांच्या मोफत औषधांपर्यंतचा थेट प्रवास',
    currentStageStatus: 'सद्य उपचार टप्पा:',
    treatmentCompletedCelebration: 'उपचार यशस्वीरीत्या पूर्ण झाले — MJPJAY २.० अंतर्गत मोफत',

    // Doctor Portal
    doctorPortalTitle: 'शासकीय डॉक्टर क्लीनिकल पोर्टल',
    doctorPortalSubtitle: 'अधिकृत वैद्यकीय अधिकारी डॅशबोर्ड — रुग्ण तपासणी, लॅब ऑर्डर्स व उपचारांची नोंद',
    assignedPatientsQueue: 'उपचारासाठी आलेले रुग्ण:',
    btnCompleteConsultation: 'तपासणी पूर्ण करा व प्रिस्क्रिप्शन द्या',
    btnOrderLabTests: 'लॅब व एक्स-रे चाचण्या सांगा',

    // AI Navigator
    aiNavTitle: 'AI आरोग्य वाटाड्या (Healthcare Navigator)',
    aiNavSubtitle: 'मराठीत बोला किंवा टाईप करा - योग्य आरोग्य केंद्राची माहिती मिळवा',
    aiNavDisclaimer: '⚠️ सूचना: हा AI सहाय्यक केवळ प्राथमिक मार्गदर्शनासाठी आहे. हा डॉक्टरांच्या तपासणीचा पर्याय नाही. गंभीर स्थितीत त्वरित १०८ वर संपर्क करा.',
    aiListening: 'तुमचा आवाज ऐकत आहे... (मराठीत बोला)',
    aiSpeaking: 'AI उत्तर वाचत आहे...',
    aiAskPlaceholder: 'उदा. "मला ३ दिवसांपासून ताप व खोकला आहे, जवळचे केंद्र कोणते?"...',
    aiStartVoice: '🎙️ बोलायला सुरुवात करा',
    aiStopVoice: '⏹️ आवाज थांबवा',
    aiSuggestedPrompt1: 'माझ्या छातीत दुखत आहे आणि श्वास घेण्यास त्रास होतोय',
    aiSuggestedPrompt2: 'गरोदरपणातील तपासणी व मोफत सोनोग्राफी कोठे होईल?',
    aiSuggestedPrompt3: 'गावात सर्पदंश झाला आहे, अँटी-स्नेक व्हेनम (ASV) कुठे मिळेल?',
    aiSuggestedPrompt4: 'पिवळे/केशरी रेशन कार्ड आहे, मोफत शस्त्रक्रिया कुठे होईल?',
    aiRecommendedFacility: 'शिफारस केलेले आरोग्य केंद्र:',
    aiEmergencyDetected: '🚨 आपत्कालीन लक्षणे आढळली - त्वरित मदत घ्या!',
    aiUrgencyLevel: 'तातडीची पातळी:',
    aiNormal: 'सामान्य (PHC / उपकेंद्र)',
    aiModerate: 'मध्यम (ग्रामीण रुग्णालय / CHC)',
    aiCritical: 'अति-तातडीचे (जिल्हा रुग्णालय / १०८ रुग्णवाहिका)',

    // SOS Emergency
    sosTitle: '१०८ आपत्कालीन वैद्यकीय साहाय्य',
    sosSubtitle: 'महाराष्ट्र शासन आपत्कालीन प्रतिसाद प्रणाली (सिम्युलेशन)',
    sosDisclaimer: 'आपत्कालीन प्रसंगी एका क्लिकवर जवळच्या १०८ रुग्णवाहिकेला व ट्रॉमा सेंटरला माहिती पाठवली जाते.',
    sosTriggerBtn: '🚨 त्वरित १०८ SOS सक्रिय करा',
    sosActiveCall: 'आपत्कालीन संदेश पाठवला जात आहे...',
    sosDispatchStatus: 'रुग्णवाहिका रवाना झाली आहे!',
    sosAmbulanceAllocated: 'नियुक्त १०८ रुग्णवाहिका:',
    sosEta: 'अपेक्षित आगमन वेळ (ETA):',
    sosDriverContact: 'चालक / EMT संपर्क:',
    sosNearestTrauma: 'जवळचे आपत्कालीन ट्रॉमा केंद्र:',
    sosFirstAidTitle: 'तातडीचे जीवनरक्षक प्रथमोपचार:',
    sosFirstAidSnakebite: '🐍 सर्पदंश: रुग्णाला शांत ठेवा, दंश झालेला भाग स्थिर ठेवा, चीर मारू नका किंवा चोखू नका. त्वरित PHC मध्ये ASV साठी न्या.',
    sosFirstAidCpr: '❤️ हृदयविकाराचा झटका/CPR: रुग्ण प्रतिसाद देत नसल्यास छातीच्या मध्यभागी दर मिनिटाला १००-१२० वेळा जोरात दाबा.',
    sosFirstAidBleeding: '🩸 अतिरक्तस्राव: स्वच्छ कापडाने जखमेवर थेट व सतत दाब द्या.',
    sosFirstAidMaternal: '🤰 प्रसूती कळा: रुग्णाला आरामदायक ठेवा, त्वरित १०२/१०८ ला पाचारण करा.',
    sosHelplineNumbers: 'हेल्पलाइन: १०८ (रुग्णवाहिका) | १०४ (आरोग्य सल्ला) | १०२ (मातृ-शिशू)',

    // Schemes (MJPJAY & PM-JAY)
    schemesTitle: 'महाराष्ट्र शासकीय आरोग्य योजना',
    schemesSubtitle: 'महात्मा जोतीराव फुले जन आरोग्य योजना (MJPJAY) व आयुष्यमान भारत संपूर्ण माहिती',
    mjpjayTitle: 'महात्मा जोतीराव फुले जन आरोग्य योजना (MJPJAY २.०)',
    mjpjayDesc: 'महाराष्ट्रातील सर्व रेशन कार्डधारक कुटुंबांना दरवर्षी ५ लाख रुपयांपर्यंत पूर्णतः मोफत व कॅशलेस उपचार (९९६+ शस्त्रक्रिया व आजार समाविष्ट).',
    mjpjayCover: '₹५,००,००० प्रति कुटुंब/वर्ष',
    pmjayTitle: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    pmjayDesc: 'देशभरातील सूचीबद्ध शासकीय व खाजगी रुग्णालयांमध्ये ५ लाख रुपयांपर्यंत मोफत उपचार.',
    eligibilityCheckerTitle: 'योजना पात्रता व कागदपत्रे कॅल्क्युलेटर',
    calcDesc: 'तुमचे रेशन कार्ड निवडा आणि ५ लाख रुपयांपर्यंत मोफत उपचारांची पात्रता तपासा.',
    selectRationCard: 'तुमचे रेशन कार्ड निवडा:',
    rationYellow: 'पिवळे रेशन कार्ड (BPL / अंत्योदय)',
    rationOrange: 'केशरी रेशन कार्ड (वार्षिक उत्पन्न मर्यादा नाही)',
    rationWhite: 'पांढरे रेशन कार्ड (MJPJAY २.० अंतर्गत पात्र)',
    annualIncome: 'वार्षिक उत्पन्न:',
    checkEligibilityBtn: 'पात्रता व आवश्यक कागदपत्रे तपासा',
    eligibleSchemes: 'तुम्ही पात्र असलेल्या योजना:',
    requiredDocuments: 'आवश्यक कागदपत्रे:',
    availableDocs: 'उपलब्ध कागदपत्रे / Available Documents:',
    docAadhaar: 'रुग्णाचे आधार कार्ड (Aadhaar Card)',
    docIncomeCert: 'तहसीलदार उत्पन्न दाखला (उत्पन्न प्रमाणपत्र)',
    docRationCardNote: 'महाराष्ट्र रेशन कार्ड: मूळ प्रत किंवा डिजिटल स्मार्ट रेशन कार्ड',
    docAadhaarNote: 'आधार कार्ड: रुग्णाचे बायोमेट्रिक पडताळणीसाठी',
    docHospitalEntryNote: 'रुग्णालय प्रवेश: रुग्णालयातील "आयुष्मान मित्र" कक्षात थेट नोंदणी',
    allSchemesTitle: 'महाराष्ट्र शासकीय आरोग्य योजनांची संपूर्ण माहिती',
    keyBenefitsTitle: 'प्रमुख फायदे व वैशिष्ट्ये:',
    schemeCoverageLimit: 'उपचार मर्यादा:',
    tollFreeHelpline: 'टोल-फ्री हेल्पलाइन:',
    officialPortal: 'अधिकृत पोर्टल',
    howToGetTreatment: 'रुग्णालयात मोफत उपचार कसे मिळवावेत? (Step-by-Step)',
    step1HospitalTitle: '१. रुग्णालयात पोहोचा',
    step1HospitalDesc: 'कोणत्याही MJPJAY संलग्न शासकीय किंवा खाजगी रुग्णालयाच्या प्रवेशद्वारावर जा.',
    step2HospitalTitle: '२. आयुष्मान मित्राला भेटा',
    step2HospitalDesc: '"आयुष्मान मित्र" कक्षात रेशन कार्ड व आधार कार्ड सादर करा. १ मिनिटात मोफत नोंदणी होईल.',
    step3HospitalTitle: '३. कॅशलेस उपचार व शस्त्रक्रिया',
    step3HospitalDesc: 'कोणतीही अनामत रक्कम न भरता मोफत तपासणी, औषधे व शस्त्रक्रिया पूर्ण करा.',
    step4HospitalTitle: '४. डिस्चार्ज व मोफत औषधे',
    step4HospitalDesc: 'डिस्चार्जच्या वेळी १० दिवसांची मोफत औषधे मिळतात आणि एकही रुपया भरावा लागत नाही.',

    // Referral System
    referralNetworkKicker: 'महाराष्ट्र स्मार्ट रेफरल नेटवर्क',
    referralTitle: 'स्मार्ट डिजिटल रेफरल प्रणाली',
    referralSubtitle: 'रुग्ण प्रवास: गाव उप-केंद्र ➔ PHC ➔ ग्रामीण रुग्णालय ➔ जिल्हा रुग्णालय',
    trackReferralTitle: 'रेफरल स्थिती तपासा',
    referralIdPlaceholder: 'रेफरल आयडी टाका (उदा. MH-REF-2026-8841)...',
    btnTrackReferral: 'रेफरल शोधा',
    referralJourney: 'रेफरल प्रवास टप्पे:',
    stepCreated: '१. रेफरल तयार',
    stepAccepted: '२. रुग्णालयाने स्वीकारले',
    stepInTransit: '३. रुग्ण प्रवासात',
    stepCompleted: '४. उपचार पूर्ण व डिस्चार्ज',
    bedReservedNote: 'खाट व डॉक्टर आरक्षित',
    ambulance108Coord: '१०८ रुग्णवाहिका समन्वय',
    liveGpsTracking: 'GPS ट्रॅकिंग लाइव्ह',
    specialistExamDone: 'विशेषज्ञ तपासणी पूर्ण',
    freeMedicineUnderMjpjay: 'MJPJAY मोफत औषधे',
    referralSlipTitle: 'महाराष्ट्र डिजिटल रेफरल पावती',
    patientName: 'रुग्णाचे नाव / Patient Name:',
    referralReason: 'रेफरलचे कारण / निदान:',
    referralFrom: 'पाठवणारे केंद्र:',
    referralTo: 'लक्ष्य रुग्णालय / विभाग:',
    urgencyTier: 'तातडीचे स्वरूप:',
    btnPrintSlip: '🖨️ रेफरल पावती डाउनलोड / प्रिंट करा',
    ageAndGender: 'वय व लिंग / Age & Gender:',
    yearsOld: 'वर्षे',
    villageAndTaluka: 'गाव व तालुका / Village & Taluka:',
    abhaIdLabel: 'आभा आयडी / ABHA Number:',
    originSource: 'पाठवणारे केंद्र (Origin Source):',
    targetFacility: 'लक्ष्य रुग्णालय (Target Facility):',
    provisionalDiagnosis: 'निदान व रेफरलचे कारण (Provisional Diagnosis):',
    clinicalNotes: 'नोंद व सूचना (Clinical Notes):',
    receivingOfficer: 'स्वीकृती अधिकारी:',
    otherActiveReferrals: 'इतर सक्रिय रेफरल्स',
    tableRefId: 'रेफरल आयडी',
    tablePatientName: 'रुग्णाचे नाव',
    tableVillageDistrict: 'गाव / जिल्हा',
    tableFrom: 'कुठून (From)',
    tableTo: 'कुठे (To)',
    tableUrgency: 'तातडीचे स्वरूप',
    tableStatus: 'स्थिती',
    tableView: 'पहा',

    // Healthcare Worker
    workerTitle: 'आशा / आरोग्य सेवक (ASHA / ANM) कार्यक्षेत्र',
    workerSubtitle: 'ग्रामीण रुग्ण नोंदणी, डिजिटल रेफरल आणि ई-संजीवनी टेलीकन्सल्टेशन',
    tabRegisterPatient: '📝 नवीन रुग्ण नोंदणी (ABHA)',
    tabCreateReferral: '🩺 डिजिटल रेफरल तयार करा',
    tabTeleconsult: '📹 ई-संजीवनी टेलीकन्सल्टेशन',
    tabUpdateStock: '📦 औषध व खाटा साठा अपडेट',
    formFullName: 'रुग्णाचे पूर्ण नाव:',
    formAgeGender: 'वय आणि लिंग:',
    formVillageTaluka: 'गाव आणि तालुका / जिल्हा:',
    formMobileNumber: 'मोबाईल नंबर:',
    formAbhaId: 'आभा आयडी (ABHA ID):',
    formRationCard: 'रेशन कार्ड प्रकार:',
    btnRegisterPatient: 'रुग्ण नोंदणी करा व आभा कार्ड बनवा',
    selectSourceFacility: 'सध्याचे केंद्र (Source):',
    selectDestinationFacility: 'रेफरलचे लक्ष्य केंद्र (Destination):',
    vitalsBp: 'रक्तदाब (BP):',
    vitalsSpo2: 'ऑक्सिजन (SpO2 %):',
    vitalsPulse: 'नाडीचे ठोके (Pulse):',
    btnIssueReferral: 'QR कोडसह डिजिटल रेफरल जारी करा',
    teleconsultActiveQueue: 'प्रतीक्षा यादीतील टेलीकन्सल्टेशन रुग्ण:',
    btnStartTeleconsult: 'विशेषज्ञ डॉक्टरांशी कॉल सुरू करा',

    // Admin Dashboard
    adminTitle: 'महाराष्ट्र शासन - आरोग्य नियंत्रण कक्ष (Command Center)',
    adminSubtitle: 'सार्वजनिक आरोग्य विभाग - ३६ जिल्ह्यांचे थेट विश्लेषण व नियंत्रण',
    kpiTotalPatients: 'एकूण लाभ घेतलेले रुग्ण',
    kpiActiveReferrals: 'सक्रिय डिजिटल रेफरल्स',
    kpiEmergencySos: '१०८ आपत्कालीन विनंत्या',
    kpiBedOccupancy: 'सरासरी खाटांची उपलब्धता',
    kpiMedicineShortage: 'महत्त्वाचा औषध तुटवडा अलर्ट',
    districtVulnerabilityTitle: 'जिल्हावार आरोग्य भार व दुर्गम क्षेत्र निर्देशांक',
    medicineShortageRadar: 'अँटी-स्नेक व्हेनम (ASV) व अत्यावश्यक औषध रडार',
    referralBottleneckTitle: 'रेफरल बॉटलनेक व गर्दी विश्लेषण (GMC vs RH)',
    emergencyFeedTitle: 'थेट १०८ आपत्कालीन डिस्पैच फीड',
    exportReport: '📊 आरोग्य अहवाल डाउनलोड करा (CSV/PDF)',

    // Footer & Common
    footerAbout: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन यांच्या संयुक्त विद्यमाने विकसित.',
    footerRights: '© २०२६ आरोग्य सेतू महाराष्ट्र. सर्व हक्क सुरक्षित.',
    emergencyHelpline108: '१०८ - मोफत आपत्कालीन रुग्णवाहिका / 24x7 Ambulance',
    healthHelpline104: '१०४ - महाराष्ट्र शासकीय आरोग्य सल्ला हेल्पलाइन',
    close: 'बंद करा',
    confirm: 'पुष्टी करा',
    save: 'जतन करा',
    copied: 'कॉपी झाले!',
  },
};