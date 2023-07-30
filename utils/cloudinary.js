const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: 'dqn3g5aqv',
    api_key: '651761484132325',
    api_secret: 'Pf3FiZjQ1xQL4AX6B1XQYryCFk4'
});

const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(fileToUploads, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };
  const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(fileToDelete, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };