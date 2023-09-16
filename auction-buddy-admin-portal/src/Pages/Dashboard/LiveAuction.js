import React, { useRef, useState, useEffect } from "react";
import TitleSearch from "../../Components/TitleSearch";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import StyledTableCell from "../../Components/StyledTableCell";
import StyledTableRow from "../../Components/StyledTableRow";
import { extractDate } from "../../utils/date";
import { createSearchParams } from "react-router-dom";
import { AuctionCloumn } from "./constant";
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
        <StyledTableCell className="column_serial">
          <p onClick={() => getDetail(row)} className="pointer tablename">
            {row?.proposalNumber ? row?.proposalNumber : "N/A"}
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
            {row?.lawyer ? row?.lawyer?.firstName : "N/A"}
          </div>
        </StyledTableCell>

        <StyledTableCell className="column_one">
          {row?.lawyer ? row?.lawyer?.highCourt?.toString() : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column_one">
          {row?.estimate ? row?.estimate?.caseType : "N/A"}{" "}
        </StyledTableCell>

        <StyledTableCell className="column_serial">
          <Box
            display={"flex"}
            justifyContent={"center"}
            sx={{
              color:
                row?.status === "Accepted"
                  ? "#019C6C"
                  : row?.status === "Rejected"
                  ? "#D12E29"
                  : row?.status === "Review Proposal"
                  ? "#FF8743"
                  : "#2B84FF",
            }}
          >
            <p
              style={{
                padding: "8px 12px",
                // color: "#0BA700",
                borderRadius: "8px",
                backgroundColor:
                  row?.status === "Accepted"
                    ? "#DAFFDE"
                    : row?.status === "Rejected"
                    ? "#FFF2F2"
                    : row.status === "Review Proposal"
                    ? "#FFF4EE"
                    : "#E8F4FB",
              }}
            >
              {row?.status ? row?.status : "N/A"}
            </p>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

const LiveAuction = ({ active, setActive }) => {
  const navigate = useNavigate();
  const match = useRef();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const currentPage = useRef(
    state?.active !== "Proposal" ? 1 : state?.currentPage
  );
  const dataPerPage = useRef(10);
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState();

  const getLiveAuctions = async (param = {}) => {
    setLoading(true);
    param = {
      ...param,
      page: currentPage.current,
      limit: dataPerPage.current,
    };
    try {
      const resp = await getAllAuctions(param);
      if (resp.code === 200) {
        setTotalCount(resp?.data[0]?.metadata[0]?.total);
        setData(resp.data[0].proposals);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setLoading(false);
  };
  useEffect(() => {
    getLiveAuctions();
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
            getData={getLiveAuctions}
            placeholder="Search By User Name"
          />
        </Box>
      
        <CustomTable
          rows={data}
          isLoading={loading}
          columns={AuctionCloumn.LIVE_AUCTION_COLUMNS}
          RowComponent={RowComponent}
          dataPerPage={dataPerPage.current}
          currentPage={currentPage.current}
        />
      </Box>
      {data?.length > 0 && (
        <CustomPagination
          totalCount={totalCount}
          getTableData={getLiveAuctions}
          match={match}
          dataPerPage={dataPerPage}
          currentPage={currentPage}
          filterData={[]}
        />
      )}
    </>
  );
};

export default LiveAuction;
