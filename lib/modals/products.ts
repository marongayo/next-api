// products modals

import { Schema, model, models ,Types} from "mongoose";
import User from "./users";

const productsSchema = new Schema({
  name: { type: String, required: true },
  description: {type: String},
  price: {type:Number, required:true},
  imageUrl: { type: String, required:false },
  createdBy: { type: Types.ObjectId, ref: User, required: true },
},{
    timestamps: true,
});

const Products = models.Products || model("Products", productsSchema);
export default Products;
