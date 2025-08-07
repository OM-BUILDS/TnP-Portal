import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  userUpdateStatus1,
  saveToPlacedStudents,
  lockedStudent,
} from "../store/slices/userSlice";

const categoryArray = [
  "Scheduled Castes (SC)", "Scheduled Tribes (ST)", "Other Backward Classes (OBC)",
  "Economically Weaker Sections (EWS)", "General",
  "Persons with Disabilities (PwD)"
];

const Modal = ({ isOpen, onClose, onSave, student }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollnumber: "",
    dept: "",
    programme: "",
    yop: "",
    placementType: "full-time",
    socialcategory: "General",
    company: "",
    salary: "",
    position: "",
  });

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        rollnumber: student.rollnumber || "",
        dept: student.dept || "",
        programme: student.programme || "",
        yop: student.yop || "",
        placementType: student.placed ? "full-time" : "internship",
        socialcategory: student.category || "General",
        company: student.company || "",
        salary: student.salary || "",
        position: student.position || "",
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveToPlacedStudents = () => {
    const { placementType, company, salary, position } = formData;
    if (placementType && company && salary && position) {
      const updatedDetails = { ...student, ...formData, placed: true };
      dispatch(saveToPlacedStudents(updatedDetails));
      toast.success("Student details saved to Placed Students");
    } else {
      toast.error("Please fill all the placement details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Update Student Details</h2>
        <section className='modalContainer'>
          <div className='content'>
            <form onSubmit={handleSubmit}>
              <div className="inputTag">
                <label htmlFor="name">Student Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly
                  style={{ backgroundColor: '#f0f0f0' }}
                />
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
                  style={{ backgroundColor: '#f0f0f0' }}
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
                  style={{ backgroundColor: '#f0f0f0' }}
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
                <label htmlFor="position">Position:</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
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
              
              <div>
                <button type="button" className="btn" onClick={handleSaveToPlacedStudents}>
                  Save to Placed Students
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal;
