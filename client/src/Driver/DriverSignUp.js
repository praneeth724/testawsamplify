import React, { useState } from "react";
import Axios from "axios";
import "./DriverSignUp.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Driver Signup/DSE.json";
import sinhalaContent from "../Json/Driver Signup/DSS.json";
import tamilContent from "../Json/Driver Signup/DST.json";
import { toast, Toaster } from "react-hot-toast";

function DriverSignUp() {
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

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // const [registerStatus, setRegisterStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPopup, setShowPopup] = useState(false);
  // const [popupMessage, setPopupMessage] = useState("");

  const register = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[A-Z]\d{7}$/;

    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      // setPopupMessage("Please enter a valid email address");
      // setShowPopup(true);
      return;
    }

    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one capital letter, one number, one symbol"
      );
      // setPopupMessage(
      //   "Password must be at least 8 characters long and contain at least one capital letter, one number, one symbol"
      // );
      // setShowPopup(true);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      // setPopupMessage("Passwords do not match");
      // setShowPopup(true);
      return;
    }

    if (!username || !usernameRegex.test(username)) {
      toast.error(
        "License number must start with a capital letter followed by 7 digits"
      );
      // setPopupMessage(
      //   "License number must start with a capital letter followed by 7 digits"
      // );
      // setShowPopup(true);
      return;
    }

    Axios.post("http://localhost:3008/register", {
      email: email,
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.message) {
          // setRegisterStatus(response.data.message);
          toast.success(response.data.message);
        } else {
          // setRegisterStatus("OTP SEND SUCCESSFULLY");
          toast.success("Verify Your Phone Number!");
          setTimeout(() => {
            window.location.href = "/OTPVerifyDriver";
          }, 1000);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === "Email already exists"
        ) {
          // setPopupMessage("Email already exists");
          // setShowPopup(true);
          toast.error("Email already exists");
        } else if (
          error.response &&
          error.response.data.message === "License Number already taken"
        ) {
          // setPopupMessage("License Number already taken");
          // setShowPopup(true);
          toast.error("License Number already taken");
        } else {
          console.error("Error registering user:", error);
          // setRegisterStatus("Error registering user");
          toast.error("Error registering user");
        }
      });
  };

  return (
    <div className="bgp">
      {/* {showPopup && <PopupMessage message={popupMessage} />} */}
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="overlay">
        <h1>
          Register <span style={{ color: "#E4A80E" }}>Here</span>
        </h1>
        <div className="loginFormofficersign">
          <form>
            <label htmlFor="email">{content.EmailLabel}</label>
            <input
              className="textInputofficersign"
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder={content.EmailPlaceholder}
              required
            />
            <label htmlFor="username">{content.UsernameLabel}</label>
            <input
              className="textInputofficersign"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              // onBlur={checkUsername}
              placeholder={content.UsernamePlaceholder}
              required
            />
            <label htmlFor="password">{content.PasswordLabel}</label>
            <input
              className="textInputofficersign"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={content.PasswordPlaceholder}
              required
            />
            <label htmlFor="confirmPassword">{content.Conform}</label>
            <input
              className="textInputofficersign"
              type="password"
              name="confirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder={content.Conform}
              required
              // value=
            />
            <input
              className="buttonofficersign"
              type="submit"
              onClick={register}
              value={content.RegisterButton}
            />
            {/* <p>{content.ExistingMemberMessage}</p> */}
            <h1
            //   style={{
            //     fontSize: "15px",
            //     textAlign: "center",
            //     marginTop: "-65px", //-65px ranawaka code
            //     color: "red",
            //   }}
            >
              {/* {registerStatus} */}
            </h1>

            <div className="existing">{content.ExistingMemberMessage}</div>
            <Link to="/driverlogin">
              <button className="buttonofficersign">
                {content.LoginButton}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DriverSignUp;
