import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/index';
import Register from './pages/register/index';
import PageNotFound from './pageNotFound';
import Login from './pages/login';
import Main from './pages/admin/main';
import DoctorMain from './pages/doctorPanel/doctormain';
import PaletteManager from './pages/palette/index';
import DoctorInfo from './pages/doctor';
import Protected from './components/Protected/Protected';
import { useSelector } from "react-redux";
import SymptomsForm from './components/SymptomsForm';

function App() {
  const isAuth = useSelector((state) => state.user.auth);
  const isDoctor =  useSelector((state) => state.user.isDoctor);
  const userData = useSelector((state) => state.user);

  // Conditionally assign user data
  const doctor = isDoctor ? userData : null;
  const admin = !isDoctor && isAuth ? userData : null;

  console.log("isAuth in app", isAuth);
  console.log("Doctor data:", doctor);
  console.log("Admin data:", admin);
  console.log("isAuth in app",isAuth)
  return (
    <div className="App">
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/admin"  element={<Protected isAuth={isAuth}><Main /></Protected>} />
        <Route path="/doctor" element={<Protected isAuth={isAuth} doctor={doctor}><DoctorMain /></Protected>} />
        <Route path="/doctorinfo" element={<DoctorInfo />} />  
        <Route path="/symptoms" element={<SymptomsForm />} />  
        <Route path="/palette" element={<PaletteManager />} />

        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<PageNotFound />} />
        {/* <Route exact path="/room" component={Room}/>
        <Route exact path="/book/:roomid/:fromdate/:todate" component={Booking}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/service" component={Services}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/admin" component={Admin}/> */}
      </Routes>

    </div>
  );
}

export default App;
