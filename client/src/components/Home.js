/* eslint-disable */
import React, { useState, useEffect } from "react";
import DashBoard from "./DashBoard";
import UiContent from "./UiContent";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData(data.name);
      setShow(true);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHomePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="home-page text-center">
        <div className="home-div">
          {/* <p className="pt-5">welcome</p>
          <h1>{userData}</h1> */}
          <h2>{show ? <DashBoard /> : <UiContent />}</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
