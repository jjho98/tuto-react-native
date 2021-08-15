import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

// action의 payload: action type
export const startLoading = createAction(
  START_LOADING,
  (requestType: string) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType: string) => requestType
);

const initialState = {};

const loading = handleActions({
  [START_LOADING]: (state: any, action: { payload: string }) => ({
    ...state,
    [action.payload]: true,
  }),
  [FINISH_LOADING]: (state: any, action: { payload: string }) => ({
    ...state,
    [action.payload]: false,
  }),
  initialState,
});

export default loading;
