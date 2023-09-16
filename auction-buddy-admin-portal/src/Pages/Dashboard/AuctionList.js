import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleSearch from "../../Components/TitleSearch";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom"; // import { TABS } from "../Users/constant";
import "./style.css";
import LiveAuction from "./LiveAuction";
import UpcomingAuction from "./UpcomingAuction";
import CompletedAuction from "./CompletedAuction";
import DashboardIcon from "../../assets/dashboard-active.svg";
import { TABS } from "./constant";
import { getAuctionCount } from "../../Shared/Services/DashboardServices"
import gavel from "../../assets/gavel.svg";
import Play from "../../assets/play.svg";
import Close from "../../assets/close.svg"

const AuctionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const back = () => navigate(-1);
  const { state } = useLocation();
  const [allCount, setAllCount] = useState([{
    // "initialized": 0,
    "ongoing": 0,
    "completed": 0
  }
  ])
  const [active, setActive] = useState(state?.active ?? TABS.LIVE);
  const toggleTab = (tab) => {
    setActive(tab);
  };
  const getCurrentTabComponent = (tab) => {
    switch (tab) {
      // case TABS.UPCOMING:
      //   return <UpcomingAuction active={active} setActive={setActive} />;
      case TABS.LIVE:
        return <LiveAuction active={active} setActive={setActive} />;
      case TABS.COMPLETED:
        return <CompletedAuction active={active} setActive={setActive} />;
      default:
        return <LiveAuction active={active} setActive={setActive} />;
    }
  };

  const getAllCount = async () => {
    try {
      const resp = await getAuctionCount();
      if (resp.code === 200) {
        setAllCount([{ ...resp?.data }])
      }
    } catch (error) {
      console.log(error, "error");
    }
  }
  useEffect(() => {
    getAllCount();
  }, [active])


  return (
    <>
      <Box>
        <TitleSearch title="Auction Details" icon={DashboardIcon} />
        <br />
      </Box>
      <Box sx={{ my: "36px" }}>

        {allCount?.map((i) => (
          <Box
            sx={{
              display: "flex",
              width: { sm: "100%", lg: "100%", xs: "100%" },
              justifyContent: "space-between",
              gap: { md: "1.5rem", xs: "12px", sm: "12px" },

            }}
          >
            {/* <Box
              sx={{
                background: "#fff",
                p: { lg: "18px", md: "16x", xs: "14px", sm: "12px" },
                minWidth: { lg: "300px", md: "216x", sm: "184px" },
                width: "100%",
                borderRadius: { lg: "8px", sm: "6px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#fff",
                }}
              >
                <Box>
                  <Typography
                    className="font500"
                    sx={{
                      color: " #9A9A9A",
                      fontSize: { sm: "12px", lg: "14px" },
                      lineHeight: "1.25",
                    }}
                  >
                    Auctions starting Today
                  </Typography>
                  <Typography
                    className="font500"
                    sx={{
                      fontSize: { sm: "24px", lg: "32px" },
                      lineHeight: "1.25",
                    }}
                  >
                    {i?.initialized}
                  </Typography>
                </Box>
                <Box sx={{ height: { sm: "32px", md: "48px", lg: "64px" } }}>
                  <img
                    alt="tab_icon"
                    width="100%"
                    height="100%"
                    src={gavel}
                  />
                </Box>
              </Box>
            </Box> */}
            <Box
              sx={{
                background: "#fff",
                p: { lg: "18px", md: "16x", xs: "14px", sm: "12px" },
                minWidth: { lg: "300px", md: "216x", sm: "184px" },
                width: "100%",
                borderRadius: { lg: "8px", sm: "6px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#fff",
                }}
              >
                <Box>
                  <Typography
                    className="font500"
                    sx={{
                      color: " #9A9A9A",
                      fontSize: { sm: "12px", lg: "14px" },
                      lineHeight: "1.25",
                    }}
                  >
                    Live Auctions
                  </Typography>
                  <Typography
                    className="font500"
                    sx={{
                      fontSize: { sm: "24px", lg: "32px" },
                      lineHeight: "1.25",
                    }}
                  >
                    {i?.ongoing}
                  </Typography>
                </Box>
                <Box sx={{ height: { sm: "32px", md: "48px", lg: "64px" }, position:'relative' }}>
                  <img
                    alt="tab_icon"
                    width="100%"
                    height="100%"
                    src={gavel}
                  />
                  <Box sx={{
                    width: { sm: "8px", md: "12px", lg: "16px" },
                    position: 'absolute',
                    right: "-4%",
                    bottom: "-13%",
                    transform: "translate(-50%, -50%)"
                  }}>
                    <img
                      width="100%"
                      height="100%"
                      src={Play} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                background: "#fff",
                p: { lg: "18px", md: "16x", xs: "14px", sm: "12px" },
                minWidth: { lg: "300px", md: "216x", sm: "184px" },
                width: "100%",
                borderRadius: { lg: "8px", sm: "6px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#fff",
                }}
              >
                <Box>
                  <Typography
                    className="font500"
                    sx={{
                      color: " #9A9A9A",
                      fontSize: { sm: "12px", lg: "14px" },
                      lineHeight: "1.25",
                    }}
                  >
                    Auctions Closed Today
                  </Typography>
                  <Typography
                    className="font500"
                    sx={{
                      fontSize: { sm: "24px", lg: "32px" },
                      lineHeight: "1.25",
                    }}
                  >
                    {i?.completed}
                  </Typography>
                </Box>
                <Box sx={{
                  height: { sm: "32px", md: "48px", lg: "64px" },
                  position: 'relative',

                }}>
                  <img
                    alt="tab_icon"
                    width="100%"
                    height="100%"
                    src={gavel}
                  />
                  <Box sx={{
                    width: { sm: "8px", md: "12px", lg: "16px" },
                    position: 'absolute',
                    right: "-4%",
                    bottom: "-13%",
                    transform: "translate(-50%, -50%)"
                  }}>
                    <img
                      width="100%"
                      height="100%"
                      src={Close} />
                  </Box>
                </Box>
              </Box>

            </Box>
          </Box>
        ))}
      </Box>
      <Box className="flexcol" sx={{ alignItems: "stretch" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            background: "#fff",
            p: { sm: "4px 18px", lg: "0.5rem 1.5rem" },
            borderRadius: { sm: "6px", lg: "8px" },
            height: "auto",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%", borderBottom: "1px solid #F0F0F0" }}>
            <Box className="flex_row" sx={{ columnGap: "32px" }}>
              {Object.values(TABS).map((el, index) => {
                return (
                  <Typography
                    key={index}
                    className="fs_16 font600 pointer"
                    sx={{
                      py: 1,
                      borderBottom:
                        active === el ? "1px solid #0E0E0E" : "none",
                      color: active === el ? "#0E0E0E" : "#7a7a7a",
                    }}
                    onClick={() => toggleTab(el)}
                  >
                    {el}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Box>
        {active && getCurrentTabComponent(active)}
      </Box>
    </>
  );
};

export default AuctionList;
