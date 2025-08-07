
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  fetchPlacedStudents,
  placedStudent,
  fetchUsers,
} from "../store/slices/userSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import Modal from '../components/Modal'; 
import * as XLSX from "xlsx";

const PlacedStudents = () => {
  const { user, isAuthenticated, loading, error, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [department, setDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [yop, setYop] = useState("");
  const [selectedYop, setSelectedYop] = useState("");
  const [programme, setProgramme] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [expandedUsers, setExpandedUsers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleDetails = (userId) => {
    setExpandedUsers(prevState => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSave = (updatedStudent) => {
    dispatch(placedStudent(updatedStudent._id, updatedStudent.placed));
    handleCloseModal(); 
  };

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

  const handleDownloadExcel = () => {
    if (users && users.length > 0) {
      const data = users.map((user) => ({
        "Student Name": user.name,
        "Roll Number": user.rollnumber,
        "Department": user.dept,
        "Programme of Study": user.programme,
        "Category": user.socialcategory,
        "Organisation Name": user.company,
        "Position": user.position,
        "Placement Type": user.placementType,
        "CTC": user.salary,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data");
      XLSX.writeFile(workbook, "UsersData.xlsx");
    } else {
      toast.error("No user data available for download.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    dispatch(fetchPlacedStudents(department, yop, programme, searchKeyword));
  }, [dispatch, error, department, yop, programme]);

  const handleSearch = () => {
    dispatch(fetchUsers(department, yop, programme, searchKeyword));
  };

  const departmentArray = [
    "CIVIL ENGINEERING", "COMPUTER SCIENCE AND ENGINEERING", "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "ELECTRICAL ENGINEERING", "FOOD ENGINEERING AND TECHNOLOGY",
    "MECHANICAL ENGINEERING", "ENERGY",
  ];

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
                <h2>Filter Students By Programme</h2>
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

              <button onClick={handleDownloadExcel} className="btn">
                Download Excel
                </button>
            </div>
            <div className="container">
            <div className="user_container">
              {users &&
                users.map((element) => (
                  <div className="usercard" key={element._id}>
                    <div className="userdetails">
                      <h3>{element.name}</h3>
                      <p>Roll Number: {element.rollnumber}</p>
                      <p>Department: {element.dept}</p>
                      <p>Programme: {element.programme}</p>
                      {expandedUsers[element._id] ? (
                        <div>
                          <p>Organisation Name: {element.company}</p>
                          <p>Position: {element.position}</p>
                          <p>Placement Type: {element.placementType}</p>
                          <p>Salary: {element.salary}</p>
                        </div>
                      ) : (
                        <p><i>Click the button below to see more.</i></p>
                      )}
                      
                      <button onClick={() => toggleDetails(element._id)} className="btn">
                        {expandedUsers[element._id] ? 'Show Less' : 'Show More'}
                      </button>
                      <button onClick={() => handleOpenModal(element)} className="btn">Update Placement</button>
                    </div>
                  </div>
                ))}
            </div>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSave={handleSave}
              student={selectedStudent}
            />
          </div>
        </section>
      ) : (
        <div>
          <h1>ACCESS NOT GRANTED!</h1>
        </div>
      )}
    </>
  );
};

export default PlacedStudents;
