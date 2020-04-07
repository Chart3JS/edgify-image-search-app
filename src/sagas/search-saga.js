import axios from 'axios';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { SEARCH_SUBMITTED, searchSuccess, searchError } from '$act/search-actions';
import { apiKey, SEARCH_BY_QUERY_API } from '_/config.json';
import {
    MIN_SEARCH_TERM_LENGTH,
    SEARCH_RESULT_OFFSET_SIZE
} from '$const/search-constants';

const selectSearchState = state => state.search;
const API_PARAMS = {
    apiKey,
    limit: SEARCH_RESULT_OFFSET_SIZE,
};

function* doSearch () {
    try {
        const { currentOffset, searchTerm } = yield select(selectSearchState);
        if (searchTerm.length >= MIN_SEARCH_TERM_LENGTH) {
            const searchResults = yield call(
                axios.get,
                SEARCH_BY_QUERY_API,
                { params: {...API_PARAMS, offset: currentOffset, q: searchTerm} },
            );
            yield put(searchSuccess(searchResults.data.data));
        }        
    } catch (e) {
        yield put(searchError());
    }
}

export function* search() {
    yield takeLatest(SEARCH_SUBMITTED, doSearch);
};