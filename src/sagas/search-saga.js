import axios from 'axios';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { SEARCH_SUBMITTED, searchSuccess, searchError } from '$act/search-actions';
import { apiKey, SEARCH_BY_QUERY_API } from '../../config.json';

const selectSearchState = state => state.search;

const API_PARAMS = Object.freeze({
    apiKey,
    limit: 50,    
});

function* doSearch () {
    try {
        const { currentOffset, searchTerm } = yield select(selectSearchState);
        const searchResults = yield call(
            axios.get,
            SEARCH_BY_QUERY_API,
            {...API_PARAMS, offset: currentOffset, q: searchTerm},
        );
        yield put(searchSuccess(searchResults.data.data));
    } catch (e) {
        yield put(searchError());
    }
}

export function* search() {
    yield takeLatest(SEARCH_SUBMITTED, doSearch);
};