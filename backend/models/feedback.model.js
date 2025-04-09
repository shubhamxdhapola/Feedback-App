import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},
    {timestamps : true}
)

const Feedback = mongoose.model('Feedback', feedbackSchema)
export default Feedback
