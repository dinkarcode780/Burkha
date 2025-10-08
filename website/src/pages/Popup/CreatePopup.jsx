// import React, { useEffect } from 'react';
// import Modal from 'react-modal';

// // Bind modal to your app's root element (required for accessibility)
// Modal.setAppElement('#root');

// const CreatePopup = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   useEffect(() => {
//     // Open the popup when the component mounts (on page load)
//     setIsOpen(true);
//   }, []);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             width: '400px',
//             border: 'none',
//             borderRadius: '8px',
//             padding: '20px',
//             backgroundColor: '#fff',
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           },
//         }}
//         contentLabel="Join Our Comfo Family Popup"
//       >
//         <h2 style={{ color: '#ff0000', textAlign: 'center' }}>Join Our Comfo Family <span style={{ color: '#000' }}>✨</span></h2>
//         <p style={{ textAlign: 'center', color: '#555' }}>
//           to get Instant Discount Codes!<br />
//           Sign up to get early access to collections, exclusive discounts & limited drops. No spam, just love!
//         </p>
//         <form>
//           <input
//             type="text"
//             placeholder="What's your name *"
//             style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//           />
//           <input
//             type="email"
//             placeholder="Email Address *"
//             style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//           />
//           <input
//             type="text"
//             placeholder="WhatsApp Number *"
//             style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//           />
//           <select style={{ width: '100%', margin: '10px 0', padding: '8px' }}>
//             <option value="">City/Country</option>
//             <option value="Jersey">Jersey</option>
//             <option value="Cotton">Cotton</option>
//           </select>
//           <button
//             type="submit"
//             style={{
//               width: '100%',
//               padding: '10px',
//               backgroundColor: '#ff0000',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             GET MY DISCOUNT CODE
//           </button>
//           <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
//             Unsubscribe anytime.
//           </p>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default CreatePopup;

// import React from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const CreatePopup = ({ isOpen, onClose }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         content: {
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '400px',
//           height: '500px',
//           backgroundColor: '#fff',
//           border: 'none',
//           borderRadius: '8px',
//           padding: '20px',
//           position: 'relative', // Ensure positioning context for the close button
//           zIndex: 1000, // Ensure popup is above other content
//         },
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 999, // Ensure overlay is above page content
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: 'hidden',
//         },
//       }}
//       contentLabel="Join Our Comfo Family Popup"
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           background: 'none',
//           border: 'none',
//           fontSize: '24px',
//           cursor: 'pointer',
//           color: '#000',
//         }}
//       >
//         ×
//       </button>
//       <h2 style={{ color: '#ff0000', textAlign: 'center' }}>Join Our Comfo Family <span style={{ color: '#000' }}>✨</span></h2>
//       <p style={{ textAlign: 'center', color: '#555' }}>
//         to get Instant Discount Codes!<br />
//         Sign up to get early access to collections, exclusive discounts & limited drops. No spam, just love!
//       </p>
//       <form>
//         <input
//           type="text"
//           placeholder="What's your name *"
//           style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//         />
//         <input
//           type="email"
//           placeholder="Email Address *"
//           style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//         />
//         <input
//           type="text"
//           placeholder="WhatsApp Number *"
//           style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//         />
//       <input
//       type="text"
//         placeholder="City/Country"
//   style={{ width: '100%', margin: '10px 0', padding: '8px' }}
//       />
//         <button
//           type="button" // Change to button to avoid form submission
//           onClick={onClose}
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#ff0000',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           GET MY DISCOUNT CODE
//         </button>
//         <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
//           Unsubscribe anytime.
//         </p>
//       </form>
//     </Modal>
//   );
// };

// export default CreatePopup;


// import React from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// const CreatePopup = ({ isOpen, onClose }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         content: {
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '90%', 
//           maxWidth: '400px', // Max width for larger screens
//           height: 'auto', // Auto height to adjust with content
//           maxHeight: '80vh', // Limit height to 80% of viewport height
//         //   backgroundColor: '#fff',
//         background:"#2d3748",

