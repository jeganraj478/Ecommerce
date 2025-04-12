// components/ImageSlider.js
import { useState } from 'react';
import './css/imageSlider.css';

// Image type definition
interface Image {
    id: number,
    url: string,
    alt: string,
}

const ImageSlider: React.FC = () => {
    // Sample data for the image slider
    const sliderImages: Image[] = [
        { id: 1, url: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1741508690/collection-2_lsucfk.jpg', alt: 'Promotional banner 1' },
        { id: 2, url: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1737858920/cld-sample-5.jpg', alt: 'Promotional banner 2' },
        { id: 3, url: 'https://res.cloudinary.com/dq3jutc3e/image/upload/v1741526338/collection-1_xonkrs.jpg', alt: 'Promotional banner 3' },
    ];

    // State for current slide
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // Function to go to next slide
    const nextSlide = (): void => {
        setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    };

    // Function to go to previous slide
    const prevSlide = (): void => {
        setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
    };

    return (
        <div className="slider-container">
            {sliderImages.map((image:Image, index:number) => (
                <div
                    key={image.id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <img src={image.url} alt={image.alt} />
                </div>
            ))}
            <button className="slider-arrow prev" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button className="slider-arrow next" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div className="slider-dots">
                {sliderImages.map((_, index:number) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;