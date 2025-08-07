import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from 'jsonwebtoken';

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron Automation");
    const jobs = await Job.find({ newsLettersSent: false });

    for (const job of jobs) {
      try {
        const { yop: jobYops, location } = job; 
        const jobYopsAsInts = jobYops.map(yop => parseInt(yop, 10));
        const allFilteredUsers = await User.find({
          role: "Student",
          yop: { $in: jobYopsAsInts },
          programme: { $in: location }
        });
        const emailPromises = allFilteredUsers.map(async user => {
          const subject = `Check This New Opportunity: Apply Now to ${job.title} of type ${job.jobType}`;
          const message = generateJobEmailMessage(user, job); // Function to generate the email content

          try {
            await sendEmail({
              email: user.email,
              subject,
              message,
            });

            console.log(`Email sent to ${user.email}`);
            user.newsLetterSent = true;
            await user.save(); 
          } catch (error) {
            console.error(`Failed to send email to ${user.email}:`, error);
          }
        });
        await Promise.all(emailPromises);
        console.log(`Sent emails for job: ${job.title}`);

        job.newsLettersSent = true;
        await job.save();
      } catch (error) {
        console.error("ERROR IN NODE CRON CATCH BLOCK", error);
      }
    }
    const newusers = await User.find({ registerLettersSent: false });

    for (const reguser of newusers) {
      try {
        const subject = `Your Registration Successful! Welcome ${reguser.name} to Training and Placement Cell Portal`;
        const message = generateRegistrationEmailMessage(reguser);

        await sendEmail({
          email: reguser.email,
          subject,
          message,
        });

        reguser.registerLettersSent = true;
        await reguser.save();
      } catch (error) {
        console.log("Error sending registration email to", reguser.email, error);
      }
    }

    const unverified = await User.find({ verificationSent: false });
    for (const unuser of unverified) {
      try {
        const token = jwt.sign({ id: unuser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

        const subject = `Account Verification for Training and Placement Cell`;
        const message = generateVerificationEmailMessage(unuser, verifyUrl);

        await sendEmail({
          email: `${unuser.rollnumber}@tezu.ac.in`,
          subject,
          message,
        });

        unuser.verificationSent = true;
        await unuser.save();
      } catch (error) {
        console.log("Error sending verification email to", unuser.email, error);
      }
    }
  });
};

function generateJobEmailMessage(user, job) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          margin-top: 20px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Greetings from Training and Placement Cell, SoE, TU</h2>
        </div>
        <div class="content">
          <p>Hello ${user.name},</p>
          <p>A new opportunity has been posted to the portal:</p>
          <ul>
            <li><strong>Opportunity Title:</strong> ${job.title}</li>
            <li><strong>Type:</strong> ${job.jobType}</li>
            <li><strong>Organization Name:</strong> ${job.companyName}</li>
            <li><strong>Programme:</strong> ${job.location}</li>
            <li><strong>Required Qualifications:</strong> ${job.qualifications}</li>
          </ul>
          <p>Hurry up and apply to the Portal if you are eligible.</p>
          <p>Please contact the Training and Placement Cell for more details.</p>
        </div>
        <div class="footer">
          <p>Best Regards,</p>
          <p>Training and Placement Cell, School of Engineering, Tezpur University</p>
          <p>Napaam, Tezpur, Assam 784028</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateRegistrationEmailMessage(user) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          margin-top: 20px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Greetings for Successful Registration on Training and Placement Cell Portal</h2>
        </div>
        <div class="content">
          <p>Hello ${user.name},</p>
          <p>Your registration to the portal is successful, and here are your basic details:</p>
          <ul>
            <li><strong>Name:</strong> ${user.name}</li>
            <li><strong>Roll Number:</strong> ${user.rollnumber}</li>
            <li><strong>Your Email:</strong> ${user.email}</li>
            <li><strong>Programme of Study:</strong> ${user.programme}</li>
            <li><strong>Contact No.:</strong> ${user.phone}</li>
          </ul>
          <p>We hope that all the details provided by you are valid and correct. In case of any mistake, please update your profile by entering correct details.</p>
          <p>Please contact the Training and Placement Cell, SoE, TU for any issue.</p>
        </div>
        <div class="footer">
          <p>Best Regards,</p>
          <p>Training and Placement Cell, School of Engineering, Tezpur University</p>
          <p>Napaam, Tezpur, Assam 784028</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateVerificationEmailMessage(user, verifyUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          margin-top: 20px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Account Verification for Training and Placement Cell</h2>
        </div>
        <div class="content">
          <p>Hello ${user.name},</p>
          <p>Thank you for registering with us. Please verify your email by clicking the link below:</p>
          <p><a href="${verifyUrl}" style="color: #4CAF50; text-decoration: none;">Verify Email</a></p>
          <p>If you did not create an account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>Best Regards,</p>
          <p>Training and Placement Cell, School of Engineering, Tezpur University</p>
          <p>Napaam, Tezpur, Assam 784028</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
