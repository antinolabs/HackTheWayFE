import React, { useRef, useState, useEffect } from "react";
import TitleSearch from "../../Components/TitleSearch";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import { AuctionCloumn } from "./constant";
import StyledTableCell from "../../Components/StyledTableCell";
import StyledTableRow from "../../Components/StyledTableRow";
import { extractDate } from "../../utils/date";
import { createSearchParams } from "react-router-dom";
import CustomPagination from "../../Components/CustomPagination";
import SearchBarField from "../../Components/SearchBarField";
import { getAllAuctions } from "../../Shared/Services/DashboardServices";

const RowComponent = ({ row, ind, dataPerPage, currentPage }) => {
  const navigate = useNavigate();
  const getDetail = (row) => {
    navigate(
      {
        pathname: `/auction-details`,
        search: createSearchParams({
          id: row._id,
        }).toString(),
      },
      { state: { currentPage, name: row?.name } }
    );
    // navigate(`/lawyer-request/${status}/${application}/${row?._id}`, {state: {name: row?.firstName}})
  };

  return (
    <>
      <StyledTableRow key={Math.random() * 100}>
        <StyledTableCell
          className="column_serial"
          style={{ borderRight: "1", borderStyle: "dash" }}
        >
          <div className="center_table_content">
            {dataPerPage * currentPage - dataPerPage + 1 + ind}
          </div>
        </StyledTableCell>
        <StyledTableCell
          className="column_serial"
          onClick={() => getDetail(row)}
        >
          <p className="pointer tablename">
            {row?.serialNo ? row?.serialNo : "N/A"}
          </p>
        </StyledTableCell>

        <StyledTableCell className="column_one">
          {row?.user?.name ? row?.user?.name : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column_one">
          {row?.createdAt ? extractDate(row?.createdAt) : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column_one" component="th" scope="row">
          <div className="center_table_content">
            {row?.state ? row?.state : "N/A"}
          </div>
        </StyledTableCell>

        <StyledTableCell className="column_one">
          {row?.district ? row?.district : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column_one">
          {row?.caseType ? row?.caseType : "N/A"}{" "}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

const RequestsPage = ({ active, setActive }) => {
  const navigate = useNavigate();
  const match = useRef();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const currentPage = useRef(
    state?.active !== "Requests" ? 1 : state?.currentPage
  );
  const dataPerPage = useRef(10);

  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState();

  const getUpcomingAuctions = async (param = {}) => {
    setLoading(true);
    param = {
      ...param,
      page: currentPage.current,
      limit: dataPerPage.current,
      premium: false,
      resolved: false,
    };
    try {
      const resp = await getAllAuctions(param);
      if (resp.code === 200) {
        setTotalCount(resp?.data[0]?.metadata[0]?.total);
        setData(resp?.data?.auctions);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUpcomingAuctions();

  }, []);
  useEffect(() => {
    navigate(
      {
        pathname: `/auction-details`,
        search: createSearchParams({}).toString(),
      },
      {
        state: {
          active: active,
          currentPage: currentPage.current,
        },
      }
    );
  }, [currentPage.current]);

  return (
    <>
      <Box
        sx={{
          display: "flex",

          background: "#fff",
          borderRadius: { sm: "6px", lg: "8px" },
          height: "auto",
          flexDirection: "column",
          rowGap: "4px",
          width: "100%",
        }}
      >
        <Box sx={{ p: "20px 16px 20px 16px", display: "flex", rowGap: "8px" }}>
          <SearchBarField
            dataPerPage={dataPerPage}
            currentPage={currentPage}
            match={match}
            getData={getUpcomingAuctions}
            placeholder="Search By User Name"
          />
        </Box>
        
        <CustomTable
          rows={data}
          isLoading={loading}
          columns={AuctionCloumn.UPCOMING_AUCTION_COLUMNS}
          RowComponent={RowComponent}
          dataPerPage={dataPerPage?.current}
          currentPage={currentPage?.current}
        />
      </Box>
      {data?.length > 0 && (
        <CustomPagination
          totalCount={totalCount}
          getTableData={getUpcomingAuctions}
          match={match}
          dataPerPage={dataPerPage}
          currentPage={currentPage}
          filterData={[]}
        />
      )}
    </>
  );
};

export default RequestsPage;
