import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './app.css';
import ImageDisplay from '@/image-display';
import SearchInput from '@/search-input';
import SearchResults from '@/search-results';
import InfiniteScroll from '@/infinite-scroll';
import {
    searchSubmitted,
    searchContinued,
    searchReset,
    hideImage } from '$act/search-actions';

const App = () => {
    // debugger;
    const {
        displayedImage,
        isLoading,
        noMoreResults,
        results,
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
            <InfiniteScroll
                isLoading={isLoading}
                isActive={!noMoreResults}
                onActivate={() => dispatch(searchContinued())}
            >
                <SearchResults results={results} />
            </InfiniteScroll>
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
