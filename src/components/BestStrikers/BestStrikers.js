import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./BestStrikers.css";

import Spinner from "../UI/Spinner/Spinner";

const BestStrikers = (props) => {
  const { code } = props.match.params;
  const { scorers, onFetchScorers } = props;

  useEffect(() => {
    const getScorers = () => {
      return onFetchScorers(code);
    };
    getScorers();
  }, [onFetchScorers, code]);

  let bestSrikersContent = <Spinner />;

  if (scorers) {
    bestSrikersContent = scorers.map((d, index) => {
      return (
        <div className="scorersTableContainer" key={index}>
          <h3 className="playerBox">
            <span>{index + 1}.</span>
            <span className="playerText">
              {d.player.name}
              <span className="playerTeam">({d.team.name})</span>
            </span>
            <span className="playerGoals">{d.numberOfGoals} goals</span>
          </h3>
        </div>
      );
    });
  }

  return (
    <div className="strikersContainer">
      <h3 className="titleStrikers">Best Strikers</h3>
      {bestSrikersContent}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    scorers: state.league.scorers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchScorers: (code) => dispatch(actions.fetchScorers(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestStrikers);
