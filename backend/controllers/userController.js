import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export const registerUser = async (req, res) => {
  const { name, password, email } = req.body || {};
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Name, email and password are required',
      });
  }
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User gia esistente' });
    }

    //validazione email & password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'email non valida' });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: 'Digitare password con almeno 6 carateri',
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email and password are required' });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User non trovato' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Password Errata' });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'error' });
  }
};
