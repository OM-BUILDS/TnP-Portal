import React from "react";

import imga from "../images/contact_peoples/chairman.jpg";
import imgb from "../images/contact_peoples/deputy_director.jpg"
import imgc from "../images/contact_peoples/nkoffice.png"
import imgd from "../images/contact_peoples/rkb.jpg"

const TopNiches = () => {
  const services = [
    {
      id: 1,
      img: imga,
      name: "Prof. Sankar Chandra Deka, FRSC",
      
      post: "Chairman, T&PC, TU",
      designation: "Professor"
    },
    {
      id: 2,
      name: "Dr. Ratul Kumar Baruah",
      img: imgd,
      post: "Faculty In-charge, T&PC, SoE",
      designation: "Associate Professor"
    },
    {
      id: 3,
      name: "Dr. Pijush Chandra Das",
      img: imgb,
      post: "Deputy Director, T&PC, SoE",
      designation: "Deputy Director"
      
    },
    {
      id: 4,
      name: "Mr. Nayan kalita",
      img: imgc,
      post: "Office Staff, T&PC, SoE",
      designation: "Multi-Tasking Staff"
      
    },

  ];

  return (
    <section className="services" id="contact">
      <h3>Contact Information, Training & Placement Cell</h3>
      <div className="grid">
        {services.map((element) => {
          return (
            <div className="card" key={element.id}>
              <img src={element.img} alt="profile pic" />
              <div>
                <h4>{element.name}</h4>
                <p>Role: {element.post}</p>
                <p>Designation: {element.designation}</p>
                </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;
