import React from "react";

import imga from "../images/coordinators/pic.jpg";
import imgb from "../images/coordinators/pic2.jpg";
import imgc from "../images/coordinators/pic3.jpg";
import imgd from "../images/coordinators/pic4.png";
import imge from "../images/coordinators/pic5.jpg";
import imgf from "../images/coordinators/pic6.jpg";
import imgg from "../images/coordinators/pic7.jpg";
import imgh from "../images/coordinators/pic8.png";
import imgi from "../images/coordinators/pic9.jpg";
import imgj from "../images/coordinators/pic10.jpg";
import imgk from "../images/coordinators/Subhankar.jpg";
import imgl from "../images/coordinators/Jyotiraj.jpg";
import imgm from "../images/coordinators/rajarshi.jpg";
import imgn from "../images/coordinators/harshadeephzrika.jpg";
import imgo from "../images/coordinators/rituparna.jpg";
import imgp from "../images/coordinators/sagar.jpg";
import imgq from "../images/coordinators/Udayan.png";
import imgr from "../images/coordinators/bagmita.jpg";
import imgs from "../images/coordinators/anubhov.jpg";
import imgt from "../images/coordinators/arif.jpg";


const Coordinators = () => {
    const studentList = [
        {
            id:1,
            img:imge,
            name:"Om Anand",
            program:"B-Tech CSE",
            department:"Computer Science & Engineering",
            email:"omanand149@gmail.com",
            contact:"+91-6206215595"



        },

        {
            id: 3,
            img: imgo,
            name: "Rituparna Das",
            program: "M-Tech CSE",
            department: "Computer Science & Engineering",
            email: "rituparnad148@gmail.com",
            contact: "+91-6003286461",
        },

        {
            id: 4,
            img: imga,
            name: "Partha Jyoti Cheleng",
            program: "M-Tech CSE",
            department: "Computer Science & Engineering",
            email: "parthajyoti2000@gmail.com",
            contact: "+91-8011501416",
        },

        {
            id: 5,
            img: imgj,
            name: "Kaushal Rajkhungur Basumatary",
            program: "M-Tech IT",
            department: "Computer Science & Engineering",
            email: "kaushalbasumatary21@gmail.com",
            contact: "+91-7002131835",
        },

        {
            id: 6,
            img: imgd,
            name: "Subrojyoti Paul",
            program: "MCA",
            department: "Computer Science & Engineering",
            email: "subrojyotipaul@gmail.com",
            contact: "+91-6033971131",
        },

        {
            id: 7,
            img: imgg,
            name: "Nayanmoni Baruah",
            program: "MCA",
            department: "Computer Science & Engineering",
            email: "nayancoding@gmail.com",
            contact: "+91-9101419696",
        },

        {
            id: 8,
            img: imgc,
            name: "Debjyoti Chowbey",
            program: "B-Tech ECE",
            department: "Electronics & Communication Engineering",
            email: "chowbeydebjyoti@gmail.com",
            contact: "+91-7586923485",
        },

        {
            id: 9,
            img: imgl,
            name: "Jyotiraj Kakati",
            program: "B-Tech Civil Engineering",
            department: "Civil Engineering",
            email: "kakatijyotiraj@gmail.com",
            contact: "+91-7399844189",
        },

        {
            id: 10,
            img: imgh,
            name: "Bichakhyan Chutia",
            program: "B-Tech Civil Engineering",
            department: "Civil Engineering",
            email: "cbichakhyan@gmail.com",
            contact: "+91-8822487271",
        },

        {
            id: 11,
            img: imgt,
            name: "Arif Mohammad Choudhury",
            program: "M-Tech Civil Engineering",
            department: "Civil Engineering",
            email: "arifchy555@gmail.com",
            contact: "+91-9706744482",
        },

        {
            id: 12,
            img: imgf,
            name: "Shourya Kumar Singh",
            program: "B-Tech ECE",
            department: "Electronics & Communication Engineering",
            email: "shouryak647@gmail.com",
            contact: "+91-7667303590",
        },

        {
            id: 13,
            img: imgb,
            name: "Jigyas Handique",
            program: "M-Tech ELDT",
            department: "Electronics & Communication Engineering",
            email: "jigyas.handique@gmail.com",
            contact: "+91-8135816440",
        },

        {
            id: 14,
            img: imgi,
            name: "Chandan Jyoti Hazarika",
            program: "M-Tech Bio Electronics",
            department: "Electronics & Communication Engineering",
            email: "chandanjyotihazarika560@gmail.com",
            contact: "+91-9864442202",
        },

        {
            id: 15,
            img: imga,
            name: "Shreyanshi Kashyap",
            program: "M-Tech Bio Electronics",
            department: "Electronics & Communication Engineering",
            email: "shreyanshi.kashyap@gmail.com",
            contact: "+91-9707762154",
        },

        {
            id: 16,
            img: imgm,
            name: "Rajarshi Dutta",
            program: "B-Tech Electrical Engineering",
            department: "Electrical Engineering",
            email: "duttarajarshi001@gmail.com",
            contact: "+91-8011836608",
        },

        {
            id: 17,
            img: imgq,
            name: "Udayan Mahanta",
            program: "M-Tech Energy Technology",
            department: "Energy",
            email: "udayanmahanta15@gmail.com",
            contact: "+91-8133965889",
        },

        {
            id: 18,
            img: imgn,
            name: "Harshadeep Hazarika",
            program: "B-Tech Food Engineering & Technology",
            department: "Food Engineering & Technology",
            email: "hazarikaharshadeep555@gmail.com",
            contact: "+91-6000101477",
        },

        {
            id: 19,
            img: imgs,
            name: "Anubhov Gogoi",
            program: "B-Tech Mechanical Engineering",
            department: "Mechanical Engineering",
            email: "anubhovgogoi30@gmail.com",
            contact: "+91-6000364503",
        },

        {
            id: 20,
            img: imgp,
            name: "Sagar Das",
            program: "B-Tech Mechanical Engineering",
            department: "Mechanical Engineering",
            email: "sagardas127m@gmail.com",
            contact: "+91-60003473905",
        },

        {
            id: 21,
            img: imgr,
            name: "Bagmita Baishnabi",
            program: "M-Tech Mechanical Engineering",
            department: "Mechanical Engineering",
            email: "bagmita.baishnabi@gmail.com",
            contact: "+91-8761060481",
        },

        {
            id: 22,
            img: imgk,
            name: "Subhankar Maity",
            program: "M-Tech Food Engineering & Technology",
            department: "Food Engineering & Technology",
            email: "subhankarmaity.tu@gmail.com",
            contact: "+91-9775072694",
        },

        

    ];

    const cseList = studentList.filter(element => element.department === 'Computer Science & Engineering');
    const eceList = studentList.filter(element => element.department === 'Electronics & Communication Engineering');
    const eeList = studentList.filter(element => element.department === 'Electrical Engineering');
    const mechList = studentList.filter(element => element.department === 'Mechanical Engineering');
    const civilList = studentList.filter(element => element.department === 'Civil Engineering');
    const fetList = studentList.filter(element => element.department === 'Food Engineering & Technology');
    const energyList = studentList.filter(element => element.department === 'Energy');




    return (
        <section className="coordinators" >
            <h3>Student Placement Co-ordinators, School of Engineering</h3>
            <br />
            <h3>Computer Science Engg. Coordinators</h3>
            <div className="gridprofile">

                {cseList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <br />
            <h3>Electronics & Communication Engg. Coordinators</h3>
            <div className="gridprofile">
                {eceList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>


           

            <br />
            <h3>Mechanical Engg. Coordinators</h3>
            <div className="gridprofile">
                {mechList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <br />
            <h3>Civil Engg. Placement Coordinators</h3>
            <div className="gridprofile">
                {civilList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <br />
            <h3>Food Engg. Technology Coordinators</h3>
            <div className="gridprofile">
                {fetList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <br />
            <h3>Electrical Engg. Coordinators</h3>
            <div className="gridprofile">
                {eeList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            

            <br />
            <h3>Energy Coordinators</h3>
            <div className="gridprofile">
                {energyList.map((element) => {
                    return (
                        <div className="profilecard" key={element.id}>
                            <img src={element.img} alt="profile pic" />
                            <div>
                                <h4>{element.name}</h4>
                                <p>Programme: {element.program}</p>
                                <p>Department: {element.department}</p>
                                <p>Email: {element.email}</p>
                                <p>Contact: {element.contact}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default Coordinators;
