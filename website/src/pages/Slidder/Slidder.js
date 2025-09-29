




// import React, { useState, useEffect } from 'react';
// import "../../index.css"; // Adjust path to go up two directories

// const Slidder = () => {
//   // Array of images
//   const images = [
//     "https://images.jifo.co/51656944_1579858223700.jpg",
//      "https://images.jifo.co/51656944_1579858223700.jpg",
//       "https://images.jifo.co/51656944_1579858223700.jpg",
//        "https://i.ytimg.com/vi/fLMixIjhsKs/maxresdefault.jpg"
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false); // State to toggle fade effect

//   // Handle previous image
//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     setIsFading(false); // Reset fade on manual navigation
//   };

//   // Handle next image
//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     setIsFading(false); // Reset fade on manual navigation
//   };

//   // Autoplay logic with fade effect for single image
//   useEffect(() => {
//     let interval;
//     if (images.length > 1) {
//       interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//         setIsFading(false); // Reset fade for multi-image transition
//       }, 3000); // Change slide every 3 seconds
//     } else {
//       interval = setInterval(() => {
//         setIsFading(true); // Start fade out
//         setTimeout(() => {
//           setIsFading(false); // Fade back in after transition
//         }, 500); // Match CSS transition duration (0.5s)
//       }, 3000); // Repeat every 3 seconds
//     }

//     // Clear interval on component unmount or when user interacts
//     return () => clearInterval(interval);
//   }, [images.length]); // Dependency on images.length to re-run if images change

//   // Handle user interaction to pause autoplay temporarily
//   const handleUserInteraction = () => {
//     // Optional: Add a delay before resuming autoplay if desired
//   };

//   return (
//     <div className="slider-container">
//       <div className="slider">
//         <button
//           className="arrow left-arrow"
//           onClick={() => { prevSlide(); handleUserInteraction(); }}
//           disabled={images.length === 1} // Disable for single image
//         >
//           &#10094;
//         </button>
//         <div className="slide-content">
//           <img
//             src={images[currentIndex]}
//             alt={`Slide ${currentIndex + 1}`}
//             className={`slider-image ${isFading ? 'fade' : ''}`}
//           />
//         </div>
//         <button
//           className="arrow right-arrow"
//           onClick={() => { nextSlide(); handleUserInteraction(); }}
//           disabled={images.length === 1} // Disable for single image
//         >
//           &#10095;
//         </button>
//       </div>
//       {images.length > 1 && (
//         <div className="dots">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               // className={`dot ${currentIndex === index ? 'active' : ''}`}
//               onClick={() => { setCurrentIndex(index); handleUserInteraction(); }}
//             ></span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Slidder;


// import React, { useState, useEffect, useRef } from 'react';
// import "../../index.css"; // Adjust path to go up two directories

// const Slidder = () => {
//   // Array of images
//   const images = [
//     "https://images.jifo.co/51656944_1579858223700.jpg",
//     "https://images.jifo.co/51656944_1579858223700.jpg",
//     "https://images.jifo.co/51656944_1579858223700.jpg",
//     "https://i.ytimg.com/vi/fLMixIjhsKs/maxresdefault.jpg"
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false); // State to toggle fade effect
//   const intervalRef = useRef(null);

//   // Unified advance function with fade
//   const advance = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       if (images.length > 1) {
//         setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//       }
//       setIsFading(false);
//     }, 500); // Match CSS transition duration (0.5s)
//   };

//   // Autoplay logic
//   useEffect(() => {
//     intervalRef.current = setInterval(advance, 3000); // Change/refresh every 3 seconds

//     return () => clearInterval(intervalRef.current);
//   }, [images.length]); // Dependency on images.length to re-run if images change

//   // Handle previous image with fade
//   const prevSlide = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//       setIsFading(false);
//     }, 500);
//     handleUserInteraction();
//   };

//   // Handle next image with fade
//   const nextSlide = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//       setIsFading(false);
//     }, 500);
//     handleUserInteraction();
//   };

//   // Handle user interaction to pause autoplay temporarily
//   const handleUserInteraction = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     // Resume autoplay after 5 seconds of inactivity
//     setTimeout(() => {
//       intervalRef.current = setInterval(advance, 3000);
//     }, 5000);
//   };

//   return (
//     <div className="slider-container">
//       <div className="slider">
//         <button
//           className="arrow left-arrow"
//           onClick={prevSlide}
//           disabled={images.length === 1} // Disable for single image
//         >
//           &#10094;
//         </button>
//         <div className="slide-content">
//           <img
//             src={images[currentIndex]}
//             alt={`Slide ${currentIndex + 1}`}
//             className={`slider-image ${isFading ? 'fade' : ''}`}
//           />
//         </div>
//         <button
//           className="arrow right-arrow"
//           onClick={nextSlide}
//           disabled={images.length === 1} // Disable for single image
//         >
//           &#10095;
//         </button>
//       </div>
//       {images.length > 1 && (
//         <div className="dots">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               // className={`dot ${currentIndex === index ? 'active' : ''}`}
//               onClick={() => { setCurrentIndex(index); handleUserInteraction(); }}
//             ></span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Slidder;


import React, { useState, useEffect, useRef } from 'react';
import "../../index.css"; // Adjust path to go up two directories

const Slidder = () => {
  // Array of images
  const images = [
    "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw",
    "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw",
    "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw",
    "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw"
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Handle previous image with slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    handleUserInteraction();
  };

  // Handle next image with slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    handleUserInteraction();
  };

  // Autoplay logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalRef.current);
  }, [images.length]); // Dependency on images.length to re-run if images change

  // Handle user interaction to pause autoplay temporarily
  const handleUserInteraction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
    }, 5000);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <button
          className="arrow left-arrow"
          onClick={prevSlide}
          disabled={images.length === 1} // Disable for single image
        >
          &#10094;
        </button>
        <div className="slide-content">
          <div
            className="slide-wrapper"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {images.map((image, index) => (
              <div className="slide-item" key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="slider-image"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="arrow right-arrow"
          onClick={nextSlide}
          disabled={images.length === 1} // Disable for single image
        >
          &#10095;
        </button>
      </div>
      {images.length > 1 && (
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              // className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                handleUserInteraction();
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slidder;






