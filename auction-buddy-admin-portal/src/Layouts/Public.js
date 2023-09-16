import React, { lazy, Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import logo from "../assets/logo.svg";

const Otp = lazy(() => import("../Pages/Login/Otp"));
const LoginForm = lazy(() => import("../Pages/Login/Loginform"));

const Public = () => {
  const layoutItems = useSelector((store) => store.layout);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {location.pathname == "/" ? null : (
        <Box
          sx={{
            // py: "1rem",
            height: { lg: "80px", sm: "60px" },
            background: "#0E0E0E",
            justifyContent: "space-around",
            width: "100%",
            position: "fixed",
            opacity: "1",
            zIndex: "200",
          }}
          className="flexrow"
        >
          <Box
            sx={{
              background: "#0E0E0E",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1440px",
              mx: "auto",
              height: "48px",
            }}
            className="flexrow"
          >
           
            <Box
              className="noDecoration"
              sx={{ cursor: "pointer", pl: { md: '40px', sm: '16px' } }}
            >
              <img className="imageSize" src={logo} alt="logo" />
            </Box>
            <Box
              className="flexrow"
              sx={{
                justifyContent: "space-between",
                width: { lg: "73%", sm: "81%", md: "75%" },
                pr: { md: "40px", sm: "16px" },
              }}
            >
            </Box>
          </Box>
        </Box>
      )}
      {/* <Router> */}
      <Routes>
        {/* <Route path="*" element={<ErrorPage />} /> */}
        <Route path="/" element={<LoginForm />}/>
        <Route path="/otp" element={<Otp />} />
      </Routes>
      {/* </Router> */}
    </>
  );
};

export default Public;
