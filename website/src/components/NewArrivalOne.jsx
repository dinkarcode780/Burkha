// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { addtoCart } from "../Redux/CardSlice";

// const NewArrivalOne = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [user, setUser] = useState({ user: { discount: 0 } });
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const api = "https://backend.umairabaya.com/product";

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(api);
//         console.log(response);

//         setCourses(response.data);
//       } catch (error) {
//         toast.error("Error fetching product data");
//         console.error("Error fetching product data:", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleCourseClick = (courseId) => {
//     navigate(`/product-details/${courseId}`);
//   };

//   const calculateDiscountedPrice = (price) => {
//     const discount = user?.user?.discount || 0;
//     return (price - (price * discount) / 100).toFixed(2);
//   };

//   const handleAddToCartClick = (course) => {
//     // Check if product has multiple sizes
//     const sizes = Array.isArray(course.size) ? course.size : [course.size];

//     if (sizes.length > 1) {
//       // Show size selection modal
//       setCurrentProduct(course);
//       setShowSizeModal(true);
//     } else {
//       // Only one size available, add directly to cart
//       handleaddtoCart(course, sizes[0]);
//     }
//   };

//   const handleaddtoCart = (course, size) => {
//     if (!user?.user?.firmName) {
//       toast.error("Please login to add items to cart");
//       navigate("/login");
//       return;
//     } else {
//       dispatch(
//         addtoCart({
//           id: course._id,
//           name: course.name,
//           price: calculateDiscountedPrice(course.price),
//           image: course.images?.[0] || "https://via.placeholder.com/150",
//           qnty: 1,
//           size: size || "N/A", // Include selected size in cart item
//         })
//       );
//       toast.success(`${course.name} (Size: ${size || "N/A"}) added to cart!`);
//       setShowSizeModal(false);
//     }
//   };

//   const SizeSelectionModal = () => {
//     if (!currentProduct) return null;

//     const sizes = Array.isArray(currentProduct.size)
//       ? currentProduct.size
//       : [currentProduct.size];

//     return (
//       <div
//         className={`modal ${showSizeModal ? "show d-block" : "d-none"}`}
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Select Size</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={() => setShowSizeModal(false)}
//               ></button>
//             </div>
//             <div style={{ backgroundColor: "green" }} className="modal-body">
//               <div
//                 style={{ color: "white" }}
//                 className="d-flex flex-wrap gap-2"
//               >
//                 {sizes.map((size, index) => (
//                   <button
//                     key={index}
//                     className={`btn ${
//                       selectedSize === size
//                         ? "btn-success"
//                         : "btn-outline-secondary"
//                     }`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowSizeModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 disabled={!selectedSize}
//                 onClick={() => handleaddtoCart(currentProduct, selectedSize)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const SampleNextArrow = ({ className, onClick }) => (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
//     >
//       <i className="ph ph-caret-right" />
//     </button>
//   );

//   const SamplePrevArrow = ({ className, onClick }) => (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
//     >
//       <i className="ph ph-caret-left" />
//     </button>
//   );

//   const settings = {
//     dots: false,
//     arrows: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: true,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1599,
//         settings: { slidesToShow: 6 },
//       },
//       {
//         breakpoint: 1399,
//         settings: { slidesToShow: 4 },
//       },
//       {
//         breakpoint: 992,
//         settings: { slidesToShow: 3 },
//       },
//       {
//         breakpoint: 575,
//         settings: { slidesToShow: 2 },
//       },
//       {
//         breakpoint: 424,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };

//   return (
//     <section className="new-arrival pb-80">
//       <div className="container container-lg">
//         <div className="section-heading">
//           <div className="flex-between flex-wrap gap-8">
//             <h5 className="mb-0">New Arrivals</h5>
//             <div className="flex-align mr-point gap-16">
//               <Link
//                 to="/shop"
//                 className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
//               >
//                 View All Deals
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="new-arrival__slider arrow-style-two">
//           <Slider {...settings}>
//             {courses.map((course) => {
//               const discountedPrice = calculateDiscountedPrice(course.price);
//               const showOriginalPrice = user?.user?.discount > 0;

//               return (
//                 <div key={course._id}>
//                   <div className="product-card  px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
//                     <div
//                       onClick={() => handleCourseClick(course._id)}
//                       className="product-card__thumb flex-center cursor-pointer"
//                     >
//                       <img
//                         src={
//                           course.images?.[0] ||
//                           "https://via.placeholder.com/150"
//                         }
//                         alt={course.name}
//                       />
//                     </div>

