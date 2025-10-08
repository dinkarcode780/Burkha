// import { useState, useEffect } from 'react';
// import '../../index.css';

// const Testom = () => {
//   const [activeTestimonial, setActiveTestimonial] = useState(0);

//   const testimonials = [
//     {
//       id: 1,
//       text: "The quality is exceptional and the designs are so elegant. I feel confident and beautiful in every piece.",
//       author: "IANDON KIRATA",
//       rating: 5
//     },
//     {
//       id: 2,
//       text: "Finally found a brand that understands modest fashion. The abayas are comfortable and stylish.",
//       author: "Zara M.",
//       rating: 5
//     },
//     {
//       id: 3,
//       text: "Absolutely love my Umair Abaya! The fabric is premium and the fit is perfect. Will definitely order again.",
//       author: "Sarah Johnson",
//       rating: 5
//     },
//     {
//       id: 4,
//       text: "The attention to detail is remarkable. Every stitch speaks quality. Highly recommended!",
//       author: "Amina Khan",
//       rating: 5
//     }
//   ];

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const nextTestimonial = () => {
//     setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   // Star rating component
//   const StarRating = ({ rating }) => {
//     return (
//       <div className="d-flex justify-content-center gap-1">
//         {[...Array(5)].map((_, i) => (
//           <span key={i} className="text-warning fs-5">⭐</span>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-vh-100 bg-light py-5 px-3 px-sm-4 px-lg-5">
//       <div className="container-xl">
        
//         {/* Main Heading Section */}
//         <div className="text-center mb-5">
//           <h1 className="display-4 fw-bold text-dark mb-3">
//             What Our Customers Say
//           </h1>
          
//           {/* Subtitle */}
//           <p className="fs-5 text-muted mb-4">
//             Real experiences from our valued community
//           </p>

//           {/* Divider Line */}
//           <hr className="w-25 mx-auto mb-5" style={{ borderColor: '#6b7280' }} />
//         </div>

//         {/* Testimonials Carousel */}
//         <div className="carousel slide position-relative">
//           <div 
//             className="carousel-inner"
//             style={{ transition: 'transform 0.5s ease-in-out' }}
//           >
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={testimonial.id}
//                 className={`carousel-item ${index === activeTestimonial ? 'active' : ''}`}
//               >
//                 <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
//                   {/* Testimonial Number */}
//                   <div 
//                     className={`fs-4 fw-bold mb-3 ${index === activeTestimonial ? 'text-primary' : 'text-muted'}`}
//                   >
//                     {String(testimonial.id).padStart(2, '0')}
//                   </div>

//                   {/* Testimonial Text */}
//                   <p className="fs-5 text-secondary mb-3">
//                     "{testimonial.text}"
//                   </p>

//                   {/* Author */}
//                   <div className={`fs-5 fw-semibold ${index === activeTestimonial ? 'text-dark' : 'text-muted'}`}>
//                     <p>- {testimonial.author}</p>
//                   </div>

//                   {/* Star Rating */}
//                   <StarRating rating={testimonial.rating} />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <button
//               onClick={prevTestimonial}
//               className="btn btn-outline-secondary rounded-circle p-2"
//               style={{ width: '40px', height: '40px' }}
//             >
//               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             {/* Dots Indicator */}
//             <div className="d-flex gap-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveTestimonial(index)}
//                   className={`btn btn-sm rounded-circle ${index === activeTestimonial ? 'bg-primary' : 'bg-secondary bg-opacity-50'}`}
//                   style={{ width: '12px', height: '12px', padding: 0 }}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={nextTestimonial}
//               className="btn btn-outline-secondary rounded-circle p-2"
//               style={{ width: '40px', height: '40px' }}
//             >
//               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>

//           {/* Mobile Navigation Dots */}
//           <div className="d-flex justify-content-center gap-2 mt-3 d-lg-none">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveTestimonial(index)}
//                 className={`btn btn-sm rounded-circle ${index === activeTestimonial ? 'bg-primary' : 'bg-secondary bg-opacity-50'}`}
//                 style={{ width: '12px', height: '12px', padding: 0 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* CSS Styles */}
//         <style jsx>{`
//           .carousel-item {
//             transition: transform 0.5s ease-in-out;
//           }
//           .card {
//             transition: opacity 0.5s ease, transform 0.5s ease;
//           }
//           .carousel-item:not(.active) .card {
//             opacity: 0.5;
//             transform: scale(0.95);
//           }
//           .carousel-item.active .card {
//             opacity: 1;
//             transform: scale(1);
//           }
//           .btn-outline-secondary:hover svg {
//             stroke: #ffffff;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default Testom;
import { useState, useEffect } from 'react';
import '../../index.css';

const Testom = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "The quality is exceptional and the designs are so elegant. I feel confident and beautiful in every piece.",
      author: "IANDON KIRATA",
      rating: 5
    },
    {
      id: 2,
      text: "Finally found a brand that understands modest fashion. The abayas are comfortable and stylish.",
      author: "Zara M.",
      rating: 5
    },
    {
      id: 3,
      text: "Absolutely love my Umair Abaya! The fabric is premium and the fit is perfect. Will definitely order again.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      id: 4,
      text: "The attention to detail is remarkable. Every stitch speaks quality. Highly recommended!",
      author: "Amina Khan",
      rating: 5
    },




     {
      id: 5,
      text: "The quality is exceptional and the designs are so elegant. I feel confident and beautiful in every piece.",
      author: "IANDON KIRATA",
      rating: 5
    },
    {
      id: 6,
      text: "Finally found a brand that understands modest fashion. The abayas are comfortable and stylish.",
      author: "Zara M.",
      rating: 5
    },
    {
      id: 7,
      text: "Absolutely love my Umair Abaya! The fabric is premium and the fit is perfect. Will definitely order again.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      id: 8,
      text: "The attention to detail is remarkable. Every stitch speaks quality. Highly recommended!",
      author: "Amina Khan",
      rating: 5
    }
  ];

  // Auto-slide functionality (move 2 slides at a time)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 2 >= testimonials.length ? 0 : prev + 2));
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 2 >= testimonials.length ? 0 : prev + 2));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 2 < 0 ? testimonials.length - (testimonials.length % 2 || 2) : prev - 2));
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="d-flex justify-content-center gap-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-warning fs-4">⭐</span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-vh-90 bg-white py-5 px-3 px-sm-4 px-lg-5">
      <div className="container-xl">
        
        {/* Main Heading Section */}
        <div className="text-center mb-5">
          <h1 className="testimonials-main-heading mb-3">
            What Our Customers Say
          </h1>
          
          {/* Subtitle */}
          <p className="testimonials-subtitle mb-4">
            Real experiences from our valued community
          </p>

          {/* Divider Line */}
          <div className="testimonials-divider mb-5"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className=" position-relative mb-5">
          <div 
            className="testimonials-cards-container"
            style={{ transition: 'transform 0.5s ease-in-out' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${Math.floor(index / 2) === Math.floor(activeIndex / 2) ? 'active' : 'inactive'}`}
                style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 8px' }}
              >
                <div className="testimonial-card p-4 rounded-3">
                  {/* Testimonial Number */}
                  <div className={`testimonial-number mb-3 ${Math.floor(index / 2) === Math.floor(activeIndex / 2) ? 'active' : 'inactive'}`}>
                    {String(testimonial.id).padStart(2, '0')}
                  </div>

                  {/* Testimonial Text */}
                  <p className="testimonial-text mb-3">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className={`testimonial-author-container mb-3 ${Math.floor(index / 2) === Math.floor(activeIndex / 2) ? 'active' : 'inactive'}`}>
                    <p className="testimonial-author-name">- {testimonial.author}</p>
                  </div>

                  {/* Star Rating */}
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="testimonials-navigation-container mt-10">
            <button
              onClick={prevTestimonial}
              className="testimonials-nav-button"
            >
              Previous
            </button>
            
            {/* Dots Indicator */}
            <div className="testimonials-dots-container">
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index * 2)}
                  className={`testimonials-dot ${Math.floor(activeIndex / 2) === index ? 'active' : 'inactive'}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="testimonials-nav-button"
            >
              Next
            </button>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="testimonials-mobile-dots-container mt-3 d-lg-none">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index * 2)}
                className={`testimonials-mobile-dot ${Math.floor(activeIndex / 2) === index ? 'active' : 'inactive'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testom;