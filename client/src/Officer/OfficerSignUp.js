import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Officer Signup/OSE.json";
import sinhalaContent from "../Json/Officer Signup/OSS.json";
import tamilContent from "../Json/Officer Signup/OST.json";
import "./OfficerSignUp.css";
import { toast, Toaster } from "react-hot-toast";

function OfficerSignUp() {
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register1 = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[A-Z]\d{7}$/;

    if (!email || !password || !confirmPassword || !username) {
      toast.error("All fields are required");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
    }

    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one capital letter, one number, one symbol"
      );
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    if (!username || !usernameRegex.test(username)) {
      toast.error(
        "License number must start with a capital letter followed by 7 digits"
      );
    }
    Axios.post("http://localhost:3009/register1", {
      email: email,
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
        } else {
          toast.success("Verify Your Phone Number!");

          setTimeout(() => {
            window.location.href = "/OTPVerifyOfficer";
          }, 1000);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === "Email already exists"
        ) {
          toast.success("Email already exists");
        } else if (
          error.response &&
          error.response.data.message === "Officer ID already taken"
        ) {
          toast.success("Officer ID already taken");
        } else {
          console.error("Error registering user:", error);
          toast.success("Error registering user");
        }
      });
  };

  return (
    <div className="bgp">
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
            />
            <input
              className="buttonofficersign"
              type="submit"
              onClick={register1}
              value={content.CreateAccountButton}
            />
            <div className="existing">{content.ExistingMemberMessage}</div>
            <Link to="/officerlogin">
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

export default OfficerSignUp;
