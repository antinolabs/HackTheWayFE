import React, { Suspense, lazy, Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminIcon from "../assets/AdminProfile.svg";
import logoIcon from "../assets/logo.svg";
import Sidebar from "../Components/Sidebar";
import { CircularProgress } from "@mui/material";


const Dashboard = lazy(() => import("../Pages/Dashboard/AuctionList"));
// const ErrorPage = lazy(() => import("../pages/Common/ErrorPage"));
const Dashboard_layout = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    let profile_detail = window.localStorage.getItem("AB-profile");
    setProfile(JSON.parse(profile_detail));
  }, []);

  return (
    <>
      <Box
        className="flexrow"
        sx={{
          height: { sm: "3.75rem", lg: "5rem" },
          zIndex: 10000,
          justifyContent: "space-between",
          position: "fixed",
          // width: "100vw",
          width: "100%",
          background: "#fff",
          boxShadow:'0px 2px 12px 0px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Box
          sx={{
            background: `#0E0E0E`,
            color: "#fff",
            height: "100%",
            width: "20%",
            // width: "80px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "160px",
          }}
          className="fs_24 font500"
        >
          <Box sx={{ width: '46px', objectFit:'contain' }}>
            <img src={logoIcon} style={{ width: "100%" }} />
          </Box>
          <Typography className="font600"
            sx={{ fontSize: { sm: "18px", lg: "24px" } }}>
            Auction Buddy
          </Typography>
        </Box>
        <Box className=" flexrow" sx={{ mr: "4.25%", columnGap: "14px" }}>
          <Box
            className=" pointer flexrow"
          >
            <Box sx={{ height: { sm: "36px", lg: "48px" } }}>
              <img src={AdminIcon} height="100%" alt="adminicon"></img>
            </Box>
            <Box sx={{ pl: "12px" }}>
              <Typography
                className="font600"
                sx={{ fontSize: { sm: "14px", lg: "16px" } }}
              >
                {profile?.name}
              </Typography>
              <Typography
                className="font400"
                sx={{ fontSize: { sm: "12px", lg: "14px" } }}
              >
                {profile?.userType}
              </Typography>
            </Box>
          </Box>
       
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "#fff",
        }}
      >
        {/* <Box sx={{ width: "17.2%", position: "fixed" }}> */}
        <Box
          sx={{
            width: "20%",
            position: "fixed",
            // pr: { md: "2%", sm: "4px" },
            minWidth: "160px",
            backgroundColor: "#fff",
            bottom: "0px",
            top: "0px",
            display: "flex",
            flexDirection: "column",
           
            "&::-webkit-scrollbar-thumb": {
              width: "2px",
              background: "rgb(195 195 195)",
              borderRadius: "15px",
            },
          }}
        >
          <Sidebar />
        </Box>
        <Suspense
          fallback={
            <div className="lazyloadinfo" style={{ display: "relative" }}>
              <div
                sx={{
                  display: "absolute !important",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <CircularProgress
                  sx={{
                    textAlign: "center",
                  }}
                />
              </div>
            </div>
          }
        >
          <Box
            sx={{
              width: "100%",
              background: "#f5f5f5",
              ml: { sm: "max(160px, 20%)", md: "20%" },
              mt: { lg: "5rem", sm: "3.75rem" },
              overflow: "hidden",
            }}
          >
            {/* <Box sx={{ m: "1.5rem" }}> */}
            <Box sx={{ m: "4.25%" }}>
              {/* <Router> */}
              <Routes>
                {/* <Route path="*" element={<ErrorPage />} /> */}
                <Route path="/auction-details" element={<Dashboard />} />
              </Routes>

              {/* </Router> */}
            </Box>
          </Box>
        </Suspense>
      </Box>
    </>
  );
};

export default Dashboard_layout;
