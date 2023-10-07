import React from "react";
import "../css/About.css";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <section className="section-About">
        <div className="container">
          <div className="row-About row">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="title">Learn More About Our Team</span>
                  <p className="heading-About p-About">
                    {" "}
                    With a focus on quality and innovation, we aim to make your
                    experience memorable.
                  </p>
                </div>
                <div className="text">
                  where innovation and dedication converge to redefine
                  excellence in the world of e-commerce. At ShopGenie , we are
                  more than just an online store; we are a team of passionate
                  individuals committed to delivering exceptional products and
                  services to our valued customers.
                </div>
                <div className="text">
                  With a focus on crafting unique and inspiring solutions, we
                  invite you to join us on this exciting journey. Together,
                  we'll push the boundaries of what's possible in the world of
                  online shopping, making every interaction with us a delightful
                  experience.
                </div>
                <div className="btn-box">
                  <NavLink to="" className="theme-btn btn-style-one">
                    Contact Us
                  </NavLink>
                </div>
              </div>
            </div>
            {/* Image Column */}
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInLeft">
                <div className="author-desc">
                  <h2 className="h2-About">Rupesh Kushwah</h2>
                  <span> CEO , Developer </span>
                </div>
                <figure className="image-1">
                  <NavLink
                    to=""
                    className="lightbox-image"
                    data-fancybox="images"
                  >
                    <img
                      src="https://i.ibb.co/QP6Nmpf/image-1-about.jpg"
                      alt=""
                    />
                  </NavLink>
                </figure>
              </div>
            </div>
          </div>
          <div className="sec-title">
            <h2 className="h2-About">
              We want to lead in E commerce &amp; Delivery{" "}
            </h2>
          </div>
          <div className="text">
            At ShopGenie our vision is to revolutionize the way our customers
            discover and engage with products. We envision a future where every
            interaction with our platform is a personalized and delightful
            experience. Our in-built recommendation system is at the forefront
            of this vision, aiming to redefine the way users shop online
          </div>
          <div className="text">
            We take a small toolkit here and ride it well so that it is fit for
            your use. One who performs well and looks even better.
          </div>
          <div className="text">
            Here we are trying to give you all kinds of technical content,
            whether it is related to designing or functionality. We are creating
            content on a lot of languages and will continue to make it free of
            cost even if you use it without any problem. Which is a very
            important thing.
          </div>
          <div className="text">
            Here you can also share the content you create, if our technical
            team likes it, then we will also share it on our blog.
          </div>
          <div className="text">
            In the end, I would say keep visiting our website and enjoy the
            quality content.
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default About;
