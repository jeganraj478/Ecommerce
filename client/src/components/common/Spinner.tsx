import React from 'react';
import './css/spinner.css';

const Spinner: React.FC = () => {
    return (
        <div className='loader-container'>
            <div className='loader'></div>
        </div>
    );
};

export default Spinner;