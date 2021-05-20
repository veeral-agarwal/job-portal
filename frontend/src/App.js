import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Profileedit_recruiter from './components/Common/Profileedit_recruiter'
import Profileedit_applicant from './components/Common/Profileedit_applicant'
import Navbar from './components/templates/Navbar'
import Applicant_navbar from './components/templates/Applicant_navbar'
import Profile from './components/Users/Profile'
import Login from './components/Common/Login'
import Recruiter_navbar from './components/templates/Recruiter_navbar';
import Add_job from './components/Common/Add_jobs';
import Viewjoblisting from './components/Common/Joblistings';
import View_job_listings_applicant from './components/Common/View_job_listings_applicant';
import Job_info from './components/Common/Job_info';
import My_applications from './components/Common/my_applications';
import Job_application_info from './components/Common/job_application_info_rec';
import Edit_job from './components/Common/Edit-job';
import My_employees from './components/Common/my_employees';
import Rate_applicant from './components/Common/rate_my_employee';


class App extends React.Component{
  render(){
    let user_type = localStorage.getItem('user_type');
    let navbar = null;
    console.log(user_type);
    if(user_type === "applicant"){
      console.log("applicant");
      navbar = <Applicant_navbar/>;
    }
    else if(user_type === "recruiter"){
      console.log("recruiter");
      navbar = <Recruiter_navbar/>;
    }
    else{
      console.log("lul");
      navbar = <Navbar/>
    }
    return (
      <Router>
        <div className="container">
          {navbar}
          <br/>
          <Route exact path="/" render={()=>{
            if(user_type === "applicant"){
              console.log("111111");
              return <Profileedit_applicant/>
            }
            else if(user_type === "recruiter"){
              return <Profileedit_recruiter/>
            }
            else{
              return <Login/>
            }
          }} />
          
          <Route path="/users" exact component={UsersList}/>
          <Route path="/register" component={Register}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/login" component={Login}/>
          <Route path="/profileedit_applicant" component={Profileedit_applicant}/>
          <Route path="/profileedit_recruiter" component={Profileedit_recruiter}/>
          <Route path="/addjob" component={Add_job} />
          <Route path="/edit-job/:id" component={Edit_job} />
          <Route exact path="/job-listings" component={Viewjoblisting} />
          <Route path="/job-listings/:id" component={Job_application_info} />
          <Route path="/search_job" component={View_job_listings_applicant} />
          <Route path="/job_apply/:id" component={Job_info} />
          <Route path="/my_applications" component={My_applications} />
          <Route exact path="/my-employees" component={My_employees} />
          <Route path="/my-employees/:id" component={Rate_applicant} />
        </div>
      </Router>
    );
  }
}

export default App;