
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import '../../index.css';

const SaleOfferShowPage = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const [multiplier, setMultiplier] = useState(1);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/salleoffer/users/getAllSaleOffers');
        if (response.data && Array.isArray(response.data.data)) {
          setOffers(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setOffers([]);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  
  useEffect(() => {
    if (bannerRef.current && contentRef.current && offers.length > 0) {
      const bannerWidth = bannerRef.current.offsetWidth;
      const totalTitles = offers.flatMap(offer => offer.offerTitle).length;
      const avgWidthPerTitle = 180; 
      const unitWidth = totalTitles * avgWidthPerTitle;
      const minRepeats = Math.ceil(bannerWidth / unitWidth) + 2; 
      const totalMultiplier = Math.max(minRepeats * 2, 6);
      console.log('Banner Width:', bannerWidth, 'Unit Width:', unitWidth, 'Multiplier:', totalMultiplier);
      setMultiplier(totalMultiplier);
    }
  }, [offers]);

  const renderSpans = () => {
    const allTitles = offers.flatMap((offer) =>
      offer.offerTitle.map((item) => item.title)
    );
    const spans = [];
    
    const duplicatedTitles = [...allTitles, ...allTitles, ...allTitles]; 
    for (let i = 0; i < multiplier; i++) {
      spans.push(
        <React.Fragment key={i}>
          {duplicatedTitles.map((title, idx) => (
            <span
              key={`${i}-${idx}`}
              style={{ margin: '0 90px', fontSize: '13px' }}
            >
              {title}
            </span>
          ))}
        </React.Fragment>
      );
    }
    return spans;
  };

  return (
    <div className="sale">
      <div className="offer-banner" ref={bannerRef}>
        <div className="marquee-content" ref={contentRef}>
          {renderSpans()}
        </div>
      </div>
    </div>
  );
};

export default SaleOfferShowPage;