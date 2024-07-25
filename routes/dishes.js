const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Dish = require('../models/Dish');

// Create dish
router.post('/', auth, async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const newDish = new Dish({ name, description, price, imageUrl });
    const dish = await newDish.save();
    res.json(dish);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Rate a dish
router.post('/rate/:id', auth, async (req, res) => {
  const { rating } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ msg: 'Dish not found' });

    dish.ratings.push({ userId: req.user.userId, rating });
    await dish.save();

    res.json(dish);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
