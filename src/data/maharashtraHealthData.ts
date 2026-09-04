export type FacilityType =
  | 'Sub-Centre'
  | 'PHC'
  | 'CHC'
  | 'Sub-District Hospital'
  | 'District Hospital'
  | 'Govt Medical College'
  | 'Trust/Empanelled Hospital';

export type VerificationStatus = 'verified' | 'updated' | 'pending';
export type StockLevel = 'in_stock' | 'low' | 'out_of_stock';
export type ReferralStatus = 'created' | 'accepted' | 'in_transit' | 'completed';
export type UrgencyTier = 'routine' | 'urgent' | 'emergency';

// 1. DOCTOR INFORMATION
export interface DoctorInfo {
  id: string;
  name: string;
  marathiName: string;
  specialization: string;
  designation: string; // e.g., "Senior Medical Officer", "Civil Surgeon", "HOD Cardiology"
  isGovernment: boolean;
  conditionsSpecialized: string[]; // Diseases / conditions specialized in
  opdDays: string; // e.g., "Mon, Wed, Fri" or "Daily (Mon-Sat)"
  opdTimings: string; // e.g., "9:00 AM - 1:00 PM"
  experienceYears: number;
  consultationFee: string; // "₹0 (Free / MJPJAY)" or "₹10 Govt Token"
  qualifications: string;
  regNumber: string;
  status: 'available' | 'in_ot' | 'on_call' | 'on_leave';
}

// 2. HOSPITAL CHARGES
export interface HospitalCharges {
  generalBedDaily: string;
  icuBedDaily: string;
  oxygenCharges: string;
  opdRegistrationFee: string;
  emergencyAmbulance: string;
  mjpjayCashlessNote: string;
}

// 3. LABORATORY & DIAGNOSTICS
export interface LabTestItem {
  name: string;
  category: 'Pathology' | 'Biochemistry' | 'Radiology' | 'Specialized';
  price: string; // "₹0 (MJPJAY / Free Govt)" or "₹50 (Subsidized)"
  reportTurnaround: string; // "Same Day / 2 Hours"
  isAvailable: boolean;
}

export interface LaboratoryInfo {
  id: string;
  name: string;
  timing: string;
  isOpen247: boolean;
  tests: LabTestItem[];
}

// 4. HOSPITAL DIRECTOR / SUPERINTENDENT
export interface HospitalDirector {
  name: string;
  designation: string; // "Dean & Professor", "Medical Superintendent", "Civil Surgeon"
  officialPhone: string;
  officialEmail: string;
  officeLocation: string;
  grievanceOfficeLocation: string;
}

// MEDICINE INVENTORY ITEM
export interface MedicineItem {
  name: string;
  marathiName: string;
  category: string;
  status: StockLevel;
  quantityNote: string;
}

// BED AVAILABILITY
export interface BedAvailability {
  generalTotal: number;
  generalAvailable: number;
  icuTotal: number;
  icuAvailable: number;
  oxygenTotal: number;
  oxygenAvailable: number;
  maternityTotal: number;
  maternityAvailable: number;
}

// AYUSHMAN MITRA OFFICER
export interface AyushmanMitra {
  name: string;
  phone: string;
  deskLocation: string;
}

// COMPLETE HEALTHCARE FACILITY
export interface HealthcareFacility {
  id: string;
  name: string;
  marathiName: string;
  hindiName: string;
  type: FacilityType;
  district: string;
  taluka: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  status: string; // "Open 24/7", "Open 8 AM - 8 PM"
  verifiedStatus: VerificationStatus;
  lastVerifiedDate: string;
  phone: string;
  emergencyPhone: string;
  mjpjayEmpanelled: boolean;
  ayushmanEmpanelled: boolean;
  emergencyAvailable: boolean;
  specialties: string[];
  diagnostics: string[];
  beds: BedAvailability;
  medicines: MedicineItem[];
  ayushmanMitra?: AyushmanMitra;
  opdTiming: string;
  doctors: DoctorInfo[];
  charges: HospitalCharges;
  laboratories: LaboratoryInfo[];
  director: HospitalDirector;
}

// 5. BLOOD BANK & COMPONENTS
export interface BloodGroupStock {
  units: number;
  status: 'Available' | 'Low' | 'Critical';
}

export interface BloodBank {
  id: string;
  name: string;
  district: string;
  taluka: string;
  address: string;
  contactNumber: string;
  timing: string;
  isGovt: boolean;
  stocks: {
    'A+': BloodGroupStock;
    'A-': BloodGroupStock;
    'B+': BloodGroupStock;
    'B-': BloodGroupStock;
    'AB+': BloodGroupStock;
    'AB-': BloodGroupStock;
    'O+': BloodGroupStock;
    'O-': BloodGroupStock;
  };
  componentsAvailable: string[];
}

// 6. PATIENT GRIEVANCE & 4-LEVEL AUTO-ESCALATION
export type GrievanceCategory =
  | 'Staff Behavior'
  | 'Medicine Stockout'
  | 'MJPJAY Scheme Denied'
  | 'Overcharging / Bribe'
  | 'Ambulance Delay'
  | 'Sanitation & Hygiene'
  | 'Doctor Absenteeism';

export type GrievanceStatus =
  | 'submitted'
  | 'under_review'
  | 'escalated_dho'
  | 'escalated_commissioner'
  | 'resolved';

export interface GrievanceAuditTrail {
  timestamp: string;
  level: string;
  action: string;
  actor: string;
  comment?: string;
}

export interface Grievance {
  id: string; // e.g. "MH-GRV-2026-8812"
  patientName: string;
  patientMobile: string;
  facilityId: string;
  facilityName: string;
  district: string;
  category: GrievanceCategory;
  description: string;
  photoUrl?: string; // Base64 data URL or photo preview URL (Optional evidence)
  photoName?: string;
  submittedAt: string;
  status: GrievanceStatus;
  currentLevel: string;
  resolutionNote?: string;
  escalationDaysRemaining: number;
  auditTrail: GrievanceAuditTrail[];
}

// 7. OPD TOKEN & QUEUE
export interface OPDToken {
  id: string; // e.g. "TOK-SGH-027"
  tokenNumber: number;
  patientName: string;
  patientMobile: string;
  facilityId: string;
  facilityName: string;
  department: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  currentServingToken: number;
  estimatedWaitMinutes: number;
  status: 'waiting' | 'in_consultation' | 'completed' | 'cancelled';
  createdAt: string;
}

// 8. 9-STAGE PATIENT TREATMENT JOURNEY TRACKING
export interface TreatmentStageItem {
  stageNumber: number;
  title: string;
  marathiTitle: string;
  location: string;
  completedAt?: string;
  status: 'completed' | 'active' | 'pending';
  actor: string;
  notes: string;
}

