import PropTypes from 'prop-types';

export const SearchResult = PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    full: PropTypes.string.isRequired,
});

export const Page = PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
});