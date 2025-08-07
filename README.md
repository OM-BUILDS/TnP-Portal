# T&P Cell Job Portal - Tezpur University (SoE)

![Tezpur University School of Engineering](https://en.wikipedia.org/wiki/Tezpur_University#/media/File:Tezpur_University_logo.png)

A comprehensive, full-stack web application designed to serve as an integrated **Job Portal** and **Centralized Student Database** for the Training and Placement (T&P) Cell of the School of Engineering, Tezpur University. This platform streamlines the entire placement lifecycle, from student registration and data management to job posting and application tracking.

---

## ✨ Key Features

The application is built with a clear distinction between two primary user roles: **Admin (T&P Cell)** and **Student**.

### 👨‍💼 Admin Features (T&P Cell)
-   **📊 Centralized Dashboard:** A powerful interface to manage all placement activities.
-   **🎓 Student Database Management:** View, search, and filter the complete database of registered students. Admins can filter by department, program, year of passing, and keywords.
-   **✅ Student Status Control:** Mark students as "Placed" or "Locked" to manage their eligibility for future applications.
-   **📝 Job Posting & Lifecycle Management:** Create, manage, and archive job postings, internships, workshops, and other opportunities.
-   **📄 Application Tracking:** View and manage all student applications for each job posting.
-   **📧 Automated Email Notifications:** A cron job automatically sends newsletters to eligible students about new job opportunities.
-   **📥 Data Export:** Export filtered lists of students and applicants to Excel (`.xlsx`) for reporting and analysis.
-   **🔐 Secure Registration:** Admins can pre-authorize students for registration by adding their roll numbers to an "allowed list."

### 👩‍🎓 Student Features
-   **👤 Profile Management:** Students can register (if authorized) and maintain a detailed profile with personal, academic (from 10th grade to current semester SGPA), and contact information.
-   **🔍 Opportunity Discovery:** Search and filter active job opportunities based on their academic program and other criteria.
-   **🚀 Streamlined Application:** Apply for jobs with a single click, using their pre-filled profile data.
-   **📄 Application Dashboard:** View the status and history of all their submitted applications.
-   **🔒 Secure & Private:** Role-based access ensures that student data is only visible to authorized administrators.

---

## 🛠️ Tech Stack & Architecture

This project is built on the **MERN stack**, ensuring a robust, scalable, and modern application.

-   **Frontend:** **React.js**, **Redux Toolkit** (for state management), **React Router**
-   **Backend:** **Node.js**, **Express.js**
-   **Database:** **MongoDB** (with Mongoose for object data modeling)
-   **Authentication:** **JSON Web Tokens (JWT)** & `bcrypt` for password hashing.
-   **Automation:** `node-cron` for scheduled tasks (email newsletters).
-   **File Handling:** `express-fileupload` for resume and profile picture uploads.



---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v14 or later)
-   npm (Node Package Manager)
-   MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/tnp-cell-portal.git](https://github.com/your-username/tnp-cell-portal.git)
    cd tnp-cell-portal
    ```

2.  **Backend Setup:**
    ```sh
    # Navigate to the root directory
    npm install
    ```
    - Create a `.env` file in the root directory and add the following environment variables. Replace the placeholder values with your actual configuration.
      ```env
      PORT=4000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET_KEY=your_jwt_secret
      JWT_EXPIRE=7d
      FRONTEND_URL=http://localhost:5173
      BACKEND_URL=http://localhost:4000

      # Email Configuration for Nodemailer
      MAIL_HOST=your_smtp_host
      MAIL_USER=your_smtp_email
      MAIL_PASS=your_smtp_password
      ```

3.  **Frontend Setup:**
    ```sh
    # Navigate to the frontend directory (assuming it's named 'client' or 'frontend')
    cd frontend
    npm install
    ```
    - The frontend will connect to the backend using the proxy setting in `vite.config.js` or by referencing `VITE_BACKEND_URL` from its own `.env` file.

4.  **Run the Application:**
    -   **Start the backend server** (from the root directory):
        ```sh
        npm start
        ```
    -   **Start the frontend development server** (from the `frontend` directory):
        ```sh
        npm run dev
        ```

The application should now be running on `http://localhost:5173`.

---

## 📂 Project Structure


tnp-cell-portal/
├── automation/
│   └── newsLetterCron.js     # Cron job for email automation
├── controllers/              # API logic
│   ├── applicationController.js
│   ├── jobController.js
│   └── userController.js
├── middlewares/              # Express middlewares
│   ├── auth.js
│   └── error.js
├── models/                   # Mongoose schemas
│   ├── applicationSchema.js
│   ├── jobSchema.js
│   └── userSchema.js
├── routes/                   # API routes
│   ├── applicationRouter.js
│   ├── jobRouter.js
│   └── userRouter.js
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/            # Redux Toolkit slices
│   │   └── App.jsx
│   └── package.json
├── .gitignore
├── app.js                    # Express app configuration
├── package.json
└── README.md


---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
