import React, { Component } from 'react';
export default class Logout extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }

    render() {
        return (
        <div className='logout'><h1 style={{marginTop:"150px",color:"blue"}} >Welcome Back {this.props.username} 😃</h1></div>
        );
    }
}