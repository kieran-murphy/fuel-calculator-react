import React, { useState } from "react";
import "./calculator.css";

const aircraftArray = {
  c208: {
    name: "c208",
    fuelEconomy: 0.5098,
    fuelCapacity: 332,
    pax: 13,
    payload: 1910,
    seats: 14,
  },
  A320: {
    name: "A320",
    fuelEconomy: 2.37575758,
    fuelCapacity: 7840,
    pax: 148,
    payload: 30279,
    seats: 150,
  },
};

const styles = {
  grey: {
    backgroundColor: "grey",
    opacity: "50%",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    cursor: "pointer",
  },
  blue: {
    marginLeft: "0.5em",
    marginRight: "0.5em",
    cursor: "pointer",
  },
};

const Calculator = () => {
  const speed = 0.82352;
  const KGRatio = 2.68728571;
  const [fuel, setFuel] = useState(0);
  const [miles, setMiles] = useState(0);
  const [time, setTime] = useState(0);
  const [aircraft, setAircraft] = useState(aircraftArray.c208);
  const [warning, setWarning] = useState("");
  const [mode, setMode] = useState("miles");

  function calculate() {
    if (mode === "kilos") {
      if (miles / KGRatio > aircraft.fuelCapacity) {
        setWarning(
          `Cannot travel more than ${Math.floor(
            aircraft.fuelCapacity / aircraft.fuelEconomy
          )} miles with this aircraft`
        );
        setFuel("N/A");
        setTime("N/A");
      } else if (miles < 0) {
        setWarning("Kilograms must be greater than 0");
      } else {
        setWarning("");
        setFuel(Math.ceil(miles / KGRatio));
        setTime(Math.ceil(miles * speed));
      }
    } else {
      if (miles * aircraft.fuelEconomy > aircraft.fuelCapacity) {
        setWarning(
          `Cannot travel more than ${Math.floor(
            aircraft.fuelCapacity / aircraft.fuelEconomy
          )} miles with this aircraft`
        );
        setFuel("N/A");
        setTime("N/A");
      } else if (miles < 0) {
        setWarning("Nautical miles must be greater than 0");
      } else {
        setWarning("");
        setFuel(Math.ceil(miles * aircraft.fuelEconomy));
        setTime(Math.ceil(miles * speed));
      }
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
          <label
            className="label"
            style={mode === "miles" ? styles.blue : styles.grey}
            onClick={() => {
              setMode("miles");
              setMiles(0);
              setWarning("");
            }}
          >
            Nautical Miles
          </label>
          <label
            className="label"
            style={mode === "miles" ? styles.grey : styles.blue}
            onClick={() => {
              setMode("kilos");
              setMiles(0);
              setWarning("");
            }}
          >
            Kilograms
          </label>
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
        <br />

        <div className="control has-icons-left">
          <label className="label" style={{ marginLeft: "0.5em" }}>
            Aircraft
          </label>
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
        <p>{time} minutes ⏱ </p>
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
              <th>Fuel Capacity</th>
              <th>Total NM</th>
              <th>Payload</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(aircraftArray).map((aircraft) => (
              <tr key={aircraft.name}>
                <td>{aircraft.name}</td>
                <td>{aircraft.seats}</td>
                <td>{aircraft.pax}</td>
                <td>{aircraft.fuelCapacity}</td>
                <td>
                  {Math.floor(aircraft.fuelCapacity / aircraft.fuelEconomy)}
                </td>
                <td>{aircraft.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calculator;
