import React from 'react';
import classNames from 'classnames';
import { Search as SearchIcon, Close as CloseIcon} from '@material-ui/icons';
import PropTypes from 'prop-types';
import styles from './search-input.css';
import { MIN_SEARCH_TERM_LENGTH } from '$const/search-constants';

const makeSearch = (searchInput, callSearch) => 
    searchInput && searchInput.length > MIN_SEARCH_TERM_LENGTH
    ?   callSearch(searchInput)
    :   false;

const makeReset = (searchInput, callReset) => 
    searchInput && searchInput.length !== 0
    ?   callReset()
    :   false;

const iconStyle = { fontSize: 18, margin: '6px 0 5px 0' };

const SearchInput = ({ isLoading, search, reset }) => {
    let searchElement = null;
    const inputAttrs = isLoading ? { disabled: 'disabled'} : {};
    return (
        <div className={styles.container}>
            <div className={classNames(
                {[styles.iconContainer]: true},
                {[styles.searchIconContainer]: true}
            )}>
                <SearchIcon
                    onClick={() =>
                        !isLoading && makeSearch(searchElement.value, search)
                    }
                    style={iconStyle}
                />
            </div>
            <input
                {...inputAttrs}
                ref={elem => searchElement = elem}
                type='text'
                placeholder='Image Search'
            />
            <div className={classNames(
                {[styles.iconContainer]: true},
                {[styles.closeIconContainer]: true}
            )}>
                <CloseIcon
                    onClick={() =>
                        !isLoading && makeReset(searchElement.value, reset)
                    }
                    style={iconStyle}
                />
            </div>
        </div>
    );
};

SearchInput.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    search: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
};

export default SearchInput;