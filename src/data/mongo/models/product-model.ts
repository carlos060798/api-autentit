import mongoose, { Schema } from "mongoose";

 const productSchema = new Schema({
  name:{
    type: String,
    required: [true, "Name is required"]
  },avilable:{
    type: Boolean,
    default: true
  },price:{
    type: Number,
    default: 0
  },description:{
    type: String,
   
  },
  
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
   

   
});

// para seleriar los campos que se van a mostrar

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export  const ProductModel = mongoose.model("Product", productSchema);