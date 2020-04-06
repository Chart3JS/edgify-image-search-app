import React from 'react';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './app.css';
import SearchInput from '@/search-input';

const App = () => {
    const search = searchTerm => {
        debugger;
    };
    return (
        <div className={styles.container}>
            <CssBaseline />
            <SearchInput reset={() => {
                debugger;
            }} search={search} />
        </div>
    );
}
  

export default App;
