# 🏥 Swasthya Setu Maharashtra — Digital Health Bridge

> A government-style Progressive Web App (PWA) + Android app bridging rural Maharashtra residents to public healthcare infrastructure. AI-powered health navigation, Emergency SOS, ABHA Health Locker, real-time facility finder, and multilingual support (Marathi / Hindi / English) — all in one unified platform.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)]()
[![Android](https://img.shields.io/badge/Android-App-3DDC84?style=for-the-badge&logo=android&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Overview

**Swasthya Setu** (meaning *Health Bridge* in Hindi/Marathi) is a civic-tech platform designed to make Maharashtra's public health system accessible to every citizen — especially in tribal and rural belts. It works **offline**, speaks in **Marathi, Hindi, and English**, and puts the entire health system in a patient's pocket.

---

## ✨ Key Features

### 🗺️ 1. Healthcare Facility Finder
- Searchable, filterable directory of Maharashtra's **district hospitals, PHCs, sub-centres, and medical colleges**
- Real-time GPS-based distance sorting using the **Haversine formula**
- Facility detail panels: bed count, doctors, OPD charges, lab services, director info
- One-tap **OPD Token** booking directly in-app
- Filter by type (PHC / District / Medical College / Private), emergency availability, bed count

### 🤖 2. AI Health Navigator
- Conversational AI chat interface to describe symptoms and get **urgency triage** (Normal / Moderate / Critical)
- Recommends appropriate facility type (PHC vs. District Hospital vs. Medical College)
- Surfaces relevant government scheme coverage (Ayushman Bharat)
- Voice input & text-to-speech output support
- Triggers Emergency SOS for critical cases

### 🆘 3. Emergency SOS Modal
- One-tap SOS with ambulance dispatch simulation
- Emergency type selector (Snakebite, Accident, Cardiac, Maternity, etc.)
- Auto-generates incident ID and real-time ETA countdown
- Pre-fills nearest facility for specific tribal belt locations (e.g., Gadchiroli)

### 🛡️ 4. ABHA Health Locker
- Digital display of **ABHA (Ayushman Bharat Health Account)** health card with QR code
- Tabs for: Health Card, Prescriptions, Lab Reports, Vaccination Records
- Print and download simulation for offline health record access

### 📋 5. Government Schemes Browser
- Complete guide to Maharashtra health schemes: **Mahatma Phule Jan Arogya Yojana**, Ayushman Bharat PM-JAY, NHM programmes
- Built-in **Eligibility Checker**: enter ration card type (Yellow/Orange/White), Aadhaar status → instant eligibility result
- Scheme helpline numbers and external links

### 🩸 6. Blood Bank Directory
- District-level blood bank search across Maharashtra

### 📑 7. Grievance Portal
- Submit and track health system grievances

### 🔄 8. Treatment Tracker
- Track ongoing treatment plans, follow-up schedules

### 👨‍⚕️ 9. Doctor Portal
- Doctor-facing interface for patient management

### 🏥 10. Patient Referral System
- Structured upward referral forms from PHC → District → Tertiary care

### 📴 Offline-First Architecture
- Complete offline mode using **localStorage** sync for core health data
- Toggle between Online/Offline modes from the navbar
- Auth sessions persist across network drops

### 🌐 Multilingual
- Full UI translation: **Marathi (मराठी)**, **Hindi (हिन्दी)**, **English**
- Language switcher in navbar — persists across sessions

### 📱 PWA + Android App
- Installable as a PWA on any mobile browser ("Add to Home Screen")
- Native Android app built with **Capacitor** (`appId: gov.maharashtra.swasthyasetu`)
- Custom splash screen (green #087f5b) and status bar theming

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **UI Framework** | React 19 + TypeScript 5 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Native Mobile** | Capacitor 8 (Android) |
| **PWA** | vite-plugin-pwa |
| **Deployment** | Vercel (`vercel.json` with SPA rewrites) |
| **Offline Storage** | localStorage (custom `offlineStorage` utility) |
| **Geolocation** | Browser Geolocation API + Haversine distance |

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+ and npm 9+
- (Optional) Android Studio for native Android build

### Web App
```bash
# 1. Clone the repo
git clone https://github.com/akashcyber02/swasthya-setu.git
cd swasthya-setu

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → Opens at http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

### Android App (Capacitor)
```bash
npm run build
npx cap sync android
npx cap open android   # Opens in Android Studio
```

---

## 📁 Project Structure

```
swasthya-setu/
├── src/
│   ├── App.tsx                     # Root router, auth session, offline state
│   ├── components/
│   │   ├── AINavigator.tsx         # AI chat health navigator
│   │   ├── EmergencySOSModal.tsx   # SOS dispatch modal
│   │   ├── ABHALockerModal.tsx     # Digital health card viewer
│   │   ├── AdminDashboard.tsx      # Admin/DHO dashboard
│   │   ├── Navbar.tsx              # Role switcher, language toggle, offline toggle
│   │   ├── NotificationDrawer.tsx  # Alert notifications
│   │   ├── OPDTokenModal.tsx       # OPD token booking
│   │   ├── LoginOTPModal.tsx       # OTP-based login
│   │   └── InstallAppBanner.tsx    # PWA install prompt
│   ├── pages/
│   │   ├── Home.tsx                # Hero, feature cards, live status
│   │   ├── Healthcare.tsx          # Facility finder with GPS sort
│   │   ├── Schemes.tsx             # Health schemes + eligibility checker
│   │   ├── Referral.tsx            # Patient referral workflow
│   │   ├── Patient.tsx             # Patient portal
│   │   ├── DoctorPortal.tsx        # Doctor-facing portal
│   │   ├── BloodBank.tsx           # Blood bank directory
│   │   ├── TreatmentTracker.tsx    # Treatment plan tracker
│   │   ├── GrievancePortal.tsx     # Grievance submission
│   │   ├── Login.tsx               # Authentication page
│   │   └── Developers.tsx          # Team / API documentation
│   ├── data/
│   │   ├── translations.ts         # Marathi / Hindi / English strings
│   │   └── maharashtraHealthData.ts # Districts, facilities, schemes data
│   └── utils/
│       └── offlineStorage.ts       # Offline mode, auth session, localStorage
├── android/                        # Capacitor Android project
├── capacitor.config.ts             # Native app config (appId, splash, status bar)
├── vercel.json                     # SPA rewrite rules for Vercel
├── vite.config.ts                  # Vite + PWA plugin config
└── index.html                      # HTML entry point
```

---

## 👥 Role System

| Role | Access |
|---|---|
| 👤 **Patient** | Home, Facility Finder, Schemes, Referral, Blood Bank, Grievances |
| 👨‍⚕️ **Doctor** | All patient features + Doctor Portal |
| 🏥 **ASHA Worker** | Community health worker tools |
| 👨‍💼 **Admin / DHO / Collector** | Full admin dashboard, all portals |

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# → Open a pull request
```

---

## 👨‍💻 Author

**Akash Dhakad**
- GitHub: [@akashcyber02](https://github.com/akashcyber02)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

> *"Swasthya Setu — Bridging the Gap Between Citizens and Healthcare"* 🇮🇳
