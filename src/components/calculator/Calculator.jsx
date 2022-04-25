import React, { useState } from "react";
import "./calculator.css";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fuel: 0,
      miles: 0,
      extraFuel: "yes",
      aircraft: 0.48823529,
      warning: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calculate = () => {
    if (this.state.miles > 690) {
      this.setState({ warning: "Nautical miles must be less than 690" });
    } else if (this.state.miles < 0) {
      this.setState({ warning: "Nautical miles must be greater than 0" });
    } else {
      this.setState({ warning: "" });
      if (this.state.extraFuel === "yes") {
        this.setState({
          fuel: Math.ceil(this.state.miles * this.state.aircraft) + 3,
        });
      } else {
        this.setState({
          fuel: Math.ceil(this.state.miles * this.state.aircraft),
        });
      }
    }
  };

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((values) => ({ ...values, [name]: value }));
  }

  handleSubmit(event) {
    // console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <form className="box" id="box" onSubmit={this.handleSubmit}>
          <h1>Fuel Calculator ✈️</h1>
          <div className="field">
            <label className="label">Nautical Miles</label>
            <div className="control">
              <input
                name="miles"
                type="number"
                value={this.state.miles}
                onChange={this.handleChange}
              />
              <i id="warning">{this.state.warning}</i>
            </div>
          </div>
          <br></br>
          <div className="field">
            <label className="label">Extra Fuel</label>
            <div className="select">
              <select
                name="extraFuel"
                value={this.state.extraFuel}
                onChange={this.handleChange}
              >
                <option value="yes">Extra Fuel</option>
                <option value="no">No Extra Fuel</option>
              </select>
            </div>
          </div>
          <br></br>
          <div className="control has-icons-left">
            <label className="label">Aircraft</label>
            <div className="select">
              <select name="aircraft" onChange={this.handleChange}>
                <option value={0.48823529}>Cessna 208 Caravan</option>
                {/* <option value={0.48823529}>Cessna 172 Skyhawk</option> */}
              </select>
            </div>
          </div>
          <br></br>
          <p>{this.state.fuel} gallons 💧 </p>
          <br></br>
          <div>
            <button className="button" onClick={this.calculate}>
              Calculate
            </button>
          </div>
        </form>
        <br />
        
  <div>
    
    <table class="hover">
      <thead>
        <tr>
          <th width="120px">Plane</th>
          <th>Seats</th>
          <th>Paxs</th>
          <th>Total Fuel</th>
          <th>Total NM</th>
          <th>Payload</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cessna 208 Caravan</td>
          <td>14</td>
          <td>13</td>
          <td>332</td>
          <td>690</td>
          <td>1910</td>
          
        </tr>
        
      </tbody>
    </table>
  </div>
</div>
        
    );
  }
}
