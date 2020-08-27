import React, { Component } from 'react';
import NavComp from './Navbar'
//import InfoIcon from '@material-ui/icons/Info';
import ReactNotification from 'react-notifications-component'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Modals from './modals'
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');

export default class Pending extends React.Component {
  constructor(){
    super();
    this.state={
  
        showMessage:false,
        products:[],
        isOpen:false,
        isOpenUpdate:false,
        forms:[],
        id:1,
        backup:null,
        toggle:false
    }
    

  }

  componentDidMount() {
    client.onopen = () => {
      console.log('Pending WebSocket Client Connected');
    };

    client.onmessage = (message) => {
    const dataFromServer=JSON.parse(message.data)
 
    const arr=[];
    
    for(let i=0;i<dataFromServer.length;i++){

       if((dataFromServer[i].status=="requested" && dataFromServer[i].dept==this.props.Assigneddept) || (dataFromServer[i].status=="requested" 
       && dataFromServer[i].createdBy===this.props.username))
          arr.push(dataFromServer[i]);
    }
        this.setState({
          forms:arr
        })
      }}


         
getForm=()=>{

    client.send(JSON.stringify({
      type: "message1",
      msg: "get-form",
      requestType:"get-form"
    }));

    this.setState({
      toggle:!this.state.toggle
    })

  }


render(){

  return (

    <div className="request">
      <ReactNotification/>
      <NavComp></NavComp>
      {this.state.toggle==false?
      <div>
      <h1 style={{textAlign:"center"}}> Pending for Approval </h1>
      <div style={{textAlign:"center"}} >
      
       <button  style={{marginTop:"20px"}}
       onClick={this.getForm}
       >View Pending Requests</button>
      
       </div>
       </div>: <div>
         <div style={{textAlign:"center"}}><h1 style={{textAlign:"center"}}>List Pending for review</h1></div>
       { this.state.forms.map(item=> {
return <div style={{textAlign:"center"}}>{item.formName}
 <Modals ariaHideApp={false} formName={item.formName}
 formId={item._id}
 travel={item.travel}
 food={item.food}
 total={item.total}
 assign={item.assign}
 dept={item.dept}
 createdBy={item.createdBy}
 user={this.props.username}
 current="pending"
></Modals></div>
})} 
       </div>
      }
       </div>
  );
  }
  
  }
