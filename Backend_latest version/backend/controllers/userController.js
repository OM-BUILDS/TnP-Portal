import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { PlacedStudent } from "../models/placedStudentSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import { allowedUsers } from "../models/allowedusersSchema.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const uploadsDir = path.join(__dirname, '..', 'uploads');
const profilePicDir = path.join(uploadsDir, 'profilepics');
const resumeDir = path.join(uploadsDir, 'resumes');


if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(profilePicDir)) {
  fs.mkdirSync(profilePicDir, { recursive: true });
}
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

console.log(`Uploads directory is: ${uploadsDir}`); 
console.log(`Profile picture directory is: ${profilePicDir}`); 
console.log(`Resume directory is: ${resumeDir}`); 

export const getStudentDetails = catchAsyncErrors(async (req, res, next) => {
  const { rollNumber } = req.params;
  try {
    const student = await User.findOne({ rollnumber: rollNumber });
    if (!student) {
      return next(new ErrorHandler("Student not found.", 404));
    }
    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    next(new ErrorHandler("Server error while fetching student details.", 500));
  }
});


export const updateUserStatus1 = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { locked } = req.body;
  
  
  
  try {
    const user = await User.findOne({rollnumber:id});
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
    

    user.locked = locked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${locked ? 'locked' : 'unlocked'} successfully.`,
      user,
    });
  } catch (error) {
    next(new ErrorHandler("Server error while updating user status.", 500));
  }
});


export const saveToPlacedStudents = catchAsyncErrors(async (req, res, next) => {
  const { name, rollnumber, dept, programme, company, placementType, salary, socialcategory,position, yop } = req.body;

  if (!company || !placementType) {
    return next(new ErrorHandler("Company and Placement Type are required fields.", 400));
  }

  try {
    const placedStudent = await PlacedStudent.create({
      name,
      rollnumber,
      dept,
      programme,
      yop,
      placementType,
      company,
      position,
      salary,
      placedOn: new Date(),
      socialcategory,
    });

    res.status(201).json({
      success: true,
      message: "Student saved to placed students collection.",
      placedStudent,
    });
  } catch (error) {
    console.error("Error creating placed student:", error);  
    next(new ErrorHandler("Server error while saving student to placedstudents collection.", 500));
  }
});



export const register = catchAsyncErrors(async (req, res, next) => {
  const { rollnumber, role, email } = req.body;
  let auser = 0;

  try {
    if (role === "Admin") {
      auser = await allowedUsers.findOne({ rollnumber: email });
    } else {
      auser = await allowedUsers.findOne({ rollnumber });
    }

    if (auser) {
      const {
        profilepic,
        name,
        phone,
        address,
        password,
        regionald,
        category,
        programme,
        pwdUser,
        gender,
        dob,
        dept,
        yop,
        matcgpa,
        intercgpa,
        gradcgpa,
        ugcgpa
      } = req.body;

      if (!name || !email || !phone || !address || !password || !role) {
        return next(new ErrorHandler("All fields are required.", 400));
      }
      if (role === "Student" && (!regionald || !category || !programme)) {
        return next(new ErrorHandler("Please provide your user details.", 400));
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler("Email is already registered.", 400));
      }
      const existingRollnumber = await User.findOne({ rollnumber });
      if (existingRollnumber && role === "Student") {
        return next(new ErrorHandler("Roll Number is already registered.", 400));
      }

      const userData = {
        name,
        email,
        phone,
        address,
        password,
        role,
        regionald,
        category,
        programme,
        rollnumber,
        pwdUser,
        gender,
        dob,
        dept,
        yop,
        matcgpa,
        intercgpa,
        gradcgpa,
        ugcgpa
      };

      
      if (req.files) {
        if (req.files.resume) {
          const resume = req.files.resume;
          const resumeName = `resume_${Date.now()}_${resume.name}`;
          const resumePath = path.join(resumeDir, resumeName);
          await resume.mv(resumePath);
          userData.resume = resumeName; 
        }

        if (req.files.profilepic) {
          const profilePic = req.files.profilepic;
          const profilePicName = `profilepic_${Date.now()}_${profilePic.name}`;
          const profilePicPath = path.join(profilePicDir, profilePicName);
          await profilePic.mv(profilePicPath);
          userData.profilepic = profilePicName; 
        }
      }

      const user = await User.create(userData);
      sendToken(user, 201, res, "User Registered Successfully!");
    } else {
      return next(new ErrorHandler("User Not Authorized For Registration.", 400));
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});


export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const { department, yop, programme, searchKeyword } = req.query;
  const query = { role: "Student" };

  if (department) {
    query.dept = department;
  }
  if (yop) {
    query.yop = yop;
  }
  if (programme) {
    query.programme = programme;
  }
  if (searchKeyword) {
    query.$or = [
      { name: { $regex: searchKeyword, $options: "i" } },
      { rollnumber: { $regex: searchKeyword, $options: "i" } },
      { email: { $regex: searchKeyword, $options: "i" } },
    ];
  }

  const users = await User.find(query);
  res.status(200).json({
    success: true,
    users,
    count: users.length,
  });
});

export const getAllPlaced = catchAsyncErrors(async (req, res, next) => {
  const { department, yop, programme, searchKeyword } = req.query;
  const query = { };

  if (department) {
    query.dept = department;
  }
  if (yop) {
    query.yop = yop;
  }
  if (programme) {
    query.programme = programme;
  }
  if (searchKeyword) {
    query.$or = [
      { name: { $regex: searchKeyword, $options: "i" } },
      { rollnumber: { $regex: searchKeyword, $options: "i" } },
      { email: { $regex: searchKeyword, $options: "i" } },
    ];
  }

  const users = await PlacedStudent.find(query);
  
  res.status(200).json({
    success: true,
    users,
    count: users.length,
  });
});


export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user not found' });
    }

    if (user.userverified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    user.userverified = true;
    await user.save();

    res.status(200).json({ message: 'User verified successfully, you can now log in' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = catchAsyncErrors(async (req, res, next) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return next(new ErrorHandler("Email, password and role are required.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  if (!user.userverified && user.role === "Student") {
    return next(new ErrorHandler("Please verify your account, Check Your GSuite ID!", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }

  sendToken(user, 200, res, "User logged in successfully.");
});

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const cooldownPeriod = 0.5 * 60 * 60 * 1000; 

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const currentTime = new Date();
    if (user.lastPasswordReset) {
      const timeDifference = currentTime - new Date(user.lastPasswordReset);
      if (timeDifference < cooldownPeriod) {
        const remainingTime = cooldownPeriod - timeDifference;
        return res.status(400).json({
          message: `You must wait ${Math.ceil(remainingTime / (1000 * 60))} minutes before requesting a password reset again.`,
        });
      }
    }

    
    const newPassword = Math.random().toString(36).slice(-8); 

    
    user.password = newPassword;

    
    user.lastPasswordReset = currentTime;

    
    await user.save();

    
    const message = `
      <p>Your password has been reset. Please use the following temporary password to log in:</p>
      <p><strong>${newPassword}</strong></p>
      <p>We recommend you change your password after logging in.</p>
    `;
    await sendEmail({
      email: user.email,
      subject: "Password Reset - Temporary Password",
      message,
    });

    res.status(200).json({ message: "Temporary password sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});


export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});


export const updateUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.placed = req.body.placed;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User status updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserStatusLock = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.locked = req.body.locked;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User status updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserLockStatus = async (req, res, next) => {
  
  try {
    const user = await User.findOne({rollnumber:req.params.id});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      success: true,
      locked: user.locked, 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    regionald: req.body.regionald,
    category: req.body.category,
    programme: req.body.programme,
    rollnumber: req.body.rollnumber,
    pwdUser: req.body.pwdUser,
    gender: req.body.gender,
    dob: req.body.dob,
    dept: req.body.dept,
    yop: req.body.yop,
    matcgpa: req.body.matcgpa,
    intercgpa: req.body.intercgpa,
    gradcgpa: req.body.gradcgpa,
    ugcgpa: req.body.ugcgpa,
  };

  const { regionald, category, programme } = newUserData;

  if (req.user.role === "Student" && (!regionald || !category || !programme)) {
    return next(new ErrorHandler("Please provide all required user details.", 400));
  }

  
  if (req.files) {
    if (req.files.resume) {
      if (req.user.resume) {
        const oldResumePath = path.join(resumeDir, req.user.resume);
        if (fs.existsSync(oldResumePath)) {
          fs.unlinkSync(oldResumePath);
        }
      }
      const resume = req.files.resume;
      const resumeName = `resume_${Date.now()}_${resume.name}`;
      const resumePath = path.join(resumeDir, resumeName);
      await resume.mv(resumePath);
      newUserData.resume = resumeName;
    }

    if (req.files.profilepic) {
      if (req.user.profilepic) {
        const oldProfilePicPath = path.join(profilePicDir, req.user.profilepic);
        if (fs.existsSync(oldProfilePicPath)) {
          fs.unlinkSync(oldProfilePicPath);
        }
      }
      const profilePic = req.files.profilepic;
      const profilePicName = `profilepic_${Date.now()}_${profilePic.name}`;
      const profilePicPath = path.join(profilePicDir, profilePicName);
      await profilePic.mv(profilePicPath);
      newUserData.profilepic = profilePicName;
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
    message: "Profile updated.",
  });
});


export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("New password & confirm password do not match.", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully.");
});
