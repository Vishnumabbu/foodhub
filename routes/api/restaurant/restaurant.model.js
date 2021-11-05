const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image:{ type:Array },
  rating:{type:Number,default:0},
  num:{type:Number,default:0},
  total:{type:Number,default:0},
  _meals: [{ type: Schema.ObjectId, ref: "Meal" }]
});

module.exports = Restaurant = mongoose.model("Restaurant", RestaurantSchema);
