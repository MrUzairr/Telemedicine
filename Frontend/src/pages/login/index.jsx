import React, { useState, useEffect } from "react";
import "./index.css";
import GoogleLogin from "../../components/googleLogin/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { login } from "../../api";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { visitDoctor } from "../../api"; // Assuming this is your API call to fetch doctors

const handleError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const Login = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin />
    </GoogleOAuthProvider>
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState([]); // Store fetched doctors
  const [loading, setLoading] = useState(false);

  // Fetch doctors in useEffect
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await visitDoctor();
        setDoctors(response.data.data); // Set doctor data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch doctor details.");
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(5, "Password must be at least 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await login(data); // Assuming `login` is your API call
        console.log("Login Response:", response);

        if (response && response.data) {
          const { isAdmin } = response.data;
          const { isDoctor } = response.data;
          console.log("Doctor",isDoctor);
          const loggedInUser = response.data;
          console.log("Response",response.data)
          console.log("Doctor role",loggedInUser.isDoctor);
          if (typeof isAdmin !== "undefined") {
            // Save admin status to localStorage
            localStorage.setItem("adminAuth", JSON.stringify(isAdmin));
          } else if(typeof isDoctor !== "undefined"){
            localStorage.setItem("doctorAuth", JSON.stringify(isDoctor));

          } 
          else{
            console.warn("isAdmin property is undefined in response data.");
            handleError("An unexpected issue occurred. Please contact support.");
            setError("An unexpected issue occurred. Please contact support.");
            return;
          }

          let user = {
            _id: loggedInUser._id,
            email: loggedInUser.email,
            auth: loggedInUser.auth,
            token: loggedInUser.token,
          };
          if(isDoctor){
            user = {
              _id: loggedInUser._id,
              email: loggedInUser.email,
              auth: loggedInUser.auth,
              fullName: loggedInUser.fullName,
              token: loggedInUser.token,
            };
          }
          dispatch(setUser(user));
          console.log("user",user)

          // Check if the logged-in user is a doctor
          // Compare user ID with doctor list
          
          // Navigate based on roles
          if (isAdmin) {
            navigate("/admin"); // Admin dashboard
          } else if (isDoctor) {
            navigate("/doctor"); // Doctor dashboard
          } else {
            navigate("/"); // Regular user dashboard
          }
        } else {
          console.warn("Response data is undefined or invalid.");
          handleError("Invalid email or password");
          setError("Invalid email or password");
        }
      } catch (err) {
        console.error("Login Error:", err);

        if (err.response) {
          // Backend responded with an error
          if (err.response.status === 401 && err.response.data.error === "Incorrect password") {
            handleError("Incorrect password, please try again.");
            setError("Incorrect password, please try again.");
          } else if (err.response.status === 404 && err.response.data.error === "Email not found") {
            handleError("Email not found, please check your email or sign up.");
            setError("Email not found, please check your email or sign up.");
          } else {
            handleError("Server error occurred, please try again later.");
            setError("Server error occurred, please try again later.");
          }
        } else if (err.request) {
          // No response received from the backend
          handleError("No response from the server. Please check your connection.");
          setError("No response from the server. Please check your connection.");
        } else {
          // Something else went wrong
          handleError(`Unexpected error: ${err.message}`);
          setError(`Unexpected error: ${err.message}`);
        }
      }
    },
  });

  return (
    <div className="reg-container">
      <div className="reg-data">
        <h2>Sign in to your account</h2>
        <form onSubmit={formik.handleSubmit} className="reg-form">
          <label className="reg-labels" htmlFor="email">
            Email*
          </label>
          <input
            className={`reg-inputs form-control ${formik.touched.email && formik.errors.email ? "error" : ""}`}
            type="text"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="email"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="errorMessage">{formik.errors.email}</div>
          ) : null}

          <label className="reg-labels" htmlFor="password">
            Password*
          </label>
          <input
            className={`reg-inputs form-control ${formik.touched.password && formik.errors.password ? "error" : ""}`}
            type="password"
            id="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errorMessage">{formik.errors.password}</div>
          ) : null}

          <button type="submit" className="reg-submit">
            Login
          </button>
          <GoogleWrapper />
          <div className="reg-create-account">
            <a className="create-account" href="/signup">
              Create new account
            </a>
            <div>
              {error && <p className="errorMessage"><ToastContainer /></p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



// Without doctor rendering

// import React, { useState } from "react";
// import "./index.css";
// import GoogleLogin from "../../components/googleLogin/index";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { useFormik } from "formik";
// import * as Yup from "yup"; // For validation
// import { login } from "../../api";
// import { setUser } from "../../store/userSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 

// const handleError = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   });
// };

// const Login = () => {
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
//   const GoogleWrapper = () => (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <GoogleLogin />
//     </GoogleOAuthProvider>
//   );

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   // Formik Configuration
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string().min(5, "Password must be at least 6 characters").required("Required"),
//     }),
//     onSubmit: async (values) => {
//       const data = {
//         email: values.email,
//         password: values.password,
//       };

//       try {
//         const response = await login(data); // Assuming `login` is your API call
//         console.log("Login Response:", response);

//         if (response && response.data) {
//           const isAdmin = response.data.isAdmin;

//           if (typeof isAdmin !== "undefined") {
//             // Save admin status to localStorage
//             localStorage.setItem("adminAuth", JSON.stringify(isAdmin));
//           } else {
//             console.warn("isAdmin property is undefined in response data.");
//             handleError("An unexpected issue occurred. Please contact support.");
//             setError("An unexpected issue occurred. Please contact support.");
//             return;
//           }

//           const user = {
//             _id: response.data._id,
//             email: response.data.email,
//             auth: response.data.auth,
//             token: response.data.token,
//           };
//           dispatch(setUser(user));

//           // Navigate based on admin status
//           navigate(isAdmin ? "/admin" : "/");
//         } 
//         else {
//           console.warn("Response data is undefined or invalid.");

//             handleError("Invalid email or password");
//             setError("Invalid email or password");
          
//         }
//       } catch (err) {
//         console.error("Login Error:", err);

//         if (err.response) {
//           // Backend responded with an error
//           if (err.response.status === 401 && err.response.data.error === "Incorrect password") {
            
//             handleError("Incorrect password, please try again.");
//             setError("Incorrect password, please try again.");
//           } else if (err.response.status === 404 && err.response.data.error === "Email not found") {
//             handleError("Email not found, please check your email or sign up.");
//             setError("Email not found, please check your email or sign up.");
//           } else {
//             handleError("Server error occurred, please try again later.");
//             setError("Server error occurred, please try again later.");
//           }
//         } else if (err.request) {
//           // No response received from the backend
//           handleError("No response from the server. Please check your connection.");
//           setError("No response from the server. Please check your connection.");
//         } else {
//           // Something else went wrong
//           handleError(`Unexpected error: ${err.message}`);
//           setError(`Unexpected error: ${err.message}`);
//         }
//       }
//     },
//   });

//   return (
//     <div className="reg-container">
//       <div className="reg-data">
//         <h2>Sign in to your account</h2>
//         <form onSubmit={formik.handleSubmit} className="reg-form">
//           <label className="reg-labels" htmlFor="email">
//             Email*
//           </label>
//           <input
//             className={`reg-inputs form-control ${formik.touched.email && formik.errors.email ? "error" : ""}`}
//             type="text"
//             id="email"
//             value={formik.values.email}
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             name="email"
//             required
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="errorMessage">{formik.errors.email}</div>
//           ) : null}

//           <label className="reg-labels" htmlFor="password">
//             Password*
//           </label>
//           <input
//             className={`reg-inputs form-control ${formik.touched.password && formik.errors.password ? "error" : ""}`}
//             type="password"
//             id="password"
//             value={formik.values.password}
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             name="password"
//             required
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="errorMessage">{formik.errors.password}</div>
//           ) : null}

//           <button type="submit" className="reg-submit">
//             Login
//           </button>
//           <GoogleWrapper />
//           <div className="reg-create-account">
//             <a className="create-account" href="/signup">
//               Create new account
//             </a>
//             <div>
//               {error && <p className="errorMessage"><ToastContainer /></p>}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import "./index.css";
// import GoogleLogin from "../../components/googleLogin/index";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { useFormik } from "formik";
// import * as Yup from "yup"; // For validation
// import { login } from "../../api";
// import { setUser } from "../../store/userSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 

// const handleError = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   });
// };
// toast.success("Success message!", {
//   position: "top-center",
//   autoClose: 3000,
// });

// const Login = () => {
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
   
//   const GoogleWrapper = ()=>(
// 		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// 			<GoogleLogin></GoogleLogin>
// 		</GoogleOAuthProvider>
// 	)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   // Formik Configuration
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string().min(5, "Password must be at least 6 characters").required("Required"),
//     }),
//     onSubmit: async (values) => {
//       const data = {
//         email: values.email,
//         password: values.password,
//       };
    
//       try {
//         const response = await login(data); // Assuming `login` is your API call
//         console.log("Login Response:", response);
  
//         if (response && response.data) {
//           const isAdmin = response.data.isAdmin;
  
//           if (typeof isAdmin !== "undefined") {
//             // Save admin status to localStorage
//             localStorage.setItem("adminAuth", JSON.stringify(isAdmin));
//           } else {
//             console.warn("isAdmin property is undefined in response data.");
//             handleError("An unexpected issue occurred. Please contact support.");
//             setError("An unexpected issue occurred. Please contact support.");
//             return;
//           }
  
//           const user = {
//             _id: response.data._id,
//             email: response.data.email,
//             auth: response.data.auth,
//             token: response.data.token,
//           };
//           dispatch(setUser(user));
  
//           // Navigate based on admin status
//           if (isAdmin) {
//             navigate("/admin");
//           } else {
//             navigate("/");
//           }
//         } else {
//           console.warn("Response data is undefined or invalid.");
//           handleError("User not found, Please create an account.");
//           setError("User not found, Please create an account.");
//         }
//       } catch (err) {
//         console.error("Login Error:", err);
  
//         if (err.response) {
//           // Backend responded with an error
//           if (err.response.status === 401 && err.response.data.error === "Incorrect password") {
//             handleError("Incorrect password, please try again.");
//             setError("Incorrect password, please try again.");
//           } else if (err.response.status === 404) {
//             handleError("User not found, Please create an account.");
//             setError("User not found, Please create an account.");
//           } else {
//             handleError("Server error occurred, please try again later.");
//             setError("Server error occurred, please try again later.");
//           }
//         } else if (err.request) {
//           // No response received from the backend
//           handleError("No response from the server. Please check your connection.");
//           setError("No response from the server. Please check your connection.");
//         } else {
//           // Something else went wrong
//           handleError(`Unexpected error: ${err.message}`);
//           setError(`Unexpected error: ${err.message}`);
//         }
//       }
//     },
//     // onSubmit: async (values) => {
//     //   const data = {
//     //     email: values.email,
//     //     password: values.password,
//     //   };
    
//     //   try {
//     //     const response = await login(data);
//     //     console.log("response", response);
    
//     //     localStorage.setItem("adminAuth", JSON.stringify(response.data.isAdmin));
    
//     //     if (response.status === 200) {
//     //       const user = {
//     //         _id: response.data._id,
//     //         email: response.data.email,
//     //         auth: response.data.auth,
//     //       };
//     //       dispatch(setUser(user));
//     //       if (JSON.parse(localStorage.getItem("adminAuth"))) {
//     //         navigate("/admin");
//     //       } else {
//     //         navigate("/");
//     //       }
//     //     }
//     //   } catch (err) {
//     //     // Handle specific error codes from backend
//     //     setError(err.message);
      
//     //   }

//     // },
    
//   });

//   return (
//     <div className="reg-container">
//       <div className="reg-data">
//         <h2>Sign in to your account</h2>
//         <form onSubmit={formik.handleSubmit} className="reg-form">
//           <label className="reg-labels" htmlFor="email">
//             Email*
//           </label>
//           <input
//             className={`reg-inputs form-control ${formik.touched.email && formik.errors.email ? "error" : ""}`}
//             type="text"
//             id="email"
//             value={formik.values.email}
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             name="email"
//             required
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="errorMessage">{formik.errors.email}</div>
//           ) : null}

//           <label className="reg-labels" htmlFor="password">
//             Password*
//           </label>
//           <input
//             className={`reg-inputs form-control ${formik.touched.password && formik.errors.password ? "error" : ""}`}
//             type="password"
//             id="password"
//             value={formik.values.password}
//             onBlur={formik.handleBlur}
//             onChange={formik.handleChange}
//             name="password"
//             required
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="errorMessage">{formik.errors.password}</div>
//           ) : null}

//           <button type="submit" className="reg-submit">
//             Login
//           </button>
//           <GoogleWrapper/>
//           <div className="reg-create-account">
//             <a className="create-account" href="/signup">
//               Create new account
//             </a>
//             <div>
//             {error && <p className="errorMessage"><ToastContainer /></p>}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import "./index.css";
// import GoogleLogin from '../../components/googleLogin/index';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { useFormik } from 'formik'; 
// import {login} from '../../api';
// import { setUser } from '../../store/userSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error,setError] = useState('');

//   const navigate  = useNavigate ();
//   const dispatch = useDispatch();
  
//   const GoogleWrapper = ()=>(
// 		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// 			<GoogleLogin></GoogleLogin>
// 		</GoogleOAuthProvider>
// 	)
//   // Update handleRegister to prevent default form submission
//   const handleLogin = async() =>{
//     const data = {
//         email:values.email,
//         password:values.password
//     }

//     const response = await login(data);
    
//     if(response.status === 200){
//         // 1. setUser
//         const user = {
//             _id: response.data.user._id,
//             email: response.data.user.email,
//             auth: response.data.auth
//         }

//         dispatch(setUser(user));
//         // 2. redirect -> homepage
//         if(response.data.user.isAdmin){
//           navigate('/admin');
//         }else{
//           navigate('/');
//         }
//     }
//     else if(response.code === 'ERR_BAD_REQUEST'){
//         // display error message
//         setError(response.response.data.message)
//     }
// }
// const {values, touched, handleBlur, errors} = useFormik({
//   initialValues: {
//       email: '',
//       password: ''
//   }
// });
//   // const handleLogin = async (e) => {
//   //   e.preventDefault(); // Prevent the default form submission

//   //   const user = {
//   //     email,
//   //     password,
//   //   };
//   //   console.log(user)

//   //   try {
//   //     const response = await fetch("http://localhost:3005/api/login", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(user),
//   //     });

//   //     const result = await response.json();
//   //     console.log(result); // Log the result from the API
//   //     if(result.isAdmin == true){
//   //       window.location.href = "/admin"
//   //     }
//   //     else{
//   //       localStorage.setItem("authToken",JSON.stringify(result.token))
//   //       window.location.href = "/"
//   //     }
//   //   } catch (error) {
//   //     console.log(error); // Log any error
//   //   }
//   // };

//   return (
//     <div className="reg-container">
//       <div className="reg-data">
//         <h2>Sign in to your account</h2>
//         <form onSubmit={handleLogin} className="reg-form">
//           <label className="reg-labels" htmlFor="email">
//             Email*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="email"
//             value={email}
//             onBlur={handleBlur}
//             onChange={(e) => setEmail(e.target.value)}
//             name="email"
//             error={errors.email && touched.email? 1: undefined}
//             errormessage={errors.email}
//             required
//           />
//           <label className="reg-labels" htmlFor="password">
//             Password*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="password"
//             id="password"
//             value={password}
//             onBlur={handleBlur}
//             onChange={(e) => setPassword(e.target.value)}
//             error={errors.password && touched.password? 1: undefined}
//             errormessage={errors.password}
//             name="password"
//             required
//           />
//           <button type="submit" className="reg-submit">
//             Login
//           </button>
//           <GoogleWrapper/>
//           <div className="reg-create-account">
//           <a className="create-account" href="/signup">create new account</a>
//           {error != ''? <p className={'errorMessage'}>{error}</p>:''}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

