import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './app.css';
import ImageDisplay from '@/image-display';
import SearchInput from '@/search-input';
import SearchResults from '@/search-results';
import {
    searchSubmitted,
    searchContinued,
    searchReset,
    hideImage,
    displayImage } from '$act/search-actions';

const App = () => {
    const {
        displayedImage,
        isLoading,
        noMoreResults,
        columns,
    } = useSelector(state => state.search);
    const dispatch = useDispatch();
    return (
        <div className={styles.container}>
            <CssBaseline />
            <SearchInput
                isLoading={isLoading}
                search={searchTerm => dispatch(searchSubmitted(searchTerm))}
                reset={() => dispatch(searchReset())} 
            />
            {
                columns.length !== 0 &&
                    <SearchResults
                        columns={columns}
                        moreResults={!noMoreResults}
                        onDisplayImage={image => dispatch(displayImage(image))}
                        onLoadMore={() => dispatch(searchContinued())}
                    />
            }
            {
                displayedImage &&
                    <ImageDisplay
                        image={displayedImage}
                        onCloseCalled={() => dispatch(hideImage())}
                    />
            }
        </div>
    );
}
  

export default App;
