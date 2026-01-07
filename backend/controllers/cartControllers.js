import userModel from '../models/userModel.js';

export const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Aggiunto alla Carta' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Prodotto non trovato' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Prodotto rimosso sulla Carta' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Cancellazione non riuscita' });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Per la lista prova di nuovo' });
  }
};
