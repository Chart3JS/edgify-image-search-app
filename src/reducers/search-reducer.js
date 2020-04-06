import createReducer from 'redux-createreducer';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    SEARCH_SUBMITTED,
    SEARCH_ERROR,
    SEARCH_SUCCESS,
    SEARCH_PERFORMED,
    RESULT_LIMIT_HIT,
} from '$act/search-actions';

export const LOAD_STATUS_PENDING = 'LOAD_STATUS_PENDING';
export const LOAD_STATUS_ERROR = 'LOAD_STATUS_ERROR';
export const LOAD_STATUS_SUCCESS = 'LOAD_STATUS_SUCCESS';
export const SEARCH_BATCH_SIZE = 50;

export const searchResultTransformer = (rawResult) => {
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

const initialState = {
    results: [],
    loadStatus: undefined,
    currentOffset: 0,
    searchTerm: undefined,
    noMoreResults: false,
};

const actionHandlers = {
    [SEARCH_SUBMITTED]: (state, { searchTerm }) => ({
        ...state,
        searchTerm,
        currentOffset: 0,
        results: [],
    }),
    [SEARCH_PERFORMED]: (state) => ({
        ...state,
        loadStatus: LOAD_STATUS_PENDING,
    }),
    [SEARCH_ERROR]: (state) => ({
        ...state,
        loadStatus: LOAD_STATUS_ERROR
    }),
    [SEARCH_SUCCESS]: (state, { results }) => ({
        ...state,
        loadStatus: LOAD_STATUS_SUCCESS,
        results: state.results.concat(results.map(searchResultTransformer)),
        currentOffset: state.currentOffset + SEARCH_BATCH_SIZE,
        noMoreResults: results.length < SEARCH_BATCH_SIZE,
    }),
    [RESULT_LIMIT_HIT]: (state, { results }) => ({
        ...state,
        noMoreResults: true,
    }),
    [LOCATION_CHANGE]: () => initialState,
}

export default createReducer(initialState, actionHandlers);