import React, { useState } from "react";
import axios from "axios";
import "./DriverHistory.css"; // Import the CSS file
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Driver History Interface/DHIE.json";
import sinhalaContent from "../Json/Driver History Interface/DHIS.json";
import tamilContent from "../Json/Driver History Interface/DHIT.json";


const DriverHistory = () => {
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

  const [licenseNumber, setLicenseNumber] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [licenseStatus, setLicenseStatus] = useState("");

  const handleSubmitLicense = () => {
    if (!licenseNumber || !isValidLicenseNumber(licenseNumber)) {
      setError("Please enter a valid Sri Lankan driver license number.");
      return;
    }
    axios
      .get(`http://localhost:3005/getFines?licenseNumber=${licenseNumber}`)
      .then((response) => {
        console.log(response);
        const totalPercentage = response.data.reduce(
          (acc, curr) => acc + parseFloat(curr.fine_percentage),
          0
        );
        const licenseStatus = totalPercentage >= 7 ? "Blocked" : "Active";
        setHistoryData(response.data);
        setLicenseStatus(licenseStatus);
        setError("");
      })
      .catch((error) => {
        setHistoryData([]);
        setError("Failed to fetch fines.");
      });
  };

  const handleSubmitLicense1 = () => {
    if (!licenseNumber || !isValidLicenseNumber(licenseNumber)) {
      setError("Please enter a valid Sri Lankan driver license number.");
      return;
    }
    axios
      .get(`http://localhost:3019/getFineAmount?licenseNumber=${licenseNumber}`)
      .then((response) => {
        console.log(response);
        setPaymentHistory(response.data);
        setError("");
      })
      .catch((error) => {
        setPaymentHistory([]);
        setError("Failed to fetch payment history.");
      });
  };

  // Function to validate the Sri Lankan license number format
  const isValidLicenseNumber = (license) => {
    const regex = /^[A-Za-z][0-9]{7}$/;
    return regex.test(license);
  };

  return (
    <div className="bg_history">
      <div className="history-container">
        <h1>
          STAY SAFE, <span style={{ color: "#E4A80E" }}>STAY UPDATED</span>
        </h1>
        <div className="input-section">
          <label className="label1" htmlFor="licenseNumber">
            {content.EnterLicenseNumber}
          </label>
          <input
            type="text_1"
            id="licenseNumber"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
          <br />
          <br />
          <br />
          <button onClick={handleSubmitLicense} className="btn1">
            {content.GetLicenseHistory}
          </button>

          {/* <br /> */}
          {/* <br /> */}
          {/* <br /> */}
          <button onClick={handleSubmitLicense1} className="btn2">
            {content.GetPaymentHistory}
          </button>
        </div>
        <br />
        <br />
        {error && <p className="error">{error}</p>}
        {historyData.length > 0 && (
          <>
            <h2 style={{ textAlign: "center", color: "black" }}>
              License History
            </h2>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Offensed Date</th>
                  <th>Fine Amount</th>
                  <th>Fine Type</th>
                  <th>Relavant Fine Percentage</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((fines, index) => (
                  <tr key={index}>
                    <td>{fines.date}</td>
                    <td>{fines.fine_amount}</td>
                    <td>{fines.fine_type}</td>
                    <td>{fines.fine_percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              Total Fine Percentage:{" "}
              {historyData.reduce(
                (acc, curr) => acc + parseFloat(curr.fine_percentage),
                0
              )}
            </p>

            <p
              className={`license-status ${
                licenseStatus === "Active" ? "active" : "blocked"
              }`}
            >
              License Status: {licenseStatus}
            </p>
          </>
        )}
        {paymentHistory.length > 0 && (
          <>
            <h2 style={{ textAlign: "center", color: "black" }}>
              {" "}
              Payments History
            </h2>
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th>Paid Date</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.date}</td>
                    <td>{payment.name}</td>
                    <td>{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
     
    </div>
  );
};

export default DriverHistory;