export interface PatientTreatmentJourney {
  referralId: string; // e.g. "MH-REF-2026-8841"
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientMobile: string;
  village: string;
  district: string;
  abhaId: string;
  provisionalDiagnosis: string;
  currentStageIndex: number;
  stages: TreatmentStageItem[];
}

// HEALTH SCHEME
export interface HealthScheme {
  id: string;
  code: string;
  name: string;
  marathiName: string;
  hindiName: string;
  coverageAmount: string;
  eligibleRationCards: ('yellow' | 'orange' | 'white')[];
  summary: string;
  marathiSummary: string;
  coveredCount: string;
  targetBeneficiary: string;
  keyBenefits: string[];
  requiredDocs: string[];
  helpline: string;
  portalUrl: string;
}

// DIGITAL REFERRAL
export interface DigitalReferral {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientMobile: string;
  village: string;
  taluka: string;
  district: string;
  abhaId?: string;
  sourceFacilityId: string;
  sourceFacilityName: string;
  destinationFacilityId: string;
  destinationFacilityName: string;
  referralReason: string;
  urgency: UrgencyTier;
  createdAt: string;
  status: ReferralStatus;
  vitals: {
    bp: string;
    spo2: string;
    pulse: string;
    temp?: string;
  };
  assignedDoctor?: string;
  notes?: string;
}

// DISTRICT HEALTH METRICS (FOR DHO & COLLECTOR)
export interface DistrictHealthMetric {
  districtName: string;
  region: 'Vidarbha' | 'Marathwada' | 'Western Maharashtra' | 'Konkan' | 'North Maharashtra';
  totalFacilities: number;
  vulnerabilityIndex: 'High (Tribal/Rural)' | 'Moderate' | 'Low (Urban)';
  activeReferrals: number;
  bedOccupancyRate: number;
  asvStockStatus: 'Normal' | 'Critical Shortage' | 'Adequate';
  emergency108Calls24h: number;
  icuBedsAvailable: number;
  pendingGrievances: number;
}

