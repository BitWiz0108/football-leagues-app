import React from "react";
import ListLeagues from "../../components/ListLeagues/ListLeagues";

const HomePage = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "20px" }}>Select a league</h2>
      <ListLeagues />
    </div>
  );
};
export default HomePage;
