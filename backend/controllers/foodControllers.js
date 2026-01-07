import fs from 'fs';
import path from 'path';
import foodModel from '../models/foodModel.js';

// add food item
export const addFood = async (req, res) => {
  // Support either req.file (upload.single) or req.files (upload.fields)
  const file =
    req.file ??
    (req.files &&
      (req.files.image?.[0] ||
        req.files.image1?.[0] ||
        Object.values(req.files)[0]?.[0]));
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: 'Image file is required' });
  }

  let image_filename;

  try {
    //     // If Cloudinary is configured, try uploading there
    //     if (
    //       process.env.CLOUDINARY_URL ||
    //       (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY)
    //     ) {
    //       try {
    //         const cloudinaryModule = await import('cloudinary');
    //         const cloudinary = cloudinaryModule.v2;
    //         // configure if needed
    //         if (cloudinary.config && cloudinary.config().cloud_name === undefined) {
    //           cloudinary.config({
    //             cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //             api_key: process.env.CLOUDINARY_API_KEY,
    //             api_secret: process.env.CLOUDINARY_API_SECRET,
    //           });
    //         }

    //         const b64 = Buffer.from(file.buffer).toString('base64');
    //         const dataURI = `data:${file.mimetype};base64,${b64}`;

    //         const result = await cloudinary.uploader.upload(dataURI, {
    //           folder: 'food-delivery',
    //           resource_type: 'auto',
    //         });

    //         image_filename = result.secure_url || result.url;
    //       } catch (cloudErr) {
    //         console.error(
    //           'Cloudinary upload failed, falling back to local save:',
    //           cloudErr.message
    //         );
    //       }
    //     }

    // If Cloudinary wasn't used or failed, save locally
    if (!image_filename) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      fs.mkdirSync(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${file.originalname}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, file.buffer);
      // store a URL path so it can be served statically
      image_filename = `/images/${filename}`;
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: 'Prodotto Aggiunto' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Error', error: error.message });
  }
};

// all food list
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Error', error: error.message });
  }
};

// remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    // determine filename from stored path and delete from uploads dir
    const filenameToDelete = path.basename(food.image);
    fs.unlink(path.join(process.cwd(), 'uploads', filenameToDelete), () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Error', error: error.message });
  }
};
