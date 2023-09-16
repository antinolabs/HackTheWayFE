import React, { useEffect } from 'react'
import Dashboard_layout from './Dashboad_layout'
import Public from './Public'
import { useSelector, useDispatch } from "react-redux";
import { setPublic, setDashboard } from '../Redux/Layoutslice';

const Home = () => {
  const token = localStorage.getItem("AB-token");
  const path = window.location.pathname;
  const dispatch = useDispatch();
  const layoutItems = useSelector((store) => store.layout);

  const checkToken = (token) => {
    if (token) {
      dispatch(setDashboard("dashbaord"));
    }
    else {
      dispatch(setPublic("public"));
    }
  }
  useEffect(() => {
    checkToken(token);
  }, [])

  return (
    <>
      {layoutItems.public ? <Public /> : <Dashboard_layout />}
      {/* <Dashboard_layout /> */}
    </>
  )
}

export default Home