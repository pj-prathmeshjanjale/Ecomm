const mongoose = require("mongoose");
const connectDB = () => {
    try {
       mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(("mongodb connected"));
       })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;