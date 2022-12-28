import React, { useState } from "react";
import "./calculator.css";

const aircraftArray = {
  c208: { fuelEconomy: 0.415, nauticalMiles: 800 },
  A320: { fuelEconomy: 2.37575758, nauticalMiles: 3300 },
};

const Calculator = () => {
  const [fuel, setFuel] = useState(0);
  const [miles, setMiles] = useState(0);
  const [aircraft, setAircraft] = useState(
    aircraftArray.c208
  );
  const [warning, setWarning] = useState("");

  function calculate() {
    if (miles > aircraft.nauticalMiles) {
      setWarning(`Nautical miles must be less than ${aircraft.nauticalMiles}`);
      setFuel('N/A');
    } else if (miles < 0) {
      setWarning("Nautical miles must be greater than 0");
    } else {
      setWarning("");
      setFuel(Math.ceil(miles * aircraft.fuelEconomy));
    }
  }

  function handleMilesChange(event) {
    setMiles(event.target.value);
  }

  function handleAircraftChange(event) {
    setAircraft(JSON.parse(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="card">
      <form className="box" id="box" onSubmit={handleSubmit}>
        <h1>Fuel Calculator ✈️</h1>
        <div className="field">
          <label className="label">Nautical Miles</label>
          <div className="control">
            <input
              name="miles"
              type="number"
              value={miles}
              onChange={handleMilesChange}
            />
            <i id="warning">{warning}</i>
          </div>
        </div>

        <br></br>
        <div className="control has-icons-left">
          <label className="label">Aircraft</label>
          <div className="select">
            <select name="aircraft" onChange={handleAircraftChange}>
              <option value={JSON.stringify(aircraftArray.c208)}>
                Cessna 208 Caravan
              </option>
              <option value={JSON.stringify(aircraftArray.A320)}>A320</option>
            </select>
          </div>
        </div>
        <br></br>
        <p>{fuel} gallons 💧 </p>
        <br></br>
        <div>
          <button className="button" onClick={calculate}>
            Calculate
          </button>
        </div>
      </form>
      <br />

      <div>
        <table className="hover">
          <thead>
            <tr>
              <th width="120px">Plane</th>
              <th>Seats</th>
              <th>Pax</th>
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
              <td>900</td>
              <td>1910</td>
            </tr>
            <tr>
              <td>A320</td>
              <td>150</td>
              <td>148</td>
              <td>7840</td>
              <td>3300</td>
              <td>30279</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calculator;