// -------------------------------------------------------------
// VERIFIED MAHARASHTRA HEALTHCARE FACILITIES DATASET
// -------------------------------------------------------------
export const MAHARASHTRA_FACILITIES: HealthcareFacility[] = [
  {
    id: 'fac-gad-01',
    name: 'Sub-District Hospital (SDH) Aheri',
    marathiName: 'उपजिल्हा रुग्णालय अहेरी',
    hindiName: 'उप-जिला अस्पताल अहेरी',
    type: 'Sub-District Hospital',
    district: 'Gadchiroli',
    taluka: 'Aheri',
    address: 'Allapalli Road, Near Bus Stand, Aheri, Gadchiroli - 442705',
    coordinates: { lat: 19.4147, lng: 79.9912 },
    distance: '3.2 km from village center',
    status: 'Open 24/7 (Emergency & Snakebite Care)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '31 Aug 2026',
    phone: '07133-272224',
    emergencyPhone: '108 / 07133-272108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Emergency Trauma Care',
      'Maternity & C-Section (FRU)',
      'Malaria & Dengue Intensive Unit',
      'Blood Storage Unit (BSU)',
    ],
    diagnostics: ['20-min Whole Blood Clotting Test (20WBCT)', 'Digital X-Ray', 'Ultrasound USG', 'Central Pathology'],
    beds: {
      generalTotal: 100,
      generalAvailable: 24,
      icuTotal: 8,
      icuAvailable: 3,
      oxygenTotal: 40,
      oxygenAvailable: 12,
      maternityTotal: 25,
      maternityAvailable: 7,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Emergency Antivenom',
        status: 'in_stock',
        quantityNote: '68 Vials Available (24x7 Ready)',
      },
      {
        name: 'Rabies Immunoglobulin & Vaccine',
        marathiName: 'रेबीज प्रतिबंधक लस',
        category: 'Vaccine',
        status: 'in_stock',
        quantityNote: '45 Doses Available',
      },
      {
        name: 'Artesunate & ACT Injection (Malaria)',
        marathiName: 'मलेरिया इंजेक्शन',
        category: 'Antimalarial',
        status: 'in_stock',
        quantityNote: '120 Ampoules',
      },
      {
        name: 'Oral Rehydration Salts (ORS)',
        marathiName: 'ओआरएस पाकीट',
        category: 'Essential',
        status: 'in_stock',
        quantityNote: '450 Packets',
      },
    ],
    ayushmanMitra: {
      name: 'Rameshwar Atram',
      phone: '94218-88321',
      deskLocation: 'OPD Counter No. 1 (Ground Floor)',
    },
    opdTiming: 'Mon-Sat: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-gad-01',
        name: 'Dr. Pravin Gedam',
        marathiName: 'डॉ. प्रवीण गेडाम',
        specialization: 'General Medicine & Toxic Envenomation',
        designation: 'Senior Medical Officer (Civil Surgeon In-charge)',
        isGovernment: true,
        conditionsSpecialized: ['Snakebite Poisoning (Krait/Viper)', 'Severe Cerebral Malaria', 'Acute Respiratory Infections'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 11,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (General Medicine) - MMC Reg: 2015/06/1842',
        regNumber: 'MMC-2015/06/1842',
        status: 'available',
      },
      {
        id: 'doc-gad-02',
        name: 'Dr. Sneha Madavi',
        marathiName: 'डॉ. स्नेहा मडावी',
        specialization: 'Obstetrics & Gynaecology (Maternal Care)',
        designation: 'Consultant Obstetrician (First Referral Unit)',
        isGovernment: true,
        conditionsSpecialized: ['High-Risk Pregnancy', 'Emergency C-Section', 'Eclampsia & Postpartum Hemorrhage'],
        opdDays: 'Mon, Tue, Thu, Fri, Sat',
        opdTimings: '9:00 AM - 2:00 PM',
        experienceYears: 8,
        consultationFee: '₹0 (Free Govt / JSY)',
        qualifications: 'MBBS, DGO, DNB (OBGY)',
        regNumber: 'MMC-2018/02/0941',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under Govt / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Slip)',
      emergencyAmbulance: '108 Free Emergency Service (₹0)',
      mjpjayCashlessNote: '100% Cashless for all Maharashtra Ration Card holders',
    },
    laboratories: [
      {
        id: 'lab-gad-01',
        name: 'Central 24x7 Pathology & Envenomation Lab',
        timing: 'Open 24/7 (Emergency Service)',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Complete Blood Count (CBC) with Platelets', category: 'Pathology', price: '₹0 (Govt/MJPJAY)', reportTurnaround: '1 Hour', isAvailable: true },
          { name: 'Rapid Malaria Antigen (Pf/Pv)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '15 Mins', isAvailable: true },
          { name: 'Digital Chest X-Ray', category: 'Radiology', price: '₹0 (MJPJAY) / ₹40 Govt', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Sudhir Meshram',
      designation: 'Medical Superintendent (SDH Aheri)',
      officialPhone: '07133-272224',
      officialEmail: 'ms.sdhaheri@maharashtra.gov.in',
      officeLocation: 'Room 101, Ground Floor Admin Block',
      grievanceOfficeLocation: 'Grievance & Ayushman Mitra Desk, OPD Foyer',
    },
  },

  {
    id: 'fac-pun-01',
    name: 'Sassoon General Hospital & B.J. Govt Medical College',
    marathiName: 'ससून सर्वोपचार रुग्णालय व बी.जे. शासकीय मेडिकल कॉलेज',
    hindiName: 'ससून जनरल अस्पताल एवं बी.जे. मेडिकल कॉलेज',
    type: 'Govt Medical College',
    district: 'Pune',
    taluka: 'Pune City',
    address: 'Near Pune Railway Station, Jai Prakash Narayan Road, Pune - 411001',
    coordinates: { lat: 18.5284, lng: 73.8742 },
    distance: 'Apex Tertiary Medical Center',
    status: 'Open 24/7 (Apex Trauma & Multi-Super Specialty)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '31 Aug 2026',
    phone: '020-26128000',
    emergencyPhone: '108 / 020-26102222',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Level-1 Apex Trauma Centre',
      'Cardiology & 24/7 Cath Lab',
      'Neurosurgery & Stroke Unit',
      'Neonatal & Paediatric ICU (NICU/PICU)',
      'Organ Transplant & Dialysis Centre',
      'Oncology & Radiation Therapy',
    ],
    diagnostics: ['128-Slice CT Scan', '3T MRI', 'Colour Doppler USG', 'Automated Biochemistry Core Lab', 'Blood Component Separation Lab'],
    beds: {
      generalTotal: 1296,
      generalAvailable: 142,
      icuTotal: 120,
      icuAvailable: 14,
      oxygenTotal: 650,
      oxygenAvailable: 88,
      maternityTotal: 180,
      maternityAvailable: 29,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Emergency Antivenom',
        status: 'in_stock',
        quantityNote: '210 Vials in Central Stock',
      },
      {
        name: 'Insulin Glargine & Regular',
        marathiName: 'इन्सुलिन इंजेक्शन',
        category: 'Antidiabetic',
        status: 'in_stock',
        quantityNote: '380 Vials Available',
      },
      {
        name: 'Streptokinase & Tenecteplase (Cardiac)',
        marathiName: 'हृदयविकार इंजेक्शन (कार्डिॲक)',
        category: 'Thrombolytic',
        status: 'in_stock',
        quantityNote: '45 Injections Ready for Cath Lab',
      },
      {
        name: 'Rabies Immunoglobulin (Human ERIG)',
        marathiName: 'रेबीज इम्युनोग्लोब्युलिन',
        category: 'Emergency Biological',
        status: 'in_stock',
        quantityNote: '85 Vials Available',
      },
    ],
    ayushmanMitra: {
      name: 'Santosh Kulkarni / Sunita Deshmukh',
      phone: '020-26127050',
      deskLocation: 'MJPJAY Main Registration Counter (Building A, Ground Floor)',
    },
    opdTiming: 'Mon-Sat: 8:00 AM - 12:30 PM (Super Specialty 1:30 PM - 4:00 PM) | Emergency 24/7',
    doctors: [
      {
        id: 'doc-pun-01',
        name: 'Dr. Kiran Jadhav',
        marathiName: 'डॉ. किरण जाधव',
        specialization: 'Cardiology & Interventional Care',
        designation: 'Professor & Head of Cardiology (Cath Lab)',
        isGovernment: true,
        conditionsSpecialized: ['Acute Heart Attack (STEMI)', 'Angioplasty & Stenting', 'Heart Failure & Arrhythmia'],
        opdDays: 'Mon, Wed, Fri',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 18,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD, DM (Cardiology), FSCAI',
        regNumber: 'MMC-2008/04/1120',
        status: 'available',
      },
      {
        id: 'doc-pun-02',
        name: 'Dr. Anita Joshi',
        marathiName: 'डॉ. अनिता जोशी',
        specialization: 'Neurology & Stroke Management',
        designation: 'Associate Professor of Neurology',
        isGovernment: true,
        conditionsSpecialized: ['Ischemic Stroke Thrombolysis', 'Epilepsy & Seizure Disorders', 'Intracranial Bleeds'],
        opdDays: 'Tue, Thu, Sat',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 14,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD, DM (Neurology)',
        regNumber: 'MMC-2012/05/1502',
        status: 'available',
      },
      {
        id: 'doc-pun-03',
        name: 'Dr. Vinod Shinde',
        marathiName: 'डॉ. विनोद शिंदे',
        specialization: 'Apex Trauma & Orthopaedics',
        designation: 'Chief Trauma Surgeon',
        isGovernment: true,
        conditionsSpecialized: ['Polytrauma & Road Accidents', 'Complex Pelvic & Joint Fractures', 'Spine Trauma'],
        opdDays: 'Daily (24/7 On Emergency Rotation)',
        opdTimings: '8:30 AM - 1:00 PM',
        experienceYears: 16,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MS (Orthopaedics), M.Ch (Trauma)',
        regNumber: 'MMC-2010/08/2190',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free under Govt / MJPJAY)',
      opdRegistrationFee: '₹10 (Govt OPD Case Paper)',
      emergencyAmbulance: '108 Free Emergency Service (₹0)',
      mjpjayCashlessNote: '₹5,00,000 Free Cashless Coverage across 996+ procedures',
    },
    laboratories: [
      {
        id: 'lab-pun-01',
        name: 'NABL Accredited Automated Core Biochemistry & Pathology Lab',
        timing: 'Open 24/7 (Emergency & Inpatient)',
        isOpen247: true,
        tests: [
          { name: '128-Slice CT Scan (Brain/Chest/Abdomen)', category: 'Radiology', price: '₹0 (MJPJAY) / ₹450 Govt', reportTurnaround: '1 Hour', isAvailable: true },
          { name: '3T MRI (Spine/Brain/Joint)', category: 'Radiology', price: '₹0 (MJPJAY) / ₹1,200 Govt', reportTurnaround: '3 Hours', isAvailable: true },
          { name: 'Cardiac Troponin-I & CK-MB', category: 'Biochemistry', price: '₹0 (Free Emergency)', reportTurnaround: '30 Mins', isAvailable: true },
          { name: 'Complete Blood Count (CBC) with Differential', category: 'Pathology', price: '₹0 (Free Govt)', reportTurnaround: '45 Mins', isAvailable: true },
          { name: 'Liver & Renal Function Tests (LFT/KFT)', category: 'Biochemistry', price: '₹0 (Free Govt)', reportTurnaround: '1.5 Hours', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Vinayak Kale',
      designation: 'Dean & Professor, B.J. Govt Medical College & Sassoon GH',
      officialPhone: '020-26128000 (Ext 101)',
      officialEmail: 'dean.bjgmc@maharashtra.gov.in',
      officeLocation: 'Dean Office, 1st Floor, College Building',
      grievanceOfficeLocation: 'Grievance Redressal Cell, Medical Superintendent Office (Room 114)',
    },
  },

  {
    id: 'fac-pun-02',
    name: 'Community Health Centre (CHC / Rural Hospital) Bhor',
    marathiName: 'ग्रामीण रुग्णालय भोर',
    hindiName: 'ग्रामीण अस्पताल भोर',
    type: 'CHC',
    district: 'Pune',
    taluka: 'Bhor',
    address: 'Near Old Rajwada, Bhor-Mahad Road, Bhor, Pune - 412206',
    coordinates: { lat: 18.1481, lng: 73.8447 },
    distance: 'Rural Sub-divisional Hospital',
    status: 'Open 24/7 (First Referral Unit & Maternal Care)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '30 Aug 2026',
    phone: '02113-222530',
    emergencyPhone: '108 / 02113-222108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Normal & C-Section Delivery',
      'Paediatrics & Immunization',
      'Anti-Snake Venom (ASV) Centre',
      'Emergency Resuscitation & 108 Transit',
      'General Surgery & Orthopaedic OPD',
    ],
    diagnostics: ['Digital X-Ray', 'Ultrasound USG', 'Pathology Lab', 'ECG'],
    beds: {
      generalTotal: 30,
      generalAvailable: 9,
      icuTotal: 2,
      icuAvailable: 1,
      oxygenTotal: 15,
      oxygenAvailable: 5,
      maternityTotal: 10,
      maternityAvailable: 3,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Emergency Antivenom',
        status: 'in_stock',
        quantityNote: '42 Vials Available',
      },
      {
        name: 'Oxytocin & Methylergometrine',
        marathiName: 'प्रसूती अत्यावश्यक इंजेक्शन',
        category: 'Maternal Emergency',
        status: 'in_stock',
        quantityNote: '80 Ampoules',
      },
      {
        name: 'Amoxicillin + Clavulanic Acid 625mg',
        marathiName: 'अमोक्सिसिलिन अँटिबायोटिक',
        category: 'Antibiotic',
        status: 'in_stock',
        quantityNote: '600 Tablets',
      },
    ],
    ayushmanMitra: {
      name: 'Sachin Jadhav',
      phone: '98224-11920',
      deskLocation: 'Entrance Registration Desk',
    },
    opdTiming: 'Mon-Sat: 8:30 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-pun-04',
        name: 'Dr. Santosh Salunkhe',
        marathiName: 'डॉ. संतोष साळुंखे',
        specialization: 'General Surgery & Trauma',
        designation: 'Medical Superintendent (Rural Hospital Bhor)',
        isGovernment: true,
        conditionsSpecialized: ['Acute Abdomen & Appendicitis', 'Hernia & Hydrocele', 'Wound Management & Suturing'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 12,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MS (General Surgery)',
        regNumber: 'MMC-2014/09/2401',
        status: 'available',
      },
      {
        id: 'doc-pun-05',
        name: 'Dr. Priyadarshini Patil',
        marathiName: 'डॉ. प्रियदर्शनी पाटील',
        specialization: 'Paediatrics & Neonatal Care',
        designation: 'Medical Officer Paediatrician',
        isGovernment: true,
        conditionsSpecialized: ['Neonatal Jaundice', 'Acute Childhood Diarrhea & ORS', 'Severe Pneumonia & Malnutrition'],
        opdDays: 'Mon, Tue, Thu, Fri',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 7,
        consultationFee: '₹0 (Free Govt)',
        qualifications: 'MBBS, DCH (Paediatrics)',
        regNumber: 'MMC-2019/04/1092',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free / MJPJAY)',
      oxygenCharges: '₹0 (Free)',
      opdRegistrationFee: '₹10 (Govt Token)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: 'Free Cashless Care under MJPJAY',
    },
    laboratories: [
      {
        id: 'lab-pun-02',
        name: 'Rural Hospital Bhor Diagnostics & X-Ray Lab',
        timing: '8:00 AM - 8:00 PM (Emergency 24x7 on-call)',
        isOpen247: false,
        tests: [
          { name: 'Complete Blood Count (CBC)', category: 'Pathology', price: '₹0 (Free Govt)', reportTurnaround: '45 Mins', isAvailable: true },
          { name: 'Blood Sugar Fasting / Post-prandial', category: 'Biochemistry', price: '₹0 (Free Govt)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Digital X-Ray Chest & Extremities', category: 'Radiology', price: '₹0 (MJPJAY) / ₹40 Govt', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Santosh Salunkhe',
      designation: 'Medical Superintendent (RH Bhor)',
      officialPhone: '02113-222530',
      officialEmail: 'rhbhor.pune@maharashtra.gov.in',
      officeLocation: 'Medical Superintendent Cabin, Main Building',
      grievanceOfficeLocation: 'Helpdesk Counter 1',
    },
  },

  {
    id: 'fac-pal-01',
    name: 'Sub-District Hospital (SDH) Jawhar',
    marathiName: 'उपजिल्हा रुग्णालय जव्हार',
    hindiName: 'उप-जिला अस्पताल जव्हार',
    type: 'Sub-District Hospital',
    district: 'Palghar',
    taluka: 'Jawhar',
    address: 'Near Sunset Point Road, Jawhar, Palghar - 401603',
    coordinates: { lat: 19.9248, lng: 73.2341 },
    distance: 'Tribal Sub-divisional Hospital',
    status: 'Open 24/7 (Maternal & Snakebite Hub)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '31 Aug 2026',
    phone: '02520-222340',
    emergencyPhone: '108 / 02520-222108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) Dedicated Ward',
      'Tribal Malnutrition & NRC Centre',
      'Maternal Care & Sonography (FRU)',
      'Blood Storage Unit (BSU)',
    ],
    diagnostics: ['20WBCT Clotting Test', 'USG Sonography', 'Digital X-Ray', 'Malaria Rapid Test'],
    beds: {
      generalTotal: 100,
      generalAvailable: 19,
      icuTotal: 6,
      icuAvailable: 2,
      oxygenTotal: 35,
      oxygenAvailable: 8,
      maternityTotal: 30,
      maternityAvailable: 6,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Emergency Antivenom',
        status: 'in_stock',
        quantityNote: '55 Vials Available',
      },
      {
        name: 'Iron & Folic Acid (IFA) Tablets',
        marathiName: 'लोह व फॉलिक ॲसिड गोळ्या',
        category: 'Maternal Nutrition',
        status: 'in_stock',
        quantityNote: '1200 Strips',
      },
    ],
    ayushmanMitra: {
      name: 'Nitin Mukne',
      phone: '94038-29401',
      deskLocation: 'OPD Counter 2',
    },
    opdTiming: 'Mon-Sat: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-pal-01',
        name: 'Dr. Ramdas Maru',
        marathiName: 'डॉ. रामदास मारू',
        specialization: 'Tribal Health & General Medicine',
        designation: 'Medical Superintendent (SDH Jawhar)',
        isGovernment: true,
        conditionsSpecialized: ['Viper Snakebite Envenomation', 'Severe Anemia in Pregnancy', 'Sickle Cell & Thalassemia'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:30 PM',
        experienceYears: 15,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (Medicine)',
        regNumber: 'MMC-2011/03/0890',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free / MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt Token)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Care for Tribal & Rural Communities',
    },
    laboratories: [
      {
        id: 'lab-pal-01',
        name: 'Jawhar Tribal Health Pathology & Sonography Unit',
        timing: 'Open 24/7 (Emergency Service)',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Sickling Test & Hemoglobin Electrophoresis', category: 'Specialized', price: '₹0 (Free Govt)', reportTurnaround: '2 Hours', isAvailable: true },
          { name: 'Obstetric Sonography (USG)', category: 'Radiology', price: '₹0 (Free for Pregnant Women)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Ramdas Maru',
      designation: 'Medical Superintendent (SDH Jawhar)',
      officialPhone: '02520-222340',
      officialEmail: 'sdhjawhar.palghar@maharashtra.gov.in',
      officeLocation: 'Admin Room 104',
      grievanceOfficeLocation: 'Grievance Cell Counter 2',
    },
  },
];

// -------------------------------------------------------------
// VERIFIED BLOOD BANKS DATASET (MAHARASHTRA e-RaktKosh Sync)
// -------------------------------------------------------------
export const MAHARASHTRA_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-pun-01',
    name: 'Sassoon General Hospital Regional Blood Bank',
    district: 'Pune',
    taluka: 'Pune City',
    address: 'Near Station Road, Sassoon Hospital Campus, Pune - 411001',
    contactNumber: '020-26128000 / 020-26127000',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 38, status: 'Available' },
      'A-': { units: 6, status: 'Low' },
      'B+': { units: 54, status: 'Available' },
      'B-': { units: 8, status: 'Available' },
      'AB+': { units: 22, status: 'Available' },
      'AB-': { units: 3, status: 'Critical' },
      'O+': { units: 65, status: 'Available' },
      'O-': { units: 9, status: 'Available' },
    },
    componentsAvailable: ['Whole Blood', 'Packed Red Blood Cells (PRBC)', 'Fresh Frozen Plasma (FFP)', 'Platelet Concentrate', 'Cryoprecipitate'],
  },
  {
    id: 'bb-gad-01',
    name: 'District Hospital Blood Bank & Component Unit Gadchiroli',
    district: 'Gadchiroli',
    taluka: 'Gadchiroli',
    address: 'Civil Hospital Road, Gadchiroli - 442605',
    contactNumber: '07132-222140',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 16, status: 'Available' },
      'A-': { units: 2, status: 'Critical' },
      'B+': { units: 24, status: 'Available' },
      'B-': { units: 4, status: 'Low' },
      'AB+': { units: 9, status: 'Available' },
      'AB-': { units: 1, status: 'Critical' },
      'O+': { units: 28, status: 'Available' },
      'O-': { units: 3, status: 'Low' },
    },
    componentsAvailable: ['Whole Blood', 'Packed Red Blood Cells (PRBC)', 'Fresh Frozen Plasma (FFP)'],
  },
  {
    id: 'bb-pal-01',
    name: 'Palghar District Blood Bank (Civil Hospital)',
    district: 'Palghar',
    taluka: 'Palghar',
    address: 'Near Manor Road, District Civil Hospital, Palghar - 401404',
    contactNumber: '02525-256108',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 20, status: 'Available' },
      'A-': { units: 3, status: 'Low' },
      'B+': { units: 31, status: 'Available' },
      'B-': { units: 5, status: 'Available' },
      'AB+': { units: 12, status: 'Available' },
      'AB-': { units: 2, status: 'Critical' },
      'O+': { units: 35, status: 'Available' },
      'O-': { units: 4, status: 'Low' },
    },
    componentsAvailable: ['Whole Blood', 'Packed Red Blood Cells (PRBC)', 'Fresh Frozen Plasma (FFP)', 'Platelets'],
  },
  {
    id: 'bb-nas-01',
    name: 'Civil Hospital Blood Bank Nashik',
    district: 'Nashik',
    taluka: 'Nashik',
    address: 'Trimbak Road, Civil Hospital, Nashik - 422002',
    contactNumber: '0253-2572222',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 42, status: 'Available' },
      'A-': { units: 7, status: 'Available' },
      'B+': { units: 48, status: 'Available' },
      'B-': { units: 6, status: 'Low' },
      'AB+': { units: 18, status: 'Available' },
      'AB-': { units: 4, status: 'Low' },
      'O+': { units: 58, status: 'Available' },
      'O-': { units: 8, status: 'Available' },
    },
    componentsAvailable: ['Whole Blood', 'PRBC', 'FFP', 'Single Donor Platelets (SDP)'],
  },
];

