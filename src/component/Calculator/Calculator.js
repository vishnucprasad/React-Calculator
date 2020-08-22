import React, { Component } from "react";
import "./Calculator.css";
import logo from "./logo.png";

export class Calculator extends Component {
  state = {
    input: "0",
    operationPerformed: "",
    oldValue: "0",
    operator: "",
    isCalculateInit: false,
    isOperatorClicked: false,
    isErrorOccured: false,
  };

  handleButtonClick = (value) => {
    const { input, isOperatorClicked, isErrorOccured } = this.state;

    if (input === "0" || isOperatorClicked || isErrorOccured) {
      if (isErrorOccured) {
        for (let i = 0; i < 7; i++) {
          document.getElementsByClassName("operatorButton")[i].disabled = false;
        }
        this.handleClearScreen();
      }
      this.setState({
        input: value,
        isOperatorClicked: false,
      });
    } else {
      this.setState({
        input: `${input}${value}`,
      });
    }
  };

  handleOperatorClick = (operatorClicked) => {
    const {
      input,
      isCalculateInit,
      oldValue,
      operator,
      operationPerformed,
      isOperatorClicked,
      isErrorOccured,
    } = this.state;

    if (operatorClicked === "=") {
      if (isErrorOccured) {
        for (let i = 0; i < 7; i++) {
          document.getElementsByClassName("operatorButton")[i].disabled = false;
        }
        this.handleClearScreen();
      } else {
        this.setState({
          operationPerformed: `${operationPerformed}${input}=`,
          isCalculateInit: false,
        });
        this.handleOperation(oldValue, input, operator);
      }
    } else {
      if (isOperatorClicked) {
        this.setState({
          operator: operatorClicked,
          operationPerformed: `${operationPerformed.substring(
            0,
            operationPerformed.length - 1
          )}${operatorClicked}`,
        });
      } else if (isCalculateInit) {
        this.handleOperation(oldValue, input, operator);
        this.setState({
          operator: operatorClicked,
          operationPerformed: `${operationPerformed}${input}${operatorClicked}`,
          isOperatorClicked: true,
        });
      } else {
        this.setState({
          operator: operatorClicked,
          operationPerformed: `${operationPerformed}${input}${operatorClicked}`,
          oldValue: input,
          isOperatorClicked: true,
          isCalculateInit: true,
        });
      }
    }
  };

  handleOperation = (firstValue, secondValue, operator) => {
    let result = 0;
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);

    if (operator === "+") {
      result = `${firstValue + secondValue}`;
    } else if (operator === "-") {
      result = `${firstValue - secondValue}`;
    } else if (operator === "x") {
      result = `${firstValue * secondValue}`;
    } else if (operator === "/") {
      try {
        if (secondValue === 0) {
          throw new Error("Can't divide by zero.");
        } else {
          result = `${firstValue / secondValue}`;
        }
      } catch (err) {
        result = `${err}`;
        for (let i = 0; i < 7; i++) {
          document.getElementsByClassName("operatorButton")[i].disabled = true;
        }
        this.setState({
          isErrorOccured: true,
        });
      }
    }

    this.setState({
      input: result,
      oldValue: result,
    });
  };

  handleClearScreen = () => {
    this.setState({
      input: "0",
      operationPerformed: "",
      isOperatorClicked: false,
      isCalculateInit: false,
      isErrorOccured: false,
      oldValue: "0",
      operator: "",
    });
  };

  handleDelete = () => {
    const { input } = this.state;
    this.setState({
      input: input.substring(0, input.length - 1),
    });
  };

  handleDotClick = () => {
    const { input, isOperatorClicked } = this.state;
    if (isOperatorClicked) {
      this.setState({
        input: "0.",
        isOperatorClicked: false,
      });
    } else if (Number.isInteger(parseFloat(input))) {
      this.setState({
        input: `${input}.`,
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
    const { input, operationPerformed } = this.state;
    this.setState({
      input: Math.sqrt(input),
      operationPerformed: `${operationPerformed}√${input}`,
    });
  };

  render() {
    const { input, operationPerformed } = this.state;
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
                  className="operatorButton additionalButton"
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
                  onClick={() => this.handleOperatorClick("=")}
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
