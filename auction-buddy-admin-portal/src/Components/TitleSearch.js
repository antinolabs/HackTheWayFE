import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import  BackArrow from "../assets/Back_arrow.svg"
import Search_icon from "../assets/Search.svg";
import _debounce from "lodash/debounce";
import { debounce } from "@mui/material";
const TitleSearch = ({
  back,
  title,
  getData,
  dataPerPage,
  currentPage,
  match,
  alt,
  icon,
  placeholder
}) => {
  const getSearchData = async (e) => {
    const val = e.target.value;
    let param = {
      page: currentPage.current,
      limit: dataPerPage.current,
    };
    if(val.length > 0) {
      currentPage.current = 1;
      param = {
        ...param,
        page: currentPage.current,
        match: val
      }
      getData(param)
    }
    else {
      getData(param)
    }
    // val.length > 0
    //   ? getData({
    //       page: currentPage.current,
    //       limit: dataPerPage.current,
    //       match: val,
    //     })
    //   : getData({
    //       page: currentPage.current,
    //       limit: dataPerPage.current,
    //     });
  };
  const debouncedOnChange = debounce(getSearchData, 1500);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        p: { sm: "4px 18px", lg: "0.5rem 1.5rem" },
        borderRadius: { sm: "6px", lg: "8px" },
        height: { sm: "48px", lg: "60px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: { sm: "18px", lg: "24px" },display: "flex", alignItems: "center"  }}>
            {back ? <img alt="Go Back" src={BackArrow} width="100%" style={{cursor:'pointer'}}onClick={back} /> : <img alt={alt} src={icon} width="100%" />}
           
          </Box>
          <Typography
            className="font700"
            sx={{ fontSize: { sm: "18px", lg: "20px" }, pl: "20px" }}
          >
            {title}
          </Typography>
        </Box>
        {getData ? (
          <Box
            className="searchbar_wrapper"
            sx={{ height: { sm: "30px", lg: "40px" } }}
          >
            <input
              className="font400"
              placeholder={placeholder}
              ref={match}
              style={{
                border: "none",
                width: "90%",
                outline: "none",
                background: "transparent",
                fontSize: { sm: "14px", lg: "16px" },
              }}
              onChange={debouncedOnChange}
            />
            <img alt="search" src={Search_icon} height="15px" width="15px" />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};


export default TitleSearch;
