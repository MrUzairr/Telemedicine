import React,{useState,useEffect} from "react";
import "./index.css";
import { PiSignInBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars,faTimes  } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showCross, setShowCross] = useState(false);
    const handleRegister = () => {
         window.location.href = '/signup'
    }
    useEffect(() => {
      if (dropdownVisible) {
        // Delay showing the cross icon by 1 second (1000ms)
        const timer = setTimeout(() => {
          setShowCross(true);
        }, 1000); // Adjust the timeout value as needed (1 second delay)
        return () => clearTimeout(timer); // Cleanup on unmount
      } else {
        setShowCross(false); // Hide the cross icon when dropdown is closed
      }
    }, [dropdownVisible]);
    const handleNav = () => {
      if (window.innerWidth <= 768) { // Check for mobile view
        setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
      }
    };
  return (
    <div>
      <div className="nav-container">
        <div className="nav-body">
          <div className="nav-data">
            <div className="nav-dropdowns">
                <div className="nav-offcanvas">
                <FontAwesomeIcon  icon={dropdownVisible ? faTimes : faBars} className={`menu-icon ${showCross ? "menu-icon1" : ""}`} onClick={handleNav} />
                </div>
              <div className={`dropdowns ${dropdownVisible ? "show" : ""}`}>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Doctors
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <span className="dropdown-item">
                      Find doctor by specialty
                    </span>
                  </li>
                  <li className="dropdown-submenu">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dermatologist
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Dermatologist in Lahore
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dermatologist in Islamabad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dermatologist in Karachi
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Gynecologist
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Gynecologist in Lahore
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Gynecologist in Islamabad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Gynecologist in Karachi
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown-submenu">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Neurologist
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Neurologist in Lahore
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Neurologist in Islamabad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Neurologist in Karachi
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Organizations
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Clinicians
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-sign">
                <button className="nav-register nav-register1" onClick={handleRegister}>Talk to a doctor</button>
              </div>
              </div>
             
            </div>

            <div className="nav-logo-div">
              <h4 className="nav-logo">Telemedicine</h4>
            </div>
            <div className="nav-functions">
              <a className="nav-sign nav-sign1" style={{color:"#000",textDecoration:"none"}} href="/signin">
                <span className="nav-signin-logo">
                  <PiSignInBold />
                </span>{" "}
                Sign in
              </a>
              <div className="nav-sign">
                <button className="nav-register" onClick={handleRegister}>Register now</button>
              </div>
              <div className="nav-sign nav-sign2">
                <button
                  className="btn nav-search"
                  style={{ fontSize: "20px" }}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
                >
                  <IoSearch />
                </button>

                <div
                  className="offcanvas offcanvas-top"
                  data-bs-scroll="true"
                  tabIndex="-1"
                  id="offcanvasWithBothOptions"
                  aria-labelledby="offcanvasWithBothOptionsLabel"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id="offcanvasWithBothOptionsLabel"
                    >
                      Backdrop with scrolling
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <p>
                      Try scrolling the rest of the page to see this option in
                      action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
