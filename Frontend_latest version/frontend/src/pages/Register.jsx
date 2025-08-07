import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, logout, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import Spinner from "../components/Spinner";

const Register = () => {
  const [role, setRole] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [regionald, setRegionald] = useState("");
  const [category, setCategory] = useState("");
  const [programme, setProgramme] = useState("");
  const [resume, setResume] = useState("");

  const [rollnumber, setRollNumber] = useState("");
  const [pwdUser, setpwdUser] = useState("");
  const [gender, setGender] = useState("");
  const initialDob = new Date("2024-08-14T00:00:00.000Z").toISOString().split('T')[0];
  const [dob, setDob] = useState(initialDob);
  const [pursue, setPursue] = useState("");

  const [mincmnty, setMincmnty] = useState("");
  const [dept, setDept] = useState("");
  const [yop, setYop] = useState("");
  const [matcgpa, setMatcgpa] = useState("");
  const [matyop, setMatyop] = useState("");
  const [intercgpa, setIntercgpa] = useState("");
  const [interyop, setInteryop] = useState("");


  
  const [gradcgpa, setGradcgpa] = useState("");
  const [gradyop, setGradyop] = useState("");
  const [pgsgpa1, setPgsgpa1] = useState("");
  const [pgsgpa2, setPgsgpa2] = useState("");
  const [pgsgpa3, setPgsgpa3] = useState("");
  const [pgsgpa4, setPgsgpa4] = useState("");
  const [pgsgpa5, setPgsgpa5] = useState("");
  const [pgsgpa6, setPgsgpa6] = useState("");
  const [pgcgpa, setPgcgpa] = useState("");


  
  const [ugsgpa1, setUgsgpa1] = useState("");
  const [ugsgpa2, setUgsgpa2] = useState("");
  const [ugsgpa3, setUgsgpa3] = useState("");
  const [ugsgpa4, setUgsgpa4] = useState("");
  const [ugsgpa5, setUgsgpa5] = useState("");
  const [ugsgpa6, setUgsgpa6] = useState("");
  const [ugsgpa7, setUgsgpa7] = useState("");
  const [ugsgpa8, setUgsgpa8] = useState("");
  const [ugcgpa, setUgcgpa] = useState("");

  
  const [userDeclaration, setUserDeclaration] = useState(false);

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
    "MECHANICAL ENGINEERING", "ENERGY",
  ];
  const programmesArray = [
    "B.Tech IN CIVIL ENGINEERING", "B.Tech IN COMPUTER SCIENCE AND ENGINEERING", "M.Tech IN DATA SCIENCE",
    "B.Tech IN ELECTRONICS AND COMMUNICATION ENGINEERING", "B.Tech IN ELECTRICAL ENGINEERING",
    "B.Tech IN FOOD ENGINEERING AND TECHNOLOGY", "B.Tech IN MECHANICAL ENGINEERING",
    "BACHELORS OF DESIGN (B.DES.)", "M.Tech IN MECHANICAL ENGINEERING",
    "M.Tech IN INFORMATION TECHNOLOGY", "M.Tech IN SEMICONDUCTOR TECHNOLOGY",
    "M.Tech IN ELECTRONICS DESIGN AND TECHNOLOGY", "M.Tech IN BIOELECTRONICS",
    "M.Tech IN ENERGY TECHNOLOGY", "M.Tech IN FOOD ENGINEERING AND TECHNOLOGY",
    "M.Tech IN CIVIL ENGINEERING", "M.Tech IN COMPUTER SCIENCE AND ENGINEERING",
    "M.Tech in Electrical Engineering (Power and Energy Systems)",
    "MASTER OF COMPUTER APPLICATION","MASTER OF COMPUTER APPLICATION (3 Years)", "MASTER OF DESIGN (M.DES.)",
    "PHD-Computer Science and Engineering", "PHD-Electronics and Communication Engineering",
    "PHD-Electrical Engineering", "PHD-Energy", "PHD IN DESIGN",
    "PHD-Food Engineering and Technology",
  ];


  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  
  const profilepicHandler = (e) => {
    const file = e.target.files[0];
    setProfilepic(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegsiter = (e) => {
    e.preventDefault();


    
    if (!userDeclaration) {
      toast.error("You must agree to the terms and conditions to register.");
      return;
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("profilepic", profilepic);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Student") {
      formData.append("regionald", regionald);
      formData.append("category", category);
      formData.append("programme", programme);
      
      formData.append("resume", resume);
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

    if (role === "Student" && pursue === "Post Graduation") {
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

    if (role === "Student" && pursue === "Graduation") {
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



    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      dispatch(logout());
      toast.success("User Registered! Please Check your GSuite ID to verify account.");
      navigateTo("/");

    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="authPage">
          <div className="container">
            <div className="header">
              <h3>Create a new account</h3>
            </div>
            <form onSubmit={handleRegsiter}>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Register As</label>
                  <div>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Register as an Admin</option>
                      <option value="Student">Register as a Student</option>
                    </select>
                    <FaRegUser />
                  </div>
                </div>

                <div className="inputTag">
                  <label>Name</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FaPencilAlt />
                  </div>
                </div>




              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Profile Picture</label>
                  <div>
                    <input
                      type="file"
                      onChange={profilepicHandler}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>


              <div className="wrapper">

                <div className="inputTag">
                  <label>Email Address</label>
                  <div>
                    <input
                      type="email"
                      placeholder="youremail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdOutlineMailOutline />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Phone Number</label>
                  <div>
                    <input
                      type="number"
                      placeholder="Your 10 Digit Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <FaPhoneFlip />
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="inputTag">
                  <label>Your Permanent Address</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <FaAddressBook />
                  </div>
                </div>
                <div className="inputTag">
                  <label>Password</label>
                  <div>
                    <input
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <RiLock2Fill />
                  </div>
                </div>
              </div>
              {role === "Student" && (
                <>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Regional Diversity or Home State</label>
                      <div>
                        <select
                          value={regionald}
                          onChange={(e) => setRegionald(e.target.value)}
                        >
                          <option value="">Regional Diversity or Home State</option>
                          {regionalArray.map((niche, index) => {
                            return (
                              <option key={index} value={niche}>
                                {niche}
                              </option>
                            );
                          })}
                        </select>
                        <MdCategory />
                      </div>
                    </div>
                    <div className="inputTag">
                      <label>Category</label>
                      <div>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Your Category</option>
                          {categoryArray.map((niche, index) => {
                            return (
                              <option key={index} value={niche}>
                                {niche}
                              </option>
                            );
                          })}
                        </select>
                        <MdCategory />
                      </div>
                    </div>
                    <div className="inputTag">
                      <label>Programme</label>
                      <div>
                        <select
                          value={programme}
                          onChange={(e) => setProgramme(e.target.value)}
                        >
                          <option value="">Your Programme</option>
                          {programmesArray.map((niche, index) => {
                            return (
                              <option key={index} value={niche}>
                                {niche}
                              </option>
                            );
                          })}
                        </select>
                        <MdCategory />
                      </div>
                    </div>
                  </div>




                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Roll Number</label>
                      <div>
                        <input
                          type="text"
                          placeholder="Your Roll Number"
                          value={rollnumber || ""}
                          onChange={(e) => setRollNumber(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>



                    <div className="inputTag">
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
                        <FaRegUser />
                      </div>
                    </div>



                    <div className="inputTag">
                      <label>Your Gender</label>
                      <div>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <FaRegUser />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Date of Birth</label>
                      <div>
                        <input
                          type="date"
                          placeholder="Your DOB"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Currently Pursuing</label>
                      <div>
                        <select
                          value={pursue}
                          onChange={(e) => setPursue(e.target.value)}
                        >
                          <option value="">Select Option</option>
                          <option value="Post Graduation">Post Graduation</option>
                          <option value="Graduation">Graduation</option>
                        </select>
                        <FaRegUser />
                      </div>
                    </div>
                  

                  
                    <div className="inputTag">
                      <label>Minority Community</label>
                      <div>
                        <select
                          value={mincmnty}
                          onChange={(e) => setMincmnty(e.target.value)}
                        >
                          <option value="">Select Option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <FaRegUser />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Department</label>
                      <div>
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
                        <MdCategory />
                      </div>
                    </div>
                  

                  
                    <div className="inputTag">
                      <label>Year of Passing</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your Expected Year of Passing"
                          value={yop}
                          onWheel={event => event.currentTarget.blur()}   
                          onChange={(e) => setYop(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>10th Marks</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Percentage / CGPA"
                          value={matcgpa}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setMatcgpa(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  

                  
                    <div className="inputTag">
                      <label>Year of Passing - 10th</label>
                      <div>
                        <input
                          type="number"
                          placeholder="20XX"
                          value={matyop}
                          onWheel={event => event.currentTarget.blur()}   
                          onChange={(e) => setMatyop(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>12th Marks</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Percentage / CGPA"
                          value={intercgpa}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setIntercgpa(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  

                  
                    <div className="inputTag">
                      <label>Year of Passing - 12th</label>
                      <div>
                        <input
                          type="number"
                          placeholder="20XX"
                          value={interyop}
                          onWheel={event => event.currentTarget.blur()}   
                          onChange={(e) => setInteryop(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>










                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Resume - Optional</label>
                      <div>
                        <input
                          type="file"
                          onChange={resumeHandler}
                          style={{ border: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}


              {role === "Student" && pursue === "Post Graduation" && (
                <>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Graduation CGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your CGPA Here"
                          value={gradcgpa}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setGradcgpa(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                 
                    <div className="inputTag">
                      <label>Year of Passing - Graduation</label>
                      <div>
                        <input
                          type="number"
                          placeholder="20XX"
                          value={gradyop}
                          onWheel={event => event.currentTarget.blur()}   
                          onChange={(e) => setGradyop(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>1st Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={pgsgpa1}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgsgpa1(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                  
                    <div className="inputTag">
                      <label>2nd Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={pgsgpa2}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgsgpa2(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                 
                    <div className="inputTag">
                      <label>3rd Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={pgsgpa3}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgsgpa3(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>4th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={pgsgpa4}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgsgpa4(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                 
                  
                    <div className="inputTag">
                      <label>5th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={pgsgpa5}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgsgpa5(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                 
                    <div className="inputTag">
                      <label>6th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={pgsgpa6}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgsgpa6(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Your Current CGPA Till Last Semester</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your Current CGPA Here"
                          value={pgcgpa}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setPgcgpa(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "Student" && pursue === "Graduation" && (
                <>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>1st Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa1}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa1(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                  
                    <div className="inputTag">
                      <label>2nd Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa2}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa2(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                 
                    <div className="inputTag">
                      <label>3rd Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa3}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa3(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                    <div className="inputTag">
                      <label>4th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa4}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa4(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>

                  <div className="wrapper">
                    <div className="inputTag">
                      <label>5th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa5}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa5(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                    <div className="inputTag">
                      <label>6th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa6}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa6(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                    <div className="inputTag">
                      <label>7th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa7}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa7(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  
                    <div className="inputTag">
                      <label>8th Semester SGPA</label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your SGPA Here"
                          value={ugsgpa8}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgsgpa8(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>
                  
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Your Current CGPA </label>
                      <div>
                        <input
                          type="number"
                          placeholder="Enter Your CGPA Here"
                          value={ugcgpa}
                          onWheel={event => event.currentTarget.blur()}
                          onChange={(e) => setUgcgpa(e.target.value)}
                        />
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>
                </>
              )}


              <div className="inputTag">
                <label>
                  <input
                    type="checkbox"
                    checked={userDeclaration}
                    onChange={(e) => setUserDeclaration(e.target.checked)}
                  />
                  I agree that all details provided by me to Training and Placement Cell are correct and valid.
                </label>
              </div>

              <button type="submit" disabled={loading}>
                Register
              </button>
              <Link to={"/login"}>Login Now</Link>
            </form>
          </div>
        </section >
      )}
    </>
  );
};

export default Register;
