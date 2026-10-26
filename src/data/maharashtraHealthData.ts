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
  designation: string;
  isGovernment: boolean;
  conditionsSpecialized: string[];
  opdDays: string;
  opdTimings: string;
  experienceYears: number;
  consultationFee: string;
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
  price: string;
  reportTurnaround: string;
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
  designation: string;
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
  status: string;
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
  id: string;
  patientName: string;
  patientMobile: string;
  facilityId: string;
  facilityName: string;
  district: string;
  category: GrievanceCategory;
  description: string;
  photoUrl?: string;
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
  id: string;
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
  referralId: string;
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
// VERIFIED MAHARASHTRA HEALTHCARE FACILITIES DATASET (ALL TIERS)
// -------------------------------------------------------------
export const MAHARASHTRA_FACILITIES: HealthcareFacility[] = [
  // 1. PUNE - APEX GMC
  {
    id: 'fac-pun-01',
    name: 'Sassoon General Hospital & B.J. Govt Medical College',
    marathiName: 'ससून सर्वोपचार रुग्णालय व बी. जे. शासकीय वैद्यकीय महाविद्यालय',
    hindiName: 'ससून जनरल अस्पताल एवं बी.जे. मेडिकल कॉलेज',
    type: 'Govt Medical College',
    district: 'Pune',
    taluka: 'Pune City',
    address: 'Near Pune Railway Station, Sassoon Road, Pune - 411001',
    coordinates: { lat: 18.5284, lng: 73.8742 },
    distance: '0.8 km from Pune Station',
    status: 'Open 24/7 (Super-Specialty Apex)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '020-26128000',
    emergencyPhone: '108 / 020-26127000',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Cardiology & Cath Lab',
      'Neuro-Trauma & Surgery',
      'Anti-Snake Venom (ASV) 24/7',
      'Pediatric Intensive Care (PICU)',
      'Organ Transplant & Nephrology',
      'Medical Oncology',
      'Burns & Plastic Surgery',
    ],
    diagnostics: ['128-Slice CT Scan', '3T MRI', 'Color Doppler Ultrasound', '24x7 Emergency Blood Bank', 'Histopathology'],
    beds: {
      generalTotal: 1296,
      generalAvailable: 184,
      icuTotal: 120,
      icuAvailable: 14,
      oxygenTotal: 450,
      oxygenAvailable: 68,
      maternityTotal: 150,
      maternityAvailable: 22,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent Lyophilized)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '180 Vials in Central Emergency Stock',
      },
      {
        name: 'Anti-Rabies Vaccine & Immunoglobulin',
        marathiName: 'रेबीज प्रतिबंधक लस',
        category: 'Vaccine',
        status: 'in_stock',
        quantityNote: '220 Doses Available',
      },
      {
        name: 'Human Insulin & Metformin',
        marathiName: 'इन्सुलिन व मेटफॉर्मिन',
        category: 'Diabetes Care',
        status: 'in_stock',
        quantityNote: '600 Vials',
      },
      {
        name: 'Streptokinase & Tenecteplase (Cardiac Thrombolysis)',
        marathiName: 'हृदयविकार आपत्कालीन इंजेक्शन',
        category: 'Cardiology',
        status: 'in_stock',
        quantityNote: '35 Vials',
      },
    ],
    ayushmanMitra: {
      name: 'Santosh Kamble',
      phone: '98220-19283',
      deskLocation: 'Main Foyer Counter 1 & 2',
    },
    opdTiming: 'Daily: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-pun-01',
        name: 'Dr. Eknath Pawar',
        marathiName: 'डॉ. एकनाथ पवार',
        specialization: 'Orthopedics & Complex Trauma',
        designation: 'Dean & Professor of Orthopedics',
        isGovernment: true,
        conditionsSpecialized: ['Polytrauma', 'Pelvic Fractures', 'Joint Replacement'],
        opdDays: 'Tue, Thu, Sat',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 24,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MS (Orthopedics), DNB, FICS - MMC: 1998/04/0912',
        regNumber: 'MMC-1998/04/0912',
        status: 'available',
      },
      {
        id: 'doc-pun-02',
        name: 'Dr. Kiran Jadhav',
        marathiName: 'डॉ. किरण जाधव',
        specialization: 'Cardiology & Intensive Care',
        designation: 'Professor & HOD Cardiology',
        isGovernment: true,
        conditionsSpecialized: ['Acute Myocardial Infarction', 'Heart Failure', 'Emergency Angioplasty'],
        opdDays: 'Daily (Mon-Fri)',
        opdTimings: '8:30 AM - 1:30 PM',
        experienceYears: 18,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MD (Med), DM (Cardiology) - MMC: 2004/08/2190',
        regNumber: 'MMC-2004/08/2190',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (100% Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free Govt 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Emergency Service (₹0)',
      mjpjayCashlessNote: '100% Cashless across all 996 procedures',
    },
    laboratories: [
      {
        id: 'lab-pun-01',
        name: 'Central 24x7 Advanced Diagnostic & Trauma Lab',
        timing: 'Open 24/7/365',
        isOpen247: true,
        tests: [
          { name: 'Troponin-I & Cardiac Enzymes', category: 'Biochemistry', price: '₹0 (Govt/MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
          { name: '128-Slice Brain & Trauma CT Scan', category: 'Radiology', price: '₹0 (MJPJAY) / ₹500 Govt', reportTurnaround: '45 Mins', isAvailable: true },
          { name: 'Complete Hemogram (CBC) & Coagulation PT/INR', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '1 Hour', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Eknath Pawar',
      designation: 'Dean, BJ Govt Medical College & Sassoon Hospital',
      officialPhone: '020-26128000',
      officialEmail: 'dean.bjmc-mah@gov.in',
      officeLocation: 'Dean Office, Administrative Building 1st Floor',
      grievanceOfficeLocation: 'Grievance Redressal Cell, Room 108',
    },
  },

  // 2. PUNE - RURAL CHC BHOR
  {
    id: 'fac-pun-02',
    name: 'Community Health Centre (CHC) Bhor',
    marathiName: 'ग्रामीण रुग्णालय भोर',
    hindiName: 'सामुदायिक स्वास्थ्य केंद्र भोर',
    type: 'CHC',
    district: 'Pune',
    taluka: 'Bhor',
    address: 'Near Old Bus Stand, Bhor, Pune - 412206',
    coordinates: { lat: 18.1517, lng: 73.8447 },
    distance: '48 km from Pune City',
    status: 'Open 24/7 (First Referral Unit)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '20 Sep 2026',
    phone: '02113-222540',
    emergencyPhone: '108 / 02113-222108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Maternity & Normal/C-Section Delivery',
      'Pediatric Care & Immunization',
      'Emergency First Aid & Trauma',
    ],
    diagnostics: ['Whole Blood Clotting Test', 'Digital X-Ray', 'Basic Pathology', 'Ultrasound USG'],
    beds: {
      generalTotal: 50,
      generalAvailable: 16,
      icuTotal: 4,
      icuAvailable: 2,
      oxygenTotal: 25,
      oxygenAvailable: 8,
      maternityTotal: 15,
      maternityAvailable: 5,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '52 Vials Available (24x7 Ready)',
      },
      {
        name: 'Oxytocin & Methylergometrine',
        marathiName: 'प्रसूती अत्यावश्यक औषधे',
        category: 'Maternity',
        status: 'in_stock',
        quantityNote: '90 Ampoules',
      },
    ],
    ayushmanMitra: {
      name: 'Prakash Jagtap',
      phone: '98224-77120',
      deskLocation: 'OPD Registration Counter',
    },
    opdTiming: 'Daily: 8:30 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-bhor-01',
        name: 'Dr. Santosh Salunkhe',
        marathiName: 'डॉ. संतोष साळुंखे',
        specialization: 'General Surgery & Rural Emergency',
        designation: 'Medical Superintendent',
        isGovernment: true,
        conditionsSpecialized: ['Snakebites', 'Acute Appendicitis', 'Road Trauma'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 14,
        consultationFee: '₹0 (Free Govt)',
        qualifications: 'MBBS, MS (General Surgery)',
        regNumber: 'MMC-2010/05/1420',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free)',
      opdRegistrationFee: '₹10 (Govt Token)',
      emergencyAmbulance: '108 Free Service (₹0)',
      mjpjayCashlessNote: '100% Free for all Ration Card holders',
    },
    laboratories: [
      {
        id: 'lab-bhor-01',
        name: 'Bhor Rural Pathology & Testing Unit',
        timing: 'Open 24/7',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Complete Blood Count (CBC)', category: 'Pathology', price: '₹0 (Free Govt)', reportTurnaround: '45 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Santosh Salunkhe',
      designation: 'Medical Superintendent (RH Bhor)',
      officialPhone: '02113-222540',
      officialEmail: 'rhbhor.pune@maharashtra.gov.in',
      officeLocation: 'Room 102 Admin Wing',
      grievanceOfficeLocation: 'Grievance Counter 1',
    },
  },

  // 3. MUMBAI - KEM HOSPITAL & GS MEDICAL COLLEGE
  {
    id: 'fac-mum-01',
    name: 'King Edward Memorial (KEM) Hospital & Seth GS Medical College',
    marathiName: 'के.ई.एम. रुग्णालय व सेठ जी.एस. मेडिकल कॉलेज',
    hindiName: 'के.ई.एम. अस्पताल एवं मेडिकल कॉलेज',
    type: 'Govt Medical College',
    district: 'Mumbai City',
    taluka: 'Parel',
    address: 'Acharya Donde Marg, Parel, Mumbai - 400012',
    coordinates: { lat: 19.0026, lng: 72.8427 },
    distance: '1.2 km from Parel/Elphinstone Station',
    status: 'Open 24/7 (Apex Tertiary Care)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '21 Sep 2026',
    phone: '022-24107000',
    emergencyPhone: '108 / 022-24136051',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Cardiothoracic Surgery',
      'Neurosurgery & Stroke Center',
      'Pediatric Surgery & NICU',
      'Dialysis & Renal Transplant',
      'Trauma & Emergency Resuscitation',
    ],
    diagnostics: ['3T MRI', '256-Slice CT Scan', 'Digital Mammography', 'Automated Central Lab', 'Cath Lab'],
    beds: {
      generalTotal: 1800,
      generalAvailable: 210,
      icuTotal: 160,
      icuAvailable: 18,
      oxygenTotal: 600,
      oxygenAvailable: 95,
      maternityTotal: 180,
      maternityAvailable: 28,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '150 Vials Ready',
      },
      {
        name: 'Tenecteplase & Heparin',
        marathiName: 'रक्त गोठण्याविरोधी औषध',
        category: 'Emergency Cardiac',
        status: 'in_stock',
        quantityNote: '60 Vials',
      },
    ],
    ayushmanMitra: {
      name: 'Nitin Sawant',
      phone: '98201-99841',
      deskLocation: 'Ground Floor New Building Entrance',
    },
    opdTiming: 'Daily: 8:00 AM - 12:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-kem-01',
        name: 'Dr. Sangeeta Rawat',
        marathiName: 'डॉ. संगीता रावत',
        specialization: 'Neurology & Stroke Management',
        designation: 'Dean & Director (Medical)',
        isGovernment: true,
        conditionsSpecialized: ['Stroke Thrombolysis', 'Epilepsy', 'Neurological Emergencies'],
        opdDays: 'Mon, Wed, Fri',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 28,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MD, DM (Neurology) - MMC: 1995/02/0411',
        regNumber: 'MMC-1995/02/0411',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Ambulance (₹0)',
      mjpjayCashlessNote: '100% Cashless Treatment',
    },
    laboratories: [
      {
        id: 'lab-kem-01',
        name: 'Central 24x7 Robotic Automated Diagnostic Lab',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Emergency Cardiac Troponin-I', category: 'Biochemistry', price: '₹0 (Free)', reportTurnaround: '25 Mins', isAvailable: true },
          { name: 'CT Brain & Whole Body Trauma', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Sangeeta Rawat',
      designation: 'Dean, KEM Hospital & GS Medical College',
      officialPhone: '022-24107000',
      officialEmail: 'dean.kem@mcgm.gov.in',
      officeLocation: 'Dean Office, Heritage Building 1st Floor',
      grievanceOfficeLocation: 'Grievance Cell, Room 12 Ground Floor',
    },
  },

  // 4. MUMBAI - SION HOSPITAL & LTMGH
  {
    id: 'fac-mum-02',
    name: 'Lokmanya Tilak Municipal General Hospital (Sion Hospital)',
    marathiName: 'लोकमान्य टिळक सर्वोपचार रुग्णालय (सायन रुग्णालय)',
    hindiName: 'लोकमान्य तिलक म्युनिसिपल अस्पताल (सायन अस्पताल)',
    type: 'Govt Medical College',
    district: 'Mumbai Suburban',
    taluka: 'Sion',
    address: 'Sion West, Near Sion Railway Station, Mumbai - 400022',
    coordinates: { lat: 19.0368, lng: 72.8601 },
    distance: '0.4 km from Sion Station',
    status: 'Open 24/7 (Apex Trauma & Disaster Center)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '21 Sep 2026',
    phone: '022-24076381',
    emergencyPhone: '108 / 022-24063000',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Level 1 Apex Trauma Care',
      'Neurosurgery & Spine Trauma',
      'Neonatal ICU (NICU Level 3)',
      'Pediatric Emergency',
      'Burns Unit',
    ],
    diagnostics: ['High-Speed Trauma CT Scan', 'MRI', 'Digital X-Ray', 'Blood Gas Analyzer'],
    beds: {
      generalTotal: 1400,
      generalAvailable: 165,
      icuTotal: 110,
      icuAvailable: 12,
      oxygenTotal: 480,
      oxygenAvailable: 74,
      maternityTotal: 140,
      maternityAvailable: 19,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '120 Vials',
      },
      {
        name: 'Blood Plasma & Albumin',
        marathiName: 'अल्ब्युमिन इंजेक्शन',
        category: 'Critical Care',
        status: 'in_stock',
        quantityNote: '85 Units',
      },
    ],
    ayushmanMitra: {
      name: 'Vikas More',
      phone: '98192-33410',
      deskLocation: 'Trauma Building Ground Floor',
    },
    opdTiming: 'Mon-Sat: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-sion-01',
        name: 'Dr. Mohan Joshi',
        marathiName: 'डॉ. मोहन जोशी',
        specialization: 'Trauma & Emergency Surgery',
        designation: 'Dean & Professor of Surgery',
        isGovernment: true,
        conditionsSpecialized: ['Polytrauma', 'Emergency Laparotomy', 'Blunt Abdominal Injury'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '8:30 AM - 1:00 PM',
        experienceYears: 25,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MS (General Surgery), FRCS',
        regNumber: 'MMC-1997/06/1120',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage',
    },
    laboratories: [
      {
        id: 'lab-sion-01',
        name: 'Apex Trauma Emergency Laboratory',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Emergency Blood Gas & Electrolytes (ABG)', category: 'Biochemistry', price: '₹0 (Free)', reportTurnaround: '15 Mins', isAvailable: true },
          { name: 'Whole Body Trauma CT Scan', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '25 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Mohan Joshi',
      designation: 'Dean, LTMGH Sion Hospital',
      officialPhone: '022-24076381',
      officialEmail: 'dean.ltmg@mcgm.gov.in',
      officeLocation: 'Dean Office, College Building',
      grievanceOfficeLocation: 'Grievance Counter, Trauma Foyer',
    },
  },

  // 5. GADCHIROLI - TRIBAL HUB (SDH AHERI)
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
    distance: '3.2 km from Aheri Town',
    status: 'Open 24/7 (Emergency & Snakebite Care)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
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

  // 6. GADCHIROLI - DISTRICT CIVIL HOSPITAL
  {
    id: 'fac-gad-02',
    name: 'District Civil Hospital Gadchiroli',
    marathiName: 'जिल्हा सामान्य रुग्णालय गडचिरोली',
    hindiName: 'जिला सामान्य अस्पताल गढ़चिरौली',
    type: 'District Hospital',
    district: 'Gadchiroli',
    taluka: 'Gadchiroli',
    address: 'Civil Hospital Road, Near Collector Office, Gadchiroli - 442605',
    coordinates: { lat: 20.1809, lng: 79.9984 },
    distance: '1.5 km from Gadchiroli Bus Stand',
    status: 'Open 24/7 (District Apex Facility)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '07132-222140',
    emergencyPhone: '108 / 07132-222108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Sickle Cell Disease Management Unit',
      'Intensive Care (ICU & NICU)',
      'Orthopedic Surgery & Trauma',
      'Maternal & Child Health Wing',
    ],
    diagnostics: ['Digital X-Ray', 'CT Scan', 'Blood Component Separation', 'Hemoglobin Electrophoresis'],
    beds: {
      generalTotal: 300,
      generalAvailable: 52,
      icuTotal: 20,
      icuAvailable: 4,
      oxygenTotal: 120,
      oxygenAvailable: 28,
      maternityTotal: 60,
      maternityAvailable: 11,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '110 Vials in Stock',
      },
      {
        name: 'Hydroxyurea (Sickle Cell)',
        marathiName: 'सिकलसेल औषध',
        category: 'Specialized',
        status: 'in_stock',
        quantityNote: '450 Strips',
      },
    ],
    ayushmanMitra: {
      name: 'Prakash Madavi',
      phone: '94221-55091',
      deskLocation: 'Main OPD Gate Counter',
    },
    opdTiming: 'Mon-Sat: 8:00 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-gad-dh-01',
        name: 'Dr. Madhuri Salve',
        marathiName: 'डॉ. माधुरी साळवे',
        specialization: 'General Medicine & Sickle Cell',
        designation: 'Civil Surgeon & Chief Medical Officer',
        isGovernment: true,
        conditionsSpecialized: ['Sickle Cell Crisis', 'Snakebites', 'Malaria Complications'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 19,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (Medicine)',
        regNumber: 'MMC-2005/03/1209',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free Govt / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free / MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Service (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage',
    },
    laboratories: [
      {
        id: 'lab-gad-dh-01',
        name: 'District Central Diagnostic Lab & Blood Bank',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Sickle Cell Solubility & Electrophoresis', category: 'Specialized', price: '₹0 (Free Govt)', reportTurnaround: '1.5 Hours', isAvailable: true },
          { name: 'Emergency 20WBCT Snakebite Test', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Madhuri Salve',
      designation: 'Civil Surgeon, District Hospital Gadchiroli',
      officialPhone: '07132-222140',
      officialEmail: 'cs.gadchiroli@maharashtra.gov.in',
      officeLocation: 'Civil Surgeon Office, 1st Floor Admin Block',
      grievanceOfficeLocation: 'Grievance Redressal Cell Counter 1',
    },
  },

  // 7. NAGPUR - GOVERNMENT MEDICAL COLLEGE (GMCH NAGPUR)
  {
    id: 'fac-nag-01',
    name: 'Government Medical College & Hospital (GMCH) Nagpur',
    marathiName: 'शासकीय वैद्यकीय महाविद्यालय व रुग्णालय नागपूर',
    hindiName: 'सरकारी मेडिकल कॉलेज एवं अस्पताल नागपुर',
    type: 'Govt Medical College',
    district: 'Nagpur',
    taluka: 'Nagpur City',
    address: 'Medical Square, Hanuman Nagar, Nagpur - 440003',
    coordinates: { lat: 21.1275, lng: 79.0963 },
    distance: '2.5 km from Nagpur Railway Station',
    status: 'Open 24/7 (Vidarbha Apex Medical College)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '0712-2744671',
    emergencyPhone: '108 / 0712-2744108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Cardiothoracic Surgery & Interventional Cardiology',
      'Neuro-Trauma & Spine Surgery',
      'Anti-Snake Venom (ASV) Center',
      'Nephrology & Hemodialysis (40 Beds)',
      'Pediatric Surgery & Neonatology',
      'Regional Cancer Institute (Radiotherapy & Chemotherapy)',
    ],
    diagnostics: ['3T MRI', 'Dual Source CT Scan', 'Digital Cath Lab', 'Nuclear Medicine', 'Blood Component Center'],
    beds: {
      generalTotal: 1600,
      generalAvailable: 195,
      icuTotal: 140,
      icuAvailable: 16,
      oxygenTotal: 520,
      oxygenAvailable: 82,
      maternityTotal: 160,
      maternityAvailable: 24,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '160 Vials Available',
      },
      {
        name: 'Anti-Rabies Immunoglobulin',
        marathiName: 'रेबीज इम्युनोग्लोब्युलिन',
        category: 'Vaccine',
        status: 'in_stock',
        quantityNote: '110 Doses',
      },
    ],
    ayushmanMitra: {
      name: 'Dinesh Meshram',
      phone: '98231-66520',
      deskLocation: 'OPD Registration Building Foyer',
    },
    opdTiming: 'Daily: 8:00 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-nag-01',
        name: 'Dr. Raj Gajbhiye',
        marathiName: 'डॉ. राज गजभिये',
        specialization: 'Surgical Gastroenterology & Trauma',
        designation: 'Dean & Professor of Surgery',
        isGovernment: true,
        conditionsSpecialized: ['Complex Abdominal Trauma', 'GI Emergencies', 'Hepatobiliary Surgery'],
        opdDays: 'Tue, Thu, Sat',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 26,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MS (Surgery), MCh (GI Surgery) - MMC: 1996/07/1420',
        regNumber: 'MMC-1996/07/1420',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Ambulance (₹0)',
      mjpjayCashlessNote: '100% Cashless Treatment',
    },
    laboratories: [
      {
        id: 'lab-nag-01',
        name: 'Central 24x7 Emergency Diagnostic Complex',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Cardiac Troponin-I & CPK-MB', category: 'Biochemistry', price: '₹0 (Free)', reportTurnaround: '30 Mins', isAvailable: true },
          { name: 'Emergency 128-Slice Head CT', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Raj Gajbhiye',
      designation: 'Dean, Government Medical College Nagpur',
      officialPhone: '0712-2744671',
      officialEmail: 'dean.gmcnagpur@maharashtra.gov.in',
      officeLocation: 'Dean Office, Administrative Complex',
      grievanceOfficeLocation: 'Grievance Cell Counter 1, OPD Foyer',
    },
  },

  // 8. NASHIK - DISTRICT CIVIL HOSPITAL
  {
    id: 'fac-nas-01',
    name: 'District Civil Hospital Nashik',
    marathiName: 'जिल्हा सामान्य रुग्णालय नाशिक',
    hindiName: 'जिला सामान्य अस्पताल नासिक',
    type: 'District Hospital',
    district: 'Nashik',
    taluka: 'Nashik',
    address: 'Trimbak Road, Near CBS, Nashik - 422002',
    coordinates: { lat: 19.9975, lng: 73.7898 },
    distance: '1.1 km from Nashik CBS',
    status: 'Open 24/7 (North Maharashtra Hub)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '0253-2572222',
    emergencyPhone: '108 / 0253-2572108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Trauma Care & Orthopedics',
      'Maternal & Neonatal Intensive Care',
      'General Surgery & Laparoscopy',
      'Blood Component Separation Unit',
    ],
    diagnostics: ['Digital X-Ray', 'CT Scan', 'Sonography', 'Automated Pathology'],
    beds: {
      generalTotal: 650,
      generalAvailable: 84,
      icuTotal: 36,
      icuAvailable: 6,
      oxygenTotal: 220,
      oxygenAvailable: 38,
      maternityTotal: 90,
      maternityAvailable: 15,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '95 Vials in Emergency Reserve',
      },
    ],
    ayushmanMitra: {
      name: 'Sachin Patil',
      phone: '98229-44120',
      deskLocation: 'Main OPD Hall',
    },
    opdTiming: 'Daily: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-nas-01',
        name: 'Dr. Charudatta Shinde',
        marathiName: 'डॉ. चारुदत्त शिंदे',
        specialization: 'General Medicine & Toxic Envenomation',
        designation: 'Civil Surgeon',
        isGovernment: true,
        conditionsSpecialized: ['Viper Snakebites', 'Organophosphate Poisoning', 'Respiratory Emergencies'],
        opdDays: 'Mon-Sat',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 20,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (Medicine)',
        regNumber: 'MMC-2003/05/1190',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free)',
      opdRegistrationFee: '₹10 (Govt OPD Slip)',
      emergencyAmbulance: '108 Free (₹0)',
      mjpjayCashlessNote: '100% Cashless Care',
    },
    laboratories: [
      {
        id: 'lab-nas-01',
        name: 'Nashik Central Pathology & 20WBCT Unit',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: '20WBCT Whole Blood Clotting Test', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Digital Chest X-Ray', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Charudatta Shinde',
      designation: 'Civil Surgeon, Civil Hospital Nashik',
      officialPhone: '0253-2572222',
      officialEmail: 'cs.nashik@maharashtra.gov.in',
      officeLocation: 'Room 101 Admin Block',
      grievanceOfficeLocation: 'Grievance Desk Room 103',
    },
  },

  // 9. CHHATRAPATI SAMBHAJINAGAR - GMCH
  {
    id: 'fac-csn-01',
    name: 'Government Medical College & Hospital (GMCH) Sambhajinagar',
    marathiName: 'शासकीय वैद्यकीय महाविद्यालय व रुग्णालय छत्रपती संभाजीनगर',
    hindiName: 'सरकारी मेडिकल कॉलेज एवं अस्पताल संभाजीनगर',
    type: 'Govt Medical College',
    district: 'Chhatrapati Sambhaji Nagar',
    taluka: 'Aurangabad',
    address: 'Panchakki Road, Ghati, Chhatrapati Sambhajinagar - 431001',
    coordinates: { lat: 19.8698, lng: 75.3256 },
    distance: '2.0 km from Aurangabad Station',
    status: 'Open 24/7 (Marathwada Apex Facility - Ghati)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '0240-2402412',
    emergencyPhone: '108 / 0240-2402108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Cardiology & Cardiac Surgery',
      'Neurology & Trauma Care',
      'Anti-Snake Venom (ASV) 24/7',
      'Nephrology & Dialysis',
      'Pediatrics & Neonatal Intensive Care',
    ],
    diagnostics: ['CT Scan', 'MRI', 'Cath Lab', '24x7 Blood Component Unit'],
    beds: {
      generalTotal: 1200,
      generalAvailable: 145,
      icuTotal: 90,
      icuAvailable: 11,
      oxygenTotal: 400,
      oxygenAvailable: 58,
      maternityTotal: 130,
      maternityAvailable: 18,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '130 Vials in Stock',
      },
    ],
    ayushmanMitra: {
      name: 'Gajanan Deshmukh',
      phone: '98234-55190',
      deskLocation: 'Ghati Main Gate Registration Counter',
    },
    opdTiming: 'Daily: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-csn-01',
        name: 'Dr. Shivaji Sukre',
        marathiName: 'डॉ. शिवाजी सुक्रे',
        specialization: 'General Surgery & Trauma',
        designation: 'Dean & Professor',
        isGovernment: true,
        conditionsSpecialized: ['Polytrauma', 'Emergency Surgery', 'GI Perforations'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 24,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MS (Surgery) - MMC: 1998/08/1920',
        regNumber: 'MMC-1998/08/1920',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY 2.0)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Care',
    },
    laboratories: [
      {
        id: 'lab-csn-01',
        name: 'Ghati Central Emergency Pathology Lab',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Emergency Cardiac Biomarkers', category: 'Biochemistry', price: '₹0 (Free)', reportTurnaround: '30 Mins', isAvailable: true },
          { name: 'Whole Body Trauma CT', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '35 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Shivaji Sukre',
      designation: 'Dean, GMCH Chhatrapati Sambhajinagar',
      officialPhone: '0240-2402412',
      officialEmail: 'dean.gmcsambhajinagar@maharashtra.gov.in',
      officeLocation: 'Dean Office, Administrative Building',
      grievanceOfficeLocation: 'Grievance Redressal Cell, Room 105',
    },
  },

  // 10. PALGHAR - TRIBAL HUB (SDH JAWHAR & DAHANU)
  {
    id: 'fac-pal-01',
    name: 'Sub-District Hospital (SDH) Dahanu',
    marathiName: 'उपजिल्हा रुग्णालय डहाणू',
    hindiName: 'उप-जिला अस्पताल डहाणू',
    type: 'Sub-District Hospital',
    district: 'Palghar',
    taluka: 'Dahanu',
    address: 'Near Dahanu Beach Road, Dahanu, Palghar - 401601',
    coordinates: { lat: 19.9729, lng: 72.7314 },
    distance: '2.5 km from Dahanu Road Station',
    status: 'Open 24/7 (Coastal & Tribal Care Hub)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '02528-222108',
    emergencyPhone: '108 / 02528-222108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Maternity & FRU C-Section Care',
      'Malnutrition Treatment Center (MTC)',
      'Pediatric Care',
    ],
    diagnostics: ['20WBCT Whole Blood Clotting Test', 'Digital X-Ray', 'Basic Pathology'],
    beds: {
      generalTotal: 100,
      generalAvailable: 22,
      icuTotal: 6,
      icuAvailable: 2,
      oxygenTotal: 35,
      oxygenAvailable: 9,
      maternityTotal: 25,
      maternityAvailable: 6,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '65 Vials Available 24x7',
      },
    ],
    ayushmanMitra: {
      name: 'Rupesh Vartha',
      phone: '98221-88401',
      deskLocation: 'OPD Foyer Counter 1',
    },
    opdTiming: 'Mon-Sat: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-pal-01',
        name: 'Dr. Sachin Vartak',
        marathiName: 'डॉ. सचिन वर्तक',
        specialization: 'General Medicine & Toxic Envenomation',
        designation: 'Medical Superintendent',
        isGovernment: true,
        conditionsSpecialized: ['Viper Snakebites', 'Severe Anemia in Pregnancy', 'Malnutrition'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:30 PM',
        experienceYears: 12,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (Medicine)',
        regNumber: 'MMC-2014/04/1109',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt Token)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage for Tribal & Rural Families',
    },
    laboratories: [
      {
        id: 'lab-pal-01',
        name: 'Dahanu Pathology & Snakebite Diagnostics',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Sachin Vartak',
      designation: 'Medical Superintendent (SDH Dahanu)',
      officialPhone: '02528-222108',
      officialEmail: 'ms.sdhdahanu@maharashtra.gov.in',
      officeLocation: 'Admin Block Room 102',
      grievanceOfficeLocation: 'Grievance Desk OPD Counter 2',
    },
  },

  // 11. KOLHAPUR - CPR HOSPITAL & GMC KOLHAPUR
  {
    id: 'fac-kol-01',
    name: 'Chhatrapati Pramila Raje (CPR) General Hospital & GMC Kolhapur',
    marathiName: 'छत्रपती प्रमिला राजे (CPR) सर्वोपचार रुग्णालय कोल्हापूर',
    hindiName: 'छत्रपति प्रमिला राजे (CPR) जनरल अस्पताल कोल्हापुर',
    type: 'Govt Medical College',
    district: 'Kolhapur',
    taluka: 'Karveer',
    address: 'Bhavani Mandap Road, Near Dasara Chowk, Kolhapur - 416002',
    coordinates: { lat: 16.6944, lng: 74.2236 },
    distance: '1.8 km from Kolhapur CBS',
    status: 'Open 24/7 (South Maharashtra Apex Facility)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '0231-2641555',
    emergencyPhone: '108 / 0231-2641108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Trauma Care & Orthopedic Surgery',
      'Cardiology & ICU Care',
      'Anti-Snake Venom (ASV) 24/7',
      'Maternity, C-Section & NICU',
      'General Surgery & Laparoscopy',
    ],
    diagnostics: ['CT Scan', 'Digital X-Ray', 'Ultrasound Color Doppler', '24x7 Central Pathology'],
    beds: {
      generalTotal: 750,
      generalAvailable: 98,
      icuTotal: 45,
      icuAvailable: 7,
      oxygenTotal: 260,
      oxygenAvailable: 42,
      maternityTotal: 95,
      maternityAvailable: 16,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '105 Vials Ready',
      },
    ],
    ayushmanMitra: {
      name: 'Tanaji Patil',
      phone: '98223-11920',
      deskLocation: 'Main Foyer Counter 1',
    },
    opdTiming: 'Daily: 8:00 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-kol-01',
        name: 'Dr. Pradeep Dixit',
        marathiName: 'डॉ. प्रदीप दीक्षित',
        specialization: 'General Surgery & Trauma',
        designation: 'Dean & Professor',
        isGovernment: true,
        conditionsSpecialized: ['Polytrauma', 'Emergency Laparotomy', 'Snakebite Critical Management'],
        opdDays: 'Mon-Sat',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 22,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MS (Surgery) - MMC: 2001/04/1810',
        regNumber: 'MMC-2001/04/1810',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage across 996 Procedures',
    },
    laboratories: [
      {
        id: 'lab-kol-01',
        name: 'CPR Central Diagnostic Laboratory',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: '128-Slice CT Scan', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Pradeep Dixit',
      designation: 'Dean, CPR Hospital & GMC Kolhapur',
      officialPhone: '0231-2641555',
      officialEmail: 'dean.gmckolhapur@maharashtra.gov.in',
      officeLocation: 'Dean Office, Administrative Building',
      grievanceOfficeLocation: 'Grievance Cell Counter 1',
    },
  },

  // 12. NANDED - DR. SC GMC NANDED
  {
    id: 'fac-nan-01',
    name: 'Dr. Shankarrao Chavan Govt Medical College & Hospital Nanded',
    marathiName: 'डॉ. शंकरराव चव्हाण शासकीय वैद्यकीय महाविद्यालय व रुग्णालय नांदेड',
    hindiName: 'डॉ. शंकरराव चव्हाण सरकारी मेडिकल कॉलेज नांदेड़',
    type: 'Govt Medical College',
    district: 'Nanded',
    taluka: 'Nanded',
    address: 'Vishnupuri, Nanded - 431606',
    coordinates: { lat: 19.1172, lng: 77.2917 },
    distance: '4.5 km from Nanded Railway Station',
    status: 'Open 24/7 (Marathwada Regional Hub)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '02462-229230',
    emergencyPhone: '108 / 02462-229108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Pediatric Intensive Care & NICU',
      'Anti-Snake Venom (ASV) 24/7',
      'Nephrology & Dialysis',
      'General Surgery & Orthopedics',
      'Maternal & High-Risk Obstetric Care',
    ],
    diagnostics: ['CT Scan', 'Digital X-Ray', 'Ultrasound Sonography', '24x7 Blood Bank'],
    beds: {
      generalTotal: 850,
      generalAvailable: 112,
      icuTotal: 50,
      icuAvailable: 8,
      oxygenTotal: 290,
      oxygenAvailable: 46,
      maternityTotal: 110,
      maternityAvailable: 17,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '115 Vials in Stock',
      },
    ],
    ayushmanMitra: {
      name: 'Balaji Kadam',
      phone: '94228-44190',
      deskLocation: 'Vishnupuri Main Registration Counter',
    },
    opdTiming: 'Daily: 8:00 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-nan-01',
        name: 'Dr. Dilip Mhaisekar',
        marathiName: 'डॉ. दिलीप म्हैसेकर',
        specialization: 'Pulmonology & Critical Care',
        designation: 'Dean & Senior Professor',
        isGovernment: true,
        conditionsSpecialized: ['Acute Respiratory Distress', 'Snakebite Envenomation', 'Pneumonia Complications'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 25,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MD (Chest & TB), FCCP',
        regNumber: 'MMC-1997/03/0940',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage',
    },
    laboratories: [
      {
        id: 'lab-nan-01',
        name: 'Vishnupuri 24x7 Emergency Laboratory',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Digital Head & Chest CT Scan', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '35 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Dilip Mhaisekar',
      designation: 'Dean, Dr. SC GMC Nanded',
      officialPhone: '02462-229230',
      officialEmail: 'dean.gmcnanded@maharashtra.gov.in',
      officeLocation: 'Dean Office, Administrative Building',
      grievanceOfficeLocation: 'Grievance Redressal Cell Room 104',
    },
  },

  // 13. NANDURBAR - DISTRICT CIVIL HOSPITAL (TRIBAL ZONE)
  {
    id: 'fac-ndb-01',
    name: 'District Civil Hospital Nandurbar',
    marathiName: 'जिल्हा सामान्य रुग्णालय नंदुरबार',
    hindiName: 'जिला सामान्य अस्पताल नंदुरबार',
    type: 'District Hospital',
    district: 'Nandurbar',
    taluka: 'Nandurbar',
    address: 'Near Nehru Statue, Civil Hospital Road, Nandurbar - 425412',
    coordinates: { lat: 21.3739, lng: 74.2403 },
    distance: '1.2 km from Nandurbar Bus Station',
    status: 'Open 24/7 (Tribal Envenomation & Malnutrition Apex)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '02564-222340',
    emergencyPhone: '108 / 02564-222108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Sickle Cell & Thalassemia Center',
      'Nutritional Rehabilitation Center (NRC)',
      'Maternal & Neonatal Intensive Care',
      'Emergency Trauma Care',
    ],
    diagnostics: ['Sickling Test & Solubility', '20WBCT Clotting Test', 'Digital X-Ray', 'Ultrasound USG'],
    beds: {
      generalTotal: 350,
      generalAvailable: 48,
      icuTotal: 22,
      icuAvailable: 4,
      oxygenTotal: 130,
      oxygenAvailable: 26,
      maternityTotal: 70,
      maternityAvailable: 12,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम (ASV)',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '120 Vials in Tribal Reserve',
      },
      {
        name: 'Folic Acid & Hydroxyurea (Sickle Cell)',
        marathiName: 'सिकलसेल गोळ्या',
        category: 'Specialized',
        status: 'in_stock',
        quantityNote: '500 Strips Available',
      },
    ],
    ayushmanMitra: {
      name: 'Chetan Valvi',
      phone: '94239-66120',
      deskLocation: 'OPD Counter 1 Ground Floor',
    },
    opdTiming: 'Daily: 8:00 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-ndb-01',
        name: 'Dr. Rajesh Padvi',
        marathiName: 'डॉ. राजेश पाडवी',
        specialization: 'Tribal Medicine & Envenomation',
        designation: 'Civil Surgeon',
        isGovernment: true,
        conditionsSpecialized: ['Saw-scaled Viper Snakebite', 'Severe Pediatric Malnutrition', 'Sickle Cell Anemia'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 17,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (General Medicine)',
        regNumber: 'MMC-2007/04/1420',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free / MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless for All Tribal & Rural Citizens',
    },
    laboratories: [
      {
        id: 'lab-ndb-01',
        name: 'Nandurbar Tribal Health Diagnostic Lab',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Sickle Cell Solubility Test', category: 'Specialized', price: '₹0 (Free Govt)', reportTurnaround: '1 Hour', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Rajesh Padvi',
      designation: 'Civil Surgeon, Civil Hospital Nandurbar',
      officialPhone: '02564-222340',
      officialEmail: 'cs.nandurbar@maharashtra.gov.in',
      officeLocation: 'Civil Surgeon Office, Admin Block',
      grievanceOfficeLocation: 'Grievance Desk Room 102',
    },
  },

  // 14. THANE - CSMH KALWA
  {
    id: 'fac-tha-01',
    name: 'Chhatrapati Shivaji Maharaj Hospital & Kalwa Medical College',
    marathiName: 'छत्रपती शिवाजी महाराज रुग्णालय व राजीव गांधी मेडिकल कॉलेज कळवा',
    hindiName: 'छत्रपति शिवाजी महाराज अस्पताल कलवा ठाणे',
    type: 'Govt Medical College',
    district: 'Thane',
    taluka: 'Thane',
    address: 'Belapur Road, Kalwa, Thane West - 400605',
    coordinates: { lat: 19.1950, lng: 72.9935 },
    distance: '1.5 km from Kalwa Station',
    status: 'Open 24/7 (Thane Metro Apex Facility)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '022-25372555',
    emergencyPhone: '108 / 022-25371108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Emergency Trauma & Orthopedics',
      'Anti-Snake Venom (ASV) Center',
      'Maternal & Pediatric Intensive Care',
      'Nephrology & Dialysis',
    ],
    diagnostics: ['CT Scan', 'Digital X-Ray', 'Automated Biochemistry', '24x7 Blood Bank'],
    beds: {
      generalTotal: 500,
      generalAvailable: 68,
      icuTotal: 35,
      icuAvailable: 5,
      oxygenTotal: 180,
      oxygenAvailable: 32,
      maternityTotal: 70,
      maternityAvailable: 11,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '80 Vials Available',
      },
    ],
    ayushmanMitra: {
      name: 'Sunil Shinde',
      phone: '98205-77120',
      deskLocation: 'Kalwa Hospital Main Registration Hall',
    },
    opdTiming: 'Daily: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-tha-01',
        name: 'Dr. Rakesh Barve',
        marathiName: 'डॉ. राकेश बर्वे',
        specialization: 'General Medicine & ICU',
        designation: 'Dean & Medical Superintendent',
        isGovernment: true,
        conditionsSpecialized: ['Acute Poisoning', 'Respiratory Distress', 'Infectious Diseases'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 20,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MD (Medicine)',
        regNumber: 'MMC-2002/05/1192',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt OPD Slip)',
      emergencyAmbulance: '108 Free (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage',
    },
    laboratories: [
      {
        id: 'lab-tha-01',
        name: 'Kalwa Emergency Diagnostic Unit',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: 'Cardiac Enzymes & Troponin', category: 'Biochemistry', price: '₹0 (Free)', reportTurnaround: '30 Mins', isAvailable: true },
          { name: 'Head & Trauma CT Scan', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Rakesh Barve',
      designation: 'Dean, Rajiv Gandhi Medical College & CSMH Kalwa',
      officialPhone: '022-25372555',
      officialEmail: 'dean.rgmc@thanecity.gov.in',
      officeLocation: 'Dean Office, 1st Floor',
      grievanceOfficeLocation: 'Grievance Counter 1',
    },
  },

  // 15. AMRAVATI - DISTRICT CIVIL HOSPITAL (IRWIN HOSPITAL)
  {
    id: 'fac-amr-01',
    name: 'District Civil Hospital (Irwin Hospital) Amravati',
    marathiName: 'जिल्हा सामान्य रुग्णालय (आयर्विन) अमरावती',
    hindiName: 'जिला सामान्य अस्पताल (इरविन) अमरावती',
    type: 'District Hospital',
    district: 'Amravati',
    taluka: 'Amravati',
    address: 'Near Rajkamal Square, Civil Hospital Road, Amravati - 444601',
    coordinates: { lat: 20.9320, lng: 77.7523 },
    distance: '1.0 km from Amravati Station',
    status: 'Open 24/7 (Melghat Tribal Referral Hub)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '0721-2662244',
    emergencyPhone: '108 / 0721-2662108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Melghat Tribal Malnutrition & Envenomation Center',
      'Anti-Snake Venom (ASV) 24/7',
      'Trauma Care & Orthopedic Surgery',
      'Maternal & Neonatal ICU (NICU Level 2)',
    ],
    diagnostics: ['CT Scan', 'Digital X-Ray', 'Color Doppler Sonography', '24x7 Pathology'],
    beds: {
      generalTotal: 500,
      generalAvailable: 72,
      icuTotal: 30,
      icuAvailable: 5,
      oxygenTotal: 190,
      oxygenAvailable: 34,
      maternityTotal: 80,
      maternityAvailable: 14,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '110 Vials in Stock',
      },
    ],
    ayushmanMitra: {
      name: 'Anil Deshmukh',
      phone: '98224-11890',
      deskLocation: 'Irwin Hospital Main OPD Counter',
    },
    opdTiming: 'Daily: 8:00 AM - 1:30 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-amr-01',
        name: 'Dr. Tarachand Meshram',
        marathiName: 'डॉ. ताराचंद मेश्राम',
        specialization: 'General Medicine & Toxic Envenomation',
        designation: 'Civil Surgeon',
        isGovernment: true,
        conditionsSpecialized: ['Melghat Tribal Snakebites', 'Severe Malnutrition Complications', 'Pneumonia'],
        opdDays: 'Daily (Mon-Sat)',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 21,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MD (Medicine)',
        regNumber: 'MMC-2001/03/0890',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free under MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free under MJPJAY)',
      oxygenCharges: '₹0 (Free)',
      opdRegistrationFee: '₹10 (Govt OPD Paper)',
      emergencyAmbulance: '108 Free (₹0)',
      mjpjayCashlessNote: '100% Cashless Coverage',
    },
    laboratories: [
      {
        id: 'lab-amr-01',
        name: 'Irwin Central Diagnostic Unit',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Digital Chest X-Ray', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '25 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Tarachand Meshram',
      designation: 'Civil Surgeon, District Civil Hospital Amravati',
      officialPhone: '0721-2662244',
      officialEmail: 'cs.amravati@maharashtra.gov.in',
      officeLocation: 'Admin Room 101',
      grievanceOfficeLocation: 'Grievance Counter 1',
    },
  },

  // 16. SATARA - CIVIL HOSPITAL
  {
    id: 'fac-sat-01',
    name: 'District Civil Hospital Satara (Kranti Sinh Nana Patil Hospital)',
    marathiName: 'क्रांतीसिंह नाना पाटील जिल्हा सर्वोपचार रुग्णालय सातारा',
    hindiName: 'जिला सामान्य अस्पताल सतारा',
    type: 'District Hospital',
    district: 'Satara',
    taluka: 'Satara',
    address: 'Sadar Bazar Road, Near ST Stand, Satara - 415001',
    coordinates: { lat: 17.6805, lng: 74.0183 },
    distance: '1.2 km from Satara CBS',
    status: 'Open 24/7 (Western Ghats Care Hub)',
    verifiedStatus: 'verified',
    lastVerifiedDate: '22 Sep 2026',
    phone: '02162-234222',
    emergencyPhone: '108 / 02162-234108',
    mjpjayEmpanelled: true,
    ayushmanEmpanelled: true,
    emergencyAvailable: true,
    specialties: [
      'Anti-Snake Venom (ASV) 24/7',
      'Trauma Care & General Surgery',
      'Maternity & FRU C-Section Care',
      'Dialysis Unit',
    ],
    diagnostics: ['Digital X-Ray', 'CT Scan', 'Ultrasound USG', 'Pathology Lab'],
    beds: {
      generalTotal: 400,
      generalAvailable: 56,
      icuTotal: 24,
      icuAvailable: 4,
      oxygenTotal: 150,
      oxygenAvailable: 28,
      maternityTotal: 65,
      maternityAvailable: 11,
    },
    medicines: [
      {
        name: 'Anti-Snake Venom (ASV Polyvalent)',
        marathiName: 'अँटी-स्नेक व्हेनम',
        category: 'Antivenom',
        status: 'in_stock',
        quantityNote: '85 Vials in Stock',
      },
    ],
    ayushmanMitra: {
      name: 'Mahesh Jadhav',
      phone: '98227-33190',
      deskLocation: 'Satara Civil Hospital Entrance',
    },
    opdTiming: 'Daily: 8:00 AM - 1:00 PM | Emergency 24/7',
    doctors: [
      {
        id: 'doc-sat-01',
        name: 'Dr. Subhash Chavan',
        marathiName: 'डॉ. सुभाष चव्हाण',
        specialization: 'General Surgery & Trauma',
        designation: 'Civil Surgeon',
        isGovernment: true,
        conditionsSpecialized: ['Snakebites', 'Road Accidents', 'Abdominal Emergencies'],
        opdDays: 'Mon-Sat',
        opdTimings: '9:00 AM - 1:00 PM',
        experienceYears: 18,
        consultationFee: '₹0 (Free / MJPJAY)',
        qualifications: 'MBBS, MS (Surgery)',
        regNumber: 'MMC-2004/06/1811',
        status: 'available',
      },
    ],
    charges: {
      generalBedDaily: '₹0 (Free / MJPJAY 2.0)',
      icuBedDaily: '₹0 (Free / MJPJAY)',
      oxygenCharges: '₹0 (Free 24x7)',
      opdRegistrationFee: '₹10 (Govt Token)',
      emergencyAmbulance: '108 Free Emergency (₹0)',
      mjpjayCashlessNote: '100% Cashless Treatment',
    },
    laboratories: [
      {
        id: 'lab-sat-01',
        name: 'Satara Civil Central Diagnostic Lab',
        timing: '24x7 Open',
        isOpen247: true,
        tests: [
          { name: '20-min Whole Blood Clotting Test (20WBCT)', category: 'Pathology', price: '₹0 (Free)', reportTurnaround: '20 Mins', isAvailable: true },
          { name: 'Digital Head CT Scan', category: 'Radiology', price: '₹0 (MJPJAY)', reportTurnaround: '30 Mins', isAvailable: true },
        ],
      },
    ],
    director: {
      name: 'Dr. Subhash Chavan',
      designation: 'Civil Surgeon, District Hospital Satara',
      officialPhone: '02162-234222',
      officialEmail: 'cs.satara@maharashtra.gov.in',
      officeLocation: 'Admin Room 101',
      grievanceOfficeLocation: 'Grievance Desk Room 102',
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
    id: 'bb-mum-01',
    name: 'KEM Hospital Central Blood Bank & Component Lab',
    district: 'Mumbai City',
    taluka: 'Parel',
    address: 'Acharya Donde Marg, KEM Hospital, Parel, Mumbai - 400012',
    contactNumber: '022-24107000',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 58, status: 'Available' },
      'A-': { units: 12, status: 'Available' },
      'B+': { units: 64, status: 'Available' },
      'B-': { units: 10, status: 'Available' },
      'AB+': { units: 28, status: 'Available' },
      'AB-': { units: 5, status: 'Low' },
      'O+': { units: 82, status: 'Available' },
      'O-': { units: 14, status: 'Available' },
    },
    componentsAvailable: ['Whole Blood', 'PRBC', 'FFP', 'Single Donor Platelets (SDP)', 'Platelet Concentrate'],
  },
  {
    id: 'bb-nag-01',
    name: 'GMC Nagpur Regional Blood Transfusion Center',
    district: 'Nagpur',
    taluka: 'Nagpur City',
    address: 'Medical Square, GMCH Campus, Nagpur - 440003',
    contactNumber: '0712-2744671',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 44, status: 'Available' },
      'A-': { units: 8, status: 'Available' },
      'B+': { units: 52, status: 'Available' },
      'B-': { units: 7, status: 'Available' },
      'AB+': { units: 20, status: 'Available' },
      'AB-': { units: 4, status: 'Low' },
      'O+': { units: 60, status: 'Available' },
      'O-': { units: 8, status: 'Available' },
    },
    componentsAvailable: ['Whole Blood', 'PRBC', 'FFP', 'Platelet Concentrate'],
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
      'A+': { units: 18, status: 'Available' },
      'A-': { units: 2, status: 'Critical' },
      'B+': { units: 26, status: 'Available' },
      'B-': { units: 4, status: 'Low' },
      'AB+': { units: 10, status: 'Available' },
      'AB-': { units: 1, status: 'Critical' },
      'O+': { units: 32, status: 'Available' },
      'O-': { units: 3, status: 'Low' },
    },
    componentsAvailable: ['Whole Blood', 'Packed Red Blood Cells (PRBC)', 'Fresh Frozen Plasma (FFP)'],
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
  {
    id: 'bb-csn-01',
    name: 'Ghati Hospital Blood Bank Chhatrapati Sambhajinagar',
    district: 'Chhatrapati Sambhaji Nagar',
    taluka: 'Aurangabad',
    address: 'GMCH Campus, Ghati, Chhatrapati Sambhajinagar - 431001',
    contactNumber: '0240-2402412',
    timing: '24x7 Open Emergency Blood Bank',
    isGovt: true,
    stocks: {
      'A+': { units: 34, status: 'Available' },
      'A-': { units: 5, status: 'Low' },
      'B+': { units: 40, status: 'Available' },
      'B-': { units: 6, status: 'Low' },
      'AB+': { units: 16, status: 'Available' },
      'AB-': { units: 3, status: 'Critical' },
      'O+': { units: 48, status: 'Available' },
      'O-': { units: 6, status: 'Low' },
    },
    componentsAvailable: ['Whole Blood', 'PRBC', 'FFP', 'Platelets'],
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
    currentStageIndex: 6,
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
