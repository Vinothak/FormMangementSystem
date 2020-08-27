import React, { Component } from "react";
import '../styles/app.scss'
import "bootstrap/dist/css/bootstrap.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { withRouter } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { userName: "", 
    disable: true,
     message: "",
     useremail:"",
     username:"",
     password:"",
     islogged:false,
     users:[]
  }

  this.emailref=React.createRef();
    this.passref=React.createRef();
  };
  componentDidMount() {
    client.onopen = () => {
      console.log('lOGIN WebSocket Client Connected');
    };
    client.onmessage = (message) => {
     // console.log("messAGE IS",message);
      const msg=JSON.parse(message.data);
     // console.log('creaeted by',msg.createdBy)
     // console.log('message from aproved in login',msg.message);
      //console.log('user name in login is',this.state.username);
      //console.log("received message is",msg)
      if(msg.message=="1 record rejected successfully" && (msg.createdBy==this.state.username)){
  
        store.addNotification({
          title:"Request",
          message:"your request got Rejected",
          type:"info",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 4000
          }});
        //this.props.history.push('/logout');
        return;
      }
      if(msg.message=="Authenticated User"){
      //  console.log('inside it');
       // console.log(msg.dept);
        this.props.handleChange(msg.name,msg.dept);
       //console.log(this.props);
        this.setState({
          username:msg.name
        },()=> this.props.history.push("/dashboard"))
       
      }else if(msg.message=='Password do not match'){
        alert(msg.message);
        this.setState({
          password:""
        })
      }else if(msg.message=="mail address is not valid"){
        alert(msg.message);
        this.setState({
          useremail:""
        })
      }else if(msg.message=="1 record updated successfully" && msg.status==='successful' && msg.createdBy===this.state.username){
     //  alert('hai login called now latest',msg.createdBy);

        store.addNotification({
            title:"Request",
            message:"your request is Approved",
            type:"success",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 4000
            }
          },()=>this.props.history.push('/dasboard'));
      }else{
        const dataFromServer = JSON.parse(message.data);
        //console.log('got reply! ', dataFromServer);
        if (dataFromServer.type === "message1") {
          this.setState((state) =>
            ({
              users: [...state.users,
              {
                msg: dataFromServer.msg,
                password: dataFromServer.password,
                email:dataFromServer.email
              }]
            })
          );
          }
     
      }}}

      loginAction = (value) => {
        let password=this.passref.current.value;
        let email=this.emailref.current.value;

        client.send(JSON.stringify({
          type: "message1",
          msg: "hai there",
          password,
          email,
          requestType:"login"
        }));

    };



  updateName=(e)=>{
        this.setState({
          useremail:e.target.value
        })
      }
      updatePass=(e)=>{
        this.setState({
          password:e.target.value
        })
      }

  render() {
     const name=this.state.useremail;
     const pass=this.state.password
    // console.log(this.props,"hai");
    return(
      <div>
         <ReactNotification/>
      <div className="header">Login</div>
      <div className="content">

        <div className="form">
          <div className="form-group">
    
            <input value={name} onChange={this.updateName} type="text" 
            name="email" 
            ref={this.emailref} placeholder="mail address" />
          </div>
          <div className="form-group">
          <input value={pass} type="password"  onChange={this.updatePass} name="password" ref={this.passref} placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
      {this.props.islogged}
      
        <button style={{color:"white"}}onClick={this.loginAction}type="button" className="btn">
          Login
        </button>
       
      </div>
       
    </div>
    );
  }
}


export default withRouter(Login);
