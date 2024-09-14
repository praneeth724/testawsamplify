import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Main Page/ME.json";
import sinhalaContent from "../Json/Main Page/MS.json";
import tamilContent from "../Json/Main Page/MT.json";
import TranslateButton from "../TraslateBtn/TranslateButton";
import ChatBot from "../ChatBot/ChatBot";

const MainPage = () => {
  const { selectedLanguage } = useLanguage();

  let content;
  switch (selectedLanguage) {
    case "english":
      content = englishContent;
      break;
    case "sinhala":
      content = sinhalaContent;
      break;
    case "tamil":
      content = tamilContent;
      break;
    default:
      content = englishContent;
  }
  return (
    <div className="bg">
      <div className="overlay">
        <TranslateButton></TranslateButton>
        <div className="mainpage">
          <div className="head">
            <h1>
              EZ <span style={{ color: "#E4A80E" }}>FINE</span> SYSTEM
            </h1>
            <p>AI ASSISTED FINE MANAGEMENT SYSTEM</p>
          </div>

          <div className="body">
            <p>
              <strong>
                <span style={{ color: "#E4A80E" }}>Login</span> As
              </strong>
            </p>
            <div className="driver">
              <p className="user"> {content.driver}</p>
              <div>
                <Link to="/driverlogin">
                  <img src="/driver.jpg" alt="" className="image" />
                </Link>
              </div>
            </div>
            <div className="officer">
              <p className="user">{content.officer}</p>
              <Link to="/officerlogin">
                <img src="/officer.jpg" alt="" className="image" />
              </Link>
            </div>
            <ChatBot></ChatBot>
            {/* All button removed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
