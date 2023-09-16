import React from 'react'
import Box from "@mui/material/Box";
import Search_icon from "../assets/Search.svg";
import _debounce from "lodash/debounce";
import { debounce } from "@mui/material";

const SearchBarField = ({
    getData,
    dataPerPage,
    currentPage,
    match,
    placeholder
}) => {

    const getSearchData = async (e) => {
        const val = e.target.value;
        let param = {
            page: currentPage.current,
            limit: dataPerPage.current,
        };
        if (val.length > 0) {
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
    };
    const debouncedOnChange = debounce(getSearchData, 1500);
    return (
        <Box
            className="searchbar_wrapper"
            sx={{ height: { sm: "30px", lg: "40px" }, width:'300px' }}
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
    )
}

export default SearchBarField