import React from "react";
import BgVideo from '../bgvideo.mp4';


const Hero = () => {
  return (
    <section className="hero">
      <video autoPlay muted loop className="background-video">
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <h1>Training and Placement Cell</h1>
      <h4>
        School of Engineering, Tezpur University
      </h4>
      <div className="box">

        <div className="para">

          Besides producing quality-oriented manpower, Tezpur University also facilitates appropriate utilization of such personnel. Acting as the interface, the Training & Placement Cell of the University facilitates the process of placement of students passing out from the Institute besides collaborating with leading organizations and institutes in setting up of internship and training program of students.
          The office liaises with various industrial establishments, corporate houses etc which conduct campus interviews and select graduate and post-graduate students from all disciplines.
        </div>

      </div>
      {/* Button for PDF Placement Brochure */}
      <a href={`${import.meta.env.VITE_BACKEND_URL}/uploads/documents/placementbrochure.pdf`} target="_blank" rel="noopener noreferrer">
        <button className="btn-brochure">Placement Brochure 2025</button>
      </a>

    </section>
  );
};

export default Hero;
