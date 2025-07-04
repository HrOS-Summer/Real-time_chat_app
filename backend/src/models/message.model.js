import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receivedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,        
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
}, {timestamp: true})

const message = mongoose.model("Message", messageSchema);

export default message;