import  StoreSchema  from "./Store";
import Mongoose from "mongoose";
import StoreInterface  from "../interfaces/Store";
import ClassModelInterface from '../interfaces/class'
import ClassSchema from "./Class";

export const StoreModel = Mongoose.model<StoreInterface>("stores", StoreSchema);
export const ClassModel =Mongoose.model<ClassModelInterface>("classes",ClassSchema);
