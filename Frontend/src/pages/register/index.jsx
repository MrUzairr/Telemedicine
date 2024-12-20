import React, { useState } from "react";
import "./index.css";
import GoogleRegister from '../../components/googleRegister/index';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FaChevronLeft } from "react-icons/fa";
import { useFormik } from 'formik'; 
import {signup} from '../../api';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  
  const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<GoogleRegister></GoogleRegister>
		</GoogleOAuthProvider>
	)
  // Update handleRegister to prevent default form submission
  const handleSignup = async () => {
    const data = {
      firstname,
      lastname,
      email,
      password,
      zip,
      gender,
      birthdate,
    };

    const response = await signup(data);

    if (response.status === 201) {
      // set User
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      // 2. redirect -> homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    }
  };
  const { values, touched, handleBlur, errors } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      zip: "",
      gender: "",
      birthdate: "",
    }
  });
  // const handleRegister = async (e) => {
  //   e.preventDefault(); // Prevent the default form submission

  //   const user = {
  //     firstname,
  //     lastname,
  //     email,
  //     password,
  //     zip,
  //     gender,
  //     birthdate,
  //   };
  //   console.log(user)

  //   try {
  //     const response = await fetch("http://localhost:3005/api/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });

  //     const result = await response.json();
  //     console.log(result); // Log the result from the API
  //     if(result.isAdmin == true){
  //       window.location.href = "/admin"
  //     }
  //     else{
  //       localStorage.setItem("authToken",JSON.stringify(result.token))
  //       window.location.href = "/"
  //     }
  //   } catch (error) {
  //     console.log(error); // Log any error
  //   }
  // };

  return (
    <div className="reg-container">
      <div className="reg-data">
        <a href="/" className="reg-back"><span><FaChevronLeft/></span> Back</a>
        <h2 className="reg-main-heading">Let’s get started</h2>
        <p className="reg-main-heading-content">
          Enter your information just as it appears on your health insurance
          card or pay stub.
        </p>
        <span className="reg-required">* Required</span>
        <form onSubmit={handleSignup} className="reg-form">
          <label className="reg-labels" htmlFor="firstName">
            First Name*
          </label>
          <input
            className="reg-inputs form-control"
            type="text"
            id="firstName"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            name="firstName"
            required
            error={errors.firstname && touched.firstname ? 1 : undefined}
            errormessage={errors.firstname}
            onBlur={handleBlur}

          />
          <label className="reg-labels" htmlFor="lastName">
            Last Name*
          </label>
          <input
            className="reg-inputs form-control"
            type="text"
            id="lastName"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            name="lastName"
            required
            error={errors.lastname && touched.lastname ? 1 : undefined}
            errormessage={errors.lastname}
            onBlur={handleBlur}
          />
          <label className="reg-labels" htmlFor="email">
            Email*
          </label>
          <input
            className="reg-inputs form-control"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            error={errors.email && touched.email ? 1 : undefined}
            errormessage={errors.email}
            onBlur={handleBlur}
          />
          <label className="reg-labels" htmlFor="password">
            Password*
          </label>
          <input
            className="reg-inputs form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            error={errors.password && touched.password ? 1 : undefined}
            errormessage={errors.password}
            onBlur={handleBlur}
          />
          <label className="reg-labels" htmlFor="zipcode">
            ZIP code*
          </label>
          <input
            className="reg-inputs form-control"
            type="text"
            id="zipcode"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            name="zipcode"
            required
            error={errors.zip && touched.zip ? 1 : undefined}
            errormessage={errors.zip}
            onBlur={handleBlur}
          />
          <label className="reg-labels" htmlFor="gender">
            Gender*
          </label>
          <select
            className="reg-inputs form-control"
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            error={errors.gender && touched.gender ? 1 : undefined}
            errormessage={errors.gender}
            onBlur={handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label className="reg-labels" htmlFor="dateOfBirth">
            Date Of Birth*
          </label>
          <input
            className="reg-inputs form-control"
            type="date"
            id="dateOfBirth"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            name="dateOfBirth"
            required
            error={errors.birthdate && touched.birthdate ? 1 : undefined}
            errormessage={errors.birthdate}
            onBlur={handleBlur}
          />
          <button type="submit" className="reg-submit">
            Next
          </button>
          <GoogleWrapper/>

        </form>
        {error != "" ? <p className={'errorMessage'}>{error}</p> : ""}
      </div>
    </div>
  );
};

export default Register;



// import React, { useState } from "react";
// import "./index.css";

// const Register = () => {
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [zip, setZip] = useState("");
//   const [gender, setGender] = useState("");
//   const [birthdate, setBirthdate] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleRegister() {
//     const user = {
//       firstname,
//       lastname,
//       email,
//       password,
//       zip,
//       gender,
//       birthdate,
//     };
//     try {
//       const response = await fetch("https://localhost:3005/api/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       const result = await response.json();
//       console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="reg-container">
//       <div className="reg-data">
//         <h2>Let’s get started</h2>
//         <p>
//           Enter your information just as it appears on your health insurance
//           card or pay stub.
//         </p>
//         <span>* Required</span>
//         <form action="" className="reg-form">
//           <label className="reg-labels" htmlFor="firstName">
//             First Name*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="firstName"
//             value={firstname}
//             onChange={(e) => {
//               setFirstname(e.target.value);
//             }}
//             name="firstName"
//           />
//           <label className="reg-labels" htmlFor="lastName">
//             Last Name*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="lastName"
//             value={lastname}
//             onChange={(e) => {
//               setLastname(e.target.value);
//             }}
//             name="lastName"
//           />
//           <label className="reg-labels" htmlFor="email">
//             Email*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             name="email"
//           />
//           <label className="reg-labels" htmlFor="lastName">
//             Password*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             name="password"
//           />
//           <label className="reg-labels" htmlFor="zipcode">
//             ZIP code*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="zipcode"
//             value={zip}
//             onChange={(e) => {
//               setZip(e.target.value);
//             }}
//             name="zipcode"
//           />
//           {/* <label className="reg-labels" htmlFor="gender">Gender*</label>
//         <input className="reg-inputs" type="text" id="gender" value={gender} onChange={(e)=>{
//                 setGender(e.target.value) }} name="gender" /> */}
//           <label className="reg-labels" htmlFor="gender">
//             Gender*
//           </label>
//           <select
//             className="reg-inputs form-control"
//             id="gender"
//             name="gender"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <label className="reg-labels" htmlFor="dateOfBirth">
//             Date Of Birth*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="date"
//             id="dateOfBirth"
//             value={birthdate}
//             onChange={(e) => {
//               setBirthdate(e.target.value);
//             }}
//             name="dateOfBirth"
//           />
//           <a href="" onClick={handleRegister} className="reg-submit">
//             Next
//           </a>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
