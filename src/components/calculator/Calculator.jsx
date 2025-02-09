import React, { useState, useEffect } from "react";
import "./calculator.css";

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
  const [aircraft, setAircraft] = useState(null);
  const [warning, setWarning] = useState("");
  const [mode, setMode] = useState("miles");
  const [showAddAircraftForm, setShowAddAircraftForm] = useState(false);
  const [aircraftArray, setAircraftArray] = useState(() => {
    const savedAircraft = localStorage.getItem("aircraftArray");
    return savedAircraft
      ? JSON.parse(savedAircraft)
      : {
          C510: {
            name: "C510",
            fuelEconomy: 0.38043,
            fuelCapacity: 386,
            pax: 5,
            payload: 500,
            seats: 5,
          },
          A320: {
            name: "A320",
            fuelEconomy: 2.37575758,
            fuelCapacity: 7840,
            pax: 148,
            payload: 30279,
            seats: 150,
          },
          B737800: {
            name: "B737800",
            fuelEconomy: 4.32244009,
            fuelCapacity: 6875,
            pax: 160,
            payload: 28389,
            seats: 162,
          },
        };
  });

  const [newAircraft, setNewAircraft] = useState({
    name: "",
    fuelEconomy: "",
    fuelCapacity: "",
    pax: "",
    payload: "",
    seats: "",
  });

  useEffect(() => {
    localStorage.setItem("aircraftArray", JSON.stringify(aircraftArray));
  }, [aircraftArray]);

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

  function handleAddAircraft(newAircraft) {
    setAircraftArray((prevArray) => ({
      ...prevArray,
      [newAircraft.name]: newAircraft,
    }));
  }

  function handleDeleteAircraft(name) {
    setAircraftArray((prevArray) => {
      const newArray = { ...prevArray };
      delete newArray[name];
      return newArray;
    });
  }

  function handleNewAircraftChange(event) {
    const { name, value } = event.target;
    setNewAircraft((prevAircraft) => ({
      ...prevAircraft,
      [name]: value,
    }));
  }

  function handleAddAircraftSubmit(event) {
    event.preventDefault();
    handleAddAircraft(newAircraft);
    setNewAircraft({
      name: "",
      fuelEconomy: "",
      fuelCapacity: "",
      pax: "",
      payload: "",
      seats: "",
    });
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
              {Object.values(aircraftArray).map((aircraft) => (
                <option key={aircraft.name} value={JSON.stringify(aircraft)}>
                  {aircraft.name}
                </option>
              ))}
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
      <div className="box">
        <button
          className="dropdown button"
          onClick={() =>
            setShowAddAircraftForm(
              (prevShowAddAircraftForm) => !prevShowAddAircraftForm
            )
          }
        >
          Add Aircraft
        </button>
        {showAddAircraftForm && (
          <form onSubmit={handleAddAircraftSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={newAircraft.name}
                  onChange={handleNewAircraftChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Fuel Economy</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="fuelEconomy"
                  value={newAircraft.fuelEconomy}
                  onChange={handleNewAircraftChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Fuel Capacity</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="fuelCapacity"
                  value={newAircraft.fuelCapacity}
                  onChange={handleNewAircraftChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Pax</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="pax"
                  value={newAircraft.pax}
                  onChange={handleNewAircraftChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Payload</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="payload"
                  value={newAircraft.payload}
                  onChange={handleNewAircraftChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Seats</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="seats"
                  value={newAircraft.seats}
                  onChange={handleNewAircraftChange}
                  required
                />
              </div>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">
                Add Aircraft
              </button>
            </div>
          </form>
        )}
      </div>
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
              <th>Delete</th>
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
                <td>
                  <button
                    className="alert button"
                    onClick={() => handleDeleteAircraft(aircraft.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calculator;
