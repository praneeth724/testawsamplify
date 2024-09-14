import React from "react";
import { Link } from "react-router-dom";
import "./DriverMainInterface.css";
import englishContent from "../Json/Driver Main Interface/DME.json";
import sinhalaContent from "../Json/Driver Main Interface/DMS.json";
import tamilContent from "../Json/Driver Main Interface/DMT.json";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import TranslateButton from "../TraslateBtn/TranslateButton";

function DriverMainInterface() {
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
    <div className="bgd">
      <div className="overlayd">
        <TranslateButton></TranslateButton>
        <h1>
          Drive Responsibly
          <span style={{ color: "#E4A80E" }}>, Arrive Safely</span>
        </h1>

        <div className="bodyd">
          <br></br>
          <div className="payd">
            <p className="topicd">{content.Payment}</p>
            <div>
              <Link to="/driverpayment" className="link">
                <img src="/payment.jpg" alt="" className="imaged" />
              </Link>
            </div>
          </div>
          <div className="historyd">
            <p className="topicd">{content.ViewHistory}</p>

            <Link to="/history" className="link">
              <img src="/viewhistory.jpg" alt="" className="imaged" />
            </Link>
          </div>
          <div className="latepaymentd">
            <p className="topicd">{content.LatePayment}</p>
            <div>
              <Link to="/driverlatepayment" className="link">
                <img src="/late.jpg" alt="" className="imaged" />
              </Link>
            </div>
          </div>
          <div className="offencesd">
            <p className="topicd">{content.OffencesDetails}</p>

            <Link to="/driverfinespdfdownload" className="link">
              <img src="/offencedetails.jpg" alt="" className="imaged" />
            </Link>
          </div>
          {/* <MainComponent></MainComponent> */}
        </div>
      </div>
    </div>
  );
}

export default DriverMainInterface;
