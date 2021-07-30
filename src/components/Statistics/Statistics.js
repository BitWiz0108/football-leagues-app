import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./Statistics.css";

import Checkboxes from "../UI/Checkboxes/Checkboxes";
import BarChart from "../Charts/BarChart/BarChart";

import Spinner from "../UI/Spinner/Spinner";

const Statistics = (props) => {
  const {
    match,
    onFetchLeague,

    total,
    home,
    away,
  } = props;
  const { code } = match.params;

  const [dataChart, setDataChart] = useState(null);
  const [typeMatches, setTypeMatches] = useState("total");

  const changeTypeMatches = (type) => {
    setTypeMatches(type);
  };

  useEffect(() => {
    if (code) {
      onFetchLeague(code);
    }
  }, [onFetchLeague, code]);

  useEffect(() => {
    if (typeMatches === "total") {
      setDataChart(total);
    } else if (typeMatches === "home") {
      setDataChart(home);
    } else if (typeMatches === "away") {
      setDataChart(away);
    }
  }, [typeMatches, total, home, away]);

  return (
    <div>
      <h3 className="titleBarChart">Statistics for the current season</h3>
      <Checkboxes
        name="typeMatches"
        type={typeMatches}
        types={[
          { name: "Total", value: "total" },
          { name: "Home", value: "home" },
          { name: "Away", value: "away" },
        ]}
        onChangeType={changeTypeMatches}
      />
      {dataChart ? <BarChart data={dataChart} /> : <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    codeLeague: state.league.code,
    total: state.league.total,
    home: state.league.home,
    away: state.league.away,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLeague: (code) => dispatch(actions.fetchLeague(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
