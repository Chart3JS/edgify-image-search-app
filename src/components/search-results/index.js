import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import * as CustomTypes from '$type/search-types';
import SearchResult from '@/search-result';
import { useDispatch } from 'react-redux';
import styles from './search-results.css';
import {
  displayImage } from '$act/search-actions';

const SearchResults = ({ results = [] }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      {results.map(result => (
        <SearchResult
          onClick={() => dispatch(displayImage(result))}
          key={uuid()}
          searchResult={result}
        />
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(CustomTypes.SearchResult),
};

export default SearchResults;