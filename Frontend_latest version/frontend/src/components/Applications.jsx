import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; 

const Applications = () => {
  const { applications: appList, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  
  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  
  const filteredApplications = appList.filter((application) => {
    return (
      (!selectedTitle || application.jobInfo.jobTitle === selectedTitle) &&
      (!selectedCompany || application.jobInfo.jobCompany === selectedCompany)
    );
  });

  
  const opportunityTitles = [
    ...new Set(appList.map((app) => app.jobInfo.jobTitle)),
  ];
  const companyNames = [
    ...new Set(appList.map((app) => app.jobInfo.jobCompany)),
  ];

  
  const [expandedUsers, setExpandedUsers] = useState({});
  const toggleDetails = (userId) => {
    setExpandedUsers((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  const handleDownloadExcel = () => {
    
    const data = filteredApplications.map((element) => ({
      "Opportunity Title": element.jobInfo.jobTitle,
      "Company Name": element.jobInfo.jobCompany,
      "Name": element.jobSeekerInfo.name,
      "Email": element.jobSeekerInfo.email,
      "Phone": element.jobSeekerInfo.phone,
      "Address": element.jobSeekerInfo.address,
      "Resume": `${import.meta.env.VITE_BACKEND_URL}/uploads/resumes/${element.jobSeekerInfo.resume}`,
      "Home State": element.jobSeekerInfo.regionald,
      "Category": element.jobSeekerInfo.category,
      "Programme of Study": element.jobSeekerInfo.programme,
      "Roll Number": element.jobSeekerInfo.rollnumber,
      "PWD Status": element.jobSeekerInfo.pwdUser,
      "Gender": element.jobSeekerInfo.gender,
      "Date of Birth": new Date(element.jobSeekerInfo.dob).toLocaleDateString(),
      "Applicant Pursuing": element.jobSeekerInfo.pursue,
      "Minority Community Status": element.jobSeekerInfo.mincmnty,
      "Department": element.jobSeekerInfo.dept,
      "Year of Passing": element.jobSeekerInfo.yop,
      "PAN Number": element.jobSeekerInfo.pan,
      "Aadhaar Number": element.jobSeekerInfo.aadhaar,
      "10th Marks": element.jobSeekerInfo.matcgpa,
      "10th Year of Passing": element.jobSeekerInfo.matyop,
      "12th Marks": element.jobSeekerInfo.intercgpa,
      "12th Year of Passing": element.jobSeekerInfo.interyop,
      "Graduation CGPA": element.jobSeekerInfo.gradcgpa,
      "Graduation Year of Passing": element.jobSeekerInfo.gradyop,
      "1st Sem SGPA (Masters)": element.jobSeekerInfo.pgsgpa1,
      "2nd Sem SGPA (Masters)": element.jobSeekerInfo.pgsgpa2,
      "3rd Sem SGPA (Masters)": element.jobSeekerInfo.pgsgpa3,
      "4th Sem SGPA (Masters)": element.jobSeekerInfo.pgsgpa4,
      "5th Sem SGPA (Masters)": element.jobSeekerInfo.pgsgpa5,
      "6th Sem SGPA (Masters)": element.jobSeekerInfo.pgsgpa6,
      "Current CGPA (Masters)": element.jobSeekerInfo.pgcgpa,
      "1st Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa1,
      "2nd Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa2,
      "3rd Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa3,
      "4th Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa4,
      "5th Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa5,
      "6th Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa6,
      "7th Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa7,
      "8th Sem SGPA (Bachelors)": element.jobSeekerInfo.ugsgpa8,
      "Current CGPA (Bachelors)": element.jobSeekerInfo.ugcgpa,
      "Backlog": element.jobSeekerInfo.anyback,
      "Number of Backlogs": element.jobSeekerInfo.numback,
    }));

    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    
    XLSX.writeFile(workbook, "Applications.xlsx");
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : filteredApplications && filteredApplications.length <= 0 ? (
        <h1>You have no applications from Students.</h1>
      ) : (
        <>
          <div className="account_components">
            <h3>Applications For Your Posted Opportunities</h3>

            {/* Excel Download Button */}
            <button onClick={handleDownloadExcel} className="btn">
              Download Excel
            </button>

            {/* Opportunity Title Filter */}
            <select onChange={handleTitleChange} value={selectedTitle}>
              <option value="">All Titles</option>
              {opportunityTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>

            {/* Company Name Filter */}
            <select onChange={handleCompanyChange} value={selectedCompany}>
              <option value="">All Companies</option>
              {companyNames.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <div className="applications_container">
              {filteredApplications.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p className="sub-sec">
                      <span>Opportunity Title: </span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="sub-sec">
                      <span>Company Name: </span> {element.jobInfo.jobCompany}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Name: </span>{" "}
                      {element.jobSeekerInfo.name}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Email:</span>{" "}
                      {element.jobSeekerInfo.email}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Phone: </span>{" "}
                      {element.jobSeekerInfo.phone}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Address: </span>{" "}
                      {element.jobSeekerInfo.address}
                    </p>

                    {expandedUsers[element._id] ? (
                      <>
                        {/* More Details */}
                        <p className="sub-sec">
                          <span>Applicant's Home State: </span>{" "}
                          {element.jobSeekerInfo.regionald}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Category: </span>{" "}
                          {element.jobSeekerInfo.category}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Programme of Study: </span>{" "}
                          {element.jobSeekerInfo.programme}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Roll Number: </span>{" "}
                          {element.jobSeekerInfo.rollnumber}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's PWD Status: </span>{" "}
                          {element.jobSeekerInfo.pwdUser}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Gender: </span>{" "}
                          {element.jobSeekerInfo.gender}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Date of Birth: </span>{" "}
                          {new Date(element.jobSeekerInfo.dob).toLocaleDateString()}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant Pursuing: </span>{" "}
                          {element.jobSeekerInfo.pursue}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Minority Community Status: </span>{" "}
                          {element.jobSeekerInfo.mincmnty}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Department: </span>{" "}
                          {element.jobSeekerInfo.dept}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Year of Passing: </span>{" "}
                          {element.jobSeekerInfo.yop}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's PAN Number: </span>{" "}
                          {element.jobSeekerInfo.pan}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Aadhaar Number: </span>{" "}
                          {element.jobSeekerInfo.aadhaar}
                        </p>
                        {/* Graduation/Post Graduation details */}
                        {/* 10th/12th marks */}
                        <p className="sub-sec">
                          <span>Applicant's 10th Marks: </span>{" "}
                          {element.jobSeekerInfo.matcgpa}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's 10th Year of Passing: </span>{" "}
                          {element.jobSeekerInfo.matyop}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's 12th Marks: </span>{" "}
                          {element.jobSeekerInfo.intercgpa}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's 12th Year of Passing: </span>{" "}
                          {element.jobSeekerInfo.interyop}
                        </p>

                        {/* Graduation/Post Graduation CGPA and SGPA */}
                        {element.jobSeekerInfo.pursue === "Post Graduation" && (
                          <>
                            <p className="sub-sec">
                              <span>Applicant's Graduation CGPA: </span>{" "}
                              {element.jobSeekerInfo.gradcgpa}
                            </p>
                            <p className="sub-sec">
                              <span>Applicant's Graduation Year of Passing: </span>{" "}
                              {element.jobSeekerInfo.gradyop}
                            </p>
                          </>
                        )}

                        <p className="sub-sec">
                          <span>Applicant's Backlog: </span>{" "}
                          {element.jobSeekerInfo.anyback}
                        </p>
                        <p className="sub-sec">
                          <span>Applicant's Number of Backlogs: </span>{" "}
                          {element.jobSeekerInfo.numback}
                        </p>
                      </>
                    ) : (
                      <p>Click the button to see more details</p>
                    )}

                    <div className="btn-wrapper">
                      <button
                        className="outline_btn"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>

                      <Link
                        to={`${import.meta.env.VITE_BACKEND_URL}/uploads/resumes/${element.jobSeekerInfo.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-resume"
                      >
                        View Resume
                      </Link>

                      <button onClick={() => toggleDetails(element._id)} className="btn">
                        {expandedUsers[element._id] ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Applications;
