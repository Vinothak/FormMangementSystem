import React from "react";
import '../styles/app.scss'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { withRouter } from "react-router-dom";
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      useremail:"",
      password:"",
      userDept:"",
      users:[]
    }
    this.emailref=React.createRef();
    this.passref=React.createRef();
    this.usernameref=React.createRef();
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('Register WebSocket Client Connected');
    };

    client.onmessage = (message) => {
        console.log(message);
        if(message.data=='User already exists')
        {
            alert("User already exist");
           return;
        }else if(message.data=="you are successfull registered"){
            alert("you are successfully registered");
            this.props.callhome();
        }
      const dataFromServer = JSON.parse(message.data);
      if(dataFromServer==='User taken already')
      {
          console.log('user already created');
      }
      else if (dataFromServer.type === "message1") {
        this.setState((state) =>
          ({
            users: [...state.users,
            {
              msg: dataFromServer.msg,
              password: dataFromServer.password,
              email:dataFromServer.email,
              name:dataFromServer.name,
              userDept:dataFromServer.dept,
              error:dataFromServer.error
            }],

          })
        );
      }}}

      regsiterfunc = (value) => {
    
        var select =document.getElementById('dept');
        var userDept=select.options[select.selectedIndex].value;
        console.log(userDept);

        let email=this.emailref.current.value;
   let password=this.passref.current.value;
   let name=this.usernameref.current.value;

   if(!name || !email || !password || !userDept){
    alert('Please fill in all fields');
    return;
 }
 if(password.length<6){
  alert("Password should be atleast 6 characters");
  return;
}
        client.send(JSON.stringify({
          type: "message1",
          msg: "hai there registered",
          name,
          email,
          password,
          userDept,
          error:"",
          requestType:"register"
        }));

        this.setState({
          username:"",
          useremail:"",
          password:"",
          userDept:""
        })
    
      }

  callchild=()=>{
    this.componentDidMount();
  }

  updateEmail=(e)=>{
    this.setState({
      useremail:e.target.value
    })
  }
  updateName=(e)=>{
        this.setState({
          username:e.target.value
        })
      }
      updatePass=(e)=>{
        this.setState({
          password:e.target.value
        })
      }

  render() {

    const name=this.state.username;
    const email=this.state.useremail;
    const password=this.state.password;

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username :</label>
              <input style={{marginLeft:"10px"}}value={name}  onChange={this.updateName}
               type="text" ref={this.usernameref} name="username" placeholder="username" />
            </div>
            <div className="form-group1">

<label  style={{marginLeft:'50px'}}for="dept">Choose Department:</label>
<select style={{marginRight:'100px',marginLeft:"10px",borderRadius:'20px'}} name="dept" id="dept" form="dept">
<option value="A">Dept A</option>
<option value="B">Dept B</option>
<option value="C">Dept C</option>
<option value="D">Dept D</option>
</select>

</div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input style={{marginRight:"30px",marginLeft:"10px"}}value={email} type="text"  onChange={this.updateEmail}
              ref={this.emailref} name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input style={{marginLeft:"10px"}} type="text" value={password}  onChange={this.updatePass}
              ref={this.passref} name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button style={{color:"white",backgroundColor:"grey"}} onClick={this.regsiterfunc} type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);

