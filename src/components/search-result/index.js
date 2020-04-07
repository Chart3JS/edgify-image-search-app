import React from 'react';

export default ({ searchResult, onClick }) => {
    const { thumbnail, full } = searchResult;
    return (
        <div>
            <a href="#" onClick={(e) => {
                e.preventDefault();
                onClick();    
            }}>
                <img src={thumbnail} />
            </a>
        </div>
    );
}