// -------------------------------------------------------------
// DEMO GRIEVANCES DATASET WITH 4-LEVEL AUTO-ESCALATION AUDIT
// -------------------------------------------------------------
export const INITIAL_GRIEVANCES: Grievance[] = [
  {
    id: 'MH-GRV-2026-1049',
    patientName: 'Sunita Ravindra Jadhav',
    patientMobile: '98221-44910',
    facilityId: 'fac-pun-02',
    facilityName: 'Community Health Centre (CHC) Bhor',
    district: 'Pune',
    category: 'MJPJAY Scheme Denied',
    description: 'Empanelled desk officer was unavailable at 4 PM for MJPJAY pre-authorization for sonography and delivery admission.',
    submittedAt: '28 Aug 2026, 04:30 PM',
    status: 'under_review',
    currentLevel: 'Level 1: Hospital Grievance Redressal Cell (RH Bhor)',
    escalationDaysRemaining: 1,
    auditTrail: [
      {
        timestamp: '28 Aug 2026, 04:30 PM',
        level: 'Level 1: Hospital Grievance Cell',
        action: 'Complaint Registered',
        actor: 'Patient (Mobile OTP Verified)',
        comment: 'Auto-assigned to Medical Superintendent Dr. Santosh Salunkhe with 48-hour resolution SLA.',
      },
      {
        timestamp: '29 Aug 2026, 11:00 AM',
        level: 'Level 1: Hospital Grievance Cell',
        action: 'Under Investigation',
        actor: 'Grievance Officer RH Bhor',
        comment: 'Explanation called from Ayushman Mitra desk. Patient granted 100% cashless MJPJAY admission.',
      },
    ],
  },
  {
    id: 'MH-GRV-2026-0982',
    patientName: 'Bandu Shankar Madavi',
    patientMobile: '94218-33019',
    facilityId: 'fac-gad-01',
    facilityName: 'Sub-District Hospital (SDH) Aheri',
    district: 'Gadchiroli',
    category: 'Medicine Stockout',
    description: 'Informed that Artesunate malaria injection had low stock in PHC before emergency referral to Aheri.',
    submittedAt: '25 Aug 2026, 02:15 PM',
    status: 'resolved',
    currentLevel: 'Resolved by District Health Officer Gadchiroli',
    resolutionNote: 'Emergency replenishment of 150 Artesunate ampoules delivered to Aheri SDH and Kamke PHC cluster on 26 Aug 2026.',
    escalationDaysRemaining: 0,
    auditTrail: [
      {
        timestamp: '25 Aug 2026, 02:15 PM',
        level: 'Level 1: Facility Grievance Desk',
        action: 'Complaint Registered',
        actor: 'ASHA Worker on behalf of Patient',
      },
      {
        timestamp: '26 Aug 2026, 09:30 AM',
        level: 'Level 2: District Health Officer (DHO Gadchiroli)',
        action: 'Action Taken Report (ATR)',
        actor: 'Civil Surgeon Gadchiroli',
        comment: 'Emergency buffer stock released from District Central Medicine Store.',
      },
      {
        timestamp: '27 Aug 2026, 04:00 PM',
        level: 'State Health Command Center',
        action: 'Grievance Closed (Resolved)',
        actor: 'System Administrator',
        comment: 'Verified with patient via SMS confirmation.',
      },
    ],
  },
];

