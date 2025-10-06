import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../index.css'; // Ensure this CSS file exists

const OfferSallePage = () => {
  const [offers, setOffers] = useState([]);
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [updateDialog, setUpdateDialog] = useState({ open: false, offer: null, offerTitleId: '' });
  const [updatedTitle, setUpdatedTitle] = useState('');

  // Fetch all offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/salleoffer/users/getAllSaleOffers');
        if (response.data && Array.isArray(response.data.data)) {
          setOffers(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setOffers([]);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  // Create new offer
  const handleCreateOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/salleoffer/admin/createSaleOffer', {
        offerTitle: [{ title: newOfferTitle }],
      });
      if (response.data.data) {
        setOffers([...offers, response.data.data]);
      }
      setNewOfferTitle('');
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  // Update offer
 // Update offer
const handleUpdateOffer = async () => {
  try {
    const { offer, offerTitleId } = updateDialog;
    console.log('Sending update request with:', { salleId: offer._id, offerTitleId, newTitle: updatedTitle });
    const response = await axios.put('http://localhost:8080/salleoffer/admin/updateSalleOffer', {
      salleId: offer._id,
      offerTitleId: offerTitleId,
      newTitle: updatedTitle,
    });
    console.log('Update response:', response.data);
    if (response.data.data) {
      const updatedOffers = offers.map((o) =>
        o._id === response.data.data._id ? response.data.data : o
      );
      setOffers(updatedOffers);
    }
    setUpdateDialog({ open: false, offer: null, offerTitleId: '' });
    setUpdatedTitle('');
  } catch (error) {
    console.error('Error updating offer:', error.response ? error.response.data : error.message);
  }
};

  // Delete offer
  const handleDeleteOffer = async (salleId) => {
    try {
      await axios.delete(`http://localhost:8080/salleoffer/admin/deleteSaleOffer?salleId=${salleId}`);
      setOffers(offers.filter((offer) => offer._id !== salleId));
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <div className="offer-salle-page">
      {/* Create Offer Input */}
      <div className="create-offer-section">
        <h2>Create New Offer</h2>
        <form onSubmit={handleCreateOffer} className="create-form">
          <input
            type="text"
            value={newOfferTitle}
            onChange={(e) => setNewOfferTitle(e.target.value)}
            placeholder="Enter offer title"
            required
            className="offer-input"
          />
          <button type="submit" className="create-button">Create</button>
        </form>
      </div>

      {/* Offers List */}
      <div className="offers-list">
        <h2>All Offers</h2>
        <div className="offers-grid">
          {offers.length > 0 ? (
            offers.map((offer) =>
              offer.offerTitle.map((item) => (
                <div key={`${offer._id}-${item._id}`} className="offer-card">
                  <p>{item.title}</p>
                  <div className="button-group">
                    <button
                      onClick={() => setUpdateDialog({ open: true, offer, offerTitleId: item._id })}
                      className="update-button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            <p>No offers available</p>
          )}
        </div>
      </div>

      {/* Update Dialog */}
      {updateDialog.open && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Update Offer</h3>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Enter new title"
              className="offer-input"
            />
            <div className="dialog-buttons">
              <button onClick={handleUpdateOffer} className="save-button">Save</button>
              <button
                onClick={() => setUpdateDialog({ open: false, offer: null, offerTitleId: '' })}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferSallePage;