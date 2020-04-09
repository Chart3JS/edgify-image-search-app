import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { Grid, IconButton } from '@material-ui/core';
import { CloudDownloadOutlined } from '@material-ui/icons';
import * as CustomTypes from '$type/search-types';
import SearchResult from '@/search-result';
import styles from './search-results.css';

const LOAD_MORE_TITLE = 'Load more results';

const SearchResults = ({
  columns,
  moreResults,
  onDisplayImage,
  onLoadMore }) => {
  return (
    <>
      <Grid
        id='results_container'
        container
        spacing={3}
        className={styles.container}
      >
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
  columns: PropTypes.arrayOf(PropTypes.arrayOf(CustomTypes.SearchResult)),
  moreResults: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onDisplayImage: PropTypes.func.isRequired,
};

export default SearchResults;