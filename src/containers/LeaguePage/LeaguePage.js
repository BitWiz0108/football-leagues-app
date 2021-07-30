import React from "react";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";
import "./LeaguePage.css";

import Statistics from "../../components/Statistics/Statistics";
import LeagueTable from "../../components/LeagueTable/LeagueTable";
import BestStrikers from "../../components/BestStrikers/BestStrikers";

const LeaguePage = (props) => {
  const { name } = props.match.params;
  let { path, url } = useRouteMatch();

  return (
    <div>
      <div className="nav">
        <NavLink
          className="navElement"
          activeClassName="active"
          to={`${url}/table`}
        >
          Table
        </NavLink>
        <NavLink
          className="navElement"
          activeClassName="active"
          to={`${url}/statistics`}
        >
          Statistics
        </NavLink>
        <NavLink
          className="navElement"
          activeClassName="active"
          to={`${url}/strikers`}
        >
          Best Strikers
        </NavLink>
      </div>
      <h2 className="nameLeague">{name}</h2>
      <Switch>
        <Route path={`${path}/strikers`} component={BestStrikers} />
        <Route path={`${path}/table`} component={LeagueTable} />
        <Route exact path={`${path}/statistics`} component={Statistics} />
      </Switch>
    </div>
  );
};

export default LeaguePage;
