import React from "react";
import "./calculator.css";

const Calculator = () => {
  return (
    <div className="container" id="box">
      <form class="box">
        <h1 class="title is-2">Fuel Calculator ✈️</h1>
        <div class="field">
          <label class="label">Nautical Miles</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="e.g. alex@example.com"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Extra Fuel</label>
          <div class="control">
            <input class="input" type="password" placeholder="********" />
          </div>
        </div>

        <div class="control has-icons-left">
          <label class="label">Aircraft</label>
          <div class="select">
            <select>
              <option selected>Country</option>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
          <span class="icon is-left">
            <i class="fas fa-globe"></i>
          </span>
        </div>
        <br></br>
        <button class="button is-primary">Sign in</button>
      </form>
    </div>
  );
};

export default Calculator;
