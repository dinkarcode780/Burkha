const popupModel = require("../models/popupModel");

const createPopup = async(req,res)=>{
    try {
        
        const {name,email, whatsappNumber, city, country} = req.body;

        if (!name || !email || !whatsappNumber || (!city && !country)) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, Whatsapp Number and either City or Country are required"
            });
        }

        const popup = await popupModel.create({
            name,email, whatsappNumber, city, country
        });

        res.status(201).json({success:true,message:"Popup Create successfully",data:popup})

    } catch (error) {
       res.status(500).json({
        success:false, messsage:error.message
       }) 
    }
}


const updatePopup = async (req, res) => {
    try {
        const {popupId} = req.query;
        const { name, email, whatsappNumber, city, country } = req.body;

        if (!name || !email || !whatsappNumber || !city || !country) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const updatedPopup = await popupModel.findByIdAndUpdate(
            popupId,
            { name, email, whatsappNumber, city, country },
            { new: true }
        );

        if (!updatedPopup) {
            return res.status(404).json({ success: false, message: "Popup not found" });
        }

        res.status(200).json({
            success: true,
            message: "Popup updated successfully",
            data: updatedPopup
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getPopupById = async (req, res) => {
    try {
        const {popupId} = req.query;

        const popup = await popupModel.findById(popupId);

        if (!popup) {
            return res.status(404).json({
                success: false,
                message: "Popup not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Popup fetched successfully",
            data: popup
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getPopupByFilter = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "", city, country } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

       
        let filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { whatsappNumber: { $regex: search, $options: "i" } }
            ];
        }

        if (city) {
            filter.city = { $regex: city, $options: "i" };
        }

        if (country) {
            filter.country = { $regex: country, $options: "i" };
        }

        const total = await popupModel.countDocuments(filter);

        const popups = await popupModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 }); 

        res.status(200).json({
            success: true,
            message: "Popups fetched successfully",
            data: popups,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deletePopup = async (req, res) => {
    try {
        const { popupId } = req.params;

        const deletedPopup = await popupModel.findByIdAndDelete(popupId);

        if (!deletedPopup) {
            return res.status(404).json({
                success: false,
                message: "Popup not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Popup deleted successfully",
            data: deletedPopup
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports={createPopup,updatePopup,getPopupById,deletePopup,getPopupByFilter}