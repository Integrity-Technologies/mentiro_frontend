import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const LanguageToggleButton = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    if (selectedOption.value === 'logout') {
      handleLogout();
    } else {
      i18n.changeLanguage(selectedOption.value);
      onLanguageChange(selectedOption.value);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from local storage
    dispatch(logout());
    setTimeout(() => {
      navigate('/');
    }, 2000); // 2000 milliseconds = 2 seconds, adjust as needed
  };

  const options = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
    // { value: 'logout', label: 'Logout' },
  ];

  // Custom styles for react-select
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      maxWidth: 'lg',
    }),
    control: (provided) => ({
      ...provided,
      height: '50px', // Adjust height here
      minHeight: '50px', // Ensure min height
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 4,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: 4,
    }),
    multiValue: (provided) => ({
      ...provided,
      height: 'auto',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={options.find(option => option.value === i18n.language)}
      className="w-full"
      styles={customStyles}
    />
  );
};

export default LanguageToggleButton;
