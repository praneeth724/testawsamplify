// MainComponent.js
import React from "react";
import { useLanguage } from "./LanguageContext";
import "./TranslateButton.css"; // Import the CSS file

const TranslateButton = () => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  return (
    <div className="main-container">
      <div className="cont">
        <button
          className="button11"
          onClick={() => handleLanguageChange("english")}
        >
          English
        </button>
        <button
          className="button11"
          onClick={() => handleLanguageChange("sinhala")}
        >
          සිංහල
        </button>
        <button
          className="button11"
          onClick={() => handleLanguageChange("tamil")}
        >
          தமிழ்
        </button>
      </div>
    </div>
  );
};

export default TranslateButton;