// -------------------------------------------------------------
// DEMO OPD TOKENS DATASET (LIVE QUEUE)
// -------------------------------------------------------------
export const INITIAL_OPD_TOKENS: OPDToken[] = [
  {
    id: 'TOK-SGH-027',
    tokenNumber: 27,
    patientName: 'Kishor Dnyaneshwar Shinde',
    patientMobile: '98221-55012',
    facilityId: 'fac-pun-01',
    facilityName: 'Sassoon General Hospital & B.J. GMC Pune',
    department: 'Cardiology & General Medicine',
    doctorName: 'Dr. Kiran Jadhav (MD, DM Cardiology)',
    date: '01 Sep 2026',
    timeSlot: '10:30 AM - 11:00 AM',
    currentServingToken: 21,
    estimatedWaitMinutes: 18,
    status: 'waiting',
    createdAt: '01 Sep 2026, 08:30 AM',
  },
  {
    id: 'TOK-BHOR-014',
    tokenNumber: 14,
    patientName: 'Sunita Ravindra Jadhav',
    patientMobile: '98221-44910',
    facilityId: 'fac-pun-02',
    facilityName: 'Community Health Centre (CHC) Bhor',
    department: 'Maternal Care & Obstetrics',
    doctorName: 'Dr. Priyadarshini Patil (DGO)',
    date: '01 Sep 2026',
    timeSlot: '11:00 AM - 11:30 AM',
    currentServingToken: 12,
    estimatedWaitMinutes: 6,
    status: 'waiting',
    createdAt: '01 Sep 2026, 09:00 AM',
  },
];

