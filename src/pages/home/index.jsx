import React from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import Slider from "../../components/slider";
import ReactStars from "react-rating-stars-component";

const Home = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      {/* navbar */}
      <div className="home-front">
        <div>
          <Navbar />
        </div>
      </div>
      {/* Front view */}

      <div className="home-body">
        <h2 className="home-body-top-content">
          {" "}
          <h2 className="home-body-top-content">
            For your physical health. For your{" "}
            <a href="#" style={{ color: "#17AF2D" }}>
              mental health
            </a>
            . For{" "}
            <a href="#" style={{ color: "#008CAF" }}>
              clinicians
            </a>
            . For{" "}
            <a href="#" style={{ color: "#6240E8" }}>
              hospitals
            </a>
            . For all of it in one place. For life.
          </h2>
        </h2>
      </div>
      {/* Card Section */}

      <div className="home-body-card-part">
        <div className="home-body-cards">
          <div className="home-body-cards-content">
            <h4>Doctors</h4>
            <p>Anytime, anywhere, anything care</p>
            <a href=""> Get care now</a>
          </div>
          <div className="home-body-cards-image">
            <img src={"doctor-card-pic.jpg"} alt="doctor-card-pic.jpg" />
          </div>
        </div>
        <div className="home-body-cards">
          <div className="home-body-cards-content">
            <h4>Doctors</h4>
            <p>Anytime, anywhere, anything care</p>
            <a href=""> Get care now</a>
          </div>
          <div className="home-body-cards-image">
            <img src={"doctor-card-pic.jpg"} alt="doctor-card-pic.jpg" />
          </div>
        </div>
        <div className="home-body-cards">
          <div className="home-body-cards-content">
            <h4>Doctors</h4>
            <p>Anytime, anywhere, anything care</p>
            <a href=""> Get care now</a>
          </div>
          <div className="home-body-cards-image">
            <img src={"doctor-card-pic.jpg"} alt="doctor-card-pic.jpg" />
          </div>
        </div>
      </div>
      {/* About Section */}

      <div className="home-body-about">
        <h2>A high-quality care experience—anywhere, anytime</h2>
        <p>
          It started with a simple yet revolutionary idea. That everyone should
          have access to the best healthcare anywhere in the world on their
          terms. That includes you.
        </p>
        <a href="">About us</a>
      </div>
      {/* Slider Section */}

      <div className="home-body-slider">
        <Slider />
      </div>
      {/* Review Section */}

      <div className="home-body-review">
        <div className="home-body-review-heading">
          <h2>Our Customers love us</h2>
          <p>Check out the reviews from our satisfied customers</p>
        </div>
        <div className="home-body-review-card">
          <div className="home-body-review-card-data">
            <ReactStars
              classNames={"home-body-review-card-data-stars"}
              count={5}
              value={4.5}
              // onChange={ratingChanged}
              size={32}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <p>
              "Great platform, very efficient and works really well on both
              phone and web. I think this is the most easiest way of booking
              appointments in Pakistan as it has made the whole process much
              more efficient."
            </p>
            <img src="doctor-card-pic.jpg" alt="doctor-card-pic.jpg" />
            <h5>Umar</h5>
          </div>
          <div className="home-body-review-card-data">
            <ReactStars
              classNames={"home-body-review-card-data-stars"}
              count={5}
              value={4.5}
              // onChange={ratingChanged}
              size={32}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <p>
              "Great platform, very efficient and works really well on both
              phone and web. I think this is the most easiest way of booking
              appointments in Pakistan as it has made the whole process much
              more efficient."
            </p>
            <img src="doctor-card-pic.jpg" alt="doctor-card-pic.jpg" />
            <h5>Umar</h5>
          </div>
          <div className="home-body-review-card-data">
            <ReactStars
              classNames={"home-body-review-card-data-stars"}
              count={5}
              value={4.5}
              // onChange={ratingChanged}
              size={32}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <p>
              "Great platform, very efficient and works really well on both
              phone and web. I think this is the most easiest way of booking
              appointments in Pakistan as it has made the whole process much
              more efficient."
            </p>
            <img src="doctor-card-pic.jpg" alt="doctor-card-pic.jpg" />
            <h5>Umar</h5>
          </div>
        </div>
      </div>
      {/* Cmp Section */}

      <div className="home-body-cmp-container">
        <h2>This is whole-person care.</h2>
        <a href="">Get started</a>
      </div>
      {/* Footer Section */}

      <div className="home-body-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Telemed</h2>
            <p>Your trusted telemedicine platform</p>
          </div>

          <div className="footer-links">
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <p>Contact Us:</p>
            <ul>
              <li>Email: contact@telemed.com</li>
              <li>Phone: +123-456-7890</li>
            </ul>
          </div>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Telemed. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
