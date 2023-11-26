import mongoose, { Schema } from "mongoose";

 const UserSchema = new Schema({
  name:{
    type: String,
    required: [true, "Name is required"]
  },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    emailValided:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    img:{
        type: String,
      
    },
    role:{
        type: String,
        required: [true, "Role is required"],
        default: "USER_ROLE",
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },

   
});

// para seleriar los campos que se van a mostrar

UserSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
    },
  });


export  const UserModel = mongoose.model("User", UserSchema);