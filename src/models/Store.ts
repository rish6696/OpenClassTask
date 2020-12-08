import mongoose, { Schema } from "mongoose";

const StoreSchema: Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName : {type:String,required:true },
  email: { type: String, required: true,unique:true },
  businessName :{type:String,required:true},
  password :{type:String,required:true},
  phone :{type:String,required:false },
},{timestamps:true});

export default StoreSchema;
