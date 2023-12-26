import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/banner.css';
import bannerImage from './styles/img/banner.webp';

const Banner = () => {
  const [bannerData, setBannerData] = useState({ title: '', description: '' });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('https://your-cms-api-url/banner');
        setBannerData(response.data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.4}px)`,
  };

  return (
    <div className="banner cut-diagonal" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="overlay" style={parallaxStyle}>
        <div className="banner-content">
          <h1>{bannerData.title}Title</h1>
          <p>{bannerData.description}Description</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
