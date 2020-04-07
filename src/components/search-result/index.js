import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import * as CustomTypes from '$type/search-types';
import styles from './search-result.css';

const SearchResult = ({ searchResult, onClick }) => {
    const { thumbnail } = searchResult;
    return (
        <Box>
            <a 
                className={styles.imageLink}
                href='#'
                onClick={(e) => {
                    e.preventDefault();
                    onClick();    
                }}
            >
                <img className={styles.image} src={thumbnail} />
            </a>
        </Box>
    );
}

SearchResult.propTypes = {
    searchResult: CustomTypes.SearchResult,
    onClick: PropTypes.func.isRequired,
};

export default SearchResult;