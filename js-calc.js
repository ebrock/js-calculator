class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: "",
      operator: "",
      display: "",
      expression: ""
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleDigits = this.handleDigits.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleMath = this.handleMath.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidUpdate() {
    console.log("buffer: " + this.state.buffer);
    console.log("display: " + this.state.display);
    console.log("expression: " + this.state.expression);
  }

  handleClear(event) {
    event.preventDefault();
    console.log("click AC");

    this.setState({
      operator: "",
      expression: "",
      buffer: "",
      display: ""
    })
  }

  handleDigits(event) {
    let value = event.target.innerHTML;

    // if "0" in buffer, replace 0 with value
    if (this.state.buffer === "0") {
      this.setState({
        buffer: value,
        expression: this.state.expression += this.state.operator + value,
        operator: ""
      });
    // if operator in buffer, append operator to expression and reset operator.
    } else if (this.state.buffer.match(/[\+-\/*]/g)){
      this.setState({
        expression: this.state.expression += this.state.operator + value,
        operator: "",
        buffer: value
      })
    // else, add value to buffer.
    } else {
      this.setState({
        buffer: this.state.buffer += value,
        expression: this.state.expression += this.state.operator + value,
        operator: ""
      })
    }
  }

  handleZero(event) {
    let value = event.target.innerHTML;

    // If "0" in buffer, don't add additional zeroes.
    if (this.state.buffer === "0") {
      console.log("do nothing");
    // If operator in buffer, add operator to buffer and reset.
    } else if (this.state.buffer.match(/[\+-\/*]/g)) {
      this.setState({
        expression: this.state.expression += this.state.operator + value,
        operator: "",
        buffer: value
      })
    } else {
      this.setState({
        buffer: this.state.buffer += value,
        expression: this.state.expression += this.state.operator + value,
        operator: ""
      })
    }
  }

  // TODO: Need to fix buffer for floating number.
  handleDecimal(event) {
    let value = event.target.innerHTML;
    // If a decimal already exists in buffer, do nothing.
    if (this.state.buffer.match(/\./g)) {
      console.log("Already have a decimal.");
    // If an operator exists in buffer,
    // append operator to expression then append 0 before "."
    } else if (this.state.buffer.match(/[\+-\/*]/g)) {
      this.setState({
        expression: this.state.expression += this.state.operator + "0.",
        operator: "",
        buffer: "0."
      })
    // Else if buffer is empty, append 0 before "."
    } else if (this.state.buffer === "" || this.state.operator !== "") {
      this.setState({
        buffer: this.state.buffer += "0.",
        expression: this.state.expression += this.state.operator + "0.",
        operator: ""
      });
    // Else just append the "."
    } else {
      this.setState({
        buffer: this.state.buffer += ".",
        expression: this.state.expression += this.state.operator + ".",
      });
    }
  }

  handleOperators(event) {
    let value = event.target.innerHTML;

    if (this.state.buffer !== "") {
      this.setState({
        operator: value,
        buffer: value
      });
    }
  }

  handleMath(event) {
    let expr = this.state.expression;
    let result = eval(expr);
    console.log("doing math");

    if (Number.isInteger(result)) {
      this.setState({
        buffer: result,
        expression: result
      });
    } else {
      this.setState({
        buffer: Number(result.toFixed(4)),
        expression: result
      });
    }
  }

  handleKeyPress(e) {
    e.preventDefault();

    let clear = ["A", "a"];
    let zero = ["0"];
    let decimal = ["."];

    let nums = {
      "1": "one",
      "2": "two",
      "3": "three",
      "4": "four",
      "5": "five",
      "6": "six",
      "7": "seven",
      "8": "eight",
      "9": "nine"
    };

    let operators = {
      "": "equals",
      "+": "add",
      "-": "subtract",
      "/": "divide",
      "*": "multiply"
    };

    // Concat all key strings.
    let all = clear.concat(Object.keys(nums)).concat(zero).concat(decimal).concat(Object.keys(operators));
    console.log("here is all: " + all);

    let keypress = String.fromCharCode(e.which);
    console.log("Value: " + keypress);

    // If pressed key in array:
    if (all.includes(keypress) || e.which === 13) {
      console.log("yes");
      // If pressed key is clear:
      if (clear.includes(keypress)) {
        console.log("key clear!");
        document.getElementById("clear").click();
      // If pressed key is a digit:
      } else if (Object.keys(nums).includes(keypress)) {
        console.log("key nums!");
        document.getElementById(nums[keypress]).click();
      // If pressed key is zero:
      } else if (zero.includes(keypress)) {
        console.log("key zero!");
        document.getElementById("zero").click();
      // If pressed key is decimal:
      } else if (decimal.includes(keypress)) {
        console.log("key dec!");
        document.getElementById("decimal").click();
      // If pressed key is an operator (+, -, /, *):
      } else if (Object.keys(operators).includes(keypress)) {
        console.log("key ops!");
        document.getElementById(operators[keypress]).click();
      // If pressed key is "enter":
      } else if (e.which === 13) {
        document.getElementById("equals").click();
      } else {
        console.log("Error - Why are you here?");
      }
    }
  }

  render() {
    return (
      <div className="Calc" onKeyPress={this.handleKeyPress} tabindex="1">
        <div id="grid" className="container">
          <h4 className="header">WOPR</h4>
          <div className="viewer">
            <div id="live" className="expression">
              {this.state.expression}
            </div>
            <div id="display" className="buffer">
              {this.state.buffer}
            </div>
          </div>
          <div className="buttons">
            <div id="clear" className="operators" onClick={this.handleClear}>
              AC
            </div>
            <div id="divide" className="operators" onClick={this.handleOperators}>
              /
            </div>
            <div id="seven" className="chars" onClick={this.handleDigits}>
              7
            </div>
            <div id="eight" className="chars" onClick={this.handleDigits}>
              8
            </div>
            <div id="nine" className="chars" onClick={this.handleDigits}>
              9
            </div>
            <div id="multiply" className="operators" onClick={this.handleOperators}>
              *
            </div>
            <div id="four" className="chars" onClick={this.handleDigits}>
              4
            </div>
            <div id="five" className="chars" onClick={this.handleDigits}>
              5
            </div>
            <div id="six" className="chars" onClick={this.handleDigits}>
              6
            </div>
            <div id="subtract" className="operators" onClick={this.handleOperators}>
              -
            </div>
            <div id="one" className="chars" onClick={this.handleDigits}>
              1
            </div>
            <div id="two" className="chars" onClick={this.handleDigits}>
              2
            </div>
            <div id="three" className="chars" onClick={this.handleDigits}>
              3
            </div>
            <div id="add" className="operators" onClick={this.handleOperators}>
              +
            </div>
            <div id="zero" className="chars" onClick={this.handleZero}>
              0
            </div>
            <div id="decimal" className="chars" onClick={this.handleDecimal}>
              .
            </div>
            <div id="equals" className="operators" onClick={this.handleMath}>
              =
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("app");
ReactDOM.render(<Calculator />, rootElement);
