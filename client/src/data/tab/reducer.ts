import {
  SET_MEASURES_PER_LINE,
  SET_NUM_MEASURES,
  FOCUS_MEASURE,
  FOCUS_LINE
} from './actions';

interface StoreTab {
  focusedMeasure: number;
  focusedLine: number;
  measuresPerLine: number;
  numMeasures: number;
}

const defaultState: StoreTab = Object.freeze({
  focusedMeasure: 0,
  focusedLine: 0,
  measuresPerLine: 1,
  numMeasures: 0
});

export default (state = defaultState, action): StoreTab => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case SET_MEASURES_PER_LINE:
      nextState.measuresPerLine = action.measuresPerLine;
      return nextState;

    case SET_NUM_MEASURES:
      nextState.numMeasures = action.numMeasures;
      return nextState;

    case FOCUS_MEASURE:
      nextState.focusedMeasure = action.measure;
      return nextState;

    case FOCUS_LINE:
      nextState.focusedLine = action.line;
      return nextState;

    default:
      return nextState;
  }
};