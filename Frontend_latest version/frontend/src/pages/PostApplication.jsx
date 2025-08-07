import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  console.log(singleJob);
  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [regionald, setRegionald] = useState("");
  const [category, setCategory] = useState("");
  const [programme, setProgramme] = useState("");

  const [rollnumber, setRollNumber] = useState("");
  const [pwdUser, setpwdUser] = useState("");
  const [gender, setGender] = useState("");
  const formattedDob = new Date(user.dob).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  console.log(user);
  
  const [dob, setDob] = useState(formattedDob);
  const [pursue, setPursue] = useState("");

  const [mincmnty, setMincmnty] = useState("");
  const [dept, setDept] = useState("");
  const [yop, setYop] = useState("");

  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");


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

  const [anyback, setAnyback] = useState("");
  const [numback, setNumback] = useState("");
  

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
  const programmeArray = [
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
  const [resumePreviewUrl, setResumePreviewUrl] = useState(user && user.resume?.url);
  const [resume, setResume] = useState(null);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {

    
    e.preventDefault();

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

      formData.append("pan", pan);
      formData.append("aadhaar", aadhaar);

      formData.append("matcgpa", matcgpa);
      formData.append("matyop", matyop);
      formData.append("intercgpa", intercgpa);
      formData.append("interyop", interyop);

      formData.append("anyback", anyback);
      formData.append("numback", numback);

    }

    if (user && user.role === "Student" && pursue === "Post Graduation") {
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

    if (user && user.role === "Student" && pursue === "Graduation") {
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
    const studentYopAsString = yop.toString();

  
  if (!singleJob.yop.includes(studentYopAsString)) {
    toast.error("Your Year of Passing (YOP) does not match the required YOP for this job.");
    return;
  }
    dispatch(postApplication(formData, jobId));
  };
  
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");


      setRegionald(user.regionald || "");
      setCategory(user.category || "");

      
      setProgramme( user.programme || "");

      setRollNumber(user.rollnumber || "");
      setpwdUser(user.pwdUser || "");
      setGender(user.gender || "");
      setDob(user.dob || "");
      setPursue(user.pursue || "");
      setMincmnty(user.mincmnty || "");
      setDept(user.dept || "");
      setYop(user.yop || "");



      setMatcgpa(user.matcgpa || "");
      setMatyop(user.matyop || "");
      setIntercgpa(user.intercgpa || "");
      setInteryop(user.interyop || "");

      
      setGradcgpa(user.gradcgpa || "");
      setGradyop(user.gradyop || "");
      setPgsgpa1(user.pgsgpa1 || "");
      setPgsgpa2(user.pgsgpa2 || "");
      setPgsgpa3(user.pgsgpa3 || "");
      setPgsgpa4(user.pgsgpa4 || "");
      setPgsgpa5(user.pgsgpa5 || "");
      setPgsgpa6(user.pgsgpa6 || "");
      setPgcgpa(user.pgcgpa || "");

      
      setUgsgpa1(user.ugsgpa1 || "");
      setUgsgpa2(user.ugsgpa2 || "");
      setUgsgpa3(user.ugsgpa3 || "");
      setUgsgpa4(user.ugsgpa4 || "");
      setUgsgpa5(user.ugsgpa5 || "");
      setUgsgpa6(user.ugsgpa6 || "");
      setUgsgpa7(user.ugsgpa7 || "");
      setUgsgpa8(user.ugsgpa8 || "");
      setUgcgpa(user.ugcgpa || "");

      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));

    
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setResumePreviewUrl(reader.result);
      setResume(file);
    };
  };

  return (
    <>
      <article className="application_page">
        <form>
          <h3>Application Form</h3>
          <div>
            <label>Opportunity Title</label>
            <input type="text" placeholder={singleJob.title} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
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
                    <option value="">Select Your Programme</option>
                    {programmeArray.map((element, index) => {
                      return(

                        <option key={index} value={element} >
                          {element}
                        </option>
                      );
                      
                    })}
                  </select>
                </div>
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
                  value={formattedDob}
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
                <label>PAN Number</label>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                />
              </div>

              <div>
                <label>Aadhaar Number</label>
                <input
                  type="text"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
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
              <div>
                <label>Graduation Year of Passing</label>
                <input
                  type="number"

                  value={gradyop}
                  onChange={(e) => setGradyop(e.target.value)}
                />
              </div>
              <div>
                <label>Master's 1st Semester SGPA</label>
                <input
                  type="number"
                  value={pgsgpa1}
                  onChange={(e) => setPgsgpa1(e.target.value)}
                />
              </div>
              <div >
                <label>Master's 2nd Semester SGPA</label>
                <input
                  type="number"
                  value={pgsgpa2}
                  onChange={(e) => setPgsgpa2(e.target.value)}
                />
              </div>
              <div>
                <label>Master's 3rd Semester SGPA</label>
                <input
                  type="number"
                  value={pgsgpa3}
                  onChange={(e) => setPgsgpa3(e.target.value)}
                />
              </div>


              <div>
                <label>Master's 4th Semester SGPA</label>
                <input
                  type="number"
                  value={pgsgpa4}
                  onChange={(e) => setPgsgpa4(e.target.value)}
                />
              </div>
              <div>
                <label>Master's 5th Semester SGPA</label>
                <input
                  type="number"
                  value={pgsgpa5}
                  onChange={(e) => setPgsgpa5(e.target.value)}
                />
              </div>
              <div>
                <label>Master's 6th Semester SGPA</label>
                <input
                  type="number"
                  value={pgsgpa6}
                  onChange={(e) => setPgsgpa6(e.target.value)}
                />
              </div>
              <div>
                <label>Master's Current CGPA</label>
                <input
                  type="number"
                  value={pgcgpa}
                  onChange={(e) => setPgcgpa(e.target.value)}
                />
              </div>
            </>
          )}

          {user && user.role === "Student" && user.pursue === "Graduation" && (
            <>
              <div >
                <label>Bachelor's 1st Semester SGPA</label>
                <div>
                  <input
                    type="number"
                    value={ugsgpa1}
                    onChange={(e) => setUgsgpa1(e.target.value)}
                  />
                </div>
              </div>


              <div>
                <label>Bachelor's 2nd Semester</label>
                <input
                  type="number"
                  value={ugsgpa2}
                  onChange={(e) => setUgsgpa2(e.target.value)}
                />
              </div>
              <div>
                <label>Bachelor's 3rd Semester</label>
                <input
                  type="number"
                  value={ugsgpa3}
                  onChange={(e) => setUgsgpa3(e.target.value)}
                />
              </div>


              <div>
                <label>Bachelor's 4th Semester</label>
                <input
                  type="number"
                  value={ugsgpa4}
                  onChange={(e) => setUgsgpa4(e.target.value)}
                />
              </div>


              <div>
                <label>Bachelor's 5th Semester</label>
                <input
                  type="number"
                  value={ugsgpa5}
                  onChange={(e) => setUgsgpa5(e.target.value)}
                />
              </div>


              <div>
                <label>Bachelor's 6th Semester</label>
                <input
                  type="number"
                  value={ugsgpa6}
                  onChange={(e) => setUgsgpa6(e.target.value)}
                />
              </div>


              <div>
                <label>Bachelor's 7th Semester</label>
                <input
                  type="number"
                  value={ugsgpa7}
                  onChange={(e) => setUgsgpa7(e.target.value)}
                />
              </div>


              <div  >
                <label>Bachelor's 8th Semester</label>
                <input
                  type="number"
                  value={ugsgpa8}
                  onChange={(e) => setUgsgpa8(e.target.value)}
                />
              </div>


              <div>
                <label>Your Current CGPA Till Last Semester</label>
                <input
                  type="number"
                  value={ugcgpa}
                  onChange={(e) => setUgcgpa(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label>Have you ever had any backlogs ?</label>
            <select
              value={anyback}
              onChange={(e) => setAnyback(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {anyback === "Yes" && (
            <>
              <div>
                <label>How many active backlogs ?</label>
                <input
                  type="number"
                  value={numback}
                  onChange={(e) => setNumback(e.target.value)}
                />
              </div>
            </>
          )}



          {isAuthenticated && user.role === "Student" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>

        <div className="job-details">
          <header>
            <h3>{singleJob.title}</h3>
            {singleJob.personalWebsite && (

              <a href={singleJob.personalWebsite.url} target="_blank" rel="noopener noreferrer">
                {singleJob.personalWebsite.title}
              </a>

            )}
            <p>{singleJob.location ? singleJob.location.join(', ') : 'No location specified'}</p>
            <p>Rs. {singleJob.salary} a month</p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Opportunity Details</h3>
              <div>
                <IoMdCash />
                <div>
                  <span>Pay</span>
                  <span>{singleJob.salary} LPA</span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Opportunity Type</span>
                  <span>{singleJob.jobType}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Programmes Eligible</h3>
              <FaLocationDot />

              <div className="location-wrapper">
                <span>{singleJob.location ? singleJob.location.join(', ') : 'No location specified'}</span>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {qualifications.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div>
                  <h4>Offering</h4>
                  <ul>
                    {offering.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Type Category</h3>
            <p>{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

export default PostApplication;
