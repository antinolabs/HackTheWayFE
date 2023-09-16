import React, { useRef, useState, useEffect } from "react";
import TitleSearch from "../../Components/TitleSearch";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import { AuctionCloumn } from "./constant";
import StyledTableCell from "../../Components/StyledTableCell";
import StyledTableRow from "../../Components/StyledTableRow";
import { extractDateTime } from "../../utils/date-time";
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
      { state: { currentPage, name: row } }
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

        <StyledTableCell className="column-large">
          {/* <p
                        className="pointer tablename"
                        onClick={() => getDetail(row)}
                    > */}
          {row?.auctioneer?._id ? row?.auctioneer?._id: "N/A"}
          {/* </p> */}

        </StyledTableCell>

        <StyledTableCell className="column-large">
          {row?.itemDescription?.itemName ? row?.itemDescription?.itemName  : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column-xxl">
          {row?.itemDescription?.itemInfo ? row?.itemDescription?.itemInfo : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column-xl">
          {row?.auctioneer?.name ? row?.auctioneer?.name : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column-xl">
          {row?.createdAt ? extractDateTime(row?.createdAt) : "N/A"}
        </StyledTableCell>
        <StyledTableCell className="column-xl">
          {row?.endTime ? extractDateTime(row?.endTime) : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column-xl">
          {row?.itemDescription?.initialPrice ? row?.itemDescription?.initialPrice : "N/A"}
        </StyledTableCell>

        <StyledTableCell className="column-xl">
          {row?.winningBid?.amount ? row?.winningBid?.amount : "N/A"}
        </StyledTableCell>

      </StyledTableRow>
    </>
  );
};

const EstimatesPage = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const match = useRef();
  const [loading, setLoading] = useState(false);
  const currentPage = useRef(state.currentPage ?? 1);
  const dataPerPage = useRef(10);
  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState();

  const getCompletedAuction = async (param = {}) => {
    setLoading(true);
    param = {
      ...param,
      status:'completed',
      page: currentPage.current,
      limit: dataPerPage.current,
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
    getCompletedAuction();
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
      {/* <TitleSearch match={match} title={"Earnings"}
        alt='associate'
        icon={EarningActive}
        // button='true'
        // AddButton={AddButtonComponent}
      /> */}
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
            getData={getCompletedAuction}
            placeholder="Search By User Name"
          />
        </Box>


        <CustomTable
          rows={data}
          isLoading={loading}
          columns={AuctionCloumn.COMPLETED_AUCTION_COLUMNS}
          RowComponent={RowComponent}
          dataPerPage={dataPerPage.current}
          currentPage={currentPage.current}
        />
      </Box>
      {data?.length > 0 && (
        <CustomPagination
          totalCount={totalCount}
          getTableData={getCompletedAuction}
          match={match}
          dataPerPage={dataPerPage}
          currentPage={currentPage}
          filterData={[]}
        />
      )}
    </>
  );
};

export default EstimatesPage;
