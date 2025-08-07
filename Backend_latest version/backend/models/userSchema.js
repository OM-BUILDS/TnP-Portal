import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
  profilepic: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must cotain at least 3 characters."],
    maxLength: [30, "Name cannot exceed 30 characters."],
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (value) {
          
          return validator.isEmail(value) && value.endsWith('@gmail.com');
        },
        message: 'Please provide a valid email with @gmail.com extension.',
      },
    ],
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        
        return value.toString().length === 10;
      },
      message: 'Phone number must be exactly 10 digits long.',
    },
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



  password: {
    type: String,
    required: true,
    minLength: [8, "Password must cantain at least 8 chatacters."],
    maxLength: [64, "Password cannot exceed 32 characters."],
    select: false
  },
  resume: {
    type: String,
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
  registerLettersSent: {
    type: Boolean,
    default: false,
  },

  
  userverified: {
    type: Boolean,
    default: false,
  },
  verificationSent: {
    type: Boolean,
    default: false,
  },
  placed: {
    type: Boolean,
    default: false,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastPasswordReset: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
