import React, { useState } from 'react';
import { Language } from '../data/translations';
import { AuthRole, getAuthSession } from '../utils/offlineStorage';
import {
  Bell,
  X,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Ticket,
  Calendar,
  Activity,
  HeartPulse,
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  marathiTitle: string;
  message: string;
  time: string;
  type: 'emergency' | 'warning' | 'info' | 'success';
  forRole: AuthRole[];
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: '🚨 Critical Stockout Alert: Anti-Snake Venom (ASV)',
    marathiTitle: '🚨 अत्यावश्यक साठा इशारा: अँटी-स्नेक व्हेनम (ASV)',
    message: 'Palghar & Gadchiroli district central medicine stores have triggered buffer replenishment alert.',
    time: '10 Mins ago',
    type: 'emergency',
    forRole: ['collector', 'dho', 'admin'],
    isRead: false,
  },
  {
    id: 'notif-02',
    title: '🎫 Your OPD Token is Approaching: #27',
    marathiTitle: '🎫 तुमचा OPD टोकन क्रमांक जवळ आला आहे: #27',
    message: 'Now serving Token #21 at Cardiology OPD Room 4 (Sassoon Hospital). Estimated arrival time: 18 mins.',
    time: '25 Mins ago',
    type: 'info',
    forRole: ['patient'],
    isRead: false,
  },
  {
    id: 'notif-03',
    title: '🩺 New Emergency Referral Assigned (MH-REF-2026-8841)',
    marathiTitle: '🩺 नवीन आपत्कालीन रेफरल नियुक्त (MH-REF-2026-8841)',
    message: 'High-risk gestational hypertension patient arriving via 108 Ambulance from CHC Bhor.',
    time: '45 Mins ago',
    type: 'warning',
    forRole: ['doctor', 'hospital_staff'],
    isRead: false,
  },
  {
    id: 'notif-04',
    title: '👩‍⚕️ Village Post-Discharge Follow-up Due',
    marathiTitle: '👩‍⚕️ गावात गृहभेट व पाठपुरावा बाकी',
    message: 'Patient Sunita Jadhav scheduled for Day-3 maternal & newborn check at Kuran Budruk village.',
    time: '2 Hours ago',
    type: 'info',
    forRole: ['worker'],
    isRead: false,
  },
  {
    id: 'notif-05',
    title: '📝 Grievance Resolved: MH-GRV-2026-0982',
    marathiTitle: '📝 तक्रार निवारण पूर्ण: MH-GRV-2026-0982',
    message: 'Emergency Artesunate injection buffer stock successfully delivered to SDH Aheri.',
    time: 'Yesterday',
    type: 'success',
    forRole: ['patient', 'worker', 'dho', 'admin'],
    isRead: true,
  },
];

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const session = getAuthSession();
  const currentRole: AuthRole = session?.role || 'patient';
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const relevantNotifs = notifications.filter(
    (n) => n.forRole.includes(currentRole) || n.forRole.includes('admin')
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="modal-backdrop-blur">
      <div className="notification-drawer-box">
        {/* Header */}
        <div className="notif-drawer-header">
          <div className="notif-header-left">
            <Bell size={22} className="bell-active-icon" />
            <div>
              <h3>
                {language === 'mr'
                  ? 'स्मार्ट सूचना व सतर्कता केंद्र'
                  : language === 'hi'
                  ? 'स्मार्ट सूचना एवं सतर्कता केंद्र'
                  : 'Smart Notification & Alerts Center'}
              </h3>
              <small>
                {language === 'mr' ? 'भूमिका:' : language === 'hi' ? 'भूमिका:' : 'Active Role:'}{' '}
                <strong>{currentRole.toUpperCase()}</strong>
              </small>
            </div>
          </div>
          <div className="notif-header-actions">
            <button className="mark-read-btn" onClick={markAllRead}>
              {language === 'mr' ? 'सर्व वाचले' : language === 'hi' ? 'सभी पढ़ा' : 'Mark all read'}
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="notif-list-body">
          {relevantNotifs.length === 0 ? (
            <div className="no-notifs-box">
              <CheckCircle2 size={36} className="green-check" />
              <p>
                {language === 'mr'
                  ? 'सध्या कोणतीही नवीन सूचना नाही.'
                  : language === 'hi'
                  ? 'वर्तमान में कोई नई सूचना नहीं है।'
                  : 'No active notifications right now.'}
              </p>
            </div>
          ) : (
            relevantNotifs.map((item) => (
              <div
                key={item.id}
                className={`notif-card-item type-${item.type} ${item.isRead ? 'is-read' : 'is-unread'}`}
              >
                <div className="notif-type-icon">
                  {item.type === 'emergency' && <ShieldAlert size={20} />}
                  {item.type === 'warning' && <AlertTriangle size={20} />}
                  {item.type === 'info' && <Ticket size={20} />}
                  {item.type === 'success' && <CheckCircle2 size={20} />}
                </div>

                <div className="notif-content-col">
                  <h4>{language === 'mr' ? item.marathiTitle : item.title}</h4>
                  <p>{item.message}</p>
                  <span className="notif-time-tag">
                    <Clock size={12} />
                    <span>{item.time}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
