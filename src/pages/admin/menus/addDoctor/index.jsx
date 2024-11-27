import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import axios from "axios"; // Add axios for making HTTP requests
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ViewDoctors from "../viewDoctor";
import {
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const Doctor = () => {
  const [value, setValue] = useState(0);
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [biography, setBiography] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [status, setStatus] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("specialty", specialty);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("biography", biography);
    formData.append("qualifications", qualifications);
    formData.append("status", status);

    // Append profile picture if selected
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      // Send POST request to your backend
      const response = await axios.post("http://localhost:3005/doc/doctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure it's set for file uploads
        },
      });

      console.log("Doctor saved successfully:", response.data);

      // Set the success message
      setSuccessMessage("Doctor added successfully!");

      // Optionally reset the form after submission
      setFullName("");
      setSpecialty("");
      setEmail("");
      setPhone("");
      setProfilePicture(null);
      setBiography("");
      setQualifications("");
      setStatus(false);
    } catch (error) {
      console.error("Error saving doctor details:", error);
      alert("Failed to save doctor details.");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="main-content-holder">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="Add Doctor" {...a11yProps(0)} />
            <Tab label="Manage Doctors" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
          {successMessage && (
        <Snackbar open={true} autoHideDuration={4000} onClose={() => setSuccessMessage(null)}>
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}            <form
              className="d-flex flex-column gap-3 gap-class form-class"
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="full-name" className="form-label w-25 label-class">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control input-class"
                  id="full-name"
                  aria-label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Specialty */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="specialty" className="form-label w-25 label-class">
                  Specialty
                </label>
                <select
                  className="form-select input-class"
                  id="specialty"
                  aria-label="Specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="" disabled>
                    Select Specialty
                  </option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="neurologist">Neurologist</option>
                </select>
              </div>

              {/* Email and Phone Number */}
              <div className="d-flex gap-3">
                <div className="d-flex flex-row align-items-center w-50">
                  <label htmlFor="email" className="form-label label-class">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control input-class"
                    id="email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center w-50">
                  <label htmlFor="phone" className="form-label label-class">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control input-class"
                    id="phone"
                    aria-label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="profile-picture" className="form-label w-25 label-class">
                  Profile Picture
                </label>
                <input
                  type="file"
                  className="form-control input-class"
                  id="profile-picture"
                  aria-label="Profile Picture"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>

              {/* Biography */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="biography" className="form-label w-25 label-class">
                  Biography
                </label>
                <textarea
                  className="form-control input-class"
                  id="biography"
                  rows="3"
                  aria-label="Biography"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </div>

              {/* Qualifications */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="qualifications" className="form-label w-25 label-class">
                  Qualifications
                </label>
                <textarea
                  className="form-control input-class"
                  id="qualifications"
                  rows="3"
                  aria-label="Qualifications"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="status" className="form-label w-25 label-class">
                  Status
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input input-class"
                    type="checkbox"
                    id="status"
                    checked={status}
                    onChange={() => setStatus(!status)}
                  />
                  <label className="form-check-label label-class" htmlFor="status">
                    Active/Inactive
                  </label>
                </div>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-primary button-class">
                  Save
                </button>
                <button type="reset" className="btn btn-secondary button-class">
                  Cancel
                </button>
              </div>
            </form>

           
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ViewDoctors />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Doctor;




// import React, { useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import PropTypes from "prop-types";
// import axios from "axios"; // Add axios for making HTTP requests
// // In your main React component or index.js
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import ViewDoctors from "../viewDoctor";

// const Doctor = () => {
//   const [value, setValue] = useState(0);
//   const [fullName, setFullName] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [biography, setBiography] = useState("");
//   const [qualifications, setQualifications] = useState("");
//   const [status, setStatus] = useState(false);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Create FormData object to handle file uploads
//     const formData = new FormData();
//     formData.append('fullName', fullName);
//     formData.append('specialty', specialty);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('biography', biography);
//     formData.append('qualifications', qualifications);
//     formData.append('status', status);
    
//     // Append profile picture if selected
//     if (profilePicture) {
//       formData.append('profilePicture', profilePicture);
//     }
//     console.log("formData",formData)
  
//     try {
//       // Send POST request to your backend
//       const response = await axios.post("http://localhost:3005/doc/doctors", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Ensure it's set for file uploads
//         },
//       });
  
//       console.log("Doctor saved successfully:", response.data);
//     } catch (error) {
//       console.error("Error saving doctor details:", error);
//       alert("Failed to save doctor details.");
//     }
//   };
  

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//       </div>
//     );
//   }

//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       "aria-controls": `simple-tabpanel-${index}`,
//     };
//   }

//   return (
//     <div className="main-content-holder">
//       <Box sx={{ width: "100%" }}>
//         <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons
//             allowScrollButtonsMobile
//             aria-label="scrollable force tabs example"
//           >
//             <Tab label="Add Doctor" {...a11yProps(0)} />
//             <Tab label="Manage Doctors" {...a11yProps(1)} />
//             <Tab label="Item Three" {...a11yProps(2)} />
//             <Tab label="Item Four" {...a11yProps(3)} />
//             <Tab label="Item Five" {...a11yProps(4)} />
//             <Tab label="Item Six" {...a11yProps(5)} />
//             <Tab label="Item Seven" {...a11yProps(6)} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}>
//           <div>
//             <form
//               className="d-flex flex-column gap-3 gap-class form-class"
//               onSubmit={handleSubmit}
//             >
//               {/* Full Name */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="full-name" className="form-label w-25 label-class">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control input-class"
//                   id="full-name"
//                   aria-label="Full Name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//               </div>

//               {/* Specialty */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="specialty" className="form-label w-25 label-class">
//                   Specialty
//                 </label>
//                 <select
//                   className="form-select input-class"
//                   id="specialty"
//                   aria-label="Specialty"
//                   value={specialty}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Select Specialty
//                   </option>
//                   <option value="cardiologist">Cardiologist</option>
//                   <option value="dermatologist">Dermatologist</option>
//                   <option value="neurologist">Neurologist</option>
//                 </select>
//               </div>

//               {/* Email and Phone Number */}
//               <div className="d-flex gap-3">
//                 <div className="d-flex flex-row align-items-center w-50">
//                   <label htmlFor="email" className="form-label label-class">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control input-class"
//                     id="email"
//                     aria-label="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center w-50">
//                   <label htmlFor="phone" className="form-label label-class">
//                     Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control input-class"
//                     id="phone"
//                     aria-label="Phone Number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Profile Picture */}
//               <div className="d-flex flex-row align-items-center">
//                 <label
//                   htmlFor="profile-picture"
//                   className="form-label w-25 label-class"
//                 >
//                   Profile Picture
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control input-class"
//                   id="profile-picture"
//                   aria-label="Profile Picture"
//                   onChange={(e) => setProfilePicture(e.target.files[0])}
//                 />
//               </div>

//               {/* Biography */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="biography" className="form-label w-25 label-class">
//                   Biography
//                 </label>
//                 <textarea
//                   className="form-control input-class"
//                   id="biography"
//                   rows="3"
//                   aria-label="Biography"
//                   value={biography}
//                   onChange={(e) => setBiography(e.target.value)}
//                 />
//               </div>

//               {/* Qualifications */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="qualifications" className="form-label w-25 label-class">
//                   Qualifications
//                 </label>
//                 <textarea
//                   className="form-control input-class"
//                   id="qualifications"
//                   rows="3"
//                   aria-label="Qualifications"
//                   value={qualifications}
//                   onChange={(e) => setQualifications(e.target.value)}
//                 />
//               </div>

//               {/* Status */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="status" className="form-label w-25 label-class">
//                   Status
//                 </label>
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input input-class"
//                     type="checkbox"
//                     id="status"
//                     checked={status}
//                     onChange={() => setStatus(!status)}
//                   />
//                   <label className="form-check-label label-class" htmlFor="status">
//                     Active/Inactive
//                   </label>
//                 </div>
//               </div>

//               {/* Submit and Reset Buttons */}
//               <div className="d-flex justify-content-between mt-3">
//                 <button type="submit" className="btn btn-primary button-class">
//                   Save
//                 </button>
//                 <button type="reset" className="btn btn-secondary button-class">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <ViewDoctors/>
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={2}>
//           Item Three
//         </CustomTabPanel>
//       </Box>
//     </div>
//   );
// };

// export default Doctor;







// import React, { useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import PropTypes from 'prop-types';
// // In your main React component or index.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'



// const Doctor = () => {

//   const [value, setValue] = useState(0);
//   const [fullName,setFullName] = useState('');
//   const [specialty,setSpecialty] = useState('');
//   const [email,setEmail] = useState('');
//   const [phone,setPhone] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [biography,setBiography] = useState('');
//   const [qualifications,setQualifications] = useState('');
//   const [status,setStatus] = useState(false);


//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Step 3: Collect the form data
//     const formData = {
//       fullName,
//       specialty,
//       email,
//       phone,
//       profilePicture,
//       biography,
//       qualifications,
//       status
//     };

//     // Step 4: Process the data (log or send to server)
//     console.log('Form Data Submitted:', formData);

//   };
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };


//   function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//       </div>
//     );
//   }
  
//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };
  
//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }


//   return (
//     <div className="main-content-holder">
//         <Box sx={{ width: '100%' }}>
//       <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" } }>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons
//           allowScrollButtonsMobile
//           aria-label="scrollable force tabs example"
//         >
//           <Tab label="Add Doctor" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//           <Tab label="Item Four" {...a11yProps(3)} />
//           <Tab label="Item Five"{...a11yProps(4)}  />
//           <Tab label="Item Six" {...a11yProps(5)} />
//           <Tab label="Item Seven" {...a11yProps(6)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <div>
//         <form className="d-flex flex-column gap-3 gap-class form-class" onSubmit={handleSubmit}>
//   {/* Full Name */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="full-name" className="form-label w-25 label-class">Full Name</label>
//     <input 
//       type="text" 
//       className="form-control input-class" 
//       id="full-name" 
//       aria-label="Full Name"
//       value={fullName}
//       onChange={(e) => setFullName(e.target.value)}
//     />
//   </div>

//   {/* Specialty */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="specialty" className="form-label w-25 label-class">Specialty</label>
//     <select
//       className="form-select input-class"
//       id="specialty"
//       aria-label="Specialty"
//       value={specialty}
//       onChange={(e) => setSpecialty(e.target.value)}
//     >
//       <option value="" disabled>Select Specialty</option>
//       <option value="cardiologist">Cardiologist</option>
//       <option value="dermatologist">Dermatologist</option>
//       <option value="neurologist">Neurologist</option>
//     </select>
//   </div>

//   {/* Email and Phone Number */}
//   <div className="d-flex gap-3">
//     <div className="d-flex flex-row align-items-center w-50">
//       <label htmlFor="email" className="form-label label-class">Email</label>
//       <input 
//         type="email" 
//         className="form-control input-class" 
//         id="email" 
//         aria-label="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </div>

//     <div className="d-flex flex-row align-items-center w-50">
//       <label htmlFor="phone" className="form-label label-class">Phone Number</label>
//       <input 
//         type="text" 
//         className="form-control input-class" 
//         id="phone" 
//         aria-label="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//     </div>
//   </div>

//   {/* Profile Picture */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="profile-picture" className="form-label w-25 label-class">Profile Picture</label>
//     <input 
//       type="file" 
//       className="form-control input-class" 
//       id="profile-picture" 
//       aria-label="Profile Picture"
//       onChange={(e) => setProfilePicture(e.target.files[0])}
//     />
//   </div>

//   {/* Biography */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="biography" className="form-label w-25 label-class">Biography</label>
//     <textarea
//       className="form-control input-class"
//       id="biography"
//       rows="3"
//       aria-label="Biography"
//       value={biography}
//       onChange={(e) => setBiography(e.target.value)}
//     />
//   </div>

//   {/* Qualifications */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="qualifications" className="form-label w-25 label-class">Qualifications</label>
//     <textarea
//       className="form-control input-class"
//       id="qualifications"
//       rows="3"
//       aria-label="Qualifications"
//       value={qualifications}
//       onChange={(e) => setQualifications(e.target.value)}
//     />
//   </div>

//   {/* Status */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="status" className="form-label w-25 label-class">Status</label>
//     <div className="form-check form-switch">
//       <input
//         className="form-check-input input-class"
//         type="checkbox"
//         id="status"
//         checked={status}
//         onChange={() => setStatus(!status)}
//       />
//       <label className="form-check-label label-class" htmlFor="status">Active/Inactive</label>
//     </div>
//   </div>

//   {/* Submit and Reset Buttons */}
//   <div className="d-flex justify-content-between mt-3">
//     <button type="submit" className="btn btn-primary button-class">Save</button>
//     <button type="reset" className="btn btn-secondary button-class">Cancel</button>
//   </div>
//   </form>
//         </div>
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//       </Box>
//     </div>
//   );
// };

// export default Doctor;
