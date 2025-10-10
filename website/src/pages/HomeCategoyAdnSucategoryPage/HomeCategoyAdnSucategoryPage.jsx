
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../index.css";

const HomeCategoryAndSubcategoryPage = () => {
  const categoryGridRef = useRef(null);
  const fabricGridRef = useRef(null);
  const visibleCount = 4; // Number of items to show at a time
  const navigate = useNavigate();

  // State for API data
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for carousel
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [fabricIndex, setFabricIndex] = useState(0);
  const [categoryCardWidth, setCategoryCardWidth] = useState(0);
  const [fabricCardWidth, setFabricCardWidth] = useState(0);

  // Fallback images
  const fallbackCategoryImage = "https://comfobynoor.in/wp-content/uploads/2025/01/accessories_22_28-1-removebg-preview-300x300.png";
  const fallbackFabricImage = "https://comfobynoor.in/wp-content/uploads/2025/04/7-300x300.png";

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("https://backend.umairabaya.com/category"),
          axios.get("https://backend.umairabaya.com/product"),
        ]);
        console.log("Categories API Response:", categoriesRes.data);
        console.log("Products API Response:", productsRes.data);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Prepare category cards
  const categoryCards = categories.map(category => {
    const productWithCategory = products.find(
      product => product.category?.name === category.name && product.images && product.images.length > 0
    );
    const imageUrl = productWithCategory && productWithCategory.images[0]
      ? productWithCategory.images[0]
      : fallbackCategoryImage;
    console.log(`Category: ${category.name}, Image: ${imageUrl}`);
    return {
      src: imageUrl,
      title: category.name || "Unnamed Category",
      id: category._id // Store category ID for navigation
    };
  });
  const extendedCategoryCards = [...categoryCards, ...categoryCards.slice(0, visibleCount)];

  // Prepare fabric cards
  const uniqueFabrics = [...new Set(products.map(product => product.fabric).filter(fabric => fabric && fabric !== "No fabric specified"))];
  const fabricCards = uniqueFabrics.map(fabric => {
    const productWithFabric = products.find(
      product => product.fabric === fabric && product.images && product.images.length > 0
    );
    const imageUrl = productWithFabric && productWithFabric.images[0]
      ? productWithFabric.images[0]
      : fallbackFabricImage;
    console.log(`Fabric: ${fabric}, Image: ${imageUrl}`);
    return {
      src: imageUrl,
      title: fabric
    };
  });
  const extendedFabricCards = [...fabricCards, ...fabricCards.slice(0, visibleCount)];

  // Update card widths
  useEffect(() => {
    const updateWidths = () => {
      if (categoryGridRef.current && categoryGridRef.current.children[0]) {
        const card = categoryGridRef.current.children[0];
        const style = getComputedStyle(card);
        const width = card.offsetWidth + parseFloat(style.marginRight);
        setCategoryCardWidth(width);
      }
      if (fabricGridRef.current && fabricGridRef.current.children[0]) {
        const card = fabricGridRef.current.children[0];
        const style = getComputedStyle(card);
        const width = card.offsetWidth + parseFloat(style.marginRight);
        setFabricCardWidth(width);
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, [categories, fabricCards]);

  // Carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => {
        const next = prev + 1;
        return next >= categoryCards.length ? 0 : next;
      });
      setFabricIndex((prev) => {
        const next = prev + 1;
        return next >= fabricCards.length ? 0 : next;
      });
    }, 3000); // Advance every 3 seconds

    return () => clearInterval(interval);
  }, [categoryCards.length, fabricCards.length]);

  // Handle category card click
  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  // Handle fabric card click
  const handleFabricClick = (fabric) => {
    navigate(`/shop?fabric=${encodeURIComponent(fabric)}`);
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger py-5">{error}</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="content-container">
        {/* Header Section */}
        <div className="header-section">
          <h1 className="main-slogan">
            We bring <span className="highlight">Elegance</span> to your wardrobe
          </h1>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          {/* <h2 className="categories-title">Explore by Categories</h2> */}
          <div className="category-grid-wrapper" style={{ width: `${visibleCount * categoryCardWidth}px` }}>
            <div className="category-grid" ref={categoryGridRef} style={{ transform: `translateX(-${categoryIndex * categoryCardWidth}px)`, transition: 'transform 0.5s ease-in-out' }}>
              {extendedCategoryCards.map((card, index) => (
                <div
                  className="category-card cursor-pointer"
                  key={index}
                  onClick={() => handleCategoryClick(card.title)}
                >
                  <div className="category-image">
                    <img style={{objectFit:"cover"}} src={card.src} alt={card.title} onError={(e) => { e.target.src = fallbackCategoryImage; }} />
                  </div>
                  <p className="category-title">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore by Fabrics Section */}
        <div className="fabrics-section ">
          <h2 className="fabrics-title">Explore by Fabrics</h2>
          <div className="fabric-grid-wrapper" style={{ width: `${visibleCount * fabricCardWidth}px` }}>
            <div className="fabric-grid" ref={fabricGridRef} style={{ transform: `translateX(-${fabricIndex * fabricCardWidth}px)`, transition: 'transform 0.5s ease-in-out' }}>
              {extendedFabricCards.map((card, index) => (
                <div
                  className="fabric-card cursor-pointer"
                  key={index}
                  onClick={() => handleFabricClick(card.title)}
                >
                  <div className="fabric-image ">
                    <img className='object-cover' src={card.src} alt={card.title} onError={(e) => { e.target.src = fallbackFabricImage; }} />
                  </div>
                  <p className="fabric-title">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryAndSubcategoryPage;