import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./LeagueTable.css";

import Spinner from "../UI/Spinner/Spinner";

const LeagueTable = (props) => {
  const { code } = props.match.params;
  const { data, onFetchLeague } = props;

  useEffect(() => {
    if (!data) {
      const getLeague = () => {
        return onFetchLeague(code);
      };
      getLeague();
    }
  }, [onFetchLeague, code, data]);

  let tableLeague = <Spinner />;

  if (data) {
    tableLeague = data.table.map((e, i) => (
      <div className="rowTable" key={i}>
        <div className={["cell", "position"].join(" ")}>{e.position}</div>
        <div className={["cell", "nameTeam"].join(" ")}>{e.team.name}</div>
        <div className="cell">{e.playedGames}</div>
        <div className="cell">{e.won}</div>
        <div className="cell">{e.draw}</div>
        <div className="cell">{e.lost}</div>
        <div className="cell">{e.goalsFor}</div>
        <div className="cell">{e.goalsAgainst}</div>
        <div className="cell">{e.goalDifference}</div>
        <div className="cell">{e.points}</div>
      </div>
    ));
  }

  return (
    <div className="containerTable">
      <div>
        <div className="rowTable">
          <div className={["cell", "position"].join(" ")}>Position</div>
          <div className={["cell", "titleNameTeam"].join(" ")}>Team</div>
          <div className="cell">Games</div>
          <div className="cell">Won</div>
          <div className="cell">Drawn</div>
          <div className="cell">Lost</div>
          <div className="cell">GF</div>
          <div className="cell">GA</div>
          <div className="cell">GD</div>
          <div className="cell">Points</div>
        </div>
        {tableLeague}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.league.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLeague: (code) => dispatch(actions.fetchLeague(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);
