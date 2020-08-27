import React, { Component } from 'react';
import Modal from 'react-modal';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
const client = new W3CWebSocket('wss://mastermind4.herokuapp.com/');
export default class Models extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            isOpen:false
        };
    }

    componentDidMount() {
        client.onopen = () => {
          console.log('Modal WebSocket Client Connected');
        };
    
        client.onmessage = (message) => {
        const dataFromServer=JSON.parse(message.data)
     //   console.log(dataFromServer)
        
        }}
    
    

    openModal=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    Approve=()=>{
        if(this.props.assign==this.props.user){
            
            client.send(JSON.stringify({
                type: "approve",
                msg: "Approve request",
                requestType:"approve",
                status:"Approved",
                formName:this.props.formName,
                formId:this.props.formId,
                approver:this.props.user,
                createdBy:this.props.createdBy
              }));
        }else{
            alert("you have only read access");
        }

    }

    Reject=()=>{
        if(this.props.assign==this.props.user){

            client.send(JSON.stringify({
                type: "reject",
                msg: "Reject request",
                requestType:"reject",
                status:"rejected",
                formName:this.props.formName,
                formId:this.props.formId,
                approver:this.props.user,
                createdBy:this.props.createdBy
              }));

        }else{
            alert("you have only read access");
        }

    }

    render() {
        var travel=this.props.travel;
        var assign=this.props.assign;
        var dept=this.props.dept;
        var total=this.props.total;
        var food=this.props.food;
        var formName=this.props.formName;
        return (
            <div>
                  <ReactNotification/>
                <Modal isOpen={this.state.isOpen}>
       <div class="header">
       <h1 style={{fontFamily:"courier,arial,helvetica",marginTop:"5px"}}>
           Form Name : {formName}
        </h1>
       </div>
       <div>
        <h1>Created By {this.props.createdBy}</h1>
        <h1>Food Expense : {food}</h1>
        <h1>Travel Expense : {travel}</h1>
        <h1>Total Claim :{total} </h1>
        <h1>Dept  :{dept} </h1>
        <h1>assigned To :{assign} </h1>
        {(this.props.current!='pending')? null:
      <div> <button onClick = {this.Approve} class="submit">Approve</button>
       <button onClick = {this.Reject} class="submit">Reject</button></div>
    }
       <button className="modal-close" onClick={this.openModal}>Close</button>
       </div>
     </Modal>
     <div>
     <button onClick={this.openModal}>View Form Request</button>
            </div>
            </div>
        )
    }}
