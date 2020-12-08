import { Document,Types } from 'mongoose'

interface ClassModelInterface extends Document {
    title : string,
    startTime :Date,
    endTime : Date,
    price: Date,
    storeId : Types.ObjectId
}

export default ClassModelInterface