// -------------------------------------------------------------
// 9-STAGE PATIENT TREATMENT JOURNEY TRACKING ("इलाज हुआ है या नहीं")
// -------------------------------------------------------------
export const INITIAL_TREATMENT_JOURNEYS: PatientTreatmentJourney[] = [
  {
    referralId: 'MH-REF-2026-8841',
    patientName: 'Sunita Ravindra Jadhav',
    patientAge: 29,
    patientGender: 'Female',
    patientMobile: '98221-44910',
    village: 'Kuran Budruk',
    district: 'Pune',
    abhaId: '91-8842-1920-5512',
    provisionalDiagnosis: 'High-risk 3rd trimester pregnancy with gestational hypertension (BP 150/95 mmHg) and pedal edema.',
    currentStageIndex: 6, // Stage 6 (Treatment/Surgery Commenced)
    stages: [
      {
        stageNumber: 1,
        title: 'Referral Initiated by ASHA / PHC',
        marathiTitle: 'आशा / उपकेंद्राकडून रेफरल जारी',
        location: 'Sub-Centre Kuran Budruk, Taluka Bhor',
        completedAt: '28 Aug 2026, 09:15 AM',
        status: 'completed',
        actor: 'ASHA Worker: Mandakini Kadam',
        notes: 'Vitals recorded: BP 150/95 mmHg, SpO2 98%, Pulse 84 bpm. QR referral generated.',
      },
      {
        stageNumber: 2,
        title: '108 Ambulance Transit & GPS Coordination',
        marathiTitle: '१०८ रुग्णवाहिका प्रवास व समन्वय',
        location: 'Route: Kuran -> CHC Bhor',
        completedAt: '28 Aug 2026, 10:05 AM',
        status: 'completed',
        actor: '108 EMT Driver: Mahesh Patil (MH-12-AMB-108)',
        notes: 'Patient escorted safely. Receiving obstetric unit pre-alerted.',
      },
      {
        stageNumber: 3,
        title: 'Hospital Reception & OPD Token Generated',
        marathiTitle: 'रुग्णालय आगमन व OPD टोकन जारी',
        location: 'CHC Bhor Registration Desk',
        completedAt: '28 Aug 2026, 10:20 AM',
        status: 'completed',
        actor: 'Ayushman Mitra Desk',
        notes: 'MJPJAY cashless pre-authorization done. Token #14 issued.',
      },
      {
        stageNumber: 4,
        title: 'Specialist Doctor Consultation Completed',
        marathiTitle: 'तज्ज्ञ डॉक्टरांकडून सखोल तपासणी',
        location: 'OBGY OPD Room 3, CHC Bhor',
        completedAt: '28 Aug 2026, 11:10 AM',
        status: 'completed',
        actor: 'Dr. Priyadarshini Patil (DGO, Obstetrician)',
        notes: 'Confirmed gestational hypertension. Prescribed urgent Obstetric USG and emergency stabilization.',
      },
      {
        stageNumber: 5,
        title: 'Diagnostic Lab Tests & Sonography Completed',
        marathiTitle: 'रक्त तपासणी व सोनोग्राफी पूर्ण',
        location: 'CHC Bhor Central Lab & Radiology',
        completedAt: '28 Aug 2026, 01:30 PM',
        status: 'completed',
        actor: 'Senior Radiologist & Biochemist',
        notes: 'USG confirmed single live intrauterine pregnancy 36 weeks. Urine protein 2+. Blood tests within acceptable limits.',
      },
      {
        stageNumber: 6,
        title: 'Active Treatment / MJPJAY Cashless Surgery Commenced',
        marathiTitle: 'सक्रिय उपचार / शस्त्रक्रिया सुरू (MJPJAY)',
        location: 'Operation Theatre 1, CHC Bhor / Sassoon Pune',
        completedAt: '29 Aug 2026, 09:30 AM',
        status: 'completed',
        actor: 'Chief Surgeon: Dr. Santosh Salunkhe',
        notes: 'Elective lower segment Caesarean section (LSCS) performed successfully under spinal anesthesia.',
      },
      {
        stageNumber: 7,
        title: 'Treatment Completed & Clinical Outcome Recorded',
        marathiTitle: 'उपचार यशस्वीरीत्या पूर्ण (इलाज संपन्न)',
        location: 'Post-Operative Maternity Ward',
        completedAt: '30 Aug 2026, 04:00 PM',
        status: 'active',
        actor: 'Duty Medical Officer: Dr. Priyadarshini Patil',
        notes: 'Healthy baby girl delivered (3.1 kg). Mother and infant vitals stable. BP normalized to 122/80 mmHg.',
      },
      {
        stageNumber: 8,
        title: 'Discharge with 10-Day Free Medicines & Digital Prescription',
        marathiTitle: 'डिस्चार्ज व १० दिवसांची मोफत औषधे',
        location: 'CHC Bhor Pharmacy Counter',
        status: 'pending',
        actor: 'Pharmacist & Medical Superintendent',
        notes: 'Zero out-of-pocket expenditure. 10-day antibiotics, iron & calcium provided under MJPJAY 2.0.',
      },
      {
        stageNumber: 9,
        title: 'Village ASHA Post-Discharge Home Follow-up',
        marathiTitle: 'गावात आशा कार्यकर्तीकडून गृहभेट व पाठपुरावा',
        location: 'Kuran Budruk Village (Home Visit)',
        status: 'pending',
        actor: 'ASHA Worker: Mandakini Kadam',
        notes: 'Scheduled home visits on Day 3, Day 7, Day 14 for newborn immunization & lactation check.',
      },
    ],
  },
];

