import createReducer from 'redux-createreducer';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
    SEARCH_RESULT_OFFSET_SIZE,
    NUMBER_OF_RESULT_COLUMNS } from '$const/search-constants';
import {
    SEARCH_SUBMITTED,
    SEARCH_ERROR,
    SEARCH_SUCCESS,
    IMAGE_DISPLAY,
    IMAGE_HIDE,
    RESULT_LIMIT_HIT,
    SEARCH_RESET,
} from '$act/search-actions';

export const searchResultTransformer = rawResult => {
    const { 
        images: {
            fixed_height_small_still,
            original 
        }
    } = rawResult;
    return {
        thumbnail: fixed_height_small_still.url,
        full: original.url
    };
};

const buildResultColumns = results => {
  const numberOfResults = results.length;
  const resultColumns = [];
  // init/fill n(NUMBER_OF_RESULT_COLUMNS)-dimensional array of columns
  for (let i = 0; i < NUMBER_OF_RESULT_COLUMNS; i++) {
    resultColumns.push([]);
  }
  let columnCounter = 0;
  for (let i = 0; i < numberOfResults; i++) {
    resultColumns[columnCounter].push(results[i]);
    if (columnCounter === NUMBER_OF_RESULT_COLUMNS - 1) {
      columnCounter = 0;
    } else {
      columnCounter += 1;
    }
  }
  return resultColumns;
};

const initialState = {
    results: [],
    columns: [],
    isLoading: false,
    isActive: false,
    error: null,
    currentOffset: 0,
    searchTerm: null,
    noMoreResults: false,
    displayedImage: null,
};

const actionHandlers = {
    [SEARCH_SUBMITTED]: (state, { searchTerm, continued }) => ({
        ...state,
        searchTerm: continued ? state.searchTerm : searchTerm,
        currentOffset: continued ? state.currentOffset : 0,
        results: continued ? state.results : [],
        isLoading: true,
        noMoreResults: false,
    }),
    [SEARCH_ERROR]: (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    }),
    [SEARCH_RESET]: (state) => ({
        ...state,
        ...initialState,
    }),
    [SEARCH_SUCCESS]: (state, { results }) => {
        const temp = state.results.concat(results.map(searchResultTransformer));
        return {
            ...state,
            isLoading: false,
            results: temp,
            columns: buildResultColumns(temp),
            currentOffset: state.currentOffset + SEARCH_RESULT_OFFSET_SIZE,
            noMoreResults: results.length < SEARCH_RESULT_OFFSET_SIZE,
        }
    },
    [RESULT_LIMIT_HIT]: (state) => ({
        ...state,
        noMoreResults: true,
    }),
    [IMAGE_HIDE]: state => ({
        ...state,
        displayedImage: null,
    }),
    [IMAGE_DISPLAY]: (state, { image }) => ({
        ...state,
        displayedImage: image,
    }),
    [LOCATION_CHANGE]: () => initialState,
}

export default createReducer(initialState, actionHandlers);