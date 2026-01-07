import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

connectDB();

// app config
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
// parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


// serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// expose images path for stored image URLs (keeps compatibility with `/images/...` paths)
app.use('/images', express.static(path.join(process.cwd(), 'uploads')));

// Multer error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.code, err.field);
    let message = err.message;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large. Max size is 10MB.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Invalid file type or unexpected file field.';
    }
    return res.status(400).json({
      success: false,
      message,
      code: err.code,
      field: err.field,
    });
  }
  next(err);
});

app.get('/', (req, res) => {
  res.send('API abracadabra');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
