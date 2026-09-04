import React from 'react';
import Healthcare from './pages/Healthcare';
import type { Language } from './data/translations';

interface FindHealthcareProps {
  language?: Language;
}

const FindHealthcare: React.FC<FindHealthcareProps> = ({
  language = 'mr',
}) => {
  return <Healthcare language={language} />;
};

export default FindHealthcare;