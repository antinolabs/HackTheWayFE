import { TableCell, tableCellClasses } from "@mui/material";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ECECEC",
    fontFamily: "Inter",
    color: "rgba(39, 40, 40, 1)",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "1.25",
    borderRight: "2px solid #E9E9E9",
    fontWeight:'500'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Inter",
  },
  textAlign: "center",
  borderRight: "2px solid #E9E9E9",
  borderBottom: "none !important",
}));

export default StyledTableCell;
