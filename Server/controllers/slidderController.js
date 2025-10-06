const slidderModel = require("../models/slidderModel");
const imagekit = require("../config/imageKit");


const createSlidder = async (req, res) => {
  try {
    // Handle uploaded images
    const uploadedImages = [];
    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean);

    // Upload each file to ImageKit and collect URLs
    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push({ homeImage: uploadResponse.url });
    }

    // Create new slider document
    const newSlider = await slidderModel.create({
      images: uploadedImages, // Use 'images' to match schema
    });

    res.status(201).json({
      success: true,
      message: "Slider created successfully",
      data: newSlider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create slider",
      error: error.message,
    });
  }
};


const updateSlidder = async (req, res) => {
  try {
    
    const { slidderId, index } = req.body;

    if (!slidderId || !index ) {
      return res.status(400).json({
        success: false,
        message: "Index or missing slider ID",
      });
    }

    if (!Number.isInteger(Number(index)) || Number(index) < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing index",
      });
    }

 
    const file = req.files?.images;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

 
    const slider = await slidderModel.findById(slidderId);
    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

   
    if (index >= slider.images.length) {
      return res.status(400).json({
        success: false,
        message: "Index out of bounds",
      });
    }

    const uploadResponse = await imagekit.upload({
      file: file.data,
      fileName: file.name,
    });

   
    slider.images[index].homeImage = uploadResponse.url;

 
    const updatedSlider = await slider.save();

    res.status(200).json({
      success: true,
      message: "Slider image updated successfully",
      data: updatedSlider,
    });
  } catch (error) {
    console.error("Error updating slider:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update slider",
      error: error.message,
    });
  }
};


const getSlidder = async(req,res)=>{
    try {
        const slidderData = await slidderModel.find();

        if(!slidderData){
            return res.status(404).json({success:false,message:"Slidder not found"})
        }
        res.status(200).json({success:true,message:"Slidder fetched successfully",data:slidderData})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}


// const deleteSlidder = async(req,res)=>{

//     try {
//         const {slidderId,index} = req.body;
//         if(!slidderId || !index){
//             return res.status(400).json({success:false,message:"Index or missing slider ID"})
//         }
//         if(!Number.isInteger(Number(index)) || Number(index)<0){
//             return res.status(400).json({success:false,message:"Invalid or missing index"})
//         }

//         const slider = await slidderModel.findById(slidderId);
//         if(!slider){
//             return res.status(404).json({success:false,message:"Slider not found"})
//         }

//         if(index >= slider.images.length){
//             return res.status(400).json({success:false,message:"Index out of bounds"})
//         }

//         slider.images.splice(index,1);

//         const updatedSlider = await slider.save();

//         res.status(200).json({success:true,message:"Slider image deleted successfully",data:updatedSlider})
//     } catch (error) {
//         res.status(500).json({success:false,message:"Failed to delete slider",error:error.message})
//     }
// }

// const deleteSlidder = async(req,res)=>{
//     try {
        
//         const {slidderId} = req.query;

//         if(!slidderId){
//             return res.status(400).json({sucess:false,message:"Missing slider Id"})
//         }

//         const removeSlidder = await slidderModel.findByIdAndDelete(slidderId);
//         if(!removeSlidder){
//             return res.status(404).json({
//                 success:false,message:"Slidder not found"
//             })
//         }

//         res.status(200).json({success:true,message:"Slidder deleted successfully",data:removeSlidder})

//     } catch (error) {
//         res.status(500).json({success:false,error:error.message})
//     }
// }
const deleteSlidder = async (req, res) => {
  try {
    const { slidderId, index } = req.query;

    if (!slidderId || !index) {
      return res.status(400).json({
        success: false,
        message: "Missing slider ID or index",
      });
    }

    const parsedIndex = Number(index);
    if (!Number.isInteger(parsedIndex) || parsedIndex < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid index",
      });
    }

    const slider = await slidderModel.findById(slidderId);
    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    if (parsedIndex >= slider.images.length) {
      return res.status(400).json({
        success: false,
        message: "Index out of bounds",
      });
    }

    // Remove the image at the specified index
    slider.images.splice(parsedIndex, 1);

    // Save the updated slider (if no images remain, you might want to delete the slider)
    const updatedSlider = await slider.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: updatedSlider,
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

module.exports = {createSlidder,updateSlidder,getSlidder,deleteSlidder};