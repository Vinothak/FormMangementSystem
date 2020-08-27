import React, { Component } from 'react';
import NavComp from './Navbar'
//import InfoIcon from '@material-ui/icons/Info';

//import Pagination from './Pagination'
//import DeleteIcon from '@material-ui/icons/Delete';
//import EditIcon from '@material-ui/icons/Edit';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Modals from './modals'
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');

export default class Rejected extends React.Component {
  constructor(){
    super();
    this.state={
  
        currId:null,
        isOpen:false,
        isOpenUpdate:false,
        forms:[],
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
        if((dataFromServer[i].status=="rejected" && dataFromServer[i].dept==this.props.Assigneddept) || (dataFromServer[i].status=="rejected" 
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
      toggle:true
    })

  }


render(){
  console.log(this.state.forms);

  return (

    <div className="request">
      <NavComp></NavComp>
      {this.state.toggle==false?
      <div>
      <h1 style={{textAlign:"center"}}> Rejected Request </h1>
      <div style={{textAlign:"center"}} >
      
       <button  style={{marginTop:"20px"}}
       onClick={this.getForm}
       >View Rejected Requests</button>
      
       </div>
       </div>: <div>
         <div style={{textAlign:"center"}}><h1 style={{textAlign:"center"}}>
             Rejected Requests</h1></div>
       { this.state.forms.map(item=> {
return <div style={{textAlign:"center"}}>{item.formName} <Modals ariaHideApp={false}
formId={item._id}
travel={item.travel}
food={item.food}
total={item.total}
assign={item.assign}
dept={item.dept}
user={this.props.username}
formName={item.formName}
createdBy={item.createdBy}
></Modals></div>
})} 
       </div>
      }
       </div>
  );
  }
  
  }
