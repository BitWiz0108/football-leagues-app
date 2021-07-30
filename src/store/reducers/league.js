import * as actionTypes from "../actions/actionTypes";

const initialState = {
  code: null,
  total: null,
  home: null,
  away: null,
  scorers: null,
  loading: false,
  error: null,
};

const league = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LEAGUE_GET_TOTAL:
      return {
        ...state,
        total: action.total,
        loading: false,
      };
    case actionTypes.LEAGUE_GET_HOME:
      return {
        ...state,
        home: action.home,
        loading: false,
      };
    case actionTypes.LEAGUE_GET_AWAY:
      return {
        ...state,
        away: action.away,
        loading: false,
      };
    case actionTypes.LEAGUE_GET_SCORERS:
      return {
        ...state,
        scorers: action.scorers,
        loading: false,
      };
    case actionTypes.LEAGUE_FETCH_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.LEAGUE_FETCH_FAIL: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default league;
