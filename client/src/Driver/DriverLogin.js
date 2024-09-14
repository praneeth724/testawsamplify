import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./DriverLogin.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../TraslateBtn/LanguageContext";
import englishContent from "../Json/Driver Login/DLE.json";
import sinhalaContent from "../Json/Driver Login/DLS.json";
import tamilContent from "../Json/Driver Login/DLT.json";
import { toast, Toaster } from "react-hot-toast";
import GoogleLoginDriver from "../FireBase/GoogleLoginDriver";

function DriverLogin() {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (!username || !password) {
      // setLoginStatus("Username and password are required");
      toast.error("Username and password are required");
      return;
    }
    Axios.post("http://localhost:3008/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          // setLoginStatus("Logged in successfully");
          toast.success("Logged in successfully");
          setTimeout(() => {
            // Redirect to another page after 1 minute (60000 milliseconds)
            window.location.href = "/drivermaininterface";
          }, 100);
        } else {
          // setLoginStatus(response.data.message || "Unknown error occurred");
          toast.error(response.data.message || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // setLoginStatus("Error logging in. Please try again later.");
        toast.error("Error logging in. Please try again later.");
      });
  };

  return (
    <div className="bgp">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="overlay">
        <h1>
          Login
          <span style={{ color: "#E4A80E" }}>Here</span>
        </h1>
        <div className="loginFormDriver">
          <form>
            <label htmlFor="username">{content.UsernameLabel}</label>
            <input
              className="textInput"
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
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={content.PasswordPlaceholder}
              required
            />
            <input
              className="button1"
              type="submit"
              onClick={login}
              value={content.LoginButton}
            />
            {/* <Link to="/googlelogindriver">
              <button className="button1"> {content.Google}</button>
            </Link> */}
            <GoogleLoginDriver></GoogleLoginDriver>

            <div className="newMember">{content.NewMemberMessage}</div>

            <Link to="/driversignup">
              <button className="button1">{content.CreateAccountButton}</button>
            </Link>
            <Link to="/">
              <button className="button1">{content.Back}</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DriverLogin;
