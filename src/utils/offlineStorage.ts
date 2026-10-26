import type {
  HealthcareFacility,
  DigitalReferral,
  Grievance,
  OPDToken,
  PatientTreatmentJourney,
  BloodBank,
} from '../data/maharashtraHealthData';
import {
  MAHARASHTRA_FACILITIES,
  INITIAL_REFERRALS,
  INITIAL_GRIEVANCES,
  INITIAL_OPD_TOKENS,
  INITIAL_TREATMENT_JOURNEYS,
  MAHARASHTRA_BLOOD_BANKS,
} from '../data/maharashtraHealthData';

const STORAGE_KEYS = {
  FACILITIES: 'swasthya_setu_facilities',
  REFERRALS: 'swasthya_setu_referrals',
  PATIENTS: 'swasthya_setu_patients',
  GRIEVANCES: 'swasthya_setu_grievances',
  OPD_TOKENS: 'swasthya_setu_opd_tokens',
  TREATMENT_JOURNEYS: 'swasthya_setu_treatment_journeys',
  BLOOD_BANKS: 'swasthya_setu_blood_banks',
  SIMULATED_OFFLINE: 'swasthya_setu_simulated_offline',
  OFFLINE_SYNC_QUEUE: 'swasthya_setu_sync_queue',
  AUTH_SESSION: 'swasthya_setu_auth_session',
};

export interface RegisteredPatient {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  abhaId: string;
  rationCardType: 'yellow' | 'orange' | 'white';
  registeredAt: string;
  vitals?: {
    bp: string;
    spo2: string;
    pulse: string;
  };
}

export type AuthRole =
  | 'patient'
  | 'doctor'
  | 'worker'
  | 'hospital_staff'
  | 'dho'
  | 'collector'
  | 'admin';

export interface UserAuthSession {
  isLoggedIn: boolean;
  mobile: string;
  fullName: string;
  role: AuthRole;
  abhaId?: string;
  hospitalAffiliation?: string;
  licenseNumber?: string;
  district?: string;
}

export function initializeOfflineStorage(): void {
  try {
    const storedFacs = localStorage.getItem(STORAGE_KEYS.FACILITIES);
    if (!storedFacs || JSON.parse(storedFacs).length < MAHARASHTRA_FACILITIES.length) {
      localStorage.setItem(
        STORAGE_KEYS.FACILITIES,
        JSON.stringify(MAHARASHTRA_FACILITIES)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.REFERRALS)) {
      localStorage.setItem(
        STORAGE_KEYS.REFERRALS,
        JSON.stringify(INITIAL_REFERRALS)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.GRIEVANCES)) {
      localStorage.setItem(
        STORAGE_KEYS.GRIEVANCES,
        JSON.stringify(INITIAL_GRIEVANCES)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.OPD_TOKENS)) {
      localStorage.setItem(
        STORAGE_KEYS.OPD_TOKENS,
        JSON.stringify(INITIAL_OPD_TOKENS)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.TREATMENT_JOURNEYS)) {
      localStorage.setItem(
        STORAGE_KEYS.TREATMENT_JOURNEYS,
        JSON.stringify(INITIAL_TREATMENT_JOURNEYS)
      );
    }

    const storedBlood = localStorage.getItem(STORAGE_KEYS.BLOOD_BANKS);
    if (!storedBlood || JSON.parse(storedBlood).length < MAHARASHTRA_BLOOD_BANKS.length) {
      localStorage.setItem(
        STORAGE_KEYS.BLOOD_BANKS,
        JSON.stringify(MAHARASHTRA_BLOOD_BANKS)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      const demoPatients: RegisteredPatient[] = [
        {
          id: 'PAT-MH-01',
          fullName: 'Sunita Ravindra Jadhav',
          age: 29,
          gender: 'Female',
          mobile: '98221-44910',
          village: 'Kuran Budruk',
          taluka: 'Bhor',
          district: 'Pune',
          abhaId: '91-8842-1920-5512',
          rationCardType: 'orange',
          registeredAt: '28 Aug 2026',
        },
        {
          id: 'PAT-MH-02',
          fullName: 'Bandu Shankar Madavi',
          age: 42,
          gender: 'Male',
          mobile: '94218-33019',
          village: 'Kamke',
          taluka: 'Bhamragad',
          district: 'Gadchiroli',
          abhaId: '91-1029-4481-9920',
          rationCardType: 'yellow',
          registeredAt: '25 Aug 2026',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(demoPatients));
    }
  } catch (e) {
    console.warn('LocalStorage initialization warning', e);
  }
}

export function getStoredFacilities(): HealthcareFacility[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FACILITIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.length >= MAHARASHTRA_FACILITIES.length) {
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(MAHARASHTRA_FACILITIES));
      return MAHARASHTRA_FACILITIES;
    }
  } catch (e) {
    console.warn('Error reading facilities', e);
  }
  return MAHARASHTRA_FACILITIES;
}

export function getStoredReferrals(): DigitalReferral[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFERRALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading referrals', e);
  }
  return INITIAL_REFERRALS;
}

export function saveReferral(referral: DigitalReferral): DigitalReferral[] {
  const current = getStoredReferrals();
  const updated = [referral, ...current.filter((r) => r.id !== referral.id)];
  try {
    localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(updated));
    queueSyncItem({ type: 'referral', data: referral });
  } catch (e) {
    console.warn('Error saving referral', e);
  }
  return updated;
}

