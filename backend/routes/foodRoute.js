import express from 'express';
import multer from 'multer';
import {
  addFood,
  listFood,
  removeFood,
} from '../controllers/foodControllers.js';

const foodRouter = express.Router();

// Image Storage
const storage = multer.memoryStorage();

// set max file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE, // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // accept only image mime types
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      // signal an unexpected file (invalid type)
      return cb(
        new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname)
      );
    }
    cb(null, true);
  },
});

// Accept either 'image' or 'image1' to be more robust against client field names
foodRouter.post(
  '/add',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
  ]),
  addFood
);

foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
