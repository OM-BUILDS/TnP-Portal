import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";
import { MultiSelect } from 'react-multi-select-component';

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [yop, setYop] = useState("");
  
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "IT / ITeS",
    "Engineering",
    "Media",
    "Legal",
    "Finance",
    "Sales and Marketing",
    "Operations / Logistics",
    "Human Resources",
    "Consulting",
    "Trading",
    "BPO / BPS",
    "Other",
  ];

  const cities = [
    { label: "B.Tech IN CE", value: "B.Tech IN CIVIL ENGINEERING" },
    { label: "B.Tech IN CSE", value: "B.Tech IN COMPUTER SCIENCE AND ENGINEERING" },
    { label: "M.Tech IN DATA SCIENCE", value: "M.Tech IN DATA SCIENCE" },
    { label: "B.Tech IN ECE", value: "B.Tech IN ELECTRONICS AND COMMUNICATION ENGINEERING" },
    { label: "B.Tech IN EE", value: "B.Tech IN ELECTRICAL ENGINEERING" },
    { label: "B.Tech IN FET", value: "B.Tech IN FOOD ENGINEERING AND TECHNOLOGY" },
    { label: "B.Tech IN ME", value: "B.Tech IN MECHANICAL ENGINEERING" },
    { label: "B.Des.", value: "BACHELORS OF DESIGN (B.DES.)" },
    { label: "M.Tech IN ME", value: "M.Tech IN MECHANICAL ENGINEERING" },
    { label: "M.Tech IN IT", value: "M.Tech IN INFORMATION TECHNOLOGY" },
    { label: "M.Tech IN SEMICONDUCTOR TECHNOLOGY", value: "M.Tech IN SEMICONDUCTOR TECHNOLOGY" },
    { label: "M.Tech IN ELDT", value: "M.Tech IN ELECTRONICS DESIGN AND TECHNOLOGY" },
    { label: "M.Tech IN BIOELECTRONICS", value: "M.Tech IN BIOELECTRONICS" },
    { label: "M.Tech IN ENERGY TECHNOLOGY", value: "M.Tech IN ENERGY TECHNOLOGY" },
    { label: "M.Tech IN FET", value: "M.Tech IN FOOD ENGINEERING AND TECHNOLOGY" },
    { label: "M.Tech IN CE", value: "M.Tech IN CIVIL ENGINEERING" },
    { label: "M.Tech IN CSE", value: "M.Tech IN COMPUTER SCIENCE AND ENGINEERING" },
    { label: "M.Tech IN EE(PES)", value: "M.Tech in Electrical Engineering (Power and Energy Systems)" },
    { label: "MCA", value: "MASTER OF COMPUTER APPLICATION" },
    { label: "M.DES.", value: "MASTER OF DESIGN (M.DES.)" },
    { label: "PHD-CSE", value: "PHD-Computer Science and Engineering" },
    { label: "PHD-ECE", value: "PHD-Electronics and Communication Engineering" },
    { label: "PHD-EE", value: "PHD-Electrical Engineering" },
    { label: "PHD-Energy", value: "PHD-Energy" },
    { label: "PHD-DESIGN", value: "PHD IN DESIGN" },
    { label: "PHD-FET", value: "PHD-Food Engineering and Technology" },
  ];

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();


  
    



    const handlePostJob = (e) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("jobType", jobType);

      // Append location as an array
    selectedDepartments.forEach((dept, index) => {
      formData.append(`location[${index}]`, dept.value);
    });

    const yopArray = yop.split(";").map(item => item.trim()); // Split by semicolon and remove extra spaces
    formData.append("yop", JSON.stringify(yopArray)); // Convert to string to send as JSON

    
      formData.append("companyName", companyName);
      formData.append("introduction", introduction);
      formData.append("responsibilities", responsibilities);
      formData.append("qualifications", qualifications);
      offers && formData.append("offers", offers);
      formData.append("jobNiche", jobNiche);
      formData.append("salary", salary);
      hiringMultipleCandidates &&
        formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
      personalWebsiteTitle &&
        formData.append("personalWebsiteTitle", personalWebsiteTitle);
      personalWebsiteUrl &&
        formData.append("personalWebsiteUrl", personalWebsiteUrl);

      dispatch(postJob(formData));
    };

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllJobErrors());
      }
      if (message) {
        toast.success(message);
        dispatch(resetJobSlice());
      }
    }, [dispatch, error, loading, message]);

    return (
      <div className="account_components">
        <h3>Post A Opportunity</h3>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title || " "}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
        </div>
        <div>
          <label>Opportunity Type</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select Opportunity Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Training">Training</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Talks">Talks</option>
          </select>
        </div>

      

        <div>
        <label>Programme</label>
        <MultiSelect
          options={cities}
          value={selectedDepartments}
          onChange={setSelectedDepartments}
          labelledBy="Select Programme"
        />
        <div>
          Selected Programmes: {selectedDepartments.map(dept => dept.label).join(', ')}
        </div>
      </div>


        <div>
          <label>Organization Name</label>
          <input
            type="text"
            value={companyName || " "}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Organization Name"
          />
        </div>
        <div>
          <label>YOP</label>
          <input
            type="text"
            value={yop || " "}
            onChange={(e) => setYop(e.target.value)}
            placeholder="yop"
          />
        </div>
        <div>
          <label>Opportunity Introduction (Job/Internship/Workshop)</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Opportunity / Job Introduction"
            rows={7}
          />
        </div>
        <div>
          <label>Responsibilities</label>
          <textarea
            value={responsibilities || " "}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="Opportunity Responsibilities / Events"
            rows={7}
          />
        </div>
        <div>
          <label>Qualifications</label>
          <textarea
            value={qualifications || " "}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Required Qualifications For Applying"
            rows={7}
          />
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>What We Offer</label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <textarea
            value={offers || " "}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="What are we offering in return!"
            rows={7}
          />
        </div>
        <div>
          <label>Opportunity Niche</label>
          <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
            <option value="">Select Opportunity Niche</option>
            {nichesArray.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
        </div>
        <div>
          <div className="label-infoTag-wrapper">

            <label>Salary </label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>

          <input
            type="text"
            value={salary || " "}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="50000 - 800000"
          />
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>Hiring Multiple Candidates?</label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <select
            value={hiringMultipleCandidates}
            onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          >
            <option value="">Hiring Multiple Candidates?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>Website Name</label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <input
            type="text"
            value={personalWebsiteTitle || " "}
            onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
            placeholder="Website Name/Title"
          />
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>Website Link (URL)</label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <input
            type="text"
            value={personalWebsiteUrl || " "}
            onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
            placeholder="Website Link (URL)"
          />
        </div>
        <div>
          <button
            style={{ margin: "0 auto" }}
            className="btn"
            onClick={handlePostJob}
            disabled={loading}
          >
            Post Job
          </button>
        </div>
      </div>
    );
  };

  export default JobPost;