export function getRegisteredPatients(): RegisteredPatient[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading patients', e);
  }
  return [];
}

export function saveRegisteredPatient(patient: RegisteredPatient): RegisteredPatient[] {
  const current = getRegisteredPatients();
  const updated = [patient, ...current.filter((p) => p.id !== patient.id)];
  try {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updated));
    queueSyncItem({ type: 'patient_registration', data: patient });
  } catch (e) {
    console.warn('Error saving patient', e);
  }
  return updated;
}

export function getStoredGrievances(): Grievance[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GRIEVANCES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading grievances', e);
  }
  return INITIAL_GRIEVANCES;
}

export function saveGrievance(grievance: Grievance): Grievance[] {
  const current = getStoredGrievances();
  const updated = [grievance, ...current.filter((g) => g.id !== grievance.id)];
  try {
    localStorage.setItem(STORAGE_KEYS.GRIEVANCES, JSON.stringify(updated));
    queueSyncItem({ type: 'grievance', data: grievance });
  } catch (e) {
    console.warn('Error saving grievance', e);
  }
  return updated;
}

export function getStoredOPDTokens(): OPDToken[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OPD_TOKENS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading OPD tokens', e);
  }
  return INITIAL_OPD_TOKENS;
}

export function saveOPDToken(token: OPDToken): OPDToken[] {
  const current = getStoredOPDTokens();
  const updated = [token, ...current.filter((t) => t.id !== token.id)];
  try {
    localStorage.setItem(STORAGE_KEYS.OPD_TOKENS, JSON.stringify(updated));
    queueSyncItem({ type: 'opd_token', data: token });
  } catch (e) {
    console.warn('Error saving OPD token', e);
  }
  return updated;
}

export function getStoredTreatmentJourneys(): PatientTreatmentJourney[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TREATMENT_JOURNEYS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading treatment journeys', e);
  }
  return INITIAL_TREATMENT_JOURNEYS;
}

export function updateTreatmentStage(
  referralId: string,
  stageNumber: number,
  notes: string,
  actor: string
): PatientTreatmentJourney[] {
  const journeys = getStoredTreatmentJourneys();
  const updated = journeys.map((j) => {
    if (j.referralId === referralId) {
      const newStages = j.stages.map((st) => {
        if (st.stageNumber === stageNumber) {
          return {
            ...st,
            status: 'completed' as const,
            completedAt: new Date().toLocaleString(),
            notes: notes || st.notes,
            actor: actor || st.actor,
          };
        }
        if (st.stageNumber === stageNumber + 1) {
          return { ...st, status: 'active' as const };
        }
        return st;
      });
      return { ...j, stages: newStages, currentStageIndex: Math.max(j.currentStageIndex, stageNumber) };
    }
    return j;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.TREATMENT_JOURNEYS, JSON.stringify(updated));
    queueSyncItem({ type: 'treatment_stage_update', data: { referralId, stageNumber, notes } });
  } catch (e) {
    console.warn('Error updating treatment stage', e);
  }
  return updated;
}

export function getStoredBloodBanks(): BloodBank[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOOD_BANKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.length >= MAHARASHTRA_BLOOD_BANKS.length) {
        return parsed;
      }
      localStorage.setItem(STORAGE_KEYS.BLOOD_BANKS, JSON.stringify(MAHARASHTRA_BLOOD_BANKS));
      return MAHARASHTRA_BLOOD_BANKS;
    }
  } catch (e) {
    console.warn('Error reading blood banks', e);
  }
  return MAHARASHTRA_BLOOD_BANKS;
}

export function updateFacilityStock(
  facilityId: string,
  medicineName: string,
  newStatus: 'in_stock' | 'low' | 'out_of_stock'
): HealthcareFacility[] {
  const facilities = getStoredFacilities();
  const updated = facilities.map((fac) => {
    if (fac.id === facilityId) {
      return {
        ...fac,
        medicines: fac.medicines.map((med) =>
          med.name === medicineName ? { ...med, status: newStatus } : med
        ),
      };
    }
    return fac;
  });
  try {
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
    queueSyncItem({
      type: 'facility_stock_update',
      data: { facilityId, medicineName, newStatus },
    });
  } catch (e) {
    console.warn('Error updating facility stock', e);
  }
  return updated;
}

export function isOfflineMode(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.SIMULATED_OFFLINE) === 'true';
  } catch {
    return false;
  }
}

export function setOfflineMode(offline: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, offline ? 'true' : 'false');
  } catch (e) {
    console.warn('Error setting offline mode', e);
  }
}

export function getAuthSession(): UserAuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading auth session', e);
  }
  return null;
}

export function setAuthSession(session: UserAuthSession): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
  } catch (e) {
    console.warn('Error saving auth session', e);
  }
}

export function clearAuthSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  } catch (e) {
    console.warn('Error clearing auth session', e);
  }
}

function queueSyncItem(item: { type: string; data: any }): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_SYNC_QUEUE);
    const queue = raw ? JSON.parse(raw) : [];
    queue.push({ ...item, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.OFFLINE_SYNC_QUEUE, JSON.stringify(queue));
  } catch (e) {
    console.warn('Error queueing sync item', e);
  }
}

export function getPendingSyncCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_SYNC_QUEUE);
    return raw ? JSON.parse(raw).length : 0;
  } catch {
    return 0;
  }
}
