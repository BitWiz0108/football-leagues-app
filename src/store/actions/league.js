import axios from 'axios';

import * as actionTypes from './actionTypes';

export const leagueFetchStart = () => {
  return {
    type: actionTypes.LEAGUE_FETCH_START,
  };
};

export const leagueFetchFail = (error) => {
  return {
    type: actionTypes.LEAGUE_FETCH_FAIL,
    error,
  };
};

export const getTotalMatches = (total) => {
  return {
    type: actionTypes.LEAGUE_GET_TOTAL,
    total,
  };
};

export const getHomeMatches = (home) => {
  return {
    type: actionTypes.LEAGUE_GET_HOME,
    home,
  };
};

export const getAwayMatches = (away) => {
  return {
    type: actionTypes.LEAGUE_GET_AWAY,
    away,
  };
};

export const getLeagueScorers = (scorers) => {
  return {
    type: actionTypes.LEAGUE_GET_SCORERS,
    scorers,
  };
};

export const fetchLeague = (code) => {
  return (dispatch) => {
    const API = `https://api.football-data.org/v2/competitions/${code}/standings`;
    dispatch(leagueFetchStart());
    axios
      .get(API, {
        headers: {
          "X-Auth-Token": process.env.REACT_APP_FOOTALL_API_AUTH_TOKEN,
        },
      })
      .then((res) => {
        dispatch(getTotalMatches(res.data.standings[0]));
        dispatch(getHomeMatches(res.data.standings[1]));
        dispatch(getAwayMatches(res.data.standings[2]));
      })
      .catch((error) => {
        dispatch(leagueFetchFail(error));
      });
  };
};

export const fetchScorers = (code) => {
  return (dispatch) => {
    const API = `http://api.football-data.org/v2/competitions/${code}/scorers?limit=5`;
    dispatch(leagueFetchStart());
    axios
      .get(API, {
        headers: {
          "X-Auth-Token": process.env.REACT_APP_FOOTALL_API_AUTH_TOKEN,
        },
      })
      .then((res) => {
        dispatch(getLeagueScorers(res.data.scorers));
      })
      .catch((error) => {
        dispatch(leagueFetchFail(error));
      });
  };
};
