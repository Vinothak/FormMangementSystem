import React, { Component } from 'react';
import NavComp from './Navbar'
export default class Requested extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }

    render() {
        return (
            <div> <NavComp></NavComp><h1>Welcome this is Requested Page</h1></div>
        );
    }
}