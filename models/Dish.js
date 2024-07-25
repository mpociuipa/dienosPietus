const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  ratings: [{ userId: String, rating: Number }]
});

module.exports = mongoose.model('Dish', DishSchema);
