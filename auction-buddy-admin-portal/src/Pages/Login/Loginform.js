import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { sendOtp } from "../../Shared/Services/LoginServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastobj } from "../../Shared/constants";
import Auction from "../../assets/hero-image.webp"
import logo from "../../assets/logo.svg"
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
const Loginform = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [mobileNo, setMobile] = useState("");
  const [errorText, setErrorText] = useState("");
  let er = false;
  const Getnumber = (e) => {
    const value = e.target.value;
    const reg = new RegExp("^[0-9]+$");
    const val = reg.test(value);
    if (val) {
      setMobile(value);
      setErrorText("");
    } else {
      setErrorText("Only numeric values are allowed");
      setMobile("");
    }
  };
  if (errorText !== "") {
    er = true;
  } else {
    er = false;
  }
  const send_Otp = async () => {
    try {
      const res = await sendOtp({ mobileNo });
      if (res.code == 200) {
        localStorage.setItem("user_mobile", mobileNo);
        toast.success("OTP sent sucessfully", toastobj);
        setTimeout(() => {
          navigate("/otp");
        }, 2000);
      }
      else if (res?.error?.response?.status == 401) {
        toast.error(`Admin with given mobile number doesn't exists`, toastobj);
      } else if (res?.error?.response?.status == 400) {
        toast.error(`Something went wrong! Please try again`, toastobj)
      }
      else {
        toast.error(`Something went wrong! Please try again`, toastobj)
      }
      // console.log(res?.error?.response?.data?.message)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: { sm: "1024px", lg: "1200px", xl: "1440px" },
              background: "#fff",
              justifyContent: "start",
              maxWidth: { sm: "1024px", lg: "1200px", xl: "1440px" },
              maxHeight: { sm: "728px", lg: "854px", xl: "1024px" },
              height: "100%",
              my: "auto",
              mx: "auto",
              overflow: "none",
              alignItems: "stretch",
            }}
            className="loginpage_wrapper"
          >
            <Box sx={{ minWidth: "50%", display:'flex' }} >

              <Box
                sx={{
                  p: {
                    sm: "17px 0 0 17px",
                    lg: "20px 0 0 20px",
                    xl: "24px 0 0 24px",
                  },
                }}
              >
                <img src={logo} alt={"AuctionBuddy"} />
              </Box>

              <Box sx={{
                width: "345px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexDirection: "column",
                // mt: { sm: "60px", lg: "60px", xl: "60px" },
                my:'auto',
                // height:'100%'
              }}>

                <Typography className="login_screen_title"
                  sx={{
                    textAlign: "center",
                    fontSize: {
                      sm: "20px",
                      md: "26px",
                      lg: "32px",
                      xl: "32px",
                    },
                    mb:'24px'
                  }}>
                  Admin Portal
                </Typography>
                <Box>
                  <TextField
                    variant="outlined"
                    disableripple="true"
                    //   sx={{ width: "100%" }}
                    sx={{ width: { md: "min(345px,100%)", sm: "100%" } }}
                    inputProps={{
                      placeholder: "Enter Mobile Number",
                      maxLength: 10,
                    }}
                    InputProps={{ style: { fontSize: 14 } }}
                    onChange={Getnumber}
                    name="mobile"
                    value={mobileNo}
                    error={er}
                    helperText={errorText}
                  >

                  </TextField>
                  <Button
                    variant="contained"
                    onClick={send_Otp}
                    // type="submit"
                    sx={{
                      fontFamily: "Poppins",
                      textTransform: "capitalize",
                      // width: "100%",
                      width: { md: "min(345px,100%)", sm: "100%" },
                      boxShadow: "none !important",
                      my: 1.2,
                      py: 1,
                      backgroundColor: "primary",
                      "&:hover": {
                        backgroundColor: "primary",
                        boxShadow: "none !important",
                      },
                    }}
                    disabled={mobileNo.length < 10 ? true : false}
                  >
                    Send Otp
                  </Button>
                </Box>
              </Box>


            </Box>
            <Box sx={{ width: "50%" }} >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  // backgroundImage: `url(${HeroImage})`,
                  backgroundImage: `url(${Auction})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </Box>
          </Box>
          <ToastContainer />
        </Box>
      </Modal>
    </>
  );
};

export default Loginform;
