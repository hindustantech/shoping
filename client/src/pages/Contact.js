import React from "react";
import '../css/Contact.css'
import Layout from "../components/Layout/Layout";
const Contact = () => {
  return (
    <Layout>
      <section>
        <div className="section-header">
          <div className="container">
            <h2>Contact Us</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fas fa-home" />
                </div>
                <div className="contact-info-content">
                  <h4>Address</h4>
                  <p>
                    4671 Sugar Camp Road,
                    <br /> Owatonna, Minnesota, <br />
                    55060
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fas fa-phone" />
                </div>
                <div className="contact-info-content">
                  <h4>Phone</h4>
                  <p>571-457-2321</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="contact-info-content">
                  <h4>Email</h4>
                  <p>ntamerrwael@mfano.ga</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form action id="contact-form">
                <h2>Send Message</h2>
                <div className="input-box">
                  <input type="text" required="true" name />
                  <span>Full Name</span>
                </div>
                <div className="input-box">
                  <input type="email" required="true" name />
                  <span>Email</span>
                </div>
                <div className="input-box">
                  <textarea required="true" name defaultValue={""} />
                  <span>Type your Message...</span>
                </div>
                <div className="input-box">
                  <input type="submit" defaultValue="Send" name />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
