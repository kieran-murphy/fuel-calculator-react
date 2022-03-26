import React, { useState } from "react";
import "./calculator.css";

export default class Calculator extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fuel: 0,
      miles: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  calculate = () => {
    this.setState({fuel: Math.ceil(this.state.miles * 0.48823529)});
  }

  handleChange(event) {
    this.setState({miles: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();
  }


  render(){
    return (
      <div className="container" id="container">
        <form class="box" id="box" onSubmit={this.handleSubmit}>
          <h1>Fuel Calculator ✈️</h1>
          <div class="field">
            <label class="label">Nautical Miles</label>
            <div class="control">
            <input type="number" value={this.state.miles} onChange={this.handleChange}/>
           
            </div>
          </div>
          <br></br>
          <div class="field">
            <label class="label">Extra Fuel</label>
            <div class="select">
              <select>
                <option selected>Extra Fuel</option>
                <option>No Extra Fuel</option>
  
              </select>
            </div>
          </div>
          <br></br>
          <div class="control has-icons-left">
            <label class="label">Aircraft</label>
            <div class="select">
              <select>
                <option selected>Country</option>
                <option>Select dropdown</option>
                <option>With options</option>
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


