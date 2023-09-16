import React, { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OtpInput from "react-otp-input";
import { verifyOtp, sendOtp } from "../../Shared/Services/LoginServices";
import { adminInfoStorageService } from "../../Shared/service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDashboard } from "../../Redux/Layoutslice";
import Countdown from "react-countdown";
import { ToastContainer, toast } from "react-toastify";
import { toastobj } from "../../Shared/constants";

const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(false)
  const [OTP, setOTP] = useState("");
  const mobileNo = localStorage.getItem("user_mobile");

  const verify_Otp = async () => {
    const res = await verifyOtp({
      // mobileNo: mob,
      mobileNo: mobileNo,
      otp: OTP,
    });

    if (res.code === 200) {
      adminInfoStorageService(res.data.token);
      console.log(res)
      const { userType, name } = res?.data?.user;
      window.localStorage.setItem(
        "AB-profile",
        JSON.stringify({ userType,name })
      );
      navigate('/auction-details');
      dispatch(setDashboard("dashbaord"));
    } else {
      toast.error('Please enter valid otp', toastobj);
    }
  };

  const send_Otp = async () => {
    try {

      const res = await sendOtp({ mobileNo });
      if (res.code === 200) {
        toast.info('OTP sent again', toastobj);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const renderer = ({ minutes, seconds = "00", completed }) => {
    if (completed) {
      setIsCompleted(true);
      return <>00:00</>;
    } else {
      return (
        <span>
          0{minutes}:{seconds || "00"}
        </span>
      );
    }
  };

  const timer = useMemo(() => {
    return (
      <Typography className="otp_time" sx={{ mt: 2 }}>
        Time Remaining -{" "}
        <Countdown date={Date.now() + 180000} renderer={renderer} />
      </Typography>
    );
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: "13rem",
      }}
    >
      <Box>
        <Typography className="heading">Enter the OTP</Typography>
        <Typography className="otp_headline" sx={{ color: "#565768" }}>
          Enter the OTP Received in your mobile number
        </Typography>
        <OtpInput
          numInputs={6}
          className="otp-box"
          value={OTP}
          onChange={setOTP}
          // hasErrored={showError}
          // inputStyle={{width:"2rem", height:"2rem",marginLeft:"1rem"}}
          errorStyle={{ border: "1px solid red" }}
        />
        <Box
          sx={{
            display: "flex",
            spacing: "4",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {timer}
          <Button
            disabled={!isCompleted}
            className="otp_resend pointer"
            sx={{ mt: 2 }}
            onClick={send_Otp}
          >
            Resend Code
          </Button>
        </Box>

        <Button
          variant="contained"
          onClick={verify_Otp}
          sx={{
            fontFamily: "Inter",
            textTransform: "capitalize",
            width: "26%",
            boxShadow: "none !important",
            my: 1.2,
            py: 1,
            backgroundColor: "#0E0E0E",
            "&:hover": {
              backgroundColor: "#0E0E0E",
              boxShadow: "none !important",
            },
          }}
          disabled={OTP.length === 6 ? false : true}
        >
          Next
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Otp;
