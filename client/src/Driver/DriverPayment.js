import React, { useState, useEffect } from "react";
import "./DriverPayment.css"; // Import your CSS file
import axios from "axios";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Driver Payment/DPE.json";
import sinhalaContent from "../Json/Driver Payment/DPS.json";
import tamilContent from "../Json/Driver Payment/DPT.json";

const DriverPayment = () => {
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
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const fineList = [
    { value: 500, payhereLink: "https://sandbox.payhere.lk/pay/o729d3828" },
    { value: 1000, payhereLink: "https://sandbox.payhere.lk/pay/o75f0fc31" },
    { value: 2000, payhereLink: "https://sandbox.payhere.lk/pay/o9525152f" },
    { value: 3000, payhereLink: "https://sandbox.payhere.lk/pay/of5e29cca" },
    { value: 4000, payhereLink: "https://sandbox.payhere.lk/pay/oa674f921" },
    { value: 5000, payhereLink: "https://sandbox.payhere.lk/pay/od173c9b7" },
    { value: 1500, payhereLink: "https://sandbox.payhere.lk/pay/oe22225b9" },
    { value: 2500, payhereLink: "https://sandbox.payhere.lk/pay/o4f175c14" },
    { value: 3500, payhereLink: "https://sandbox.payhere.lk/pay/o38106c82" },
    { value: 3500, payhereLink: "https://sandbox.payhere.lk/pay/o44a5f2f0" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3019/makePayment", {
        name: name,
        licenseNumber: licenseNumber,
        amount: amount,
        date: date,
      })
      .then((response) => {
        console.log(response.data);
        // Check if payment was successful
        if (response.data.message === "Payment successful") {
          // Update UI or show success message
          // alert("Payment successful!");
        } else {
          // Handle payment error
          // alert("Payment failed. Please try again later.");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error
        alert("An error occurred. Please try again later.");
      });

    //
    const selectedFine = fineList.find((item) => item.value == amount);
    if (selectedFine) {
      window.location.href = selectedFine.payhereLink;
    } else {
      alert("Invalid fine amount entered.");
    }
  };

  return (
    <div className="bgdpayment">
      <div className="overlaydpayment">
        <div className="head">
          <center>
            <h1>
              PAYMENT <span style={{ color: "#E4A80E" }}>DETAILS</span>
            </h1>
          </center>
        </div>
        <div className="paymentinterface">
          <h2>{content.PayYourFines}</h2>
          <form onSubmit={handleSubmit}>
            <br />
            <br />
            {content.EnterYourName}
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            {content.YourLicenceNo}
            <input
              type="text"
              name="licence"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
            <br />
            <br />
            {content.OffenceAmount}
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <br />
            {content.SelectDate}
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <br />
            <center>
              <button type="submit">{content.Submit}</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverPayment;
