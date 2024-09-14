import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "./OTPVerifyofficer.css";

const OTPVerifyOfficer = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        toast.success("Invalid OTP!");
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        window.location.href = "/officermaininterface";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="sec">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="sec1">👍Login Success</h2>
        ) : (
          <div className="sec2">
            <h1 className="sec3">
              EZFINE
              <span style={{ color: "#E4A80E" }}>LANKA</span>
            </h1>
            {showOTP ? (
              <>
                <div className="sec5">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="sec8">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="sec6"
                ></OtpInput>
                <button onClick={onOTPVerify} className="sec7">
                  {loading && <CgSpinner size={20} className="sec8" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="sec9">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" className="sec10">
                  Verify your phone number
                </label>
                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  className="sec13"
                />
                <button onClick={onSignup} className="buttonotp">
                  {loading && <CgSpinner size={20} className="sec12" />}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OTPVerifyOfficer;
