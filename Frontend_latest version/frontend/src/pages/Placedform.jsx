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
import Modal from "../components/Modal"; 

const Placedform = ({ isOpen, onClose }) => {
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
    dispatch(getStudentDetails(rollNumber));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {selectedStudentDetails && selectedStudentDetails.student ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="wrapper">
              {/* Form Inputs (as before) */}
              {/* Include the input fields for name, roll number, etc. */}
              {/* ... */}
            </div>

            <div>
              <p>Current Status: {locked ? "Locked" : "Unlocked"}</p>
              <button className="btn" type="button" onClick={handleLockUnlock}>
                {locked ? "Unlock Student" : "Lock Student"}
              </button>

              <button className="btn" type="button" onClick={handleSaveToPlacedStudents}>
                Save to Placed Students
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>No student details available. Please search using roll number.</p>
      )}
    </Modal>
  );
};

export default Placedform;
