import React, { useEffect, useState, useRef, startTransition } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "../assets/logout.svg";
import LogoutActive from "../assets/logout-active.svg";
import Modal from "@mui/material/Modal";
import close_square from "../assets/Cross.svg";

import { useDispatch } from "react-redux";
import { setPublic } from "../Redux/Layoutslice";
import DashBoard from "../assets/dashboard.svg";
import DashBoardActive from "../assets/dashboard-active.svg";

const BTNSTYLE = {
  fontFamily: "Inter",
  textTransform: "none !important",
  color: '#ECECEC',
  width: "170px",
  height: "40px",
  boxShadow: "none !important",
  my: 1.2,
  py: 1,
  backgroundColor: "primary",
  "&:hover": {
    backgroundColor: "#dadada",
    boxShadow: "none !important",
  },
};
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const active = useRef();
  const logout = useRef(false);
  const [open, setopen] = useState(false);

  const DATA = [{
    id: 1,
    label: "Auction Details",
    permission_name: "adminDashboard",
    drawers: [],
    mainroute: "/auction-details",
    routes: ["/auction-details"],
    icon: [DashBoard, DashBoardActive],
  },]

  const setActiveclass = (arr) => {
    const check = arr.includes(pathname);
    if (check) {
      active.current = arr;
      return "sidebarBox flexrow";
    }
    else {
      active.current = null;
      return "flexrow";

    }
  };

  const setActiveIcon = (arrayA, iconActive, icon) => {
    let arrayB = active.current;
    const checkActiveModule = areArraysEqual(arrayA, arrayB);
    return (checkActiveModule ? iconActive : icon)
  };

  const logoutbtn = () => {
    logout.current = true;
    setopen(true);
  };

  function areArraysEqual(arrayA, arrayB) {
    if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) { return false }
    else if (arrayA === arrayB) { return true }
    else if (arrayA?.length !== arrayB?.length) { return false }
    else {
      for (let i = 0; i < arrayA?.length; i++) {
        if (arrayA[i] !== arrayB[i]) { return false }
      }
      return true;
    }
  }
  const handleClose = () => {
    logout.current = false;
    setopen(false);
  }
  const handleSubmit = () => {
    const removeitems = ["AB-token", "AB-profile"];

    startTransition(() => {
      for (let i of removeitems) {
        localStorage.removeItem(i);
      }
      dispatch(setPublic("public"));
      navigate("/");
    })
  }
  
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "#fff",
          pt: { lg: "6.75rem", sm: "5rem" },
          // height: "70vh",
          height: "auto",
        }}
      >
        {DATA?.map((els) => {
          return (

            <Box
              key={els.id}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: { sm: "36px", lg: "48px" },
                marginTop: "12px",
                maxWidth: "100%",
                cursor: "pointer",
              }}
              className={setActiveclass(els.routes)}
            >
              <Box
                key={Math.random() * 100}
                className="sidebarBorder"
                sx={{
                  width: { md: "3px", lg: "4px" },
                  height: "100%",
                  display: { sm: "none", md: "block" },
                }}
              ></Box>
              <Box
                key={Math.random() * 100}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "100% "
                }}
              >
                <Box
                  key={Math.random() * 100}
                  sx={{
                    pl: { sm: "6px", md: "17px", lg: "23px" },
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={
                    els.mainroute ? () => navigate(els?.mainroute) : null
                  }>
                  <Box
                    key={Math.random() * 100}
                    sx={{
                      width: { sm: "18px", lg: "24px" },
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <img
                      key={Math.random() * 100}
                      alt="Dashboard"
                      width="100%"
                      src={setActiveIcon(els?.routes, els.icon[1], els.icon[0])}
                    // areArraysEqual(els.routes, active.current) ? els.icon[1] : els.icon[0]
                    />
                  </Box>
                  <Typography
                    key={Math.random() * 100}
                    className="font700"
                    sx={{
                      ml: { sm: "8px", md: "12px", lg: "1rem" },
                      fontSize: { sm: "14px", lg: "16px" },
                    }}
                  >
                    {els.label}
                  </Typography>
                </Box>

              </Box>
            </Box>


          );
        })}
        <Box
          key={Math.random() * 100}
          className="flex_row pointer sidebar"
          sx={{ p: 1, mt: "1rem", pl: "23px" }}
          onClick={logoutbtn}
        >
          <img key={Math.random() * 100}
            src={logout.current ? LogoutActive : Logout}
            alt="logout"></img>
          <Typography
            key={Math.random() * 100}
            className="font700"
            sx={{ ml: "1rem" }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
      {
        open &&
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{ height: "100%", width: "100%", justifyContent: "center" }}
            className="flex_row"
          >
            <Box
              sx={{
                width: { lg: '37%', md: '45%', sm: '60%' },
                height: "max-content",
                background: "white",
                p: 3,
                pb: 4,
                borderRadius: "12px",
                maxWidth: '486px'
              }}
              className="flexcol"
            >
              <Box
                className="flexrow"
                sx={{ justifyContent: "flex-end", width: "100%" }}
              >
                <img
                  src={close_square}
                  alt="close"
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Typography className="fs_24" sx={{
                textAlign: 'center',
                fontSize: { sm: '18px' },
                maxWidth: '400px'
              }}>
                Do you want to logout?
              </Typography>
              <Box
                className="flexrow"
                sx={{
                  justifyContent: "center",
                  width: "100%",
                  columnGap: '16px',
                  mt: '16px'
                }}
              >
                <Button
                  variant="contained"
                  sx={{ ...BTNSTYLE, maxWidth: '120px' }}
                  onClick={handleSubmit}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ...BTNSTYLE, maxWidth: '120px', color: '#0E0E0E' }}
                  onClick={handleClose}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      }
    </>
  );
};

export default Sidebar;
