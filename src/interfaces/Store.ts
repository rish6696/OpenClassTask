import { Document } from 'mongoose'
interface StoreModelInterface extends Document {
    firstName: string;
    lastName : string;
    email: string;
    businessName :string;
    password : string;
    phone :string;
}

export default StoreModelInterface
