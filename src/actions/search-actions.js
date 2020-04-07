export const SEARCH_SUBMITTED = 'SEARCH_SUBMITTED';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_PERFORMED = 'SEARCH_PERFORMED';
export const SEARCH_RESET = 'SEARCH_RESET';
export const RESULT_LIMIT_HIT ='RESULT_LIMIT_HIT';
export const IMAGE_DISPLAY = 'IMAGE_DISPLAY';
export const IMAGE_HIDE= 'IMAGE_HIDE';

export const searchSubmitted = searchTerm => ({
    type: SEARCH_SUBMITTED,
    searchTerm,
    continued: false,
});

export const searchContinued = () => ({
    type: SEARCH_SUBMITTED,
    continued: true,
});

export const searchReset = () => ({
    type: SEARCH_RESET,
});

export const searchError = error => ({
    type: SEARCH_ERROR,
    error,
});

export const searchSuccess = results => ({
    type: SEARCH_SUCCESS,
    results
});

export const searchPerformed = () => ({
    type: SEARCH_PERFORMED,
});

export const displayImage = image => ({
    type: IMAGE_DISPLAY,
    image,
});

export const hideImage = () => ({
    type: IMAGE_HIDE,
});