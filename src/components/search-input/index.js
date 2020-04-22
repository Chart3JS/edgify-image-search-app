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

const iconStyle = { fontSize: 18, margin: '9px 0' };

const SearchInput = ({ isLoading, search, reset }) => {
    let searchElement = null;
    const inputAttrs = isLoading ? { disabled: 'disabled'} : {};
    return (
        <div className={styles.container}>
            <div className={classNames([
                styles.iconContainer,
                styles.searchIconContainer,
            ]
            )}>
                <SearchIcon
                    className={classNames([
                        styles.icon,
                        styles.searchIcon
                    ])}
                    onClick={() =>
                        !isLoading && makeSearch(searchElement.value, search)
                    }
                    style={iconStyle}
                    id='search_button'
                />
            </div>
            <input
                {...inputAttrs}
                ref={elem => searchElement = elem}
                type='text'
                placeholder='Image Search'
                id='search_input'
                onKeyDown={e => e.keyCode === 13 && makeSearch(searchElement.value, search)}
            />
            <div className={classNames([styles.iconContainer, styles.closeIconContainer]
            )}>
                <CloseIcon
                    className={classNames([
                        styles.icon,
                        styles.closeIcon
                    ])}
                    onClick={() => {
                        if (!isLoading) {
                            makeReset(searchElement.value, reset);
                            searchElement.value = '';
                        }
                    }
                    }
                    style={iconStyle}
                    id='reset_button'
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