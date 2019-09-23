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

    if (this.state.buffer === "0") {
      console.log("do nothing");
    } else {
      this.setState({
        buffer: this.state.buffer += value,
        expression: this.state.expression += this.state.operator + value,
        operator: ""
      })
    }
  }

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

  render() {
    return (
      <div className="Calc">
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
