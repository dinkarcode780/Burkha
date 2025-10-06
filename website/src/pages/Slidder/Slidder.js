

// import React, { useState, useEffect, useRef } from 'react';
// import "../../index.css"; // Adjust path to go up two directories

// const Slidder = () => {
//   // Array of images
//   const images = [
//     "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw",
//     "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw",
//     "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw",
//     "https://ideogram.ai/assets/image/lossless/response/q1E8pxvJS22vH5RoN8o6Pw"
   
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const intervalRef = useRef(null);

//   // Handle previous image with slide
//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     handleUserInteraction();
//   };

//   // Handle next image with slide
//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     handleUserInteraction();
//   };

//   // Autoplay logic
//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(intervalRef.current);
//   }, [images.length]); // Dependency on images.length to re-run if images change

//   // Handle user interaction to pause autoplay temporarily
//   const handleUserInteraction = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     // Resume autoplay after 5 seconds of inactivity
//     setTimeout(() => {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//       }, 3000);
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
//           <div
//             className="slide-wrapper"
//             style={{
//               transform: `translateX(-${currentIndex * 100}%)`,
//               transition: 'transform 0.5s ease-in-out'
//             }}
//           >
//             {images.map((image, index) => (
//               <div className="slide-item" key={index}>
//                 <img
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className="slider-image"
//                 />
//               </div>
//             ))}
//           </div>
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
//               onClick={() => {
//                 setCurrentIndex(index);
//                 handleUserInteraction();
//               }}
//             ></span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Slidder;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../../index.css"; 

const Slidder = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // Fetch slider data from API
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/slidder/users/getSliddder');
        if (response.data.success) {
          // Use homeImage URLs from the first slider's images array
          if (response.data.data.length > 0 && response.data.data[0].images) {
            setImages(response.data.data[0].images.map(img => img.homeImage));
          } else {
            setError('No images found in slider data');
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch sliders: ' + (err.response?.data?.message || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

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
    if (images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000); // Change slide every 3 seconds
    }

    return () => clearInterval(intervalRef.current);
  }, [images.length]); // Dependency on images.length to re-run if images change

  // Handle user interaction to pause autoplay temporarily
  const handleUserInteraction = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => {
      if (images.length > 0) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
      }
    }, 5000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="slider-container">
      <div className="slider">
        <button
          className="arrow left-arrow"
          onClick={prevSlide}
          disabled={images.length <= 1} // Disable for single or no image
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
          disabled={images.length <= 1} // Disable for single or no image
        >
          &#10095;
        </button>
      </div>
      {images.length > 1 && (
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              // className={`dot ${currentIndex === index ? 'active' : ''}`} // Uncomment and style in CSS if needed
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