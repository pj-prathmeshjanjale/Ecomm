const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    signature:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","success","failed"],
        required:true
    }
},{timestamps:true});

const Payment = mongoose.model("Payment",paymentSchema)
module.exports = Payment;