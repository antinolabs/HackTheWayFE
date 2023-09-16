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

const AuctionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const back = () => navigate(-1);
  const { state } = useLocation();
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
        return <UpcomingAuction active={active} setActive={setActive} />;
    }
  };

  return (
    <>
      <Box>
        <TitleSearch title="Auction Details" icon={DashboardIcon} />
        <br />

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
