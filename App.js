import AdminLogin from "./components/AdminLogin";
import RegistrationPage from "./components/RegistrationPage";
import Company from "./components/Company";
import DisplayAllCompany from "./components/DisplayAllCompany";
import Home from "./screens/Home";

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Details from "./components/Details";
import DashBoard from "./components/DashBoard";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import './App.css';
import MemeCoin from "./components/MemeCoin";
function App() {
  return (
   <div className="App">
 <Router>
  <Routes>
  <Route element={<RegistrationPage/>} path={"/registration"}/>
  <Route element={<Company/>} path={"/company"}/>
  <Route element={<Home/>} path={"/home"}/>
  <Route element={<DisplayAllCompany/>} path={"/displayallcompany"}/>
 
  <Route element={<AdminLogin/>} path={"/adminlogin"}/>
  <Route element={<Details/>} path={'/details'}/>
  <Route element={<DashBoard/>} path={'/dashboard/*'}/>
  <Route element={<MemeCoin />} path={"/memecoin"}/>
  
 

  </Routes>
  </Router>

{/* <TaskInput />
 <TaskList /> */}
   </div>
  );
}

export default App;
