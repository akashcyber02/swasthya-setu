import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../data/translations';
import {
  Sparkles,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  AlertTriangle,
  Hospital,
  ShieldCheck,
  X,
  ArrowRight,
  Stethoscope,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AINavigatorProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenSOS: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  urgency?: 'normal' | 'moderate' | 'critical';
  recommendedFacilityType?: string;
  recommendedFacilityName?: string;
  ayushmanNote?: string;
  actionUrl?: string;
  actionLabel?: string;
  isEmergency?: boolean;
}

export const AINavigator: React.FC<AINavigatorProps> = ({
  isOpen,
  onClose,
  language,
  onOpenSOS,
}) => {
  const navigate = useNavigate();
  const t = translations[language];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Welcome Message when opened or language changes
  useEffect(() => {
    if (isOpen) {
      let welcomeText = '';
      if (language === 'mr') {
        welcomeText =
          'नमस्कार! मी महाराष्ट्र आरोग्य वाटाड्या (AI Health Navigator) आहे. मला तुमची लक्षणे, आजार किंवा रेशन कार्डबद्दल सांगा. मी तुम्हाला योग्य शासकीय रुग्णालय किंवा PHC सुचवेन.';
      } else if (language === 'hi') {
        welcomeText =
          'नमस्ते! मैं महाराष्ट्र स्वास्थ्य मार्गदर्शक (AI Health Navigator) हूँ। मुझे अपने लक्षण, समस्या या राशन कार्ड के बारे में बताएं। मैं आपको निकटतम सही अस्पताल या PHC की जानकारी दूंगा।';
      } else {
        welcomeText =
          'Hello! I am your Maharashtra AI Healthcare Navigator. Tell me your symptoms, medical need, or ration card type, and I will navigate you to the appropriate public health facility or scheme.';
      }

      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: welcomeText,
          urgency: 'normal',
        },
      ]);
    }
  }, [isOpen, language]);

  // Scroll to bottom on message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isListening]);

  // Web Speech API - Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Select Language Locale
      if (language === 'mr') recognition.lang = 'mr-IN';
      else if (language === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        if (language === 'mr') recognitionRef.current.lang = 'mr-IN';
        else if (language === 'hi') recognitionRef.current.lang = 'hi-IN';
        else recognitionRef.current.lang = 'en-IN';

        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.warn('SpeechRecognition start error', e);
        }
      } else {
        alert('Voice speech recognition is not supported in this browser. Please type your query.');
      }
    }
  };

  // Text-To-Speech Synthesis
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'mr') utterance.lang = 'mr-IN';
      else if (language === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Intelligent Healthcare Triage Logic
  const handleSend = (customText?: string) => {
    const query = (customText || inputQuery).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulate AI Triage Processing
    setTimeout(() => {
      const lower = query.toLowerCase();
      let aiResponse: Message;

      // 1. Critical Red Flag / Emergency Symptoms
      if (
        lower.includes('chest pain') ||
        lower.includes('छातीत') ||
        lower.includes('सीने में') ||
        lower.includes('snake') ||
        lower.includes('साप') ||
        lower.includes('सांप') ||
        lower.includes('सर्पदंश') ||
        lower.includes('breath') ||
        lower.includes('श्वास') ||
        lower.includes('सांस') ||
        lower.includes('bleeding') ||
        lower.includes('रक्त') ||
        lower.includes('heart') ||
        lower.includes('attack') ||
        lower.includes('हार्ट')
      ) {
        if (language === 'mr') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: '🚨 अति-तातडीची लक्षणे आढळली आहेत! विलंब न करता त्वरित जवळच्या उपजिल्हा / जिल्हा रुग्णालयातील ट्रॉमा सेंटरमध्ये जा किंवा १०८ रुग्णवाहिकेला कॉल करा.',
            urgency: 'critical',
            isEmergency: true,
            recommendedFacilityType: 'उपजिल्हा / जिल्हा रुग्णालय किंवा GMC (Trauma Centre)',
            recommendedFacilityName: 'Sub-District Hospital Aheri / Sassoon General Hospital Pune',
            ayushmanNote: '१०८ रुग्णवाहिका व सर्व आपत्कालीन उपचार मोफत उपलब्ध आहेत.',
            actionLabel: '🚨 १०८ आपत्कालीन SOS सुरू करा',
          };
        } else if (language === 'hi') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: '🚨 यह अति-गंभीर आपातकालीन स्थिति हो सकती है! तुरंत निकटतम उप-जिला / जिला अस्पताल के ट्रॉमा सेंटर जाएं या १०८ एम्बुलेंस को कॉल करें।',
            urgency: 'critical',
            isEmergency: true,
            recommendedFacilityType: 'उप-जिला / जिला अस्पताल या मेडिकल कॉलेज (Trauma Centre)',
            recommendedFacilityName: 'Sub-District Hospital Aheri / Sassoon General Hospital Pune',
            ayushmanNote: '१०८ एम्बुलेंस व आपातकालीन ट्रॉमा इलाज पूरी तरह निःशुल्क है।',
            actionLabel: '🚨 १०८ आपातकालीन SOS सक्रिय करें',
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: '🚨 Critical Red Flag Emergency Detected! Do not delay. Proceed immediately to the nearest District Hospital / Trauma Centre or call 108 Ambulance.',
            urgency: 'critical',
            isEmergency: true,
            recommendedFacilityType: 'District Hospital / GMC Apex Trauma Unit',
            recommendedFacilityName: 'Sub-District Hospital Aheri / Sassoon General Hospital Pune',
            ayushmanNote: '108 Ambulance transit and emergency stabilization are 100% free.',
            actionLabel: '🚨 Trigger 108 Emergency SOS',
          };
        }
      }
      // 2. Maternal / Pregnancy / Child Healthcare
      else if (
        lower.includes('pregnant') ||
        lower.includes('गरोदर') ||
        lower.includes('गर्भवती') ||
        lower.includes('sonography') ||
        lower.includes('सोनोग्राफी') ||
        lower.includes('delivery') ||
        lower.includes('प्रसूती') ||
        lower.includes('प्रसव') ||
        lower.includes('baby') ||
        lower.includes('बाळ') ||
        lower.includes('बच्चा')
      ) {
        if (language === 'mr') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'गरोदरपणातील नियमित तपासणी (ANC), मोफत सोनोग्राफी आणि मोफत प्रसूतीसाठी तुमच्या जवळच्या प्राथमिक आरोग्य केंद्र (PHC) किंवा ग्रामीण रुग्णालयात (CHC) जा. जननी सुरक्षा योजनेअंतर्गत आर्थिक मदतही मिळते.',
            urgency: 'normal',
            recommendedFacilityType: 'प्राथमिक आरोग्य केंद्र (PHC) / ग्रामीण रुग्णालय (CHC)',
            recommendedFacilityName: 'Rural Hospital (CHC) Bhor / PHC Bhamragad',
            ayushmanNote: 'JSY योजनेअंतर्गत ₹१,४०० पर्यंत थेट बँक खात्यात आर्थिक लाभ व मोफत १०२ रुग्णवाहिका मिळते.',
            actionUrl: '/healthcare',
            actionLabel: 'Maternity केंद्रे शोधा →',
          };
        } else if (language === 'hi') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'गर्भावस्था की मुफ्त जांच (ANC), सोनोग्राफी एवं सुरक्षित प्रसव के लिए निकटतम प्राथमिक स्वास्थ्य केंद्र (PHC) या ग्रामीण अस्पताल (CHC) जाएं। जननी सुरक्षा योजना (JSY) के तहत आर्थिक लाभ भी उपलब्ध है।',
            urgency: 'normal',
            recommendedFacilityType: 'प्राथमिक स्वास्थ्य केंद्र (PHC) / ग्रामीण अस्पताल (CHC)',
            recommendedFacilityName: 'Rural Hospital (CHC) Bhor / PHC Bhamragad',
            ayushmanNote: 'JSY के तहत ₹१,४०० नकद सहायता और मुफ्त १०२ एम्बुलेंस सेवा मिलती है।',
            actionUrl: '/healthcare',
            actionLabel: 'Maternity अस्पताल खोजें →',
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'For comprehensive Antenatal Care (ANC), free ultrasound sonography, and institutional delivery, visit your nearest PHC or Community Health Centre (CHC) / Sub-District Hospital. Financial assistance is provided under Janani Suraksha Yojana.',
            urgency: 'normal',
            recommendedFacilityType: 'Primary Health Centre (PHC) / First Referral Unit (CHC)',
            recommendedFacilityName: 'Rural Hospital (CHC) Bhor / SDH Aheri',
            ayushmanNote: 'Includes ₹1,400 direct incentive under JSY + 102 free drop-back ambulance.',
            actionUrl: '/healthcare',
            actionLabel: 'Find Maternity Facilities →',
          };
        }
      }
      // 3. Scheme / MJPJAY / Ayushman / Surgery Queries
      else if (
        lower.includes('ayushman') ||
        lower.includes('आयुष्मान') ||
        lower.includes('आयुष्यमान') ||
        lower.includes('mjpjay') ||
        lower.includes('रेशन') ||
        lower.includes('राशन') ||
        lower.includes('card') ||
        lower.includes('फ्री') ||
        lower.includes('मोफत') ||
        lower.includes('surgery') ||
        lower.includes('ऑपरेशन') ||
        lower.includes('शस्त्रक्रिया')
      ) {
        if (language === 'mr') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'महाराष्ट्रात "महात्मा जोतीराव फुले जन आरोग्य योजना (MJPJAY २.०)" अंतर्गत सर्व पिवळे, केशरी व पांढरे रेशन कार्डधारक कुटुंबांना वार्षिक ५ लाख रुपयांपर्यंत मोफत उपचार व ९९६+ शस्त्रक्रिया मोफत मिळतात. शासकीय व संलग्न खाजगी रुग्णालयातील आयुष्मान मित्राशी संपर्क करा.',
            urgency: 'normal',
            recommendedFacilityType: 'MJPJAY संलग्न जिल्हा रुग्णालय किंवा शासकीय वैद्यकीय महाविद्यालय',
            recommendedFacilityName: 'District Civil Hospital Nashik / Sassoon General Hospital Pune',
            ayushmanNote: 'केवळ आधार कार्ड आणि रेशन कार्ड सोबत घेऊन जा.',
            actionUrl: '/schemes',
            actionLabel: 'MJPJAY योजना तपशील पहा →',
          };
        } else if (language === 'hi') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'महाराष्ट्र में "महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY २.०)" के तहत सभी राशन कार्ड धारकों को ₹५ लाख तक का मुफ्त इलाज व ९९६+ ऑपरेशन की सुविधा उपलब्ध है। अस्पताल में आयुष्मान मित्र से संपर्क करें।',
            urgency: 'normal',
            recommendedFacilityType: 'MJPJAY सूचीबद्ध जिला अस्पताल या मेडिकल कॉलेज',
            recommendedFacilityName: 'District Civil Hospital Nashik / Sassoon General Hospital Pune',
            ayushmanNote: 'केवल आधार कार्ड और राशन कार्ड लेकर अस्पताल पहुंचें।',
            actionUrl: '/schemes',
            actionLabel: 'योजना विवरण देखें →',
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'Under Maharashtra’s Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY 2.0) and Ayushman Bharat PM-JAY, every ration card family receives ₹5,00,000 cashless cover per year across 996+ medical/surgical procedures at all empanelled hospitals.',
            urgency: 'normal',
            recommendedFacilityType: 'Empanelled District Hospital / Govt Medical College',
            recommendedFacilityName: 'District Civil Hospital Nashik / Sassoon Hospital Pune',
            ayushmanNote: 'Bring your Aadhaar Card and Maharashtra Ration Card to the Ayushman Mitra Helpdesk.',
            actionUrl: '/schemes',
            actionLabel: 'Check MJPJAY Scheme Guide →',
          };
        }
      }
      // 4. Moderate Symptoms (Fever > 3 days, pain, fracture, diarrhea)
      else if (
        lower.includes('fever') ||
        lower.includes('ताप') ||
        lower.includes('बुखार') ||
        lower.includes('cough') ||
        lower.includes('खोकला') ||
        lower.includes('खांसी') ||
        lower.includes('pain') ||
        lower.includes('दुखत') ||
        lower.includes('दर्द') ||
        lower.includes('vomit') ||
        lower.includes('उलटी')
      ) {
        if (language === 'mr') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: '३ दिवसांपेक्षा जास्त ताप किंवा वेदना असल्यास प्राथमिक आरोग्य केंद्र (PHC) किंवा ग्रामीण रुग्णालयात (CHC) जाऊन रक्त तपासणी (मलेरिया/डेंग्यू चाचणी) करून घेणे आवश्यक आहे. तेथे औषधे व तपासणी मोफत आहे.',
            urgency: 'moderate',
            recommendedFacilityType: 'प्राथमिक आरोग्य केंद्र (PHC) किंवा ग्रामीण रुग्णालय (CHC)',
            recommendedFacilityName: 'Primary Health Centre (PHC) Bhamragad / RH Bhor',
            ayushmanNote: 'सर्व प्राथमिक रक्त तपासण्या, पॅरासिटामॉल व अँटिबायोटिक्स मोफत उपलब्ध आहेत.',
            actionUrl: '/healthcare',
            actionLabel: 'जवळचे PHC शोधा →',
          };
        } else if (language === 'hi') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: '३ दिन से अधिक बुखार या दर्द होने पर प्राथमिक स्वास्थ्य केंद्र (PHC) या ग्रामीण अस्पताल (CHC) जाकर खून की जांच करवाएं। सरकारी केंद्रों पर सभी दवाइयां व जांच पूरी तरह मुफ्त हैं।',
            urgency: 'moderate',
            recommendedFacilityType: 'प्राथमिक स्वास्थ्य केंद्र (PHC) या ग्रामीण अस्पताल (CHC)',
            recommendedFacilityName: 'Primary Health Centre (PHC) Bhamragad / RH Bhor',
            ayushmanNote: 'मलेरिया/सीबीसी जांच और दवाइयां PHC में निःशुल्क उपलब्ध हैं।',
            actionUrl: '/healthcare',
            actionLabel: 'निकटतम PHC खोजें →',
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'Persistent fever or pain for more than 3 days warrants a clinical checkup and blood tests (malaria/CBC) at your local Primary Health Centre (PHC) or Community Health Centre (CHC). Essential medicines are provided free of cost.',
            urgency: 'moderate',
            recommendedFacilityType: 'Primary Health Centre (PHC) / Community Health Centre (CHC)',
            recommendedFacilityName: 'PHC Bhamragad / RH Bhor',
            ayushmanNote: 'Free diagnostic lab tests and essential medicines in stock.',
            actionUrl: '/healthcare',
            actionLabel: 'Locate Nearest PHC →',
          };
        }
      }
      // 5. Default General Guidance
      else {
        if (language === 'mr') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'तुमच्या गरजेनुसार तुम्ही जवळच्या प्राथमिक आरोग्य केंद्राशी (PHC) किंवा उपजिल्हा रुग्णालयाशी संपर्क साधू शकता. तेथे सामान्य OPD, औषध वाटप आणि मोफत सल्ला उपलब्ध आहे.',
            urgency: 'normal',
            recommendedFacilityType: 'प्राथमिक आरोग्य केंद्र (PHC) / उपकेंद्र',
            recommendedFacilityName: 'Nearest Maharashtra Public Health Centre',
            actionUrl: '/healthcare',
            actionLabel: 'आरोग्य केंद्रे एक्सप्लोर करा →',
          };
        } else if (language === 'hi') {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'आपकी आवश्यकता के अनुसार निकटतम प्राथमिक स्वास्थ्य केंद्र (PHC) या उप-जिला अस्पताल की OPD में संपर्क करें। वहां डॉक्टर परामर्श एवं दवाइयां निःशुल्क हैं।',
            urgency: 'normal',
            recommendedFacilityType: 'प्राथमिक स्वास्थ्य केंद्र (PHC) / उप-केंद्र',
            recommendedFacilityName: 'Nearest Maharashtra Public Health Centre',
            actionUrl: '/healthcare',
            actionLabel: 'स्वास्थ्य केंद्र देखें →',
          };
        } else {
          aiResponse = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'Based on your requirement, you can visit the OPD at your local Primary Health Centre (PHC) or Sub-District Hospital for clinical evaluation and free prescribed medicines.',
            urgency: 'normal',
            recommendedFacilityType: 'Primary Health Centre (PHC) / Sub-Centre',
            recommendedFacilityName: 'Nearest Maharashtra Public Health Facility',
            actionUrl: '/healthcare',
            actionLabel: 'Explore Healthcare Facilities →',
          };
        }
      }

      setMessages((prev) => [...prev, aiResponse]);
      speakText(aiResponse.text);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="ai-nav-modal-card">
        {/* Header */}
        <div className="ai-nav-header">
          <div className="ai-nav-title-box">
            <div className="ai-sparkle-avatar">
              <Sparkles size={20} />
            </div>
            <div>
              <h3>{t.aiNavTitle}</h3>
              <p>{t.aiNavSubtitle}</p>
            </div>
          </div>

          <div className="ai-header-controls">
            {isSpeaking && (
              <button
                className="ai-speech-indicator-btn"
                onClick={stopSpeaking}
                title="Stop audio reading"
              >
                <VolumeX size={16} />
                <span>Stop Voice</span>
              </button>
            )}
            <button className="modal-close-icon-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="ai-disclaimer-banner">
          <Info size={16} className="disclaimer-icon" />
          <span>{t.aiNavDisclaimer}</span>
        </div>

        {/* Conversation Stream */}
        <div className="ai-chat-body">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}
            >
              <div className="message-content">
                <p>{msg.text}</p>

                {/* Structured Triage Card (if AI response has facility info) */}
                {msg.recommendedFacilityType && (
                  <div
                    className={`triage-card ${
                      msg.urgency === 'critical'
                        ? 'triage-critical'
                        : msg.urgency === 'moderate'
                        ? 'triage-moderate'
                        : 'triage-normal'
                    }`}
                  >
                    <div className="triage-header">
                      <Hospital size={16} />
                      <strong>{t.aiRecommendedFacility}</strong>
                      <span className={`urgency-tag ${msg.urgency}`}>
                        {msg.urgency === 'critical'
                          ? t.aiCritical
                          : msg.urgency === 'moderate'
                          ? t.aiModerate
                          : t.aiNormal}
                      </span>
                    </div>

                    <div className="triage-facility-name">{msg.recommendedFacilityType}</div>
                    {msg.recommendedFacilityName && (
                      <div className="triage-example-name">
                        📍 उदा. {msg.recommendedFacilityName}
                      </div>
                    )}

                    {msg.ayushmanNote && (
                      <div className="triage-ayushman-note">
                        <ShieldCheck size={14} />
                        <span>{msg.ayushmanNote}</span>
                      </div>
                    )}

                    {msg.isEmergency ? (
                      <button
                        className="triage-sos-action-btn"
                        onClick={() => {
                          onClose();
                          onOpenSOS();
                        }}
                      >
                        {msg.actionLabel || t.sosTriggerBtn}
                      </button>
                    ) : (
                      msg.actionUrl && (
                        <button
                          className="triage-link-action-btn"
                          onClick={() => {
                            onClose();
                            navigate(msg.actionUrl!);
                          }}
                        >
                          <span>{msg.actionLabel}</span>
                          <ArrowRight size={14} />
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {msg.sender === 'ai' && (
                <button
                  className="read-aloud-btn"
                  onClick={() => speakText(msg.text)}
                  title="Read aloud in native voice"
                >
                  <Volume2 size={14} />
                </button>
              )}
            </div>
          ))}

          {isListening && (
            <div className="ai-listening-indicator">
              <div className="mic-pulse-ring"></div>
              <Mic size={18} className="mic-listening-icon" />
              <span>{t.aiListening}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="ai-prompts-bar">
          <span className="prompt-label">💡 विचारू शकता:</span>
          <button
            className="prompt-chip"
            onClick={() => handleSend(t.aiSuggestedPrompt1)}
          >
            {t.aiSuggestedPrompt1}
          </button>
          <button
            className="prompt-chip"
            onClick={() => handleSend(t.aiSuggestedPrompt2)}
          >
            {t.aiSuggestedPrompt2}
          </button>
          <button
            className="prompt-chip"
            onClick={() => handleSend(t.aiSuggestedPrompt3)}
          >
            {t.aiSuggestedPrompt3}
          </button>
          <button
            className="prompt-chip"
            onClick={() => handleSend(t.aiSuggestedPrompt4)}
          >
            {t.aiSuggestedPrompt4}
          </button>
        </div>

        {/* Input Bar with Mic & Send */}
        <div className="ai-input-bar">
          <button
            className={`voice-mic-btn ${isListening ? 'active-mic' : ''}`}
            onClick={toggleVoiceInput}
            title={isListening ? t.aiStopVoice : t.aiStartVoice}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <input
            type="text"
            className="ai-text-input"
            placeholder={t.aiAskPlaceholder}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />

          <button
            className="ai-send-btn"
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
