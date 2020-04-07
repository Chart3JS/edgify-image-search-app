import createReducer from 'redux-createreducer';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SEARCH_RESULT_OFFSET_SIZE } from '$const/search-constants';
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

const initialState = {
    results: [],
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
    [SEARCH_SUCCESS]: (state, { results }) => ({
        ...state,
        isLoading: false,
        results: state.results.concat(results.map(searchResultTransformer)),
        currentOffset: state.currentOffset + SEARCH_RESULT_OFFSET_SIZE,
        noMoreResults: results.length < SEARCH_RESULT_OFFSET_SIZE,
    }),
    [RESULT_LIMIT_HIT]: (state, { results }) => ({
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