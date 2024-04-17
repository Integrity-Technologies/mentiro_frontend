import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const LanguageToggleButton = ({ currentLanguage, onLanguageChange, onLogout }) => {
  const [isEnglish, setIsEnglish] = useState(currentLanguage === 'english');

  const toggleLanguage = () => {
    setIsEnglish(prevState => !prevState); // Toggle the isEnglish state correctly
  const newLanguage = isEnglish ? 'arabic' : 'english'; // Use the updated isEnglish state
  onLanguageChange(newLanguage);
  };

  return (
    <div>
      <ButtonGroup className="mb-2">
      <Button onClick={toggleLanguage}>
        {isEnglish ? 'Switch to Arabic' : 'Switch to English'}
      </Button>
      <Button onClick={onLogout}>Logout</Button>
    </ButtonGroup>
    </div>
  );
};

export default LanguageToggleButton;
