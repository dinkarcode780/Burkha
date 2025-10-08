import React, { useState } from "react";
import axios from "axios";

const AddSlidderPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle file input change or drag-and-drop
  const handleFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      setImages([...images, ...files]); // Add new files to existing ones
      setError("");
      setSuccess("");
    }
  };

  // Handle drag-over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("Please select at least one image");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    for (let file of images) {
      formData.append("images", file);
    }

    try {
      const response = await axios.post("https://backend.umairabaya.com/slidder/admin/createSlidder", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(response.data.message || "Slider created successfully!");
      setImages([]); // Clear images after success
      document.getElementById("imageInput").value = ""; // Reset file input
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create slider");
    } finally {
      setLoading(false);
    }
  };

  // Remove an image from the preview
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Slider</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div
          className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg mb-4 hover:border-blue-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            id="imageInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="imageInput"
            className="cursor-pointer text-gray-600 hover:text-blue-600"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M24 12v12m0 0l-6-6m6 6l6-6m-18 18h24a2 2 0 002-2V14a2 2 0 00-2-2H6a2 2 0 00-2 2v20a2 2 0 002 2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm">Drag and drop images here, or click to <span className="font-semibold">choose files</span></p>
            <p className="text-xs text-gray-500">Supported formats: JPG, PNG (max 10MB)</p>
          </label>
        </div>

        {images.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from(images).map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                  <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Creating..." : "Create Slider"}
        </button>
      </form>
    </div>
  );
};

export default AddSlidderPage;