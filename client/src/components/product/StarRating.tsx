import React, { useState } from 'react';
import './css/starRating.css';

interface StarRatingProps {
    rating: number; // Changed from 'value' to 'rating'
    onChange?: (rating: number) => void; // Made optional with ?
    readOnly?: boolean; // Changed from 'editable' to 'readOnly'
    size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
    rating, // Changed from 'value' to 'rating'
    onChange,
    readOnly = false, // Changed from 'editable = true' to 'readOnly = false'
    size = 'medium'
}) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const stars = [1, 2, 3, 4, 5];

    const handleMouseOver = (starValue: number) => {
        if (readOnly) return; // Changed condition
        setHoverValue(starValue);
    };

    const handleMouseLeave = () => {
        if (readOnly) return; // Changed condition
        setHoverValue(null);
    };

    const handleClick = (starValue: number) => {
        if (readOnly) return; // Changed condition
        onChange && onChange(starValue); // Added null check
    };

    return (
        <div className={`star-rating ${size}`}>
            {stars.map(star => (
                <span
                    key={star}
                    className={`star ${(hoverValue || rating) >= star ? 'filled' : 'empty'
                        } ${!readOnly ? 'editable' : ''}`} // Changed condition
                    onMouseOver={() => handleMouseOver(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;