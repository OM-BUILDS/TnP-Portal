import mongoose from "mongoose";
const placedStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollnumber: { type: String, required: true },
  dept: { type: String, required: true },
  programme: { type: String, required: true },
  company: { type: String, required: false},  
  placementType: { type: String, required: false}, 
  salary: { type: String, required: false },
  placedOn: { type: Date, default: Date.now },
  socialcategory: {type: String, required:false},
  locked: {
    type: Boolean,
    default: false,
  },
  position: {type:String, required:false},
  yop:{type:Number, required:false},
});

export const PlacedStudent = mongoose.model('PlacedStudent', placedStudentSchema);
