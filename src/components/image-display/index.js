import React from 'react';
import PropTypes from 'prop-types';
import styles from './image-display.css';
import classNames from 'classnames'
import * as CustomTypes from '$type/search-types';

const ImageDisplay = ({ image, onCloseCalled }) => 
    <div
        className={classNames(styles.container)}
        onClick={onCloseCalled}>
        <img className={styles.image} src={image.full}/>
    </div>;

ImageDisplay.propTypes = {
    image: CustomTypes.SearchResult.isRequired,
    onCloseCalled: PropTypes.func.isRequired,
};
export default ImageDisplay;