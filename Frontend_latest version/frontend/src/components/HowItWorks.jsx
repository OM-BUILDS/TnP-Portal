import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
import { FaWatchmanMonitoring } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi";



const HowItWorks = () => {
  return (
    <section className="howItWorks">

      <h3>Why Recruit from School of Engineering, Tezpur University?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>The Facilitating Interface</h4>
          <p>
            One of the unique features of the University is its commitment not only to produce quality manpower, but also to guide and shape the career of the students. In order to meet this objective, the University has a Training & Placement Cell which acts as the interface between the recruiting organizations and the University students. It facilitates recruitment events on-campus as well as off-campus as required. It also organizes various pre-placement training programmes to enhance the employability of the targeted students.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>A Proven Track Record</h4>
          <p>
            A number of past students of the University are now occupying highly responsible positions in various reputed and prestigious organizations including MNCs, PSUs, banks, Govt. organizations, institutions of learning etc. in various places of the globe. The University maintains a vibrant industry-academia relationship and the suggestions of the experts are taken as tools for its continuous improvement. As per feedback received from the employers, the University alumni are remarkably high in professionalism, intelligence and job-interestedness and therefore they are worthy of their fast track records.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Highly Conducive Campus</h4>
          <p>
            The serene nature of the campus and its existence away from the city make the environment more pleasant and conducive for pursuit of education. The campus is self-contained with all facilities of modern township. As a result, the morale of the students remains high and confident, oblivious to the politics of student life. Equipped with the carefully and rigorously nurtured skill buttressed by their honesty, sincerity and integrity, the students prepare themselves to be assets to their employers in the life ahead.
          </p>
        </div>

        <div className="card">
          <div className="icon">
            <FaWatchmanMonitoring />
          </div>
          <h4>Close-knit Monitoring </h4>
          <p>
            While the residential nature of the University gives ample opportunity to the teachers and students to spend more time in the pursuit of teaching-learning, the non-affiliating quality facilitates more concentration on focused training and research. The teacher : student ratio in this University is one of the lowest in the country and therefore it provides for more attention to the student and a perfect atmosphere for one-to-one discussion.
          </p>
        </div>

        <div className="card">
          <div className="icon">
            <HiBriefcase />
          </div>
          <h4>Facilities for recruiters</h4>
          <p>
            Large classrooms and Halls for Pre-Placement talks and written tests
            Fully equipped computer labs for online tests.
            Air Conditioned rooms for Group Discussions, Video-Conferencing and Interviews.
            High Speed internet connection Facility (for submission of soft copies of resumes, Mails for correspondence, etc.)
            Student Volunteers for prompt actions on the Placement Day.
            Guest house and lodging facilities.
            Best of Hospitality amid lush green Campus.
          </p>
        </div>

      </div>



    </section>
  );
};

export default HowItWorks;