//                     <div
//                       style={{ width: "100%" }}
//                       className="product-card__content p-3  rounded-lg  bg-white hover:shadow-md transition duration-300"
//                     >
//                       <h6 className="title text-lg fw-semibold mt-3 mb-3 text-dark">
//                         <div
//                           onClick={() => handleCourseClick(course._id)}
//                           className="link text-line-2 cursor-pointer text-success"
//                         >
//                           {course.name}
//                         </div>
//                       </h6>

//                       <div className="d-flex align-items-center justify-content-between mb-2">
//                         <div className="d-flex align-items-center gap-2">
//                           <span className="text-success text-md me-2">
//                             <i className="ph-fill ph-storefront text-success fs-5" />
//                           </span>
//                           <span className="text-muted text-sm">
//                             {course.fabric || "No fabric specified"}
//                           </span>
//                         </div>
//                         <div className="text-end">
//                           <span className="text-sm text-dark fw-semibold">
//                             Sizes:
//                             {Array.isArray(course.size) ? (
//                               course.size.map((size, index) => (
//                                 <span key={index} className="text-success ms-1">
//                                   {size}
//                                   {index < course.size.length - 1 ? "," : ""}
//                                 </span>
//                               ))
//                             ) : (
//                               <span className="text-success ms-1">
//                                 {course.size || "N/A"}
//                               </span>
//                             )}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="d-flex align-items-center justify-content-between mb-2">
//                         <span className="text-end text-sm text-dark fw-semibold">
//                           Color:{" "}
//                           <span className="text-success">{course.color}</span>
//                         </span>
//                       </div>

//                       <div className="product-card__content mt-3">
//                         <div className="product-card__price mb-3 d-flex align-items-center gap-3">
//                           {showOriginalPrice && (
//                             <span className="text-muted text-decoration-line-through fw-semibold">
//                               ₹{course.price.toFixed(2)}
//                             </span>
//                           )}
//                           <span className="text-success fw-bold fs-5">
//                             ₹{discountedPrice}
//                           </span>
//                           {user?.user?.discount > 0 && (
//                             <span className="badge bg-danger ms-2">
//                               {user.user.discount}% OFF
//                             </span>
//                           )}
//                         </div>

//                         <span className="text-sm fw-semibold text-success">
//                           {course.stock}:
//                           <span className="fw-normal text-muted"> Stock </span>
//                         </span>

//                         <button
//                           onClick={() => handleAddToCartClick(course)}
//                           className="product-card__cart btn btn-success mt-3 w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
//                         >
//                           Add To Cart <i className="ph ph-shopping-cart" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </Slider>
//         </div>
//       </div>

//       {/* Size Selection Modal */}
//       <SizeSelectionModal />

//       {/* Modal backdrop */}
//       {showSizeModal && <div className="modal-backdrop fade show"></div>}
//     </section>
//   );
// };

// export default NewArrivalOne;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addtoCart } from "../Redux/CardSlice";

