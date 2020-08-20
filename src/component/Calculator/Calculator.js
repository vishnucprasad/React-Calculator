import React, { Component } from "react";
import "./Calculator.css";
import logo from "./logo.png";

export class Calculator extends Component {
  state = {
    input: "0",
    operationPerformed: "",
    oldValue: "0",
    isDotClicked: false,
    operator: "",
  };

  handleButtonClick = (value) => {
    const { input } = this.state;

    if (input === "0") {
      this.setState({
        input: value,
      });
    } else {
      this.setState({
        input: input + value,
      });
    }
  };

  handleOperatorClick = (operator) => {
    const { input, operationPerformed } = this.state;
    this.setState({
      operator: operator,
      operationPerformed: operationPerformed + input + operator,
      oldValue: input,
      input: "0",
    });
  };

  handleOperation = (firstValue, secondValue, operator) => {
    const { input, operationPerformed } = this.state;
    if (operator === "+") {
      this.setState({
        input: parseFloat(firstValue) + parseFloat(secondValue),
      });
    } else if (operator === "-") {
      this.setState({
        input: parseFloat(firstValue) - parseFloat(secondValue),
      });
    } else if (operator === "x") {
      this.setState({
        input: parseFloat(firstValue) * parseFloat(secondValue),
      });
    } else if (operator === "/") {
      this.setState({
        input: parseFloat(firstValue) / parseFloat(secondValue),
      });
    }
    this.setState({
      operationPerformed: operationPerformed + input + "=",
    });
  };

  handleClearScreen = () => {
    this.setState({
      input: "0",
      operationPerformed: "",
      isDotClicked: false,
    });
  };

  handleDelete = () => {
    const { input } = this.state;
    this.setState({
      input: input.substring(0, input.length - 1),
    });
  };

  handleDotClick = () => {
    const { isDotClicked, input } = this.state;
    if (!isDotClicked) {
      this.setState({
        input: input + ".",
        isDotClicked: true,
      });
    }
  };

  handePlusOrMinus = () => {
    const { input } = this.state;
    this.setState({
      input: parseFloat(input) * -1,
    });
  };

  handleRoot = () => {
    const { input } = this.state;
    this.setState({
      input: Math.sqrt(input),
      operationPerformed: "√" + input,
    });
  };

  render() {
    const { input, operationPerformed, oldValue, operator } = this.state;
    return (
      <div className="container">
        <div className="calculator">
          <div className="title">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="label">
              <h1>Calculator</h1>
            </div>
          </div>
          <div className="screen text-center">
            <input type="text" value={operationPerformed + " "} readOnly />
            <input type="text" value={input + " "} readOnly />
          </div>
          <div className="buttons">
            <div className="mainButtons">
              <div className="firstRow">
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("7")}
                  value="7"
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("8")}
                  value="8"
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("9")}
                  value="9"
                />
                <input
                  className="additionalButton"
                  type="button"
                  onClick={this.handleClearScreen}
                  value="C"
                />
                <input
                  className="additionalButton"
                  type="button"
                  onClick={this.handleDelete}
                  value="DEL"
                />
              </div>
              <div className="secondRow">
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("4")}
                  value="4"
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("5")}
                  value="5"
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("6")}
                  value="6"
                />
                <input
                  className="operatorButton"
                  type="button"
                  onClick={this.handePlusOrMinus}
                  value="+/-"
                />
                <input
                  className="operatorButton"
                  type="button"
                  onClick={this.handleRoot}
                  value="√"
                />
              </div>
              <div className="thirdRow">
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("1")}
                  value="1"
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("2")}
                  value="2"
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("3")}
                  value="3"
                />
                <input
                  className="operatorButton"
                  type="button"
                  onClick={() => this.handleOperatorClick("x")}
                  value="x"
                />
                <input
                  className="operatorButton"
                  type="button"
                  onClick={() => this.handleOperatorClick("/")}
                  value="/"
                />
              </div>
              <div className="fourthRow">
                <input
                  className="additionalButton"
                  onClick={this.handleDotClick}
                  type="button"
                  value="."
                />
                <input
                  className="numericButton"
                  type="button"
                  onClick={() => this.handleButtonClick("0")}
                  value="0"
                />
                <input
                  className="additionalButton"
                  type="button"
                  onClick={() =>
                    this.handleOperation(oldValue, input, operator)
                  }
                  value="="
                />
                <input
                  className="operatorButton"
                  type="button"
                  onClick={() => this.handleOperatorClick("+")}
                  value="+"
                />
                <input
                  className="operatorButton"
                  type="button"
                  onClick={() => this.handleOperatorClick("-")}
                  value="-"
                />
              </div>
            </div>
            <div className="advancedButtons">
              <div className="firstRow">
                <input className="scientificButton" type="button" value="hyp" />
                <input className="scientificButton" type="button" value="rad" />
              </div>
              <div className="secondRow">
                <input className="scientificButton" type="button" value="sin" />
                <input className="scientificButton" type="button" value="sec" />
              </div>
              <div className="thirdRow">
                <input className="scientificButton" type="button" value="cos" />
                <input className="scientificButton" type="button" value="cse" />
              </div>
              <div className="fourthRow">
                <input className="scientificButton" type="button" value="tan" />
                <input className="scientificButton" type="button" value="cot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
