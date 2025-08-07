import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllUserErrors, fetchUsers, placedStudent, lockedStudent } from "../store/slices/userSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";

import * as XLSX from "xlsx";  


const Students = () => {
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  
  const [yop, setYop] = useState("");
  const [selectedYop, setSelectedYop] = useState("");

  const [programme, setProgramme] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  
  const [expandedUsers, setExpandedUsers] = useState({});
  const toggleDetails = (userId) => {
    setExpandedUsers(prevState => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  const { users, loading, error } = useSelector((state) => state.user);

  const handleDepartmentChange = (department) => {
    setDepartment(department);
    setSelectedDepartment(department);
  };
  const handleYopChange = (yop) => {
    setYop(yop);
    setSelectedYop(yop);
  };
  const handleProgrammeChange = (programme) => {
    setProgramme(programme);
    setSelectedProgramme(programme);
  };


  const handlePlacedStudent = (id, isPlaced) => {
    dispatch(placedStudent(id, !isPlaced)); 
  };
  const handleLockedStudent = (id, isLocked) => {
    dispatch(lockedStudent(id, !isLocked)); 
  };

  
  const handleDownloadExcel = () => {
    if (users && users.length > 0) {
      const data = users.map((user) => ({
        "Student Name": user.name,
        "Roll Number": user.rollnumber,
        "Department": user.dept,
        "Programme of Study": user.programme,
        "Date of Birth": new Date(user.dob).toLocaleDateString(),
        "Phone": user.phone,
        "Address": user.address,
        "Email": user.email,
        "Resume": `${import.meta.env.VITE_BACKEND_URL}/uploads/resumes/${user.resume}`,
        "Home State": user.regionald,
        "Category": user.category,
        "PWD Candidate": user.pwdUser,
        "Gender": user.gender,
        "Currently Pursuing": user.pursue,
        "Minority Community": user.mincmnty,
        "Year of Passing": user.yop,
        "10th Percentage / CGPA": user.matcgpa,
        "10th Year of Passing": user.matyop,
        "12th Percentage / CGPA": user.intercgpa,
        "12th Year of Passing": user.interyop,

        
        "Graduation CGPA": user.gradcgpa,
        "Graduation Year of Passing": user.gradyop,
        "Master's 1st Semester SGPA": user.pgsgpa1,
        "Master's 2nd Semester SGPA": user.pgsgpa2,
        "Master's 3rd Semester SGPA": user.pgsgpa3,
        "Master's 4th Semester SGPA": user.pgsgpa4,
        "Master's 5th Semester SGPA": user.pgsgpa5,
        "Master's 6th Semester SGPA": user.pgsgpa6,
        "Master's Current CGPA": user.pgcgpa,

        
        "Bachelor's 1st Semester SGPA": user.ugsgpa1,
        "Bachelor's 2nd Semester SGPA": user.ugsgpa2,
        "Bachelor's 3rd Semester SGPA": user.ugsgpa3,
        "Bachelor's 4th Semester SGPA": user.ugsgpa4,
        "Bachelor's 5th Semester SGPA": user.ugsgpa5,
        "Bachelor's 6th Semester SGPA": user.ugsgpa6,
        "Bachelor's 7th Semester SGPA": user.ugsgpa7,
        "Bachelor's 8th Semester SGPA": user.ugsgpa8,
        "Bachelor's Current CGPA": user.ugcgpa,
        "Placed": user.placed,

      }));
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data");

      
      XLSX.writeFile(workbook, "UsersData.xlsx");
    } else {
      toast.error("No user data available for download.");
    }
  };

  const dispatch = useDispatch();




  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    dispatch(fetchUsers(department, yop, programme, searchKeyword));
  }, [dispatch, error, department, yop, programme]);

  const handleSearch = () => {
    dispatch(fetchUsers(department, yop, programme, searchKeyword));
  };

  const departmentArray = [
    "CIVIL ENGINEERING", "COMPUTER SCIENCE AND ENGINEERING", "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "ELECTRICAL ENGINEERING", "FOOD ENGINEERING AND TECHNOLOGY",
    "MECHANICAL ENGINEERING", "ENERGY",
  ]

  const yopArray = [2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040];

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
    "MASTER OF COMPUTER APPLICATION", "MASTER OF COMPUTER APPLICATION (3 Years)", "MASTER OF DESIGN (M.DES.)",
    "PHD-Computer Science and Engineering", "PHD-Electronics and Communication Engineering",
    "PHD-Electrical Engineering", "PHD-Energy", "PHD IN DESIGN",
    "PHD-Food Engineering and Technology",
  ];



  return (
    <>
      {loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <section className="jobs">

          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Student</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Students By Department</h2>
                {departmentArray.map((department, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={department}
                      name="department"
                      value={department}
                      checked={selectedDepartment === department}
                      onChange={() => handleDepartmentChange(department)}
                    />
                    <label htmlFor={department}>{department}</label>
                  </div>
                ))}
              </div>


              <div className="cities">
                <h2>Filter Students By Year of Passing</h2>
                {yopArray.map((yop, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={yop}
                      name="yop"
                      value={yop}
                      checked={selectedYop === yop}
                      onChange={() => handleYopChange(yop)}
                    />
                    <label htmlFor={yop}>{yop}</label>
                  </div>
                ))}
              </div>

              <div className="cities">
                <h2>Filter Students by Programme </h2>
                {programmesArray.map((programme, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={programme}
                      name="programme"
                      value={programme}
                      checked={selectedProgramme === programme}
                      onChange={() => handleProgrammeChange(programme)}
                    />
                    <label htmlFor={programme}>{programme}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">Filter By Department</option>
                  {departmentArray.map((department, index) => (
                    <option value={department} key={index}>
                      {department}
                    </option>
                  ))}
                </select>

                <select value={yop} onChange={(e) => setYop(e.target.value)}>
                  <option value="">Filter By Year of Passing</option>
                  {yopArray.map((yop, index) => (
                    <option value={yop} key={index}>
                      {yop}
                    </option>
                  ))}
                </select>

                <select
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                >
                  <option value="">Filter Student by Programme</option>
                  {programmesArray.map((programme, index) => (
                    <option value={programme} key={index}>
                      {programme}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleDownloadExcel} className="download-btn">
                Download In Excel
              </button>
              <div className="user_container">
                {users &&
                  users.map((element) => {
                    return (
                      <div className="usercard" key={element._id}>

                        <img className="profileimage" src={`${import.meta.env.VITE_BACKEND_URL}/uploads/profilepics/${element.profilepic}`} alt="Profile" />
                        <div>

                          <p className="userdetails">Student Name: {element.name}</p>
                          <p className="userdetails">Roll Number: {element.rollnumber}</p>
                          <p className="userdetails">Department: {element.dept}</p>
                          <p className="userdetails">
                            Programme of Study: {element.programme}
                          </p>
                          <p className="userdetails">
                            Date of Birth:{" "}
                            {new Date(element.dob).toLocaleDateString()}
                          </p>



                          {expandedUsers[element._id] ? (
                            <div>
                              <p>Phone: {element.phone}</p>
                              <p>Address: {element.address}</p>
                              <p>Roll Number: {element.rollnumber}</p>

                              <p>Email: {element.email}</p>
                              <p>Home State: {element.regionald}</p>
                              <p>Category: {element.category}</p>
                              <p>PWD Candidate: {element.pwdUser}</p>
                              <p>Gender: {element.gender}</p>
                              <p>Currently Pursuing: {element.pursue}</p>
                              <p>Minority Community: {element.mincmnty}</p>
                              <p>Year of Passing: {element.yop}</p>
                              <p>10th Percentage / CGPA: {element.matcgpa}</p>
                              <p>10th Year of Passing: {element.matyop}</p>
                              <p>12th Percentage / CGPA: {element.intercgpa}</p>
                              <p>12th Year of Passing: {element.interyop}</p>

                              {user && element.pursue === "Post Graduation" && element.role === "Student" && (
                                <div>
                                  <p>Graduation CGPA: {element.gradcgpa}</p>
                                  <p>Graduation Year of Passing: {element.gradyop}</p>
                                  <p>Masters 1st Semester SGPA: {element.pgsgpa1}</p>
                                  <p>Masters 2nd Semester SGPA: {element.pgsgpa2}</p>
                                  <p>Masters 3rd Semester SGPA: {element.pgsgpa3}</p>
                                  <p>Masters 4th Semester SGPA: {element.pgsgpa4}</p>
                                  <p>Masters 5th Semester SGPA: {element.pgsgpa5}</p>
                                  <p>Masters 6th Semester SGPA: {element.pgsgpa6}</p>
                                  <p>Masters Current CGPA: {element.pgcgpa}</p>
                                </div>
                              )}

                              {user && element.pursue === "Graduation" && element.role === "Student" && (
                                <div>
                                  <p>Bachelor's 1st Semester SGPA: {element.ugsgpa1}</p>
                                  <p>Bachelor's 2nd Semester SGPA: {element.ugsgpa2}</p>
                                  <p>Bachelor's 3rd Semester SGPA: {element.ugsgpa3}</p>
                                  <p>Bachelor's 4th Semester SGPA: {element.ugsgpa4}</p>
                                  <p>Bachelor's 5th Semester SGPA: {element.ugsgpa5}</p>
                                  <p>Bachelor's 6th Semester SGPA: {element.ugsgpa6}</p>
                                  <p>Bachelor's 7th Semester SGPA: {element.ugsgpa7}</p>
                                  <p>Bachelor's 8th Semester SGPA: {element.ugsgpa8}</p>

                                  <p>Bachelor's Current CGPA: {element.ugcgpa}</p>
                                </div>
                              )}

                            </div>
                          ) : (
                            <p><i>Click the button below see more.</i></p>
                          )}

                          <div>
                            <button onClick={() => toggleDetails(element._id)} className="userdetail-btn">
                              {expandedUsers[element._id] ? 'Show Less' : 'Show More'}
                            </button>

                            <button
                              className="btn"
                              onClick={() => handlePlacedStudent(element._id, element.placed)}
                            >
                              {element.placed ? "Placed" : "Not Placed"}
                            </button>
                            <button
                              className="btn"
                              onClick={() => handleLockedStudent(element._id, element.locked)}
                            >
                              {element.locked ? "Locked" : "Unlocked"}
                            </button>
                          </div>

                        </div>



                      </div>
                    );
                  })}



              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>
          <h1>
            ACCESS NOT GRANTED !
          </h1>
        </div>
      )}
    </>
  );
};

export default Students;
