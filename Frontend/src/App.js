import logo from './logo.svg';
import './App.css';
import { Switch,Route } from 'react-router-dom';
import Home from './pages/home/index';
import Register from './pages/register/index';
import PageNotFound from './pageNotFound';
import Login from './pages/login';
import Main from './pages/admin/main';
import Doctor from './pages/admin/menus/addDoctor/index';
import PaletteManager from './pages/palette/index';


function App() {

  return (
    <div className="App">
       <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={Register}/>
        <Route exact path="/signin" component={Login}/>
        <Route exact path="/admin" component={Main}/>
        <Route exact path="/admin/doctor" component={Doctor}/>
        <Route exact path="/palette" component={PaletteManager}/>

        <Route exact path="*" component={PageNotFound}/>

        {/* <Route exact path="/room" component={Room}/>
        <Route exact path="/book/:roomid/:fromdate/:todate" component={Booking}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/service" component={Services}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/admin" component={Admin}/> */}
      </Switch>
    </div>
  );
}

export default App;
