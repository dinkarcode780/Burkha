import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../src/Redux/CardSlice";

const ShopSection = ({ subcategoryId, searchProductData }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [grid, setGrid] = useState(true); // ✅ default grid view
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const discount = user?.user?.discount || 0;
  const api = "https://backend.umairabaya.com/product";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, coursesRes] = await Promise.all([
          axios.get("https://backend.umairabaya.com/category"),
          axios.get(api),
        ]);
        setCategories(categoriesRes.data);
        setCourses(coursesRes.data);
        setFilteredCourses(coursesRes.data);

        const sizes = {};
        coursesRes.data.forEach((course) => {
          const courseSizes = Array.isArray(course.size)
            ? course.size
            : [course.size];
          if (courseSizes.length > 0) sizes[course._id] = courseSizes[0];
        });
        setSelectedSizes(sizes);
      } catch (error) {
        setError("Error fetching data");
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (subcategoryId?.id) {
      setFilteredCourses(
        courses.filter((c) => c.subCategory?._id === subcategoryId.id)
      );
      setActiveCategory("All");
    } else {
      setFilteredCourses(
        activeCategory === "All"
          ? courses
          : courses.filter((c) => c.category?.name === activeCategory)
      );
    }
  }, [subcategoryId, courses, activeCategory]);

  const calculateDiscountedPrice = (price) =>
    discount > 0 ? Math.round(price * (1 - discount / 100)) : price;

  const handleCourseClick = (id) => navigate(`/product-details/${id}`);
  const sidebarController = () => setActive(!active);

  const handleSizeSelection = (productId, size) =>
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));

  const handleAddToCartClick = (course) => {
    if (!user?.user?.firmName) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    const sizes = Array.isArray(course.size) ? course.size : [course.size];
    if (sizes.length > 1) {
      setCurrentProduct(course);
      setShowSizeModal(true);
    } else {
      handleaddtoCart(course, sizes[0] || "One Size");
    }
  };

  const handleaddtoCart = (course, size) => {
    dispatch(
      addtoCart({
        id: course._id,
        name: course.name,
        price: calculateDiscountedPrice(course.price),
        image: course.images?.[0] || "assets/images/thumbs/product-two-img5.png",
        qnty: 1,
        size,
      })
    );
    toast.success(`${course.name} (Size: ${size}) added to cart!`);
    setShowSizeModal(false);
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );

  if (error) return <div className="text-center text-danger py-5">{error}</div>;

  return (
    <section className="shop py-80">
      <div className="container container-lg">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4 mb-lg-0">
            <div className={`shop-sidebar ${active && "active"}`}>
              <h6 className="border-bottom pb-2 mb-3">Product Category</h6>
              <ul className="list-unstyled">
                <li
                  className={`mb-2 cursor-pointer ${
                    activeCategory === "All" ? "fw-bold text-success" : ""
                  }`}
                  onClick={() => setActiveCategory("All")}
                >
                  All ({courses.length})
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className={`mb-2 cursor-pointer ${
                      activeCategory === cat.name ? "fw-bold text-success" : ""
                    }`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.name} (
                    {courses.filter((c) => c.category?.name === cat.name).length}
                    )
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {/* Top Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span>
                Showing {filteredCourses.length} of {courses.length} results
              </span>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setGrid(false)}
                  className={`btn btn-sm ${
                    !grid ? "btn-success" : "btn-outline-secondary"
                  }`}
                >
                  <i className="ph-bold ph-list-dashes" />
                </button>
                <button
                  type="button"
                  onClick={() => setGrid(true)}
                  className={`btn btn-sm ${
                    grid ? "btn-success" : "btn-outline-secondary"
                  }`}
                >
                  <i className="ph ph-squares-four" />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary d-lg-none"
                  onClick={sidebarController}
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className="row g-4">
              {filteredCourses.map((course) => {
                const discountedPrice = calculateDiscountedPrice(course.price);
                const showOriginal = discount > 0 && discountedPrice !== course.price;
                const sizes = Array.isArray(course.size)
                  ? course.size
                  : [course.size];
                const selectedSize =
                  selectedSizes[course._id] || sizes[0] || "One Size";

                return grid ? (
                  // ✅ Grid View
                  <div key={course._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100 shadow-sm">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleCourseClick(course._id)}
                      >
                        <img
                          src={
                            course.images?.[0] ||
                            "assets/images/thumbs/product-two-img5.png"
                          }
                          className="card-img-top"
                          alt={course.name}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h6
                          className="card-title text-truncate cursor-pointer"
                          onClick={() => handleCourseClick(course._id)}
                        >
                          {course.name}
                        </h6>
                        <p className="small text-muted mb-1">
                          {course.fabric || "No fabric specified"}
                        </p>
                        <p className="small text-muted mb-1">
                          Size:{" "}
                          {sizes.length > 1 ? (
                            <select
                              value={selectedSize}
                              onChange={(e) =>
                                handleSizeSelection(course._id, e.target.value)
                              }
                              className="form-select form-select-sm d-inline-block w-auto"
                            >
                              {sizes.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          ) : (
                            sizes.join(", ") || "One Size"
                          )}
                        </p>
                        <div className="mt-auto">
                          <div className="d-flex align-items-center gap-2">
                            {showOriginal && (
                              <span className="text-muted text-decoration-line-through">
                                ₹{course.price}
                              </span>
                            )}
                            <span className="fw-bold text-success">
                              ₹{discountedPrice}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAddToCartClick(course)}
                            className="btn btn-success w-100 mt-2"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ✅ List View
                  <div
                    key={course._id}
                    className="col-12 d-flex flex-column flex-md-row gap-3 border rounded p-3 shadow-sm"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleCourseClick(course._id)}
                    >
                      <img
                        src={
                          course.images?.[0] ||
                          "assets/images/thumbs/product-two-img5.png"
                        }
                        alt={course.name}
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        className="rounded"
                      />
                    </div>
                    <div className="flex-grow-1 d-flex flex-column">
                      <h6
                        className="fw-semibold cursor-pointer"
                        onClick={() => handleCourseClick(course._id)}
                      >
                        {course.name}
                      </h6>
                      <p className="small text-muted mb-1">
                        {course.fabric || "No fabric specified"}
                      </p>
                      <p className="small text-muted mb-1">
                        Size:{" "}
                        {sizes.length > 1 ? (
                          <select
                            value={selectedSize}
                            onChange={(e) =>
                              handleSizeSelection(course._id, e.target.value)
                            }
                            className="form-select form-select-sm d-inline-block w-auto"
                          >
                            {sizes.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        ) : (
                          sizes.join(", ") || "One Size"
                        )}
                      </p>
                      <div className="mt-auto d-flex flex-wrap align-items-center gap-2">
                        {showOriginal && (
                          <span className="text-muted text-decoration-line-through">
                            ₹{course.price}
                          </span>
                        )}
                        <span className="fw-bold text-success">
                          ₹{discountedPrice}
                        </span>
                        <button
                          onClick={() => handleAddToCartClick(course)}
                          className="btn btn-success btn-sm ms-auto"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
