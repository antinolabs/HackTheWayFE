import { TableRow } from "@mui/material";
import styled from "@emotion/styled";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff",
    height: "52",
    maxHeight: "52",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FAFAFA",
    height: "52",
    maxHeight: "52",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    height: "52",
    maxHeight: "52",
    borderRight: "2px solid #E9E9E9",
  },
}));

export default StyledTableRow;
