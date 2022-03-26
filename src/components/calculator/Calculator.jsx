import React, { useState } from "react";
import "./calculator.css";

export default class Calculator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fuel: 0,
      miles: 0,
      extraFuel: "yes",
      aircraft: "plane",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  calculate = () => {
    if (this.state.extraFuel === "yes") {
      this.setState({fuel: Math.ceil(this.state.miles * 0.48823529) + 3});
    } else {
      this.setState({fuel: Math.ceil(this.state.miles * 0.48823529)});
    }
    
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(values => ({...values, [name]: value}))
    
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
  }


  render(){
    return (
      <div className="container" id="container">
        <form className="box" id="box" onSubmit={this.handleSubmit}>
          <h1>Fuel Calculator ✈️</h1>
          <div className="field">
            <label className="label">Nautical Miles</label>
            <div className="control">
            <input name="miles" type="number" value={this.state.miles} onChange={this.handleChange}/>
           
            </div>
          </div>
          <br></br>
          <div className="field">
            <label className="label">Extra Fuel</label>
            <div className="select">
              <select name="extraFuel" value={this.state.extraFuel} onChange={this.handleChange}>
                <option value="yes">Extra Fuel</option>
                <option value="no">No Extra Fuel</option>
  
              </select>
            </div>
          </div>
          <br></br>
          <div className="control has-icons-left">
            <label className="label">Aircraft</label>
            <div className="select">
              <select name="aircraft">
                <option value="Cessna 208 Caravan">Cessna 208 Caravan</option>
                <option value="Cessna 172 Skyhawk">Cessna 172 Skyhawk</option>
                
              </select>
            </div>
            
          </div>
          <br></br>
          <p>{this.state.fuel} gallons 💧 </p>
          <br></br>
          <div>
          <button onClick={this.calculate}>Calculate</button>
          </div>
        </form>
      </div>
    );
  }
  
};