// -------------------------------------------------------------
// MAHARASHTRA DISTRICTS & ANALYTICS DATASET (36 DISTRICTS)
// -------------------------------------------------------------
export const MAHARASHTRA_DISTRICTS: string[] = [
  'Gadchiroli',
  'Pune',
  'Nandurbar',
  'Palghar',
  'Nashik',
  'Nagpur',
  'Chhatrapati Sambhaji Nagar',
  'Satara',
  'Mumbai Suburban',
  'Mumbai City',
  'Thane',
  'Raigad',
  'Ratnagiri',
  'Sindhudurg',
  'Ahmednagar',
  'Solapur',
  'Kolhapur',
  'Sangli',
  'Jalgaon',
  'Dhule',
  'Jalna',
  'Parbhani',
  'Beed',
  'Nanded',
  'Osmanabad (Dharashiv)',
  'Latur',
  'Hingoli',
  'Amravati',
  'Akola',
  'Yavatmal',
  'Buldhana',
  'Washim',
  'Wardha',
  'Chandrapur',
  'Bhandara',
  'Gondia',
];

export const DISTRICT_HEALTH_METRICS: DistrictHealthMetric[] = [
  {
    districtName: 'Gadchiroli',
    region: 'Vidarbha',
    totalFacilities: 68,
    vulnerabilityIndex: 'High (Tribal/Rural)',
    activeReferrals: 184,
    bedOccupancyRate: 88.5,
    asvStockStatus: 'Critical Shortage',
    emergency108Calls24h: 32,
    icuBedsAvailable: 8,
    pendingGrievances: 4,
  },
  {
    districtName: 'Palghar',
    region: 'Konkan',
    totalFacilities: 82,
    vulnerabilityIndex: 'High (Tribal/Rural)',
    activeReferrals: 215,
    bedOccupancyRate: 91.2,
    asvStockStatus: 'Critical Shortage',
    emergency108Calls24h: 46,
    icuBedsAvailable: 6,
    pendingGrievances: 7,
  },
  {
    districtName: 'Nandurbar',
    region: 'North Maharashtra',
    totalFacilities: 54,
    vulnerabilityIndex: 'High (Tribal/Rural)',
    activeReferrals: 142,
    bedOccupancyRate: 84.0,
    asvStockStatus: 'Normal',
    emergency108Calls24h: 28,
    icuBedsAvailable: 5,
    pendingGrievances: 3,
  },
  {
    districtName: 'Pune',
    region: 'Western Maharashtra',
    totalFacilities: 194,
    vulnerabilityIndex: 'Low (Urban)',
    activeReferrals: 412,
    bedOccupancyRate: 86.4,
    asvStockStatus: 'Adequate',
    emergency108Calls24h: 118,
    icuBedsAvailable: 42,
    pendingGrievances: 12,
  },
  {
    districtName: 'Nashik',
    region: 'North Maharashtra',
    totalFacilities: 146,
    vulnerabilityIndex: 'Moderate',
    activeReferrals: 260,
    bedOccupancyRate: 79.5,
    asvStockStatus: 'Normal',
    emergency108Calls24h: 64,
    icuBedsAvailable: 19,
    pendingGrievances: 6,
  },
  {
    districtName: 'Nagpur',
    region: 'Vidarbha',
    totalFacilities: 165,
    vulnerabilityIndex: 'Moderate',
    activeReferrals: 310,
    bedOccupancyRate: 82.1,
    asvStockStatus: 'Normal',
    emergency108Calls24h: 78,
    icuBedsAvailable: 26,
    pendingGrievances: 9,
  },
  {
    districtName: 'Chhatrapati Sambhaji Nagar',
    region: 'Marathwada',
    totalFacilities: 120,
    vulnerabilityIndex: 'Moderate',
    activeReferrals: 228,
    bedOccupancyRate: 83.7,
    asvStockStatus: 'Normal',
    emergency108Calls24h: 52,
    icuBedsAvailable: 15,
    pendingGrievances: 5,
  },
];

