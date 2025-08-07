import mongoose from "mongoose";

const allowedusersSchema = new mongoose.Schema({
     
      rollnumber: {
        type: String,
        required: false,
      }
  });

export const allowedUsers = mongoose.model("allowedUsers", allowedusersSchema);  