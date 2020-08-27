import React, { Component } from 'react';
import NavComp from './Navbar'
//import InfoIcon from '@material-ui/icons/Info';

//import Pagination from './Pagination'
//import DeleteIcon from '@material-ui/icons/Delete';
//import EditIcon from '@material-ui/icons/Edit';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Modals from './modals'
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');

export default class Approved extends React.Component {
  constructor(){
    super();
    this.state={
  
        isOpen:false,
        isOpenUpdate:false,
        forms:[],
        backup:null,
        toggle:false
    }
    

  }

  componentDidMount() {
    client.onopen = () => {
      console.log('Approved WebSocket Client Connected');
    };

    client.onmessage = (message) => {
     // console.log("message from servetr",message);
      // console.log("received",typeof(message.data));
      // console.log(message.data
    const dataFromServer=JSON.parse(message.data)
    //console.log(dataFromServer);
    const arr=[];
    for(let i=0;i<dataFromServer.length;i++){
        if((dataFromServer[i].status=="approved" && dataFromServer[i].dept==this.props.Assigneddept) || (dataFromServer[i].status=="approved" 
        && dataFromServer[i].createdBy===this.props.username))
       arr.push(dataFromServer[i]);
    }

        this.setState({
          forms:arr
        })
      }}
         
getForm=()=>{
  //  console.log('get form called');
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
      <h1 style={{textAlign:"center"}}> Approved Request </h1>
      <div style={{textAlign:"center"}} >
      
       <button  style={{marginTop:"20px"}}
       onClick={this.getForm}
       >View Approved Requests</button>
      
       </div>
       </div>: <div>
         <div style={{textAlign:"center"}}><h1 style={{textAlign:"center"}}>List of Requests Approved</h1></div>
       { this.state.forms.map(item=> {
return <div style={{textAlign:"center"}}>{item.formName} <Modals ariaHideApp={false}
formId={item._id}
travel={item.travel}
food={item.food}
total={item.total}
createdBy={item.createdBy}
assign={item.assign}
dept={item.dept}
user={this.props.username}
formName={item.formName}

></Modals></div>
})} 
       </div>
      }
       </div>
  );
  }
  
  }
