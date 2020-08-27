import React from "react";
import '../styles/app.scss'
import Login from "./login";
import NavComp from './Navbar'
import Register from "./register";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };

    this.handleChange=this.handleChange.bind(this);
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  callhome=()=>{
    this.changeState();
      console.log("called here");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {

      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
      // console.log(this.refs.child)
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
   //   this.refs.child.callchild();
    }

    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
   
  }

  handleChange=(name,dept)=>{
    this.props.callhome(name,dept);
  }

  render() {

    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
          <div style={{position:"absolute",top:0,left:0,right:0}}>
          <NavComp></NavComp>
          </div>
        
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login handleChange={this.handleChange} containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register  callhome={this.callhome}
               containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide 
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default withRouter(Home);