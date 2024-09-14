import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DriverLogin from "./Driver/DriverLogin";
import DriverSignUp from "./Driver/DriverSignUp";
import OfficerLogin from "./Officer/OfficerLogin";
import OfficerSignUp from "./Officer/OfficerSignUp";
import DriverMainInterface from "./Driver/DriverMainInterface";
import OfficerMainInterface from "./Officer/OfficerMainInterface";
import OTPVerifyDriver from "./FireBase/OTPVerifyDriver";
import OTPVerifyOfficer from "./FireBase/OTPVerifyOfficer";
import OfficerFineSelectInterface from "./Officer/OfficerFineSelectInterface";
import DriverFinesPdfDownload from "./Driver/DriverFinesPdfDownload";
import DriverPayment from "./Driver/DriverPayment";
import DriverLatePayment from "./Driver/DriverLatePayment";
import GoogleLoginDriver from "./FireBase/GoogleLoginDriver";
import GoogleLoginOfficer from "./FireBase/GoogleLoginOfficer";
import DriverHistory from "./Driver/DriverHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="driverlogin" element={<DriverLogin />} />
        <Route path="driversignup" element={<DriverSignUp />} />
        <Route path="officerlogin" element={<OfficerLogin />} />
        <Route path="officersignup" element={<OfficerSignUp />} />
        <Route path="/OTPVerifydriver" element={<OTPVerifyDriver />} />
        <Route path="/OTPVerifyofficer" element={<OTPVerifyOfficer />} />
        <Route path="/drivermaininterface" element={<DriverMainInterface />} />
        <Route
          path="/officermaininterface"
          element={<OfficerMainInterface />}
        />
        <Route
          path="/officerfineselectinterface"
          element={<OfficerFineSelectInterface />}
        />
        <Route
          path="/driverfinespdfdownload"
          element={<DriverFinesPdfDownload />}
        />
        <Route path="/driverpayment" element={<DriverPayment />} />
        <Route path="/driverlatepayment" element={<DriverLatePayment />} />
        <Route path="/googlelogindriver" element={<GoogleLoginDriver />} />
        <Route path="/googleloginofficer" element={<GoogleLoginOfficer />} />
        <Route path="/history" element={<DriverHistory />} />
        <Route path="/googlelogindriver" element={<GoogleLoginDriver />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
