import React, { Component } from 'react';
import Modals from './modals'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import NavComp from './Navbar'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');
export default class Dashboard extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);

       this.state={
         
           travel:"",
           food:"",
           total:"",
           dept:"",
           assign:"",
           userDept:null,
           formName:"",
           formRequest:[],
           userDept:null,
            toggle:false,
            users:[],
            backup:[]
       }
    
 };  

 componentDidMount() {
  client.onopen = () => {
    console.log('Dashboard WebSocket Client Connected');
  };



  client.onmessage = (message) => {
      console.log(message);
  
      const msg=JSON.parse(message.data);
    //  console.log(msg);
   
        if(msg[0]!=undefined){
        //   console.log("in users response");
          var temparr=[];
          // temparr = msg.filter(user => user.userDept != this.props.dept);
          for(let i=0;i<msg.length;i++){
               temparr.push(msg[i]);
            }

          console.log(temparr);

           this.setState({
             users:temparr,
             backup:temparr
           })
        }

     if (msg.message === "successfull submitted the form" && 
     this.props.username!=msg.createdBy
     && this.props.Assigneddept==msg.dept ) {
      //console.log(this.state.userDept);
      store.addNotification({
        title:"Request",
        message:"New Request logged",
        type:"success",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000
        }
      });
    }
    
    if(msg.message === "successfull submitted the form" 
    && msg.createdBy==this.props.username){
      store.addNotification({
        title:"Request",
        message:"Submitted Sucessfully",
        type:"success",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000
        }
      });
    }

    this.setState({
      travel:"",
           food:"",
           total:"",
           travel:"",
           assign:"",
           userDept:this.props.Assigneddept,
           formName:"",
           
    })
  
  }}
 
   travelExpense=(e)=>{
     this.setState({
       travel:e.target.value
     })
   }
   foodExpense=(e)=>{
    this.setState({
      food:e.target.value
    })
  }

  Total=(e)=>{
    this.setState({
      total:e.target.value
    })
  }
  
  formNameChange=(e)=>{
    this.setState({
      formName:e.target.value
    })
  }

  handleSubmit=()=>{
      console.log('submit called');

        var select =document.getElementById('dept');
        var value=select.options[select.selectedIndex].value;
  
        var select2 =document.getElementById('assign');
        var value2=select2.options[select2.selectedIndex].value;
  
        if(value2==null||this.state.travel==""||this.state.food=="" ||this.state.total==""||this.state.formName==""){
          alert('please enter all details');
          return;
      }
        if(value==this.props.Assigneddept){
          alert('cant submit request to same team');
          return;
        }
       
        this.setState({
          dept:value,
          assign:value2
        })

      client.send(JSON.stringify({
      type: "message1",
      msg: "Form request",
      travel:this.state.travel,
      food:this.state.food,
      total:this.state.total,
      assign:value2,
      dept:value,
      requestType:"submit",
      status:"requested",
      formName:this.state.formName,
      createdBy:this.props.username
    }));
  
  }

  callSelectMethod=()=>{
    var temparr2=[];
    var select =document.getElementById('dept');
    var value=select.options[select.selectedIndex].value;
    temparr2 = this.state.backup.filter(user => user.userDept == value);
    this.setState({
      users:temparr2
    })
  }


  toggleForm=()=>{
     this.setState({
       toggle:!this.state.toggle
     },()=>{
      client.send(JSON.stringify({
        type: "message1",
        msg: "Users request",
        requestType:"get-users",
      }));
     })
  }
    render() {
        return (
            <>
<NavComp></NavComp>
  <div>
  <ReactNotification/>
       
  </div>
  <div style={{textAlign:"center",marginBottom:"10px",marginTop:"10px",color:"white"}}>
  <button style={{backgroundColor:"#5585A6",borderColor:"white",color:"white",width:"200px",
  height:"40px",borderRadius:"20px",focus:"none"}} onClick={this.toggleForm}>
  Create a Request </button>
  </div>
  
        {this.state.toggle==true ?
 < div className="form1">
          <h1 style={{textAlign:"center",marginBottom:"20px"}}>Create A Request</h1>
          <div className="form-group1">
            <label   htmlFor="email">Travel Expense</label>
            <input style={{marginLeft:'20px',marginTop:'10px'}} value={this.state.travel} onChange={this.travelExpense} type="number" name="travel" 
             placeholder="Travel expense" />
          </div>
          <div className="form-group1">
            <label   style={{marginRight:'10px'}}htmlFor="FormName">Form Name</label>
            <input style={{marginLeft:'20px',marginTop:'10px'}} value={this.state.formName} 
            onChange={this.formNameChange} type="text" name="formName" 
             placeholder="Form Name" />
          </div>
          <div className="form-group1">
            <label   htmlFor="food">Food Expense</label>
            <input style={{marginLeft:'20px',marginTop:'10px'}} value={this.state.food} type="number"  onChange={this.foodExpense} name="food" placeholder="Food expense" />
          </div>
          <div className="form-group1">
            <label   htmlFor="total">Total Amount</label>
            <input style={{marginLeft:'20px',marginTop:'10px'}} value={this.state.total} type="number"  onChange={this.Total} name="total"  placeholder="Total amount" />
          </div>
          <div style={{marginTop:"10px"}}className="form-group1">

            <label style={{marginRight:'10px'}} for="dept">Choose Depatment:</label>
<select style={{marginRight:'100px',marginTop:'10px',borderRadius:"20px"}} onChange={this.callSelectMethod}name="dept" id="dept" form="dept">

  <option value="A">Dept A</option>
  <option value="B">Dept B</option>
  <option value="C">Dept C</option>
  <option value="D">Dept D</option>
</select>
            
          </div>
          <div style={{textAlign:"center",marginTop:"10px",paddingLeft:"20px"}}>
          <label  style={{marginRight:"35px"}}for="assign">Assigned To</label>
          <select style={{marginRight:'100px'}} name="assign" id="assign" form="assign">
          {this.state.users.map(user =>{
               return <option value={user.name}>{user.name}</option>
          })}
</select>
          </div>

          <div style={{textAlign:"center",marginTop:'10px',marginBottom:"20px"}}>
          <button className="submitButton" onClick={this.handleSubmit}>Submit</button>
          </div>
          
        </div>:null}
        </>
        );
    }
}


function Notification() {
    return (
      <>
        <button
          onClick={() => {
            store.addNotification({
              title:"Request",
              message:"New Approval Request",
              type:"info",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 4000
              }
            })
          }}
        >
          Add notification
        </button>
      </>
    )
  }


