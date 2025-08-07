import React from 'react';
import Swal from 'sweetalert2';

export default function ContactUs() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d60135d2-391e-48f5-a790-2d204125992e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "Success",
        text: "Message sent successfully!",
        icon: "success"
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <section className="contactus-section">
        <div className="contactus-container">
          {/* Contact Form Section */}
          <div className="contactus-form-container">
            <form onSubmit={onSubmit}>
              <h2>Contact Us</h2>
              <div className="contactus-inputTag">
                <label>Company Name</label>
                <input
                  type="text"
                  className="contactus-field"
                  placeholder="Company Name"
                  name="company_name"
                  required
                />
              </div>
              <div className="contactus-inputTag">
                <label>Name</label>
                <input
                  type="text"
                  className="contactus-field"
                  placeholder="Your Name"
                  name="name"
                  required
                />
              </div>
              <div className="contactus-inputTag">
                <label>Email Address</label>
                <input
                  type="email"
                  className="contactus-field"
                  placeholder="Your Email Address"
                  name="email"
                  required
                />
              </div>
              <div className="contactus-inputTag">
                <label>Mobile Number</label>
                <input
                  type="number"
                  className="contactus-field"
                  placeholder="Your Mobile Number"
                  name="mobile"
                  required
                />
              </div>
              <div className="contactus-inputTag">
                <label>Designation</label>
                <input
                  type="text"
                  className="contactus-field"
                  placeholder="Your Designation"
                  name="designation"
                  required
                />
              </div>
              <div className="contactus-inputTag">
                <label>Message</label>
                <input
                  type="text"
                  className="contactus-field"
                  placeholder="Message"
                  name="message"
                  required
                />
              </div>
              <button type="submit">Send message</button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="contactus-info-container">
            <div className="contactus-info-item">
              <div className="contactus-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </div>
              <div className="contactus-info-text">
                <h6>Phone</h6>
                <p>+91-9678003942&nbsp;</p>
              </div>
            </div>
            <div className="contactus-info-item">
              <div className="contactus-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-envelope">
                  <path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3zm2 0v10h10V3H3zm1 2h8a.5.5 0 0 1 .354.854L8 9.707l-4.354-4.354A.5.5 0 0 1 4 5z" />
                </svg>
              </div>
              <div className="contactus-info-text">
                <h6>Email</h6>
                <p>
                  <a href="mailto:tuplacement1@gmail.com">tuplacement1@gmail.com</a><br />
                </p>
                <p>
                  <a href="mailto:pijush@tezu.ernet.in">pijush@tezu.ernet.in</a><br />
                </p>
              </div>
            </div>
            <div className="contactus-info-item">
              <div className="contactus-info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-pin">
                  <path d="M8 0a4 4 0 0 0-4 4c0 2.2 2 4.68 4 7.4 2-2.72 4-5.2 4-7.4a4 4 0 0 0-4-4zm0 6.1c-.87 0-1.4-.6-1.4-1.4 0-.81.54-1.4 1.4-1.4s1.4.6 1.4 1.4c0 .8-.54 1.4-1.4 1.4z" />
                </svg>
              </div>
              <div className="contactus-info-text">
                <h6>Location</h6>
                <p>
                  Training and Placement Cell,
                  <br />
                  School Of Engineering,<br/>
                  Tezpur University,<br />
                  Assam, India - 784028
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
