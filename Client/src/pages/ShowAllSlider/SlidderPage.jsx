import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SlidderPage = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all sliders on component mount
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/slidder/users/getSliddder');
        if (response.data.success) {
          setSliders(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch sliders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  // Handle delete slider
  const handleDelete = async (slidderId) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    try {
      const response = await axios.delete(`http://localhost:8080/slidder/admin/deleteSlidder?slidderId=${slidderId}`);
      if (response.data.success) {
        setSliders(sliders.filter((slider) => slider._id !== slidderId));
        alert('Slider deleted successfully');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert('Failed to delete slider');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
   <div style={{ padding: '40px',marginLeft:"8vw",overflowX:"hidden" }}>
  <h1>Sliders</h1>
  {sliders.length === 0 ? (
    <p>No sliders found</p>
  ) : (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {sliders.map((slider) => (
        <div
          key={slider._id}
          style={{
            // border: '1px solid #ccc',
            // padding: '10px',
            // width: '300px',
            height:"fit-contebr",
            widows:"fit-content",
            textAlign: 'center',
          }}
        >
          {/* <h3>Slider ID: {slider._id}</h3> */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns of equal width
              gap: '10px', // Space between grid items
              marginBottom: '10px',
               width: '80vw', height: '50vw' ,
               overflowX:'hidden'
            }}
          >
            {slider.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.homeImage}
                  alt={`Slider ${index}`}
                  style={{ width: '100%', height: 'auto' }}
                />
                <p>Image {index}</p>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => handleDelete(slider._id)}
              style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default SlidderPage;