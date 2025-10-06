// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SlidderPage = () => {
//   const [sliders, setSliders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all sliders on component mount
//   useEffect(() => {
//     const fetchSliders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/slidder/users/getSliddder');
//         if (response.data.success) {
//           setSliders(response.data.data);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (err) {
//         setError('Failed to fetch sliders');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSliders();
//   }, []);

//   // Handle delete slider
//   const handleDelete = async (slidderId) => {
//     if (!window.confirm('Are you sure you want to delete this slider?')) return;
//     try {
//       const response = await axios.delete(`http://localhost:8080/slidder/admin/deleteSlidder?slidderId=${slidderId}`);
//       if (response.data.success) {
//         setSliders(sliders.filter((slider) => slider._id !== slidderId));
//         alert('Slider deleted successfully');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert('Failed to delete slider');
//       console.error(err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//    <div style={{ padding: '40px',marginLeft:"8vw",overflowX:"hidden" }}>
//   <h1>Sliders</h1>
//   {sliders.length === 0 ? (
//     <p>No sliders found</p>
//   ) : (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//       {sliders.map((slider) => (
//         <div
//           key={slider._id}
//           style={{
//             // border: '1px solid #ccc',
//             // padding: '10px',
//             // width: '300px',
//             height:"fit-contebr",
//             widows:"fit-content",
//             textAlign: 'center',
//           }}
//         >
//           {/* <h3>Slider ID: {slider._id}</h3> */}
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns of equal width
//               gap: '10px', // Space between grid items
//               marginBottom: '10px',
//                width: '80vw', height: '50vw' ,
//                overflowX:'hidden'
//             }}
//           >
//             {slider.images.map((img, index) => (
//               <div key={index}>
//                 <img
//                   src={img.homeImage}
//                   alt={`Slider ${index}`}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                 <p>Image {index}</p>
//               </div>
//             ))}
//           </div>
//           <div>
//             <button
//               onClick={() => handleDelete(slider._id)}
//               style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white' }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}
// </div>
//   );
// };

// export default SlidderPage;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const SlidderPage = () => {
//   const [sliders, setSliders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newSlider, setNewSlider] = useState({ images: [] });
//   const fileInputRef = useRef(null);
//   const updateFileInputRef = useRef(null);

//   useEffect(() => {
//     const fetchSliders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/slidder/users/getSliddder');
//         if (response.data.success) {
//           setSliders(response.data.data);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (err) {
//         setError('Failed to fetch sliders');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSliders();
//   }, []);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewSlider((prev) => ({ ...prev, images: files }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     newSlider.images.forEach((file) => formData.append('images', file));

//     try {
//       const response = await axios.post('http://localhost:8080/slidder/admin/createSlidder', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         setSliders([...sliders, response.data.data]);
//         setNewSlider({ images: [] });
//         if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
//         alert('Slider created successfully');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert('Failed to create slider');
//       console.error(err);
//     }
//   };

//   const handleDelete = async (slidderId, imageIndex) => {
//     if (!window.confirm('Are you sure you want to delete this image?')) return;
//     try {
//       const response = await axios.delete(`http://localhost:8080/slidder/admin/deleteSlidder?slidderId=${slidderId}&index=${imageIndex}`);
//       if (response.data.success) {
//         setSliders(sliders.map((slider) =>
//           slider._id === slidderId
//             ? {
//                 ...slider,
//                 images: slider.images.filter((_, idx) => idx !== imageIndex),
//               }
//             : slider
//         ));
//         alert('Image deleted successfully');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert('Failed to delete image');
//       console.error(err);
//     }
//   };

//   const handleUpdateFileChange = (e, slidderId, imageIndex) => {
//     const file = e.target.files[0];
//     // No need to set selectedSlider since we'll pass the index directly
//     handleUpdate(slidderId, imageIndex, file);
//   };

//   const handleUpdate = async (slidderId, imageIndex, file) => {
//     if (!file) {
//       alert('Please select an image to update');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('slidderId', slidderId);
//     formData.append('index', imageIndex);
//     formData.append('images', file);

