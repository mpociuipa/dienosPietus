const Dish = require('../models/Dish');

exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.addDish = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const newDish = new Dish({
      name,
      description,
      price,
      imageUrl,
    });

    const dish = await newDish.save();
    res.status(201).json(dish);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.rateDish = async (req, res) => {
  const { rating } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ msg: 'Dish not found' });
    }

    dish.ratings.push({ userId: req.user.id, rating });
    await dish.save();

    res.status(200).json(dish);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
