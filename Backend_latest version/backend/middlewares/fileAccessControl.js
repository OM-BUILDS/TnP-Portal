import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import { catchAsyncErrors } from './catchAsyncErrors.js';
import ErrorHandler from './error.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorHandler("User not found.", 404));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token.", 401));
  }
});

export const serveFile = (fileType) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    const fileName = req.params.fileName;

    if (!fileName || !fileType) {
      return next(new ErrorHandler("Invalid file parameters.", 400));
    }

    
    const filePath = path.join(__dirname, '..', 'uploads', fileType, fileName);

    
    if (!fs.existsSync(filePath)) {
      return next(new ErrorHandler("File not found.", 404));
    }

    
    if (role === 'Student') {
      if (fileType === 'profilepics') {
        if (req.user.profilepic !== fileName) {
          return next(new ErrorHandler("Unauthorized access.", 403));
        }
      } else if (fileType === 'resumes') {
        if (req.user.resume !== fileName) {
          return next(new ErrorHandler("Unauthorized access.", 403));
        }
      } else {
        return next(new ErrorHandler("Invalid file type.", 400));
      }
    }

    
    res.sendFile(filePath, (err) => {
      if (err) {
        return next(err);
      }
    });
  });
};
