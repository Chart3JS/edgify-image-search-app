import React, { memo } from 'react';
import styles from './loading-placeholder.css';

const LoadingPlaceholder = () => {
  return (
    <div className={styles.loadingPlaceholder}>
      <span>Loading...</span>
    </div>
  );
};

export default memo(LoadingPlaceholder);
