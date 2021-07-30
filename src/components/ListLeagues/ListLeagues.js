import React from "react";
import { Link } from "react-router-dom";
import LeagueElement from "./LeagueElement/LeagueElement";
import "./ListLeagues.css";
import {
  flagEngland,
  flagFrance,
  flagGermany,
  flagItaly,
  flagNetherlands,
  flagSpain,
} from "../../assets";

const leagues = [
  { name: "Bundesliga", code: "BL1", flag: flagGermany },
  {
    name: "Premier League",
    code: "PL",
    flag: flagEngland,
  },
  { name: "Serie A", code: "SA", flag: flagItaly },
  { name: "Primera Division", code: "PD", flag: flagSpain },
  { name: "Ligue 1", code: "FL1", flag: flagFrance },
  {
    name: "Eredivisie",
    code: "DED",
    flag: flagNetherlands,
  },
];

const ListLeagues = () => {
  const list = leagues.map((league, index) => (
    <Link
      key={index}
      to={{
        pathname: `/league/${league.code}/${league.name}/statistics`,
      }}
    >
      <LeagueElement league={league} />
    </Link>
  ));

  return <div className="containerList">{list}</div>;
};

export default ListLeagues;
