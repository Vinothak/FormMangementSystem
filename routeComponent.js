import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route,Redirect,Prompt} from "react-router-dom";
import Register from "./register";
import Rejected from './rejected';
import Requested from './requested';
import Approved from './approved';
import Pending from './pending';
import "../index.css";
import Home from './home'
import Dashboard from './Dashboard'
import '../styles/app.scss';
import Logout from './logout';


export default class RouteComponent extends Component {
   constructor(props, ...rest) {
     super(props, ...rest);
     this.state = {
        username:null,
        userDept:null,
        loggedIn:false
    };
  
   }

   callhome=(name,dept)=>{

     this.setState({
       username:name,
       userDept:dept,
       loggedIn:true
     })
     
   }

  render(){

  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home callhome={this.callhome}></Home>
        </Route>
        <Route exact path="/register">
          <Register username={this.state.username} dept={this.state.userDept} />
        </Route>
       
        <Route exact path="/dashboard" strict render={()=>(
           this.state.loggedIn ? (<Dashboard username={this.state.username}
             Assigneddept={this.state.userDept}/> ):(<Redirect to="/"/>)
        )}/>

        <Route exact path="/request"
        strict render={()=>(
           this.state.loggedIn ? (<Requested username={this.state.username}
             dept={this.state.userDept}/>):(<Redirect to="/"/>)
        )}/>
        

        <Route exact path="/approved"
          strict render={()=>(
           this.state.loggedIn ? (<Approved username={this.state.username}
             Assigneddept={this.state.userDept}/>):(<Redirect to="/"/>)
        )}/>

        <Route exact path="/pending"
        strict render={()=>(
           this.state.loggedIn ? (<Pending username={this.state.username}
             Assigneddept={this.state.userDept}/>):(<Redirect to="/"/>)
        )}/>

<Route exact path="/rejected"
        strict render={()=>(
           this.state.loggedIn ? (<Rejected username={this.state.username}
             Assigneddept={this.state.userDept}/>):(<Redirect to="/"/>)
        )}/>

        <Route exact path="/logout">
          <Logout username={this.state.username} />
        </Route>
      </Switch>
      <Prompt 
      when={this.state.loggedIn}
      message={(location)=>{
        return location.pathname.startsWith('/logout')?'Are you sure?':true
      }}
      
      />
    </Router>
  );
}}

