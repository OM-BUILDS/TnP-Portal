import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [profilePicPreviewUrl, setProfilePicPreviewUrl] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(user && user.resume?.url);

  const [name, setName] = useState(user && user.name);

  
  const [profilepic, setProfilepic] = useState(null);

  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  
  const [regionald, setRegionald] = useState(user && user.regionald);
  const [category, setCategory] = useState(
    user && user.category
  );

  const formattedDob = user && user.dob ? new Date(user.dob).toISOString().split('T')[0] : "";  

  const [programme, setProgramme] = useState(user && user.programme);
  const [resume, setResume] = useState(null);

  const [rollnumber, setRollNumber] = useState(user && user.rollnumber);
  const [pwdUser, setpwdUser] = useState(user && user.pwdUser);
  const [gender, setGender] = useState(user && user.gender);
  
  const [dob, setDob] = useState(formattedDob);
  const [pursue, setPursue] = useState(user && user.pursue);

  const [mincmnty, setMincmnty] = useState(user && user.mincmnty);
  const [dept, setDept] = useState(user && user.dept);
  const [yop, setYop] = useState(user && user.yop);
  const [matcgpa, setMatcgpa] = useState(user && user.matcgpa);
  const [matyop, setMatyop] = useState(user && user.matyop);
  const [intercgpa, setIntercgpa] = useState(user && user.intercgpa || "");
  const [interyop, setInteryop] = useState(user && user.interyop || "");

  const [gradcgpa, setGradcgpa] = useState(user && user.gradcgpa || "");
  const [gradyop, setGradyop] = useState(user && user.gradyop || "");
  const [pgsgpa1, setPgsgpa1] = useState(user && user.pgsgpa1 || "");
  const [pgsgpa2, setPgsgpa2] = useState(user && user.pgsgpa2 || "");
  const [pgsgpa3, setPgsgpa3] = useState(user && user.pgsgpa3 || "");
  const [pgsgpa4, setPgsgpa4] = useState(user && user.pgsgpa4 || "");
  const [pgsgpa5, setPgsgpa5] = useState(user && user.pgsgpa5 || "");
  const [pgsgpa6, setPgsgpa6] = useState(user && user.pgsgpa6 || "");
  const [pgcgpa, setPgcgpa] = useState(user && user.pgcgpa || "");

  const [ugsgpa1, setUgsgpa1] = useState(user && user.ugsgpa1 || "");
  const [ugsgpa2, setUgsgpa2] = useState(user && user.ugsgpa2 || "");
  const [ugsgpa3, setUgsgpa3] = useState(user && user.ugsgpa3 || "");
  const [ugsgpa4, setUgsgpa4] = useState(user && user.ugsgpa4 || "");
  const [ugsgpa5, setUgsgpa5] = useState(user && user.ugsgpa5 || "");
  const [ugsgpa6, setUgsgpa6] = useState(user && user.ugsgpa6 || "");
  const [ugsgpa7, setUgsgpa7] = useState(user && user.ugsgpa7 || "");
  const [ugsgpa8, setUgsgpa8] = useState(user && user.ugsgpa8 || "");
  const [ugcgpa, setUgcgpa] = useState(user && user.ugcgpa || "");



  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === "Student") {
      formData.append("regionald", regionald);
      formData.append("category", category);
      formData.append("programme", programme);
      

      formData.append("rollnumber", rollnumber);
      formData.append("pwdUser", pwdUser);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("pursue", pursue);

      formData.append("mincmnty", mincmnty);
      formData.append("dept", dept);
      formData.append("yop", yop);
      formData.append("matcgpa", matcgpa);
      formData.append("matyop", matyop);
      formData.append("intercgpa", intercgpa);
      formData.append("interyop", interyop);
    }

    if (user && user.role === "Student" && user.pursue === "Post Graduation") {




      formData.append("gradcgpa", gradcgpa);
      formData.append("gradyop", gradyop);
      formData.append("pgsgpa1", pgsgpa1);
      formData.append("pgsgpa2", pgsgpa2);
      formData.append("pgsgpa3", pgsgpa3);
      formData.append("pgsgpa4", pgsgpa4);
      formData.append("pgsgpa5", pgsgpa5);
      formData.append("pgsgpa6", pgsgpa6);
      formData.append("pgcgpa", pgcgpa);
    }
    if (user && user.role === "Student" && user.pursue === "Graduation") {


      formData.append("ugsgpa1", ugsgpa1);
      formData.append("ugsgpa2", ugsgpa2);
      formData.append("ugsgpa3", ugsgpa3);
      formData.append("ugsgpa4", ugsgpa4);
      formData.append("ugsgpa5", ugsgpa5);
      formData.append("ugsgpa6", ugsgpa6);
      formData.append("ugsgpa7", ugsgpa7);
      formData.append("ugsgpa8", ugsgpa8);
      formData.append("ugcgpa", ugcgpa);
    }

    if (resume) {
      formData.append("resume", resume);
    }
    if (profilepic) {
      formData.append("profilepic", profilepic);
    }

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated. \n Go to Update Profile to Update Academic Details.");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setResumePreviewUrl(reader.result);
      setResume(file);
    };
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicPreviewUrl(reader.result); 
      setProfilepic(file); 

    };
  };
  const regionalArray = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];
  const categoryArray = [
    "Scheduled Castes (SC)", "Scheduled Tribes (ST)", "Other Backward Classes (OBC)",
    "Economically Weaker Sections (EWS)", "General",
    "Persons with Disabilities (PwD)"
  ];
  const deptArray = [
    "CIVIL ENGINEERING", "COMPUTER SCIENCE AND ENGINEERING", "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "ELECTRICAL ENGINEERING", "FOOD ENGINEERING AND TECHNOLOGY",
    "MECHANICAL ENGINEERING", "ENERGY"
  ];
  const programmeArray = [
    "B.TECH. IN CIVIL ENGINEERING", "B.TECH IN COMPUTER SCIENCE AND ENGINEERING", "M.TECH IN DATA SCIENCE",
    "B.TECH. IN ELECTRONICS AND COMMUNICATION ENGINEERING", "B.TECH IN ELECTRICAL ENGINEERING",
    "B.TECH. IN FOOD ENGINEERING AND TECHNOLOGY", "B.TECH. IN MECHANICAL ENGINEERING",
    "BACHELORS OF DESIGN (B.DES.)", "M.TECH. IN MECHANICAL ENGINEERING",
    "M.TECH. IN INFORMATION TECHNOLOGY", "M.TECH. IN SEMICONDUCTOR TECHNOLOGY",
    "M.TECH. IN ELECTRONICS DESIGN AND TECHNOLOGY", "M.TECH IN BIOELECTRONICS",
    "M.TECH. IN ENERGY TECHNOLOGY", "M.TECH IN FOOD ENGINEERING AND TECHNOLOGY",
    "M.TECH IN CIVIL ENGINEERING", "M.TECH. IN COMPUTER SCIENCE AND ENGINEERING",
    "M.Tech in Electrical Engineering (Power and Energy Systems)",
    "MASTER OF COMPUTER APPLICATION","MASTER OF COMPUTER APPLICATION (3 Years)", "MASTER OF DESIGN (M.DES.)",
    "PHD-Computer Science and Engineering", "PHD-Electronics and Communication Engineering",
    "PHD-Electrical Engineering", "PHD-Energy", "PHD IN DESIGN",
    "PHD-Food Engineering and Technology"
  ];

  return (
    <div className="account_components">
      <h3>Update Profile</h3>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>


      <div>
        <label htmlFor="profilePicUpload">Upload New Profile Picture</label>
        <input
          type="file"
          id="profilePicUpload"
          onChange={handleProfilePicChange}
          style={{ border: "none" }}
          accept=".png, .jpg, .jpeg"
        />
        {profilePicPreviewUrl && (
          <div>
            <p>Profile Picture Preview:</p>
            <img
              src={profilePicPreviewUrl}
              alt="Profile Preview"
              style={{ maxWidth: '200px', maxHeight: '200px', display: 'block' }}
            />
          </div>
        )}
        {user && user.profilepic && (
          <div>
            <p>Current Profile Picture:</p>
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/uploads/profilepics/${user.profilepic}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-resume"
            >
              View Profile Picture
            </Link>
          </div>
        )}
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>





      {user && user.role === "Student" && (
        <>
          <div>
            <label>My User Details</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <select

                value={regionald}
                onChange={(e) => setRegionald(e.target.value)}
              >
                {regionalArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
              >
                {programmeArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>


          <div>
            <label htmlFor="resumeUpload">Upload Resume</label>
            <input
              type="file"
              id="resumeUpload"
              onChange={handleResumeChange}
              accept=".pdf, .doc, .docx, .png, .jpg, .jpeg"
            />
            {resumePreviewUrl && (
              <div>
                <p>Resume Preview:</p>
                {resume && resume.type.startsWith('image/') && (
                  <img src={resumePreviewUrl} alt="Resume Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                )}
                {resume && resume.type === 'application/pdf' && (
                  <iframe src={resumePreviewUrl} style={{ width: '100%', height: '400px' }} title="Resume Preview" />
                )}
              </div>
            )}
            {user && user.resume && (
              <div>
                <p>Current Resume:</p>
                <Link
                  to={`${import.meta.env.VITE_BACKEND_URL}/uploads/resumes/${user.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-resume"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
          <div>
            <label>Roll Number</label>
            <input
              type="text"
              value={rollnumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>

          <div>
            <label>Physically Handicapped</label>
            <div>
              <select
                value={pwdUser}
                onChange={(e) => setpwdUser(e.target.value)}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div>
            <label>Your Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label>Currently Pursuing</label>
            <select
              value={pursue}
              onChange={(e) => setPursue(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Graduation">Graduation</option>
            </select>
          </div>

          <div>
            <label>Minority Community</label>
            <select
              value={mincmnty}
              onChange={(e) => setMincmnty(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>



          <div>
            <label>Department</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="">Select Your Department</option>
              {deptArray.map((niche, index) => {
                return (
                  <option key={index} value={niche}>
                    {niche}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>Year of Passing</label>
            <input
              type="number"
              value={yop}
              onChange={(e) => setYop(e.target.value)}
            />
          </div>

          <div>
            <label>Matriculation Marks</label>
            <input
              type="number"
              value={matcgpa}
              onChange={(e) => setMatcgpa(e.target.value)}
            />
          </div>

          <div>
            <label>Matriculation Year of Passing</label>
            <input
              type="number"
              value={matyop}
              onChange={(e) => setMatyop(e.target.value)}
            />
          </div>

          <div>
            <label>Intermediate Marks</label>
            <input
              type="number"
              value={intercgpa}
              onChange={(e) => setIntercgpa(e.target.value)}
            />
          </div>

          <div>
            <label>Intermediate Year of Passing</label>
            <input
              type="number"
              value={interyop}
              onChange={(e) => setInteryop(e.target.value)}
            />
          </div>

        </>
      )}

      {user && user.role === "Student" && user.pursue === "Post Graduation" && (
        <>

          <div>
            <label>Graduation CGPA</label>

            <input
              type="number"
              value={gradcgpa}
              onChange={(e) => setGradcgpa(e.target.value)}
            />
          </div>




          <div   >
            <label>Graduation Year of Passing</label>
            <input
              type="number"

              value={gradyop}
              onChange={(e) => setGradyop(e.target.value)}
            />


          </div>



          <div>
            <label>1st Semester SGPA</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={pgsgpa1}
              onChange={(e) => setPgsgpa1(e.target.value)}
            />
          </div>


          <div >
            <label>2nd Semester SGPA</label>
            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={pgsgpa2}
              onChange={(e) => setPgsgpa2(e.target.value)}
            />

          </div>


          <div>
            <label>3rd Semester SGPA</label>
            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={pgsgpa3}
              onChange={(e) => setPgsgpa3(e.target.value)}
            />

          </div>


          <div>
            <label>4th Semester SGPA</label>
            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={pgsgpa4}
              onChange={(e) => setPgsgpa4(e.target.value)}
            />

          </div>


          <div>
            <label>5th Semester SGPA</label>
            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={pgsgpa5}
              onChange={(e) => setPgsgpa5(e.target.value)}
            />

          </div>


          <div>
            <label>6th Semester SGPA</label>
            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={pgsgpa6}
              onChange={(e) => setPgsgpa6(e.target.value)}
            />

          </div>


          <div>
            <label>Your Current CGPA Till Last Semester</label>
            <input
              type="number"
              value={pgcgpa}
              onChange={(e) => setPgcgpa(e.target.value)}
              onWheel={event => event.currentTarget.blur()}
            />
          </div>


        </>
      )}

      {user && user.role === "Student" && user.pursue === "Graduation" && (
        <>


          <div  >
            <label>1st Semester</label>
            <div>
              <input
                type="number"
                onWheel={event => event.currentTarget.blur()}
                value={ugsgpa1}
                onChange={(e) => setUgsgpa1(e.target.value)}
              />

            </div>
          </div>


          <div  >
            <label>2nd Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa2}
              onChange={(e) => setUgsgpa2(e.target.value)}
            />
          </div>


          <div  >
            <label>3rd Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa3}
              onChange={(e) => setUgsgpa3(e.target.value)}
            />


          </div>


          <div  >
            <label>4th Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa4}
              onChange={(e) => setUgsgpa4(e.target.value)}
            />


          </div>


          <div  >
            <label>5th Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa5}
              onChange={(e) => setUgsgpa5(e.target.value)}
            />


          </div>


          <div  >
            <label>6th Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa6}
              onChange={(e) => setUgsgpa6(e.target.value)}
            />


          </div>


          <div  >
            <label>7th Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa7}
              onChange={(e) => setUgsgpa7(e.target.value)}
            />


          </div>


          <div  >
            <label>8th Semester</label>

            <input
              type="number"
              onWheel={event => event.currentTarget.blur()}
              value={ugsgpa8}
              onChange={(e) => setUgsgpa8(e.target.value)}
            />


          </div>


          <div  >
            <label>Your Current CGPA Till Last Semester</label>

            <input
              type="number"
              value={ugcgpa}
              onWheel={event => event.currentTarget.blur()}
              onChange={(e) => setUgcgpa(e.target.value)}
            />

          </div>



        </>
      )}

      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {" "}
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
