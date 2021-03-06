import * as API from './api';
import { Notation } from 'types/notation';

export const RECEIVE_NOTATION = 'RECEIVE_NOTATION';

export const receiveNotation = (notation: Notation) => ({
  type: RECEIVE_NOTATION,
  notation,
});

// TODO: make a higher order function that produces this behavior.
export const fetchNotation = (() => {
  let isFetching = false;

  return (notationId: number) => async dispatch => {
    const { notifyAll } = window as any;

    if (isFetching) {
      return;
    }

    isFetching = true;

    try {
      const notation = await API.fetchNotation(notationId);
      dispatch(receiveNotation(notation));
    } catch ({ responseJSON }) {
      notifyAll('Notation', responseJSON);
    } finally {
      isFetching = false;
    }
  };
})();
