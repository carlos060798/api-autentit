import mongoose, { Schema } from "mongoose";

 const categorySchema = new Schema({
  name:{
    type: String,
    required: [true, "Name is required"]
  },avilable:{
    type: Boolean,
    default: true
  },user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  }
   

   
});



export  const CategoryModel = mongoose.model("Category", categorySchema);