import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  MAHARASHTRA_SCHEMES,
} from '../data/maharashtraHealthData';
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Calculator,
  ExternalLink,
} from 'lucide-react';

interface SchemesProps {
  language: Language;
}

export const Schemes: React.FC<SchemesProps> = ({ language }) => {
  const t = translations[language] || translations.mr;

  // Eligibility Checker States
  const [rationCardType, setRationCardType] = useState<'yellow' | 'orange' | 'white'>('orange');
  const [hasAadhaar, setHasAadhaar] = useState<boolean>(true);
  const [hasIncomeCert, setHasIncomeCert] = useState<boolean>(false);

  return (
    <div className="schemes-page-container">
      {/* Schemes Hero Strip */}
      <div className="schemes-header-banner">
        <div>
          <div className="gov-schemes-badge">
            <span>🏛️ {t.govTopTag}</span>
          </div>
          <h1>{t.schemesTitle}</h1>
          <p>{t.schemesSubtitle}</p>
        </div>

        <div className="mjpjay-hero-counter">
          <div className="mjpjay-big-amount">₹5,00,000</div>
          <div className="mjpjay-sub-text">{t.mjpjayCover} (MJPJAY 2.0)</div>
        </div>
      </div>

      {/* Interactive Eligibility & Document Calculator */}
      <section className="eligibility-calculator-card">
        <div className="calc-header">
          <Calculator size={24} className="calc-icon" />
          <div>
            <h2>{t.eligibilityCheckerTitle}</h2>
            <p>{t.calcDesc}</p>
          </div>
        </div>

        <div className="calc-grid-controls">
          {/* Ration Card Type Selector */}
          <div className="calc-form-item">
            <label>
              <strong>{t.selectRationCard}</strong>
            </label>
            <div className="ration-card-buttons">
              <button
                className={`ration-btn yellow-ration ${
                  rationCardType === 'yellow' ? 'active-ration' : ''
                }`}
                onClick={() => setRationCardType('yellow')}
              >
                🟡 {t.rationYellow}
              </button>

              <button
                className={`ration-btn orange-ration ${
                  rationCardType === 'orange' ? 'active-ration' : ''
                }`}
                onClick={() => setRationCardType('orange')}
              >
                🟠 {t.rationOrange}
              </button>

              <button
                className={`ration-btn white-ration ${
                  rationCardType === 'white' ? 'active-ration' : ''
                }`}
                onClick={() => setRationCardType('white')}
              >
                ⚪ {t.rationWhite}
              </button>
            </div>
          </div>

          {/* Document Checkboxes */}
          <div className="calc-form-item">
            <label>
              <strong>{t.availableDocs}</strong>
            </label>
            <div className="docs-checkboxes">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={hasAadhaar}
                  onChange={(e) => setHasAadhaar(e.target.checked)}
                />
                <span>{t.docAadhaar}</span>
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={hasIncomeCert}
                  onChange={(e) => setHasIncomeCert(e.target.checked)}
                />
                <span>{t.docIncomeCert}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Instant Eligibility Calculation Result */}
        <div className="calc-result-panel">
          <div className="eligible-schemes-box">
            <div className="eligible-header">
              <ShieldCheck size={22} className="green-shield" />
              <h3>{t.eligibleSchemes}</h3>
            </div>

            <div className="eligible-schemes-chips">
              <div className="scheme-result-pill highlight-mjpjay">
                <strong>✓ Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY 2.0)</strong>
                <span>{t.mjpjayDesc}</span>
              </div>

              {rationCardType === 'yellow' && (
                <div className="scheme-result-pill highlight-pmjay">
                  <strong>✓ Ayushman Bharat PM-JAY</strong>
                  <span>{t.pmjayDesc}</span>
                </div>
              )}

              <div className="scheme-result-pill">
                <strong>✓ Janani Suraksha Yojana & Matru Vandana</strong>
                <span>
                  {language === 'mr'
                    ? 'मोफत शासकीय प्रसूती, औषधे व ₹१,४०० पर्यंत आर्थिक अनुदान'
                    : language === 'hi'
                    ? 'मुफ्त सरकारी प्रसव, दवाएं व ₹१,४०० आर्थिक सहायता'
                    : 'Free institutional delivery, essential drugs & financial support up to ₹1,400'}
                </span>
              </div>

              <div className="scheme-result-pill">
                <strong>✓ Rashtriya Bal Swasthya Karyakram (RBSK)</strong>
                <span>
                  {language === 'mr'
                    ? '० ते १८ वयोगटातील बालकांसाठी मोफत हृदय व इतर शस्त्रक्रिया'
                    : language === 'hi'
                    ? '० से १८ वर्ष के बच्चों के लिए मुफ्त सर्जरी'
                    : 'Free pediatric surgeries & screening for children aged 0 to 18 years'}
                </span>
              </div>
            </div>
          </div>

          <div className="required-docs-checklist">
            <h4>{t.requiredDocuments}</h4>
            <ul className="docs-list">
              <li>
                <CheckCircle2 size={16} />
                <span>{t.docRationCardNote}</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>{t.docAadhaarNote}</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>{t.docHospitalEntryNote}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Schemes Directory Breakdown */}
      <section className="schemes-directory-section">
        <h2 className="directory-title">{t.allSchemesTitle}</h2>

        <div className="schemes-cards-list">
          {MAHARASHTRA_SCHEMES.map((scheme) => (
            <div className="scheme-detail-card" key={scheme.id}>
              <div className="scheme-top-row">
                <div className="scheme-title-col">
                  <span className="scheme-code-badge">{scheme.code}</span>
                  <h3>
                    {language === 'mr'
                      ? scheme.marathiName
                      : language === 'hi'
                      ? scheme.hindiName
                      : scheme.name}
                  </h3>
                  <div className="scheme-sub-heading">{scheme.name}</div>
                </div>

                <div className="scheme-coverage-tag">
                  <span>{t.schemeCoverageLimit}</span>
                  <strong>{scheme.coverageAmount}</strong>
                </div>
              </div>

              <p className="scheme-desc-text">
                {language === 'mr'
                  ? scheme.marathiSummary
                  : scheme.summary}
              </p>

              {/* Key Benefits Grid */}
              <div className="scheme-benefits-box">
                <strong>{t.keyBenefitsTitle}</strong>
                <div className="benefits-grid">
                  {scheme.keyBenefits.map((benefit, idx) => (
                    <div className="benefit-item" key={idx}>
                      <CheckCircle2 size={15} className="benefit-check" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="scheme-footer-row">
                <div className="scheme-helpline-info">
                  <PhoneCall size={16} />
                  <span>
                    <strong>{t.tollFreeHelpline}</strong> {scheme.helpline}
                  </span>
                </div>

                <a
                  href={scheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheme-portal-link"
                >
                  <span>{t.officialPortal}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Hospital Admission Process */}
      <section className="hospital-process-guide">
        <h2>{t.howToGetTreatment}</h2>

        <div className="steps-process-grid">
          <div className="process-step-card">
            <div className="step-number">1</div>
            <h4>{t.step1HospitalTitle}</h4>
            <p>{t.step1HospitalDesc}</p>
          </div>

          <div className="process-step-card">
            <div className="step-number">2</div>
            <h4>{t.step2HospitalTitle}</h4>
            <p>{t.step2HospitalDesc}</p>
          </div>

          <div className="process-step-card">
            <div className="step-number">3</div>
            <h4>{t.step3HospitalTitle}</h4>
            <p>{t.step3HospitalDesc}</p>
          </div>

          <div className="process-step-card">
            <div className="step-number">4</div>
            <h4>{t.step4HospitalTitle}</h4>
            <p>{t.step4HospitalDesc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schemes;
