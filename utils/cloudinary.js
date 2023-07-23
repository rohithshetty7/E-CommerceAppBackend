const cloudinary = require("cloudinary");
          
cloudinary.config({ 
  cloud_name: 'dqn3g5aqv', 
  api_key: '651761484132325', 
  api_secret: 'Pf3FiZjQ1xQL4AX6B1XQYryCFk4' 
});

const cloudinaryUploading = (fileToUploads) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
            if (result.secure_url) {
                resolve({ url: result.secure_url });
            } else {
                reject(new Error('Cloudinary upload failed'));
            }
        }, { resource_type: "auto" });
    });
};

module.exports = cloudinaryUploading;