
const salleModel = require("../models/sallofferModel");

const createSaleOffer = async (req, res) => {
  try {
    const { offerTitle } = req.body;
    
    const salledata = await salleModel.create({
        offerTitle
    });
    res.status(201).json({
        success:"true",
        message:"Salle offer created successfully",
        data:salledata
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllSaleOffers = async (req, res) => {
  try {
    const sales = await salleModel.find();
    if (!sales) {
      return res.status(404).json({ message: "Sale offer not found" });
    }
    res.status(200).json({success:"true",message:"Salle offer fetched successfully",data:sales});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSaleById = async (req, res) => {
  try {
    const { salleId } = req.query;
    if (!salleId) {
      return res.status(400).json({ message: "salleId is required" });
    }
    const sale = await salleModel.findById(salleId);
    if (!sale) {
      return res.status(404).json({ message: "Sale offer not found" });
    }
    res.status(200).json({success:"true",message:"Salle offer fetched successfully",data:sale});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const updateSaleOffer = async (req, res) => {
//   try {
//     const { salleId, offerTitle } = req.body;
//     if (!salleId) {
//       return res.status(400).json({ message: "salleId is required" });
//     }
//     const updatedSale = await salleModel.findByIdAndUpdate(
//       salleId,
//       { offerTitle },
//       { new: true }
//     );
//     if (!updatedSale) {
//       return res.status(404).json({ message: "Sale offer not found" });
//     }
//     res.status(200).json({
//         success:true,
//         message:"Sale offer updated successfully",
//         data:updatedSale
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const updateSaleOffer = async (req, res) => {
//   try {
//     const { salleId, offerTitle, index } = req.body;
//     if (!salleId) {
//       return res.status(400).json({ message: "salleId is required" });
//     }
//     if (index === undefined || index < 0) {
//       return res.status(400).json({ message: "Valid index is required" });
//     }

    
//     const sale = await salleModel.findById(salleId);
//     if (!sale) {
//       return res.status(404).json({ message: "Sale offer not found" });
//     }

   
//     if (index >= sale.offerTitle.length) {
//       return res.status(400).json({ message: "Index out of bounds" });
//     }

   
//     const updatedSale = await salleModel.findByIdAndUpdate(
//       salleId,
//       {
//         $set: {
//           [`offerTitle.${index}.title`]: offerTitle.title,
//         },
//       },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Sale offer updated successfully",
//       data: updatedSale,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const updateSalleOffer = async (req, res) => {
  try {
    const { salleId, offerTitleId, newTitle } = req.body;
    if (!salleId || !offerTitleId) {
      return res.status(400).json({ message: "salleId and offerTitleId are required" });
    }

    // Find the sale offer
    const sale = await salleModel.findById(salleId);
    if (!sale) {
      return res.status(404).json({ message: "Sale offer not found" });
    }

    // Find and update the specific offerTitle by _id
    const offerTitleToUpdate = sale.offerTitle.id(offerTitleId);
    if (!offerTitleToUpdate) {
      return res.status(404).json({ message: "Offer title not found" });
    }

    offerTitleToUpdate.title = newTitle;
    const updatedSale = await sale.save();

    res.status(200).json({
      success: true,
      message: "Sale offer updated successfully",
      data: updatedSale,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteSaleOffer = async (req, res) => {
  try {
    const { salleId } = req.query;
    if (!salleId) {
      return res.status(400).json({ message: "salleId is required" });
    }
    const deletedSale = await salleModel.findByIdAndDelete(salleId);
    if (!deletedSale) {
      return res.status(404).json({ message: "Sale offer not found" });
    }
    res.status(200).json({success:"true", message: "Sale offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createSaleOffer, getAllSaleOffers, getSaleById, updateSalleOffer, deleteSaleOffer};