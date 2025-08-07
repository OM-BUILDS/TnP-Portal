import express from 'express';
import { isAuthenticated, serveFile } from '../middlewares/fileAccessControl.js'; 

const router = express.Router();


router.get('/profilepics/:fileName', isAuthenticated, serveFile('profilepics'));


router.get('/resumes/:fileName', isAuthenticated, serveFile('resumes'));

export default router;
