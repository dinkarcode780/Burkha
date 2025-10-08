import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateSlidderPage = () => {
  const [sliders, setSliders] = useState([]);
  const [slidderId, setSlidderId] = useState("");
  const [index, setIndex] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch sliders on component mount
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get(
          "https://backend.umairabaya.com/slidder/admin/getSliddder"
        );
        if (response.data.success) {
          setSliders(response.data.data);
        } else {
          setMessage(response.data.message || "Failed to fetch sliders");
        }
      } catch (err) {
        setMessage(
          "Error fetching sliders: " +
            (err.response?.data?.message || err.message)
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0] || e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slidderId || !index || !image) {
      setMessage("Please fill all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("slidderId", slidderId);
    formData.append("index", index);
    formData.append("images", image);

    try {
      const response = await axios.put(
        "https://backend.umairabaya.com/slidder/admin/updateSlidder",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        setMessage("Slider updated successfully");
        setSlidderId("");
        setIndex("");
        setImage(null);
        setPreview(null);
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage(
        "Failed to update slider: " +
          (err.response?.data?.message || err.message)
      );
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Update Slider</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{
            // marginTop:"10px"
            position:"relative",
            // top:"10px"
          }} >Slider ID</label>
          {loading ? (
            <p>Loading sliders...</p>
          ) : sliders.length > 0 ? (
            <select
              value={slidderId}
              onChange={(e) => setSlidderId(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "7px",
              }}
            >
              <option value="">Select a Slider</option>
              {sliders.map((slider) => (
                <option key={slider._id} value={slider._id}>
                  {slider._id}
                </option>
              ))}
            </select>
          ) : (
            <p>No sliders available</p>
          )}
        </div>
        <div>
          <label>Image Index:</label>
          <input
            type="number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            min="0"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            placeholder="Enter Image Index"
          />
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("imageInput").click()}
          style={{
            border: "2px dashed #ccc",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input
            id="imageInput"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <p>
              Drag and drop images here, or click to choose files
              <br />
              Supported formats: JPG, PNG (max 10MB)
            </p>
          )}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Update Slider
        </button>
      </form>
      {message && (
        <p
          style={{
            color: message.includes("success") ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateSlidderPage;
