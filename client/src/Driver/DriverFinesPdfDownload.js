import React from "react";
import "./DriverFinesPdfDownload.css";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Driver Download Pdf/DDPE.json";
import sinhalaContent from "../Json/Driver Download Pdf/DDPS.json";
import tamilContent from "../Json/Driver Download Pdf/DDPT.json";


function DriverFinesPdfDownload() {
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
  const fileUrl =
    "https://drive.google.com/file/d/1zTwtYwER57J9H0lyY4MHYubY7p3tmbRV/view?usp=sharing";

  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };
  return (
    <div className="bgfd">
      <div className="Download">
        <header className="Downloadheader">
          <h1>{content.DownloadPDF}</h1>
          <button onClick={handleDownload}>Download PDF</button>
        </header>
      </div>
    
    </div>
  );
}

export default DriverFinesPdfDownload;
