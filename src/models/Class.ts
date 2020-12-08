import mongoose, { Schema } from "mongoose";

const ClassSchema: Schema = new mongoose.Schema({
  title : { type: String, required: true },
  startTime : {type:Date,required:true },
  endTime : {type:Date,required:true },
  price: { type: Number, required: true },
  storeId :{type:mongoose.Types.ObjectId ,ref:'stores'}
},{timestamps:true});


export default ClassSchema;


