import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Login Again' });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // attach userId consistently to req and req.body for compatibility
    req.userId = token_decode.id;
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