// ✅ Product Card Component
const ProductCard = ({ product, user, onAddToCart, onClickProduct }) => {
  const discountedPrice = (
    product.price -
    (product.price * (user?.user?.discount || 0)) / 100
  ).toFixed(2);

  const showOriginalPrice = user?.user?.discount > 0;

  return (
    <div className=" border rounded-4 shadow-sm h-100 d-flex flex-column p-3 w-100">
      {/* ✅ Image */}
      <div
        onClick={() => onClickProduct(product._id)}
        className="cursor-pointer mb-3 d-flex"
        style={{ height: "220px", overflow: "hidden" }}
      >
        <img
          src={product.images?.[0] || "https://via.placeholder.com/200"}
          alt={product.name}
          className="img-fluid rounded w-100"
          style={{ objectFit: "cover", maxHeight: "100%" }}
        />
      </div>

      {/* ✅ Content */}
      <div className="flex-grow-1 d-flex flex-column p-3">
        <h6
          onClick={() => onClickProduct(product._id)}
          className="fw-semibold text-dark text-truncate cursor-pointer mb-2"
        >
          {product.name}
        </h6>

        <p className="text-muted small mb-1">
          <i className="ph-fill ph-storefront text-success me-1" />
          {product.fabric || "No fabric specified"}
        </p>

        <p className="small mb-1">
          <span className="fw-semibold">Sizes:</span>{" "}
          {Array.isArray(product.size) ? (
            product.size.map((size, index) => (
              <span key={index} className="text-success">
                {size}
                {index < product.size.length - 1 ? ", " : ""}
              </span>
            ))
          ) : (
            <span className="text-success">{product.size || "N/A"}</span>
          )}
        </p>

        <p className="small mb-2">
          <span className="fw-semibold">Color:</span>{" "}
          <span className="text-success">{product.color}</span>
        </p>

        {/* ✅ Price */}
        <div className="d-flex align-items-center gap-2 mb-2">
          {showOriginalPrice && (
            <span className="text-muted text-decoration-line-through small">
              ₹{product.price.toFixed(2)}
            </span>
          )}
          <span className="text-success fw-bold fs-6">₹{discountedPrice}</span>
          {user?.user?.discount > 0 && (
            <span className="badge bg-danger">{user.user.discount}% OFF</span>
          )}
        </div>

        {/* ✅ Stock */}
        <p className="text-muted small mb-3">
          <span className="fw-semibold">{product.stock}</span> in stock
        </p>

        {/* ✅ Button always at bottom */}
        <div className="mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            className="btn btn-success w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
          >
            Add To Cart <i className="ph ph-shopping-cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Main Component
const NewArrivalOne = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ user: { discount: 0 } });
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ✅ API Fetch
  const api = "https://backend.umairabaya.com/product";
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(api);
        console.log(response);
        setCourses(response.data);
      } catch (error) {
        toast.error("Error fetching product data");
        console.error("Error fetching product data:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/product-details/${courseId}`);
  };

  // ✅ Add to Cart Handling
  const handleAddToCartClick = (course) => {
    const sizes = Array.isArray(course.size) ? course.size : [course.size];
    if (sizes.length > 1) {
      setCurrentProduct(course);
      setShowSizeModal(true);
    } else {
      handleAddtoCart(course, sizes[0]);
    }
  };

  const handleAddtoCart = (course, size) => {
    if (!user?.user?.firmName) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const discount = user?.user?.discount || 0;
    const finalPrice = (course.price - (course.price * discount) / 100).toFixed(
      2
    );

    dispatch(
      addtoCart({
        id: course._id,
        name: course.name,
        price: finalPrice,
        image: course.images?.[0] || "https://via.placeholder.com/150",
        qnty: 1,
        size: size || "N/A",
      })
    );

    toast.success(`${course.name} (Size: ${size || "N/A"}) added to cart!`);
    setShowSizeModal(false);
    setSelectedSize(null);
  };

  // ✅ Modal
  const SizeSelectionModal = () => {
    if (!currentProduct) return null;
    const sizes = Array.isArray(currentProduct.size)
      ? currentProduct.size
      : [currentProduct.size];

    return (
      <div
        className={`modal ${showSizeModal ? "show d-block" : "d-none"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Size</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowSizeModal(false)}
              ></button>
            </div>
            <div className="modal-body d-flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`btn ${
                    selectedSize === size
                      ? "btn-success blue"
                      : "btn-outline-secondary"
                  }`}
                  style={{
                    backgroundColor:
                      selectedSize === size ? "#4a90e2" : "white", // blue for selected
                    color: selectedSize === size ? "white" : "black",
                    borderColor: "#4a90e2"
                    
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowSizeModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!selectedSize}
                onClick={() => handleAddtoCart(currentProduct, selectedSize)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="new-arrival pb-80">
      <div className="container container-lg">
        <div className="section-heading d-flex justify-content-between align-items-center">
          <h5 className="mb-0">New Arrivals</h5>
          <Link
            to="/shop"
            className="text-sm fw-medium text-gray-700 hover-text-main-600"
          >
            View All Deals
          </Link>
        </div>

        {/* ✅ Responsive Grid Instead of Slider */}
        {/* <div className=" d-flex overflow-auto hide-scrollbar new-arrival__grid mt-4 row g-3">
          {courses.map((course) => (
            <div key={course._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard
                product={course}
                user={user}
                onAddToCart={handleAddToCartClick}
                onClickProduct={handleCourseClick}
              />
            </div>
          ))}
        </div> */}

        <div className="d-flex overflow-auto gap-3 hide-scrollbar">
          {courses.map((course) => (
            <div key={course._id} style={{ flex: "0 0 auto", width: "220px" }}>
              <ProductCard
                product={course}
                user={user}
                onAddToCart={handleAddToCartClick}
                onClickProduct={handleCourseClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection Modal */}
      <SizeSelectionModal />

      {/* Modal backdrop */}
      {showSizeModal && <div className="modal-backdrop fade show"></div>}
    </section>
  );
};

export default NewArrivalOne;
