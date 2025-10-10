import { useState, useEffect } from 'react';
import '../../index.css';

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const offers = [
    {
      id: 1,
      title: "Limited Time Offer",
      discount: "30% OFF",
      description: "Welcome to Umair Abaya! Enjoy 30% off your first purchase of elegant hijabs, abayas, and modest fashion essentials.",
      bgGradient: "linear-gradient(to right, #dc2626, #db2777)",
      textColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "New Collection",
      discount: "25% OFF",
      description: "Discover our latest modest fashion collection. Get 25% off on all new arrivals for a limited time!",
      bgGradient: "linear-gradient(to right, #9333ea, #2563eb)",
      textColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1680506660555-1c225f5da953?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1cmtoYSUyMGdpcmwlMjBpbWdlfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      title: "Flash Sale",
      discount: "40% OFF",
      description: "Flash sale! Get 40% off on selected abayas and hijabs. Limited stock available!",
      bgGradient: "linear-gradient(to right, #16a34a, #0d9488)",
      textColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Set countdown to 2 days from now
  useEffect(() => {
    const countDownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [offers.length]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <div className="min-vh-90 bg-light py-5 px-3 px-sm-4 px-lg-5">
      <div className="container-xl">
        
        {/* Offers Carousel */}
        <div className="carousel slide position-relative rounded-3 shadow-lg mb-5">
          <div 
            className="carousel-inner"
            style={{ transition: 'transform 0.5s ease-in-out' }}
          >
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className={`carousel-item ${index === activeSlide ? 'active' : ''}`}
              >
                <div className="row g-0">
                  {/* Image Section - Left Side */}
                  <div className="col-md-6 position-relative overflow-hidden fade-in">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="img-fluid w-100"
                      style={{ height: '360px', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                    />
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent)' }}
                    ></div>
                  </div>

                  {/* Content Section - Right Side */}
                  <div 
                    className="col-md-6 p-4 p-md-5 d-flex align-items-center"
                    style={{ background: offer.bgGradient, color: offer.textColor ,}}
                  >
                    <div className="w-100">
                      {/* Offer Title */}
                      <div className="fade-in-down">
                        <h2 className="fs-3 fw-semibold mb-3">
                          {offer.title}
                        </h2>
                      </div>

                      {/* Discount */}
                      <div className="bounce-in">
                        <div className="display-3 fw-bold mb-4">
                          {offer.discount}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="fade-in-up">
                        <p className="fs-5 mb-4">
                          {offer.description}
                        </p>
                      </div>

                      {/* Countdown Timer */}
                      <div className="fade-in-up delay-300">
                        <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                          {/* Days */}
                          <div className="text-center">
                            <div className="bg-dark bg-opacity-25 rounded p-3">
                              <div className="fs-3 fw-bold">{formatTime(timeLeft.days)}</div>
                              <div className="fs-6 opacity-75">Days</div>
                            </div>
                          </div>
                          <div className="fs-3 fw-bold">:</div>
                          {/* Hours */}
                          <div className="text-center">
                            <div className="bg-dark bg-opacity-25 rounded p-3">
                              <div className="fs-3 fw-bold">{formatTime(timeLeft.hours)}</div>
                              <div className="fs-6 opacity-75">Hours</div>
                            </div>
                          </div>
                          <div className="fs-3 fw-bold">:</div>
                          {/* Minutes */}
                          <div className="text-center">
                            <div className="bg-dark bg-opacity-25 rounded p-3">
                              <div className="fs-3 fw-bold">{formatTime(timeLeft.minutes)}</div>
                              <div className="fs-6 opacity-75">Minutes</div>
                            </div>
                          </div>
                          <div className="fs-3 fw-bold">:</div>
                          {/* Seconds */}
                          <div className="text-center">
                            <div className="bg-dark bg-opacity-25 rounded p-3">
                              <div className="fs-3 fw-bold pulse">{formatTime(timeLeft.seconds)}</div>
                              <div className="fs-6 opacity-75">Seconds</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Shop Now Button */}
                      {/* <div className="fade-in-up delay-500">
                        <button className="btn btn-light fw-semibold px-4 py-2 rounded-pill w-100 shadow">
                          Shop Now
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-3">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                // className={`btn btn-sm rounded-circle ${index === activeSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                style={{ width: '12px', height: '12px', padding: 0 }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="carousel-control-prev"
            style={{ width: '10%', opacity: 0.5 }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            onClick={nextSlide}
            className="carousel-control-next"
            style={{ width: '10%', opacity: 0.5 }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="fade-in text-center">
          <p className="text-muted fs-6">
            * Offer valid for limited time only. Terms and conditions apply.
          </p>
        </div>

        {/* CSS Styles */}
        <style jsx>{`
          .carousel-item {
            transition: transform 0.5s ease-in-out;
          }
          .fade-in {
            animation: fadeIn 0.8s ease-out;
          }
          .fade-in-down {
            animation: fadeInDown 0.8s ease-out;
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out;
          }
          .bounce-in {
            animation: bounceIn 0.8s ease-out;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
          .delay-500 {
            animation-delay: 0.5s;
          }
          .pulse {
            animation: pulse 1.5s infinite ease-in-out;
          }
          .offer-image:hover {
            transform: scale(1.05);
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.8); }
            60% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default OfferSection;