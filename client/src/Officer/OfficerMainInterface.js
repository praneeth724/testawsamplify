import React from "react";
import "./OfficerMainInterface.css";
import { Link } from "react-router-dom";
import TranslateButton from "../TraslateBtn/TranslateButton";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Officer Main Page/OMPE.json";
import sinhalaContent from "../Json/Officer Main Page/OMPS.json";
import tamilContent from "../Json/Officer Main Page/OMPT.json";

function OfficerMainInterface() {
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
    <div
      className="bgo"
      style={{
        backgroundImage: `url("bgimage.jpg")`,
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="overlayo">
        <TranslateButton></TranslateButton>
        <div className="officerinterface">
          <h1>
            Drive Responsibly{" "}
            <span style={{ color: "#E4A80E" }}>Arrive Safely..</span>{" "}
          </h1>
          <div className="bodyo">
            <div className="inbodyo">
              <div className="offenceso">
                {/* <div> */}
                <Link to="/officerfineselectinterface" className="linko">
                  <img src="/offencedetails.jpg" alt="" className="imageo" />
                  <p className="topico">{content.select_offences}</p>
                </Link>
                {/* </div> */}
              </div>
              <div className="historyo">
                <Link to="/history" className="linko">
                  <img src="/viewhistory.jpg" alt="" className="imageo" />
                  <p className="topico">{content.view_history}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerMainInterface;
