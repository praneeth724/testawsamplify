import React, { useState } from "react";
import Select from "react-select";
import "./OfficerFineSelectInterface.css"; // Import the CSS file
import axios from "axios";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Officer Fine Interface/OFIE.json";
import sinhalaContent from "../Json/Officer Fine Interface/OFIS.json";
import tamilContent from "../Json/Officer Fine Interface/OFIT.json";
import { toast, Toaster } from "react-hot-toast";

const offenses = [
  { label: "Identification plates", value: 1000 },
  { label: " Not carrying R.L", value: 1000 },
  { label: "Contravening R.L ", value: 1000 },
  {
    label:
      "Driving Emergency Service Vehicles & Public Service Vehicles without D.L",
    value: 1000,
  },
  { label: "Driving Special Purpose Vehicles without a license", value: 1000 },
  {
    label:
      "Driving a vehicle loaded with chemicals/hazardous waste without a license",
    value: 1000,
  },
  {
    label: "Not having a license to drive a specific class of vehicles",
    value: 1000,
  },
  { label: "Not carrying D.L", value: 1000 },
  { label: "Not having an instructors license", value: 2000 },
  { label: "Contravening Speed limits", value: 3000 },
  { label: "Disobeying road rules", value: 2000 },
  { label: "Activities obstructing control of the motor vehicle", value: 1000 },
  { label: "Signals by Driver", value: 1000 },
  { label: "Reversing for long distance", value: 1000 },
  { label: "Sound or light warnings", value: 1000 },
  { label: "Excessive emission of smoke, etc.", value: 1000 },
  { label: "Riding on turning boards", value: 500 },
  { label: "No of persons in front seats", value: 1000 },
  { label: " Driving without seat belt", value: 1000 },
  { label: "Not wearing protective helmets", value: 1000 },
  { label: "Distribution of advertisement", value: 1000 },
  { label: "Excessive use of noise", value: 1000 },
  {
    label:
      "Disobeying directions & Signals of police officers/ Traffic wardens",
    value: 2000,
  },
  { label: "Non- compliance with traffic signals", value: 1000 },
  {
    label: "Failure to take precautions when discharging fuel into tank",
    value: 1000,
  },
  { label: "Halting or Parking", value: 1000 },
  { label: "Non- use of precautions when parking", value: 2000 },
  {
    label: "Excessive carriage of persons in motor car or private coach",
    value: 500,
  },
  { label: "Carriage of passengers in excess in omnibuses", value: 500 },
  {
    label: "Carriage on lorry or Motor Tricycle van of goods in excess",
    value: 500,
  },
  { label: "No of persons carried in a lorry", value: 500 },
  { label: "Violation of regulations on motor vehicles", value: 1000 },
  {
    label:
      "Failure to carry the emission certificate or the fitness Certificate",
    value: 500,
  },

  // Add more offenses as needed
];

const OfficerFineSelectInterface = () => {
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOffenses, setSelectedOffenses] = useState([]);
  const [fine, setFine] = useState(0);
  const [linkSent, setLinkSent] = useState(false);
  const [finePercentage, setFinePercentage] = useState(0);
  const [licenseStatus, setLicenseStatus] = useState("Active");

  const calculateFine = () => {
    let totalFine = 0;
    selectedOffenses.forEach((offense) => {
      totalFine += offense.value;
    });
    setFine(totalFine);
  };

  const handleSendLink = () => {
    const licenseNumberRegex = /^[A-Z]\d{7}$/;
    const phoneRegex = /^\+\d{11}$/;

    if (!phoneRegex.test(phoneNumber)) {
      toast.error(
        "Please enter a valid phone number starting with '+' followed by 11 digits"
      );
      return;
    }

    if (!licenseNumber || !licenseNumberRegex.test(licenseNumber)) {
      toast.error(
        "License number must start with a capital letter followed by 7 digits"
      );
    }

    if (selectedOffenses.length === 0) {
      toast.error("Please select at least one offense");
      return;
    }

    const selectedOffenseLabels = selectedOffenses.map(
      (offense) => offense.label
    );
    const fineDetails = `Welcome To EZ Fine\n Your Fine Amount: ${fine}\nYour Fines: ${selectedOffenseLabels.join(
      ", "
    )}\nDate: ${new Date().toLocaleDateString()}\n For Pay Use This link:https://ezfinelanka.netlify.app/`;

    //Calculate the new fine percentage
    let newFinePercentage = finePercentage;
    selectedOffenses.forEach((offense) => {
      newFinePercentage += offense.value * 0.001; // Increase by 1% for every 100 units of fine amount
    });
    setFinePercentage(newFinePercentage);
    if (newFinePercentage > 10) {
      setLicenseStatus("Blocked");
    }
    let newLicenseStatus = licenseStatus; // Initialize with current license status

    if (newFinePercentage > 10) {
      newLicenseStatus = "Blocked";
    }

    setLicenseStatus(newLicenseStatus); // Update the license status

    axios
      .post("http://localhost:3003/sendSMS", {
        phoneNumber,
        message: fineDetails,
      })
      .then((response) => {
        console.log(response.data);
        setLinkSent(true);
        toast.success(content.link_sent);
        // Save fine details to the database
        axios.post("http://localhost:3004/saveFineDetails", {
          phoneNumber,
          fineType: selectedOffenseLabels.join(", "),
          fineAmount: fine,
          date: new Date().toLocaleDateString(),
          licenseNumber: licenseNumber,
          finePercentage: newFinePercentage,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (selectedOptions) => {
    setSelectedOffenses(selectedOptions);
    console.log(selectedOptions);
  };

  return (
    <div className="bgof">
      <div className="overlayof">
        <Toaster
          toastOptions={{
            duration: 4000,
          }}
        />
        <h1>
          SELECT <span style={{ color: "#E4A80E" }}>OFFENCES</span>
        </h1>
        <div className="OfficerfineInterface">
          <label>
            {content.driver_license_number}
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </label>
          <label>
            {content.phone_number}
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label>
            {content.offenses}
            <Select
              options={offenses}
              isMulti
              value={selectedOffenses}
              onChange={handleChange}
              maxMenuHeight={200}
            />
          </label>
          <button onClick={calculateFine}>{content.calculate_fine}</button>
          <p style={{ textAlign: "center", color: "red" }}>
            {content.total_fine} {fine}
          </p>

          <div className="date1">
            <label for="myDate">{content.select_date}</label>
            <input type="date" id="myDate" name="myDate"></input>
          </div>

          <button onClick={handleSendLink}>{content.send_link}</button>

          {/* {linkSent && <p className="successMessage">{content.link_sent}</p>} */}
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default OfficerFineSelectInterface;
