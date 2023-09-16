import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
const CustomPagination = ({
  totalCount,
  getTableData,
  filterData,
  dataPerPage,
  currentPage,
  match,
}) => {

  let totalPages = Math.ceil(totalCount / dataPerPage.current);

  const rowOptions = ["10", "25", "50", "100"];
  const useStyles = makeStyles((theme) => ({
    hover: {
      backgroundColor: "#AA3030",
    },
  }));
  const filterKey = Object.keys(filterData);
  const filterValue = Object.values(filterData);
  const classes = useStyles();
  
  //To get value in changing page number
  const getCurrentPage = (e) => {
    currentPage.current = e.target.outerText;
    filterValue[0] === ""
      ? getTableData({
          page: currentPage.current,
          limit: dataPerPage.current,
          match: match?.current?.value,
        })
      : getTableData({
          page: currentPage.current,
          limit: dataPerPage.current,
          [`${filterKey[0]}`]: filterValue[0],
        });
  };

  //to get value on change of total rows to be shown
  const getCurrentData = (e) => {
    dataPerPage.current = e.target.value;
    currentPage.current = 1;
    filterValue[0] === ""
      ? getTableData({
          page: currentPage.current,
          limit: dataPerPage.current,
          match: match?.current?.value,
        })
      : getTableData({
          page: currentPage.current,
          limit: dataPerPage.current,
          [`${filterKey[0]}`]: filterValue[0],
        });
  };

  return (
    <>
      <Box
        sx={{
          mt: "24px",
          color: "#ECECEC",
          display: "flex",
          alignItems: "stretch",
          alignContent: "space-between",
          paddingLeft: "1%",
          // paddingRight: '4%',
          flexDirection: "column",
          rowGap: "8px",
        }}
      >
        <p style={{ fontSize: "14px", color: "#242424", margin: "0px" }}>
          Showing{" "}
          {totalCount ? (currentPage.current - 1) * dataPerPage.current + 1 : 0}
          {parseInt(currentPage.current * dataPerPage.current) > totalCount
            ? totalCount -
                parseInt((currentPage.current - 1) * dataPerPage.current + 1) >
              0
              ? " - " + totalCount
              : ""
            : " - " +
              (currentPage.current === totalPages
                ? totalCount
                : currentPage.current * dataPerPage.current)}
          {" out of "}
          {Number.isInteger(totalCount) ? totalCount : 0} results
        </p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "12px",
              margin: "0px",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "14px", color: "#242424", margin: "0px" }}>
              Rows per page
            </p>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              onChange={getCurrentData}
            >
              {rowOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </Box>
          {console.log(Number(currentPage?.current), totalCount)}
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={Number(currentPage?.current ?? 1)}
              shape="rounded"
              color="active"
              onChange={getCurrentPage}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default CustomPagination;
