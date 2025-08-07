import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  getStudentDetails,
  userUpdateStatus1,
  saveToPlacedStudents,
} from "../store/slices/userSlice";
import Spinner from "../components/Spinner";

const Placedform = () => {
  const { user, isAuthenticated, loading, error, selectedStudentDetails } = useSelector((state) => state.user);

  const categoryArray = [
    "Scheduled Castes (SC)", "Scheduled Tribes (ST)", "Other Backward Classes (OBC)",
    "Economically Weaker Sections (EWS)", "General",
    "Persons with Disabilities (PwD)"
  ];

  const [formData, setFormData] = useState({
    name: "",
    rollnumber: "",
    dept: "",
    programme: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    yop: "",
    placementType: "full-time",
    socialcategory: "General", 
    company: "",
    salary: "",
  });

  const [locked, setLocked] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (selectedStudentDetails && selectedStudentDetails.student) {
      const student = selectedStudentDetails.student;
      setFormData({
        name: student.name || "",
        rollnumber: student.rollnumber || "",
        dept: student.dept || "",
        programme: student.programme || "",
        email: student.email || "",
        phone: student.phone || "",
        address: student.address || "",
        gender: student.gender || "",
        yop: student.yop || "",
        placementType: student.placed ? "full-time" : "internship",
        company: "",
        salary: "",
        socialcategory: student.category || "General", 
      });
      setLocked(student.locked);
    }
  }, [selectedStudentDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLockUnlock = async () => {
    try {
      await dispatch(userUpdateStatus1(selectedStudentDetails.student._id, !locked));
      setLocked(!locked);
      toast.success(`Student has been ${locked ? "unlocked" : "locked"} successfully.`);
    } catch (error) {
      toast.error("Failed to update lock status. Please try again.");
    }
  };

  const handleSaveToPlacedStudents = () => {
    if (formData.placementType && formData.company && formData.salary) {
      const updatedDetails = {
        ...selectedStudentDetails.student,
        placementType: formData.placementType,
        company: formData.company,
        salary: formData.salary,
        socialcategory: formData.socialcategory,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        gender: formData.gender,
        yop: formData.yop,
      };
      dispatch(saveToPlacedStudents(updatedDetails));
      toast.success("Student details saved to Placed Students");
      
      const updatedUserDetails = {
        ...selectedStudentDetails.student,
        placed: true,
      };
      dispatch(saveToPlacedStudents(updatedUserDetails));
    } else {
      toast.error("Please fill all the placement details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchStudent = () => {
    if (!rollNumber.trim()) {
      toast.error("Please enter a roll number.");
      return;
    }
    dispatch(getStudentDetails(rollNumber));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <section className="authPage">
          <div className="container">
            <div className="inputTag">
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter Roll Number"
              />
            </div>
            <button className="btn" onClick={handleSearchStudent} disabled={loading || !rollNumber.trim()}>
              Find User
            </button>

            {selectedStudentDetails && selectedStudentDetails.student ? (
              <div className="container">
                <form onSubmit={handleSubmit}>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label htmlFor="name">Student Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label htmlFor="rollnumber">Roll Number:</label>
                    <input
                      type="text"
                      id="rollnumber"
                      name="rollnumber"
                      value={formData.rollnumber}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="dept">Department:</label>
                    <input
                      type="text"
                      id="dept"
                      name="dept"
                      value={formData.dept}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="programme">Programme of Study:</label>
                    <input
                      type="text"
                      id="programme"
                      name="programme"
                      value={formData.programme}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="gender">Gender:</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="yop">Year of Passing:</label>
                    <input
                      type="text"
                      id="yop"
                      name="yop"
                      value={formData.yop}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="placementType">Placement Type:</label>
                    <select
                      id="placementType"
                      name="placementType"
                      value={formData.placementType}
                      onChange={handleInputChange}
                    >
                      <option value="full-time">Full-time</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div className="inputTag">
                    <label htmlFor="company">Company:</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="salary">Salary:</label>
                    <input
                      type="number"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="inputTag">
                    <label htmlFor="socialcategory">Social Category:</label>
                    <select
                      id="socialcategory"
                      name="socialcategory"
                      value={formData.socialcategory}
                      onChange={handleInputChange}
                    >
                      {categoryArray.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>

                <div>
                  <p>Current Status: {locked ? "Locked" : "Unlocked"}</p>
                  <button className="btn" onClick={handleLockUnlock}>
                    {locked ? "Unlock Student" : "Lock Student"}
                  </button>

                  <button className="btn" onClick={handleSaveToPlacedStudents}>
                    Save to Placed Students
                  </button>
                </div>
              </div>
            ) : (
              <p>No student details available. Please search using roll number.</p>
            )}
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
export default Placedform; 