//     try {
//       const response = await axios.put('http://localhost:8080/slidder/admin/updateSlidder', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         setSliders(sliders.map((slider) =>
//           slider._id === slidderId ? response.data.data : slider
//         ));
//         if (updateFileInputRef.current) updateFileInputRef.current.value = '';
//         alert('Image updated successfully');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert('Failed to update image');
//       console.error(err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="slider-container">
//       <h1 className="slider-title">Image Slider</h1>
//       <form onSubmit={handleCreate} className="slider-form">
//         <label className="file-label">
//           <input
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             className="file-input"
//           />
//           <span className="choose-files">Choose Files</span>
//           <span className="file-names">{newSlider.images.length > 0 ? newSlider.images.map(f => f.name).join(', ') : 'No file chosen'}</span>
//         </label>
//         <button
//           type="submit"
//           className="add-button"
//         >
//           Add Image
//         </button>
//       </form>
//       {sliders.length === 0 ? (
//         <p className="no-sliders">No sliders found</p>
//       ) : (
//         <table className="slider-table">
//           <thead>
//             <tr>
//               <th className="table-header">Images</th>
//               <th className="table-header">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sliders.map((slider) => (
//               <tr key={slider._id} className="table-row">
//                 <td className="image-cell">
//                   <div className="image-container">
//                     {slider.images.map((img, index) => (
//                       <div key={index} style={{ marginBottom: '10px', textAlign: 'center' }}>
//                         <img
//                           src={img.homeImage}
//                           alt={`Slider ${index}`}
//                           className="slider-image"
//                         />
//                         <div style={{ marginTop: '5px' }}>
//                           <input
//                             type="file"
//                             onChange={(e) => handleUpdateFileChange(e, slider._id, index)}
//                             ref={updateFileInputRef}
//                             className="update-file-input"
//                             style={{ marginBottom: '5px' }}
//                           />
//                           <button
//                             onClick={() => handleUpdate(slider._id, index, null)} // Trigger update with no file (for UI consistency)
//                             className="update-button"
//                             style={{ marginRight: '5px' }}
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={() => handleDelete(slider._id, index)}
//                             className="delete-button"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="actions-cell"></td> {/* Empty for now, can be removed if not needed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default SlidderPage;




// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const SlidderPage = () => {
//   const [sliders, setSliders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newSlider, setNewSlider] = useState({ images: [] });
//   const fileInputRef = useRef(null);
//   const updateFileInputRef = useRef(null);

//   useEffect(() => {
//     const fetchSliders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/slidder/users/getSliddder');
//         if (response.data.success) {
//           setSliders(response.data.data);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (err) {
//         setError('Failed to fetch sliders');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSliders();
//   }, []);

