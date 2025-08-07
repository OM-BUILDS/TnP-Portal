import mongoose from "mongoose";
import validator from "validator";
const applicationSchema = new mongoose.Schema({
  jobSeekerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    regionald: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    programme: {
      type: String,
      required: false,
    },

    rollnumber: {
      type: String,
      required: false,
    },
    pwdUser: {
      type: String,
      required: false,
      enum: ["Yes", "No"],
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female","Other"],
    },
    dob: {
      type: Date,
      required: false,
    },

    
    pursue: {
      type: String,
      required: false,
      enum: ["Post Graduation", "Graduation"],
    },

    mincmnty: {
      type: String,
      required: false,
      enum: ["Yes", "No"],
    },

    dept: {
      type: String,
      required: false,
    },
    yop: {
      type: Number,
      required: false,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid year!`
      }
    },

    
    pan: {
      type: String,
      required: true,
      
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    },

    aadhaar: {
      type: String,
      required: true,
      
      match: /^\d{12}$/,
    },



    matcgpa: {
      type: Number,
      required: false,
    },
    matyop: {
      type: Number,
      required: false,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid year!`
      }
    },
    intercgpa: {
      type: Number,
      required: false,
    },
    interyop: {
      type: Number,
      required: false,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid year!`
      }
    },



    
    gradcgpa: {
      type: Number,
      required: false,
    },
    gradyop: {
      type: Number,
      required: false,
    },
    pgsgpa1: {
      type: Number,
      required: false,
    },
    pgsgpa2: {
      type: Number,
      required: false,
    },
    pgsgpa3: {
      type: Number,
      required: false,
    },
    pgsgpa4: {
      type: Number,
      required: false,
    },
    pgsgpa5: {
      type: Number,
      required: false,
    },
    pgsgpa6: {
      type: Number,
      required: false,
    },
    pgcgpa: {
      type: Number,
      required: false,
    },


    
    ugsgpa1: {
      type: Number,
      required: false,
    },
    ugsgpa2: {
      type: Number,
      required: false,
    },
    ugsgpa3: {
      type: Number,
      required: false,
    },
    ugsgpa4: {
      type: Number,
      required: false,
    },
    ugsgpa5: {
      type: Number,
      required: false,
    },
    ugsgpa6: {
      type: Number,
      required: false,
    },
    ugsgpa7: {
      type: Number,
      required: false,
    },
    ugsgpa8: {
      type: Number,
      required: false,
    },
    ugcgpa: {
      type: Number,
      required: false,
    },

    
    anyback: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    numback: {
      type: Number,
      required: false,
      min: 0,
      max: 50,
    },


    resume: {
      type: String,
    },

    role: {
      type: String,
      enum: ["Student"],
      required: true,
    },
  },
  employerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin"],
      required: true,
    },
  },
  jobInfo: {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobCompany:{
      type:String,
      required: true,
    },
  },
  deletedBy: {
    jobSeeker: {
      type: Boolean,
      default: false,
    },
    employer: {
      type: Boolean,
      default: false,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
