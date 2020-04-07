import React from 'react';
import styles from './spinner.css';

const Spinner = () =>
    <div className={styles.container}>
        <img src='images/ajax-loader.gif' alt='Loader...'/>
    </div>;

export default Spinner; 