//   const handleFileChange = (e) => {
//     const files = e.target.files || e.dataTransfer.files;
//     if (files.length > 0) {
//       setNewSlider((prev) => ({ ...prev, images: [...prev.images, ...Array.from(files)] }));
//       setError(null);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     handleFileChange(e);
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (newSlider.images.length === 0) {
//       setError('Please select at least one image');
//       return;
//     }

//     const formData = new FormData();
//     newSlider.images.forEach((file) => formData.append('images', file));

//     try {
//       const response = await axios.post('http://localhost:8080/slidder/admin/createSlidder', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         setSliders([...sliders, response.data.data]);
//         setNewSlider({ images: [] });
//         if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
//         alert(`Slider created successfully with ${newSlider.images.length} images`);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       setError('Failed to create slider');
//       console.error(err);
//     }
//   };

//   const removeImage = (indexToRemove) => {
//     setNewSlider((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const handleDelete = async (slidderId, imageIndex) => {
//     if (!window.confirm('Are you sure you want to delete this image?')) return;
//     try {
//       const response = await axios.delete(`http://localhost:8080/slidder/admin/deleteSlidder?slidderId=${slidderId}&index=${imageIndex}`);
//       if (response.data.success) {
//         // Update the sliders state with the updated slider from the response
//         setSliders(sliders.map((slider) =>
//           slider._id === slidderId ? response.data.data : slider
//         ));
//         alert('Image deleted successfully');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert('Failed to delete image');
//       console.error(err);
//     }
//   };

//   const handleUpdateFileChange = (e, slidderId, imageIndex) => {
//     const file = e.target.files[0];
//     handleUpdate(slidderId, imageIndex, file);
//   };

//   const handleUpdate = async (slidderId, imageIndex, file) => {
//     if (!file) {
//       alert('Please select an image to update');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('slidderId', slidderId);
//     formData.append('index', imageIndex);
//     formData.append('images', file);

//     try {
//       const response = await axios.put('http://localhost:8080/slidder/admin/updateSlidder', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       if (response.data.success) {
//         setSliders(sliders.map((slider) =>
//           slider._id === slidderId ? response.data.data : slider
//         ));
//         if (updateFileInputRef.current) updateFileInputRef.current.value = '';
//         alert('Image updated successfully');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       alert('Failed to update image');
//       console.error(err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-6 max-w-2xl ml-[8vw]">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Image Slider</h1>
//       <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg ml-[12vw] shadow-md">
//         <div
//           className="border-2 border-dashed border-gray-300 p-6 text-center  rounded-lg mb-4 hover:border-blue-400 transition-colors"
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <input
//             id="imageInput"
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             className="hidden"
//           />
//           <label
//             htmlFor="imageInput"
//             className="cursor-pointer text-gray-600 hover:text-blue-600"
//           >
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               stroke="currentColor"
//               fill="none"
//               viewBox="0 0 48 48"
//               aria-hidden="true"
//             >
//               <path
//                 d="M24 12v12m0 0l-6-6m6 6l6-6m-18 18h24a2 2 0 002-2V14a2 2 0 00-2-2H6a2 2 0 00-2 2v20a2 2 0 002 2z"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <p className="mt-2 text-sm">Drag and drop images here, or click to <span className="font-semibold">choose files</span></p>
//             <p className="text-xs text-gray-500">Supported formats: JPG, PNG (max 10MB)</p>
//           </label>
//         </div>

//         {newSlider.images.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {newSlider.images.map((file, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={file.name}
//                     className="w-full h-32 object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
//                   >
//                     ×
//                   </button>
//                   <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
//           disabled={newSlider.images.length === 0}
//         >
//           Add Images
//         </button>
//       </form>

//       {sliders.length === 0 ? (
//         <p className="no-sliders mt-6">No sliders found</p>
//       ) : (
//         <table className="slider-table mt-6 w-full">
//           <thead>
//             <tr>
//               <th className="table-header">Images</th>
//               {/* <th className="table-header">Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {sliders.map((slider) => (
//               <tr key={slider._id} className="table-row">
//                 <td className="image-cell">
//                   <div className="image-container">
//                     {slider.images.map((img, index) => (
//                       <div key={index} style={{ marginBottom: '10px', textAlign: 'center' }}>
//                         <img
//                           src={img.homeImage}
//                           alt={`Slider ${index}`}
//                           className="slider-image w-32 h-32 object-cover rounded-lg"
//                         />
//                         <div style={{ marginTop: '5px' }}>
//                           <input
//                             type="file"
//                             onChange={(e) => handleUpdateFileChange(e, slider._id, index)}
//                             ref={updateFileInputRef}
//                             className="update-file-input"
//                             style={{ marginBottom: '5px' }}
//                           />
//                           <button
//                             onClick={() => handleUpdate(slider._id, index, null)}
//                             className="update-button bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
//                             style={{ marginRight: '5px' }}
//                             disabled={!updateFileInputRef.current?.files?.length}
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={() => handleDelete(slider._id, index)}
//                             className="delete-button bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="actions-cell"></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default SlidderPage;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SlidderPage = () => {
  const [sliders, setSliders] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true); // For initial fetch
  const [createLoading, setCreateLoading] = useState(false); // For create operation
  const [error, setError] = useState(null);
  const [newSlider, setNewSlider] = useState({ images: [] });
  const fileInputRef = useRef(null);
  const updateFileInputRef = useRef(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/slidder/users/getSliddder');
        console.log('Fetch response:', response.data);
        if (response.data.success) {
          setSliders(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch sliders');
        console.error('Fetch error:', err);
      } finally {
        setFetchLoading(false); // Reset fetch loading
      }
    };
    fetchSliders();
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      setNewSlider((prev) => ({ ...prev, images: [...prev.images, ...Array.from(files)] }));
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (newSlider.images.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setCreateLoading(true); // Set create loading to true
    console.log('Starting create operation...');
    const formData = new FormData();
    newSlider.images.forEach((file) => formData.append('images', file));

    try {
      const response = await axios.post('http://localhost:8080/slidder/admin/createSlidder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Create response:', response.data);
      if (response.data.success) {
        setSliders((prevSliders) => [...prevSliders, response.data.data]);
        setNewSlider({ images: [] });
        if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
        alert(`Slider created successfully with ${newSlider.images.length} images`);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to create slider');
      console.error('Create error:', err);
    } finally {
      setCreateLoading(false); // Reset create loading
      console.log('Create operation completed, createLoading set to false');
    }
  };

  const removeImage = (indexToRemove) => {
    setNewSlider((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleDelete = async (slidderId, imageIndex) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await axios.delete(`http://localhost:8080/slidder/admin/deleteSlidder?slidderId=${slidderId}&index=${imageIndex}`);
      if (response.data.success) {
        setSliders(sliders.map((slider) =>
          slider._id === slidderId ? response.data.data : slider
        ));
        alert('Image deleted successfully');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert('Failed to delete image');
      console.error(err);
    }
  };

  const handleUpdateFileChange = (e, slidderId, imageIndex) => {
    const file = e.target.files[0];
    handleUpdate(slidderId, imageIndex, file);
  };

  const handleUpdate = async (slidderId, imageIndex, file) => {
    if (!file) {
      alert('Please select an image to update');
      return;
    }
    const formData = new FormData();
    formData.append('slidderId', slidderId);
    formData.append('index', imageIndex);
    formData.append('images', file);

    try {
      const response = await axios.put('http://localhost:8080/slidder/admin/updateSlidder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        setSliders(sliders.map((slider) =>
          slider._id === slidderId ? response.data.data : slider
        ));
        if (updateFileInputRef.current) updateFileInputRef.current.value = '';
        alert('Image updated successfully');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert('Failed to update image');
      console.error(err);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 max-w-2xl ml-[8vw]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Image Slider</h1>
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg ml-[12vw] shadow-md">
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
            ref={fileInputRef}
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

        {newSlider.images.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {newSlider.images.map((file, index) => (
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

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={newSlider.images.length === 0 || createLoading} // Disable during create loading
        >
          {createLoading ? 'Loading...' : 'Add Images'}
        </button>
      </form>

      {sliders.length === 0 ? (
        <p className="no-sliders mt-6">No sliders found</p>
      ) : (
        <table className="slider-table mt-6 w-full">
          <thead>
            <tr>
              <th className="table-header">Images</th>
              {/* <th className="table-header">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {sliders.map((slider) => (
              <tr key={slider._id} className="table-row">
                <td className="image-cell">
                  <div className="image-container">
                    {slider.images.map((img, index) => (
                      <div key={index} style={{ marginBottom: '10px', textAlign: 'center' }}>
                        <img
                          src={img.homeImage}
                          alt={`Slider ${index}`}
                          className="slider-image w-32 h-32 object-cover rounded-lg"
                        />
                        <div style={{ marginTop: '5px' }}>
                          <input
                            type="file"
                            onChange={(e) => handleUpdateFileChange(e, slider._id, index)}
                            ref={updateFileInputRef}
                            className="update-file-input"
                            style={{ marginBottom: '5px' }}
                          />
                          <button
                            onClick={() => handleUpdate(slider._id, index, null)}
                            className="update-button bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
                            style={{ marginRight: '5px' }}
                            disabled={!updateFileInputRef.current?.files?.length}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(slider._id, index)}
                            className="delete-button bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="actions-cell"></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SlidderPage;