import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { Grid, IconButton } from '@material-ui/core';
import { CloudDownloadOutlined } from '@material-ui/icons';
import * as CustomTypes from '$type/search-types';
import SearchResult from '@/search-result';
import styles from './search-results.css';

const LOAD_MORE_TITLE = 'Load more results';

const buildResultColumns = (results, numberOfColumns) => {
  const numberOfResults = results.length;
  const resultColumns = [];
  // init/fill n(NUMBER_OF_COLUMNS)-dimensional array of columns
  for (let i = 0; i < numberOfColumns; i++) {
    resultColumns.push([]);
  }
  let columnCounter = 0;
  for (let i = 0; i < numberOfResults; i++) {
    resultColumns[columnCounter].push(results[i]);    
    if (columnCounter === (numberOfColumns - 1)) {
      columnCounter = 0;
    } else {
      columnCounter += 1;
    }
  }
  return resultColumns;
};

const SearchResults = ({
  numberOfColumns,
  results,
  moreResults,
  onDisplayImage,
  onLoadMore }) => {
  const columns = buildResultColumns(results, numberOfColumns);
  return (
    <>
      <Grid container spacing={3} className={styles.container}>
        {
          columns.map(column =>
            <Grid
              className={styles.column}
              key={uuid()}
              item
              xs={12} sm={12} md={4} 
            >
              {
                column.map(result =>
                  <SearchResult
                    key={uuid()}
                    onClick={() => onDisplayImage(result)}
                    searchResult={result}
                  />
                )
              }
            </Grid>    
          )
        }
        {
          moreResults &&
            <Grid item xs={12} sm={12} md={12} className={styles.loadMore}>
              <IconButton
                style={{ padding: '0 10px 0 0' }}
                title={LOAD_MORE_TITLE}
                color='primary'
                aria-label={LOAD_MORE_TITLE}
                onClick={() => onLoadMore()}
              >
                <CloudDownloadOutlined />{' '}
                <div className={styles.loadMoreTitle}>
                  {LOAD_MORE_TITLE}
                </div>
              </IconButton>
            </Grid>
        }
      </Grid>
    </>
  );
};

SearchResults.propTypes = {
  numberOfColumns: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(CustomTypes.SearchResult),
  moreResults: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onDisplayImage: PropTypes.func.isRequired,
};

export default SearchResults;