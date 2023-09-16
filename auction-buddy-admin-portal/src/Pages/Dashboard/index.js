import React, { useRef, useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import StyledTableCell from "../../Components/StyledTableCell";
import StyledTableRow from "../../Components/StyledTableRow";
//IMPORT COMPONENTS
import TitleSearch from "../../Components/TitleSearch";
import CustomTable from "../../Components/CustomTable";
import CustomPagination from "../../Components/CustomPagination";
import SearchBarField from "../../Components/SearchBarField";
//IMPORT UTILS FUNC, CONSTANT , API SERVICE 
import { extractDate } from "../../utils/date";
import { AuctionCloumn } from "./constant";
import { getAllAuctions } from "../../Shared/Services/DashboardServices";
import Others from "../../assets/dashboard-active.svg"

const RowComponent = ({ row, index, dataPerPage, currentPage }) => {
    const navigate = useNavigate();
    const getDetail = () => {
        navigate({
            pathname: "/auction-details",
            search: createSearchParams({
                id: row?._id,
            }).toString(),
        }
            , { state: { data: row } });
    };

    return (
        <>
            <StyledTableRow key={Math.random() * 100}>
                <StyledTableCell className="column_serial">
                    {dataPerPage.current * currentPage.current -
                        dataPerPage.current +
                        1 +
                        index}
                </StyledTableCell>

                <StyledTableCell className="column-large">
                    {/* <p
                        className="pointer tablename"
                        onClick={() => getDetail(row)}
                    > */}
                        {row?.auctionId ? row?.name : "N/A"}
                    {/* </p> */}
                </StyledTableCell>

                <StyledTableCell className="column-small">
                    {row?.item ? row?.serialNo : "N/A"}
                </StyledTableCell>

                <StyledTableCell className="column-xxl">
                    {row?.desc ? row?.title : "N/A"}
                </StyledTableCell>

                <StyledTableCell className="column-xl">
                    {row?.owner ? row?.name : "N/A"}
                </StyledTableCell>

                <StyledTableCell className="column-xl">
                    {row?.start ? extractDate(row?.createdAt) : "N/A"}
                </StyledTableCell>
                <StyledTableCell className="column-xl">
                    {row?.end ? extractDate(row?.createdAt) : "N/A"}
                </StyledTableCell>

                <StyledTableCell className="column-xl">
                    {row?.base ? row?.certificate : "N/A"}
                </StyledTableCell>
                
                <StyledTableCell className="column-xl">
                    {row?.highest ? row?.certificate : "N/A"}
                </StyledTableCell>

            </StyledTableRow>
        </>
    );
};


const Dashboard = () => {
    const match = useRef();
    const [loading, setLoading] = useState(false);
    const currentPage = useRef(1);
    const dataPerPage = useRef(10);
    const [totalCount, setTotalCount] = useState(0);
    const [data, setData] = useState();

    const fetchAllAuction = async (param = {}) => {
        let newParams;
        setLoading(true);
        newParams = {
            ...param,
            page: currentPage.current,
            limit: dataPerPage.current,
        };

        try {
            const resp = await getAllAuctions(newParams);
            if (resp.code === 200) {
                console.log(resp)
                // setTotalCount(resp?.data[0]?.metadata[0]?.total);
                // setData(resp?.data);
            }
        } catch (error) {
            console.log(error, "error");
        }
        setLoading(false);
    };

// const 
    useEffect(() => {
        fetchAllAuction();
    }, []);

    return (
        <div>

            <TitleSearch
                match={match}
                title={"Sankalp Campaign"}
                alt="others"
                icon={Others}
            />
 {/* {onBoardUser?.map((i) => (
            <Box
              sx={{
                display: "flex",
                // gridTemplateColumns: "49% 49%",
                // gridTemplateColumns: { sm: "49% 49%", xs: "100%" },
                width: { sm: "100%", lg: "100%", xs: "100%" },
                justifyContent: "space-between",
                gap: { md: "1.5rem", xs: "12px", sm: "12px" },
                // minWidth: { xs: 'none', sm: '500px' }
              }}
            >
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
                      Users Onboarded Today
                    </Typography>
                    <Typography
                      className="font500"
                      sx={{
                        fontSize: { sm: "24px", lg: "32px" },
                        lineHeight: "1.25",
                      }}
                    >
                      {i?.today?.total}
                    </Typography>
                  </Box>
                  <Box sx={{ height: { sm: "32px", md: "48px", lg: "64px" } }}>
                    <img
                      alt="tab_icon"
                      width="100%"
                      height="100%"
                      src={UserIcon}
                    />
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
                      Users Onboarded last week
                    </Typography>
                    <Typography
                      className="font500"
                      sx={{
                        fontSize: { sm: "24px", lg: "32px" },
                        lineHeight: "1.25",
                      }}
                    >
                      {i?.lastWeek?.total}
                    </Typography>
                  </Box>
                  <Box sx={{ height: { sm: "32px", md: "48px", lg: "64px" } }}>
                    <img
                      alt="tab_icon"
                      width="100%"
                      height="100%"
                      src={UserIcon}
                    />
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
                      Users Onboarded last month
                    </Typography>
                    <Typography
                      className="font500"
                      sx={{
                        fontSize: { sm: "24px", lg: "32px" },
                        lineHeight: "1.25",
                      }}
                    >
                      {i?.lastMonth?.total}
                    </Typography>
                  </Box>
                  <Box sx={{ height: { sm: "32px", md: "48px", lg: "64px" } }}>
                    <img
                      alt="tab_icon"
                      width="100%"
                      height="100%"
                      src={UserIcon}
                    />
                  </Box>
                </Box>
              
              </Box>
            </Box>
          ))}  */}
      
            <Box
                sx={{
                    mt: "1rem",
                    display: "flex",
                    alignItems: "flex-start",
                    background: "#fff",
                    borderRadius: { sm: "6px", lg: "8px" },
                    height: "auto",
                    flexDirection: "column",
                    rowGap: "4px",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        p: "20px 16px 20px 16px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <SearchBarField
                        dataPerPage={dataPerPage}
                        currentPage={currentPage}
                        match={match}
                        getData={fetchAllAuction}
                        placeholder="Search By Name"
                    />
                </Box>
                <CustomTable
                    rows={data}
                    isLoading={loading}
                    columns={

                        AuctionCloumn?.AUCTION_COLUMNS
                    }

                    RowComponent={RowComponent}
                    dataPerPage={dataPerPage}
                    currentPage={currentPage}
                />
            </Box>
            {data?.length > 0 && (
                <CustomPagination
                    totalCount={totalCount}
                    getTableData={fetchAllAuction}
                    match={match}
                    dataPerPage={dataPerPage}
                    currentPage={currentPage}
                    filterData={[]}
                />
            )}
        </div>
    );
};

export default Dashboard;
