import React,{useState,useEffect} from "react";
import "./index.css";
import { PiSignInBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars,faTimes  } from '@fortawesome/free-solid-svg-icons'
import { CgLogOut } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signout } from "../../api";
import { resetUser } from "../../store/userSlice";


const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showCross, setShowCross] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

    const dispatch = useDispatch();
    const handleSignout = async() => {
      await signout();
      dispatch(resetUser());
    }

    const isAuthenticated = useSelector(state => state.user.auth);
  const handleRegister = () => {
    window.location.href = "/signup";
  };
  const handleSymptoms = () => {
    window.location.href = "/symptoms";
  };

  const handleSignIn = () => {
    window.location.href = "/signin";
  };

    useEffect(() => {

    // Cleanup interval when component unmounts
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

            <div className={`nav-logo-div ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}>
              <h4 className="nav-logo">Telemedicine</h4>
            </div>
            <div className="nav-functions">
              {isAuthenticated ? (
                // Render Logout button when logged in
                 <div className="nav-sign nav-sign3">
                 <button className="nav-logout" onClick={handleSignout}>
                    <CgLogOut className="logout-icon nav-signin-logo" />
                    <span className="logout-text">Logout</span>
                  </button>
                  <button className="nav-logout" onClick={handleSymptoms}>
                    <img src="/images/generative.png" className="logout-icon nav-signin-logo ai-icon" />
                    <span className="logout-text">Search with AI</span>
                  </button>

               </div>
              ) : (
               
                // Render Sign in and Register buttons when not logged in
                <>
                  <a
                    className="nav-sign nav-sign1"
                    style={{ color: "#000", textDecoration: "none" }}
                    onClick={handleSignIn}
                  >
                    <span className="nav-signin-logo">
                      <PiSignInBold />
                    </span>{" "}
                    Sign in
                  </a>
                  <div className="nav-sign">
                    <button className="nav-register" onClick={handleRegister}>
                      Register now
                    </button>
                  </div>
                </>
              )}
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
