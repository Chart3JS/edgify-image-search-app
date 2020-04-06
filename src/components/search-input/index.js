import React from 'react';
import PropTypes from 'prop-types';
import styles from './search-input.css';

const MIN_SEARCH_TERM_LENGTH = 2;

const makeSearch = (searchInput, callSearch) => 
    searchInput.length > MIN_SEARCH_TERM_LENGTH &&
        callSearch(searchInput); 

const SearchInput = ({ search, reset }) => {
    let searchElement = null;

    const onResetPressed = () => {
        if (searchElement && searchElement.length !== 0) {
            reset();
            debugger;
        }
    };
    return (
        <div className={styles.container}>
            <input
                ref={(elem) => searchElement = elem}
                type='text'
                placeholder='Image Search'
                onChange={() =>
                    makeSearch(searchElement.value, search)}
            />
        </div>
    );
};

SearchInput.propTypes = {
    search: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

export default SearchInput;