//           border: 'none',
//           borderRadius: '10px',
//           padding: '20px',
//           position: 'relative',
//           zIndex: 1000,
//           '@media (max-width: 768px)': { // Mobile view (below 768px)
//             overflowY: 'auto', // Scrollbar for mobile when content exceeds
//           },
//           '@media (min-width: 769px)': { // Desktop view (above 768px)
//             overflowY: 'hidden', // No scrollbar for desktop
//           },
//         },
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 999,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: 'hidden',
//         },
//       }}
//       contentLabel="Join Our Comfo Family Popup"
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           background: 'none',
//           border: 'none',
//           fontSize: '24px',
//           cursor: 'pointer',
//           color: '#000',
//         }}
//       >
//         x
//       </button>
//       <h2 style={{ color: '#ffffff', textAlign: 'center' }}>Join Our Comfo Family <span style={{ color: '#000' }}>✨</span></h2>
//       <p style={{ textAlign: 'center', color: '#ffffff' }}>
//         to get Instant Discount Codes!<br />
//         Sign up to get early access to collections, exclusive discounts & limited drops. No spam, just love!
//       </p>
//       <form>
//         <input
//           type="text"
//           placeholder="What's your name *"
//           style={{ width: '100%', margin: '10px 0', padding: '8px',border:"none",  borderRadius: '5px', }}
//         />
//         <input
//           type="email"
//           placeholder="Email Address *"
//           style={{ width: '100%', margin: '10px 0',border:"none",  borderRadius: '5px', padding: '8px' }}
//         />
//         <input
//           type="text"
//           placeholder="WhatsApp Number *"
//           style={{ width: '100%', margin: '10px 0',border:"none",  borderRadius: '5px', padding: '8px' }}
//         />
//         <input
//           type="text"
//           placeholder="City/Country"
//           style={{ width: '100%', margin: '10px 0',border:"none",  borderRadius: '5px', padding: '8px' }}
//         />
//         <button
//           type="button"
//           onClick={onClose}
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#ff0000',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           GET MY DISCOUNT CODE
//         </button>
//         <p style={{ textAlign: 'center', fontSize: '12px', color: '#ff0000' }}>
//           Unsubscribe anytime.
//         </p>
//       </form>
//     </Modal>
//   );
// };

// export default CreatePopup;

// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { useDispatch } from 'react-redux';
// import { createPopup } from '../../Redux/Popupslice/PopupSlice';
// // import { createPopup } from '../../path-to-your-slice'; 

// Modal.setAppElement('#root');

// const CreatePopup = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     whatsappNumber: '',
//     city: '',
//     country: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Check for required fields as per backend
//     if (!formData.name || !formData.email || !formData.whatsappNumber || (!formData.city && !formData.country)) {
//       alert('Name, Email, Whatsapp Number, and either City or Country are required');
//       return;
//     }

