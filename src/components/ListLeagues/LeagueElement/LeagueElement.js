import React from "react";
import "./LeagueElement.css";

const LeagueElement = (props) => {
  const { name, flag } = props.league;

  return (
    <div className="leagueContainer">
      <div className="imgBox">
        <img src={flag} alt={name} />
      </div>
      <div className="leagueName">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default LeagueElement;
