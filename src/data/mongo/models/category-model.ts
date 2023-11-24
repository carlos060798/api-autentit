import mongoose, { Schema } from "mongoose";

 const categorySchema = new Schema({
  name:{
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  available :{
    type: Boolean,
    default: true
  },
  userid:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
   

   
});



export  const CategoryModel = mongoose.model("Category", categorySchema);