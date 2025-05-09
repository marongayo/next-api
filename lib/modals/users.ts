// users modals

import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  image:{type:String, required: false},
  role: { type: String, enum: ["user", "admin"], default: "user" },
},{
    timestamps: true,
});

const User = models.User || model("User", userSchema);
export default User;