//     try {
//       await dispatch(createPopup(formData)).unwrap(); 
//       onClose(); 
//       alert('Popup created successfully!');
//     } catch (error) {
//       alert(error || 'Failed to create popup');
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         content: {
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '90%',
//           maxWidth: '400px',
//           height: 'auto',
//           maxHeight: '80vh',
//           background: '#2d3748',
//           border: 'none',
//           borderRadius: '10px',
//           padding: '20px',
//           position: 'relative',
//           zIndex: 1000,
//           '@media (max-width: 768px)': {
//             overflowY: 'auto',
//           },
//           '@media (min-width: 769px)': {
//             overflowY: 'hidden',
//           },
//         },
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 999,
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           overflow: 'hidden',
//         },
//       }}
//       contentLabel="Join Our Comfo Family Popup"
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           background: 'none',
//           border: 'none',
//           fontSize: '24px',
//           cursor: 'pointer',
//           color: '#000',
//         }}
//       >
//         x
//       </button>
//       <h2 style={{ color: '#ffffff', textAlign: 'center' }}>Join Our Umair Abaya <span style={{ color: '#000' }}>✨</span></h2>
//       <p style={{ textAlign: 'center', color: '#ffffff' }}>
//         to get Instant Discount Codes!<br />
//         Sign up to get early access to collections, exclusive discounts & limited drops. No spam, just love!
//       </p>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="What’s your name?"
//           value={formData.name}
//           onChange={handleChange}
//           style={{ width: '100%', margin: '10px 0', padding: '8px', border: 'none', borderRadius: '5px' }}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address *"
//           value={formData.email}
//           onChange={handleChange}
//           style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
//         />
//         <input
//           type="text"
//           name="whatsappNumber"
//           placeholder="WhatsApp Number"
//           value={formData.whatsappNumber}
//           onChange={handleChange}
//           style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City/country"
//           value={formData.city}
//           onChange={handleChange}
//           style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
//         />
//         {/* <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           value={formData.country}
//           onChange={handleChange}
//           style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
//         /> */}
//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#ff0000',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             marginTop:"12px"
//           }}
//         >
//           GET MY DISCOUNT CODE
//         </button>
//         <p style={{ textAlign: 'center', fontSize: '12px', color: '#ff0000', marginTop:"12px"}}>
//           Unsubscribe anytime.
//         </p>
//       </form>
//     </Modal>
//   );
// };

// export default CreatePopup;


import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createPopup } from '../../Redux/Popupslice/PopupSlice';


Modal.setAppElement('#root');

const CreatePopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
    city: '',
    country: '',
  });

 
  const countryList = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Jersey', 'Cotton']; // Example countries

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'location') {
      // Check if the input matches a country
      const isCountry = countryList.some(country => country.toLowerCase() === value.toLowerCase());
      setFormData((prev) => ({
        ...prev,
        city: isCountry ? '' : value, // Set city if not a country
        country: isCountry ? value : '', // Set country if it matches
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for required fields as per backend
    if (!formData.name || !formData.email || !formData.whatsappNumber || (!formData.city && !formData.country)) {
      alert('Name, Email, Whatsapp Number, and either City or Country are required');
      return;
    }

    try {
      await dispatch(createPopup(formData)).unwrap(); // Dispatch the thunk and wait for the result
      onClose(); // Close modal on success
      alert('Popup created successfully!');
    } catch (error) {
      alert(error || 'Failed to create popup');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '400px',
          height: 'auto',
          maxHeight: '80vh',
          background: '#2d3748',
          border: 'none',
          borderRadius: '10px',
          padding: '20px',
          position: 'relative',
          zIndex: 1000,
          '@media (max-width: 768px)': {
            overflowY: 'auto',
          },
          '@media (min-width: 769px)': {
            overflowY: 'hidden',
          },
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        },
      }}
      contentLabel="Join Our Comfo Family Popup"
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#ffffff',
        }}
      >
        x
      </button>
      <h2 style={{ color: '#ffffff', textAlign: 'center' }}>Join Our Umair Abaya <span style={{ color: '#000' }}>✨</span></h2>
      <p style={{ textAlign: 'center', color: '#ffffff' }}>
        to get Instant Discount Codes!<br />
        Sign up to get early access to collections, exclusive discounts & limited drops. No spam, just love!
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="What's your name *"
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', margin: '10px 0', padding: '8px', border: 'none', borderRadius: '5px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
        />
        <input
          type="text"
          name="whatsappNumber"
          placeholder="WhatsApp Number *"
          value={formData.whatsappNumber}
          onChange={handleChange}
          style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
        />
        <input
          type="text"
          name="location" // Changed to a generic name for city/country
          placeholder="City/Country"
          value={formData.city || formData.country} // Display whichever is set
          onChange={handleChange}
          style={{ width: '100%', margin: '10px 0', border: 'none', borderRadius: '5px', padding: '8px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ff0000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop:"12px"
          }}
        >
          GET MY DISCOUNT CODE
        </button>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#ff0000',marginTop:"12px" }}>
          Unsubscribe anytime.
        </p>
      </form>
    </Modal>
  );
};

export default CreatePopup;