// MAHARASHTRA GOVERNMENT SCHEMES DIRECTORY
export const MAHARASHTRA_SCHEMES: HealthScheme[] = [
  {
    id: 'scheme-mjpjay',
    code: 'MJPJAY 2.0',
    name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY 2.0)',
    marathiName: 'महात्मा जोतीराव फुले जन आरोग्य योजना (MJPJAY २.०)',
    hindiName: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY २.०)',
    coverageAmount: '₹5,00,000 / family / year',
    eligibleRationCards: ['yellow', 'orange', 'white'],
    summary: 'Universal health coverage of ₹5 Lakhs per family per year for all Maharashtra ration card holders across 996+ medical & surgical procedures.',
    marathiSummary: 'महाराष्ट्रातील सर्व रेशन कार्डधारक कुटुंबांना दरवर्षी ५ लाख रुपयांपर्यंत पूर्णतः मोफत व कॅशलेस उपचार (९९६+ शस्त्रक्रिया समाविष्ट).',
    coveredCount: '996 Medical & Surgical Procedures from Day 1',
    targetBeneficiary: 'All Maharashtra Families holding Yellow, Kesari (Orange) or White Ration Cards',
    keyBenefits: [
      '₹5,00,000 cashless cover per family per year',
      'No income limit for Kesari/Orange and White ration card holders',
      'Pre-existing diseases covered from Day 1',
      'Free diagnostics, ICU care, surgeries and 10-day post-discharge medicines',
      'Ayushman Mitra support desk at every empanelled hospital',
    ],
    requiredDocs: [
      'Valid Maharashtra Ration Card (Yellow / Kesari-Orange / White)',
      'Aadhaar Card / Voter ID / Driving License',
      'Doctor Consultation / Referral Slip from Govt Facility',
    ],
    helpline: '155388 / 1800 123 2211 (24x7 Toll-Free)',
    portalUrl: 'https://www.jeevandayee.gov.in',
  },
  {
    id: 'scheme-pmjay',
    code: 'AB-PMJAY',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
    marathiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    hindiName: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    coverageAmount: '₹5,00,000 / family / year',
    eligibleRationCards: ['yellow', 'orange'],
    summary: 'National health protection scheme providing ₹5 Lakhs cashless hospitalization cover across all empanelled public and private hospitals across India.',
    marathiSummary: 'देशभरातील सर्व संलग्न शासकीय व खाजगी रुग्णालयांमध्ये ५ लाख रुपयांपर्यंत पूर्णतः मोफत उपचार.',
    coveredCount: '1,949 Specialized Procedures',
    targetBeneficiary: 'SECC 2011 identified rural/urban vulnerable families and Yellow/Orange ration card holders',
    keyBenefits: [
      'Portable across any empanelled hospital in India',
      'Includes secondary and tertiary hospitalization',
      'No restriction on family size or age',
    ],
    requiredDocs: ['Aadhaar Card', 'Ration Card', 'ABHA Health Card / PM-JAY Golden Card'],
    helpline: '14555 / 1800 111 565',
    portalUrl: 'https://pmjay.gov.in',
  },
  {
    id: 'scheme-jsy',
    code: 'JSY & JSSK',
    name: 'Janani Suraksha Yojana & Janani Shishu Suraksha Karyakram',
    marathiName: 'जननी सुरक्षा योजना व जननी शिशू सुरक्षा कार्यक्रम',
    hindiName: 'जननी सुरक्षा योजना एवं जननी शिशु सुरक्षा कार्यक्रम',
    coverageAmount: '100% Free Institutional Delivery + Cash Incentive',
    eligibleRationCards: ['yellow', 'orange', 'white'],
    summary: 'Zero out-of-pocket expense for pregnant women delivering in public healthcare facilities, free C-section, free transport via 102/108, and financial incentive.',
    marathiSummary: 'शासकीय रुग्णालयात मोफत प्रसूती, मोफत सी-सेक्शन शस्त्रक्रिया, मोफत औषधे आणि माता-शिशूसाठी मोफत १०२ रुग्णवाहिका.',
    coveredCount: 'Antenatal, Natal & Postnatal Complete Care',
    targetBeneficiary: 'All pregnant mothers delivering in Govt Sub-Centres, PHCs, CHCs, and District Hospitals',
    keyBenefits: [
      '₹1,400 financial assistance for rural mothers delivering in Govt hospitals',
      'Free diagnostics, sonography and blood transfusion',
      'Free 102/108 dropped back home after discharge',
    ],
    requiredDocs: ['Mother-Child Protection (MCP) Card', 'Aadhaar Card', 'Bank Passbook'],
    helpline: '104 / 102 (Maternal Helpline)',
    portalUrl: 'https://nhm.gov.in',
  },
];

// INITIAL PRE-POPULATED REFERRALS
export const INITIAL_REFERRALS: DigitalReferral[] = [
  {
    id: 'MH-REF-2026-8841',
    patientName: 'Sunita Ravindra Jadhav',
    patientAge: 29,
    patientGender: 'Female',
    patientMobile: '98221-44910',
    village: 'Kuran Budruk',
    taluka: 'Bhor',
    district: 'Pune',
    abhaId: '91-8842-1920-5512',
    sourceFacilityId: 'fac-pun-02',
    sourceFacilityName: 'CHC Bhor',
    destinationFacilityId: 'fac-pun-01',
    destinationFacilityName: 'Sassoon General Hospital Pune',
    referralReason: 'High-risk 3rd trimester pregnancy with gestational hypertension (BP 150/95 mmHg) and pedal edema. Referred for specialist USG and C-section readiness.',
    urgency: 'urgent',
    createdAt: '28 Aug 2026, 09:15 AM',
    status: 'in_transit',
    vitals: {
      bp: '150/95 mmHg',
      spo2: '98%',
      pulse: '84 bpm',
      temp: '98.4 °F',
    },
    assignedDoctor: 'Dr. Anita Joshi (OBGY Specialist)',
    notes: 'Patient accompanied by ASHA worker Mandakini. 108 Ambulance coordinated.',
  },
  {
    id: 'MH-REF-2026-7730',
    patientName: 'Bandu Shankar Madavi',
    patientAge: 42,
    patientGender: 'Male',
    patientMobile: '94218-33019',
    village: 'Kamke',
    taluka: 'Bhamragad',
    district: 'Gadchiroli',
    abhaId: '91-1029-4481-9920',
    sourceFacilityId: 'fac-gad-01',
    sourceFacilityName: 'SDH Aheri',
    destinationFacilityId: 'fac-gad-01',
    destinationFacilityName: 'SDH Aheri (Intensive Envenomation Unit)',
    referralReason: 'Russell Viper Snakebite on left lower limb. Severe local swelling with prolonged whole blood clotting time (>20 mins). Immediate ASV infusion required.',
    urgency: 'emergency',
    createdAt: '29 Aug 2026, 02:40 PM',
    status: 'completed',
    vitals: {
      bp: '110/70 mmHg',
      spo2: '96%',
      pulse: '102 bpm',
      temp: '99.1 °F',
    },
    assignedDoctor: 'Dr. Pravin Gedam (Civil Surgeon)',
    notes: 'Administered 10 Vials ASV in 500ml Normal Saline. Coagulation profile normalized.',
  },
];
