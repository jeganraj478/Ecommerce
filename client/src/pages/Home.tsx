import React from 'react';
import ImageSlider from '../components/home/ImageSlider';
import LatestProducts from '../components/home/LatestProducts';
import Footer from '../components/layout/Footer';
import './css/home.css';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <ImageSlider />
            <LatestProducts />
            <Footer />
        </div>
    );
};

export default Home;