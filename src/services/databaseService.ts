import Mongoose from "mongoose";

import { dbUrl } from "../config";

export const dbConnect = () => {
  return Mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
};
