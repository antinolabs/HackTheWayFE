import styled from "@emotion/styled";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CustomPagination from "./CustomPagination";
import StyledTableCell from "./StyledTableCell";

const CustomTable = ({
  columns,
  rows,
  RowComponent,
  isLoading,
  handleDocument,
  handleAssignLawyer,
  dataPerPage,
  currentPage,
  lawyerName,
  callType,
  token,
  name

}) => {
  const useStyles = makeStyles((theme) => ({
    hover: {
      backgroundColor: "#AA3030",
    },
  }));

  return (

    <>
      <Box sx={{ width: '100%' }}>
        <TableContainer
          component={Paper}
          className="customizedScrollbar"
          // sx={{ boxShadow: "none" }}
          sx={{
            border: "1px solid #D9D9D9",
            borderRadius: "4px",
            "&::-webkit-scrollbar": {
              height: "12px",
              paddingTop: "20px !important",
              position: "absolute",
            },
            "&::-webkit-scrollbar-track": {
              background: "ECECEC",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#0E0E0E",
              borderRadius: "17px",
              py: "2px",
              height: "8px",
            },
          }}
        >
          <Table
            sx={{ minWidth: 600, minHeight: 200 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {columns?.map((column, ind) => (
                  <StyledTableCell
                    key={ind}
                    className={column.style}
                    style={{ borderRight: "1", borderStyle: "dash", minWidth: 'max-content !important' }}
                  >
                    <div style={{ textAlign: "center", minWidth: 'max-content !important' }}>{column.label}</div>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                position: "relative",
              }}
            >
              {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => ( */}
              {isLoading ? (
                <Box
                  mt={2}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <CircularProgress sx={{ textAlign: "center" }} />
                </Box>
              ) : rows?.length === 0 ? (
                <Typography
                  mt={2}
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                  }}
                  className="fs_20"
                >
                  No Data Found
                </Typography>
              ) : (
                rows?.map((row, ind) => (
                  <RowComponent
                    row={row}
                    handleDocument={handleDocument}
                    handleAssignLawyer={handleAssignLawyer}
                    dataPerPage={dataPerPage}
                    currentPage={currentPage}
                    ind={ind}
                    lawyerName={lawyerName}
                    callType={callType}
                    token={token}
                    name={name}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default CustomTable;
