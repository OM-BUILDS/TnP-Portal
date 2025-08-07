import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.user);   //urlerror
  return (
    <div className="account_components">
      <h3>My Profile</h3>


      {/* url error fix */}
      {isAuthenticated ?  (
      <div>
        <label>Profile Picture</label>
        <img className="profileimage" src={`${import.meta.env.VITE_BACKEND_URL}/uploads/profilepics/${user.profilepic}`} alt="Profile" />  
      </div>
      ):(
        <label>Profile Picture</label>
      )}

      <div>
        <label>Full Name</label>
        <input
          type="text"
          disabled
          value={user && user.name || " "}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          disabled
          value={user && user.email || " "}
          onChange={(e) => e.target.value}
        />
      </div>
      {user && user.role === "Student" && (
        <div>
          <label>My Details - Home State, Category & Programme</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              disabled
              value={user && user.regionald || " "}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user.category || " "}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user.programme || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              disabled
              value={user && user.phone || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Resume Preview</label>
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/uploads/resumes/${user.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-resume"
            >
              View Resume
            </Link>
          </div>



          <div>
            <label>Permanent Address</label>
            <input
              type="text"
              disabled
              value={user && user.address || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Roll Number</label>
            <input
              type="text"
              disabled
              value={user && user.rollnumber || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Physically Handicapped</label>
            <input
              type="text"
              disabled
              value={user && user.pwdUser || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Gender</label>
            <input
              type="text"
              disabled
              value={user && user.gender || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="text"
              disabled
              value={user && user.dob || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Currently Pursuing</label>
            <input
              type="text"
              disabled
              value={user && user.pursue || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Minority Community</label>
            <input
              type="text"
              disabled
              value={user && user.mincmnty || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Department</label>
            <input
              type="text"
              disabled
              value={user && user.dept || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Year of Passing</label>
            <input
              type="number"
              disabled
              value={user && user.yop || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Matriculation Marks</label>
            <input
              type="number"
              disabled
              value={user && user.matcgpa || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Matriculation Year of Passing</label>
            <input
              type="number"
              disabled
              value={user && user.matyop || " "}
              onChange={(e) => e.target.value}
            />
          </div>

          <div>
            <label>Intermediate Marks</label>
            <input
              type="number"
              disabled
              value={user && user.intercgpa || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>Intermediate Year of Passing</label>
            <input
              type="number"
              disabled
              value={user && user.interyop || " "}
              onChange={(e) => e.target.value}
            />
          </div>
        </div>

      )}



      {/* Masters Academic Details Starts Here  */}
      {user && user.pursue === "Post Graduation" && user.role === "Student" && (
        <div>

          <div>
            <label>Graduation CGPA</label>
            <input
              type="number"
              disabled
              value={user && user.gradcgpa || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>Graduation Year of Passing</label>
            <input
              type="number"
              disabled
              value={user && user.gradyop || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>1st Semester - Masters </label>
            <input
              type="number"
              disabled
              value={user && user.pgsgpa1 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>2nd Semester - Masters</label>
            <input
              type="number"
              disabled
              value={user && user.pgsgpa2 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>3rd Semester - Masters</label>
            <input
              type="number"
              disabled
              value={user && user.pgsgpa3 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>4th Semester - Masters</label>
            <input
              type="number"
              disabled
              value={user && user.pgsgpa4 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>5th Semester - Masters</label>
            <input
              type="number"
              disabled
              value={user && user.pgsgpa5 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>6th Semester - Masters</label>
            <input
              type="number"
              disabled
              value={user && user.pgsgpa6 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>Current CGPA till Last Semester - Masters</label>
            <input
              type="number"
              disabled
              value={user && user.pgcgpa || " "}
              onChange={(e) => e.target.value}
            />
          </div>

        </div>
      )}


      {/* Bachelors Academic Details Starts Here  */}

      {user && user.pursue === "Graduation" && user.role === "Student" && (
        <div>
          <div>
            <label>1st Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa1 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>2nd Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa2 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>3rd Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa3 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>4th Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa4 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>5th Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa5 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>6th Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa6 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>7th Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa7 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>8th Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugsgpa8 || " "}
              onChange={(e) => e.target.value}
            />
          </div>
          <div>
            <label>Current CGPA till Last Semester - Bachelors</label>
            <input
              type="number"
              disabled
              value={user && user.ugcgpa || " "}
              onChange={(e) => e.target.value}
            />
          </div>
        </div>

      )}



      <div>
        <label>Role</label>
        <input
          type="text"
          disabled
          value={user && user.role || " "}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Joined On</label>
        <input
          type="text"
          disabled
          value={user && user.createdAt || " "}
          onChange={(e) => e.target.value}
        />
      </div>
    </div>
  );
};

export default MyProfile;
