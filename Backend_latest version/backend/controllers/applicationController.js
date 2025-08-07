import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');
const resumeDir = path.join(uploadsDir, 'resumes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    address,

    regionald,
    category,
    programme,

    
    rollnumber,
    pwdUser,
    gender,
    dob,
    pursue,           


    mincmnty,         
    dept,             
    yop,

    pan,
    aadhaar,


    matcgpa,          
    matyop,           
    intercgpa,        
    interyop,         

    



    
    gradcgpa,
    gradyop,
    pgsgpa1,
    pgsgpa2,
    pgsgpa3,
    pgsgpa4,
    pgsgpa5,
    pgsgpa6,
    pgcgpa,

    
    ugsgpa1,
    ugsgpa2,
    ugsgpa3,
    ugsgpa4,
    ugsgpa5,
    ugsgpa6,
    ugsgpa7,
    ugsgpa8,
    ugcgpa,


    
    anyback,
    numback,

  } = req.body;
  if (!name || !email || !phone || !address) {
    return next(new ErrorHandler("All fields are required.", 400));
  }
  const jobSeekerInfo = {
    id: req.user._id,
    name,
    email,
    phone,
    address,

    regionald,
    category,
    programme,

    
    rollnumber,
    pwdUser,
    gender,
    dob,
    pursue,           


    mincmnty,         
    dept,             
    yop,

    
    pan,
    aadhaar,



    matcgpa,          
    matyop,           
    intercgpa,        
    interyop,         

    



    
    gradcgpa,
    gradyop,
    pgsgpa1,
    pgsgpa2,
    pgsgpa3,
    pgsgpa4,
    pgsgpa5,
    pgsgpa6,
    pgcgpa,

    
    ugsgpa1,
    ugsgpa2,
    ugsgpa3,
    ugsgpa4,
    ugsgpa5,
    ugsgpa6,
    ugsgpa7,
    ugsgpa8,
    ugcgpa,

    anyback,
    numback,

    role: "Student",
  };
  const jobDetails = await Job.findById(id);
  if (!jobDetails) {
    return next(new ErrorHandler("Opportunity not found.", 404));
  }

  const studentDepartment = jobSeekerInfo.programme; 
  const studentPlaced = req.user.placed; 

  
  if (!jobDetails.location.includes(studentDepartment)) {
    return next(new ErrorHandler("You are not eligible to apply for this opportunity.", 400));
  }

  if (studentPlaced) {
    return next(new ErrorHandler("Already Placed! You are not allowed to apply. ", 400));
  }


  const isAlreadyApplied = await Application.findOne({
    "jobInfo.jobId": id,
    "jobSeekerInfo.id": req.user._id,
  });
  if (isAlreadyApplied) {
    return next(
      new ErrorHandler("You have already applied for this opportunity.", 400)
    );
  }

  
  if (req.files) {
    if (req.files.resume) {
      const resume = req.files.resume;
      const resumeName = `resume_${Date.now()}_${resume.name}`;
      const resumePath = path.join(resumeDir, resumeName);


      await resume.mv(resumePath);
      jobSeekerInfo.resume = resumeName; 
    }
  }

  const employerInfo = {
    id: jobDetails.postedBy,
    role: "Admin",
  };
  const jobInfo = {
    jobId: id,
    jobTitle: jobDetails.title,
    jobCompany: jobDetails.companyName,
  };
  const application = await Application.create({
    jobSeekerInfo,
    employerInfo,
    jobInfo,
  });
  res.status(201).json({
    success: true,
    message: "Application submitted.",
    application,
  });
});

export const employerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "employerInfo.id": _id,
      "deletedBy.employer": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "jobSeekerInfo.id": _id,
      "deletedBy.jobSeeker": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }
  const { role } = req.user;
  switch (role) {
    case "Student":
      application.deletedBy.jobSeeker = true;
      await application.save();
      break;
    case "Admin":
      application.deletedBy.employer = true;
      await application.save();
      break;

    default:
      console.log("Default case for application delete function.");
      break;
  }

  if (
    application.deletedBy.employer === true ||
    application.deletedBy.jobSeeker === true
  ) {
    await application.deleteOne();
  }
  res.status(200).json({
    success: true,
    message: "Application Deleted.",
  });
});
