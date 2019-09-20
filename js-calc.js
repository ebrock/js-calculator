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
    // if "0" in buffer, replace 0 with value
    let value = event.target.innerHTML;

    if (this.state.buffer === "0") {
      this.setState({
        buffer: value,
        display: value,
        expression: value
      });
    } else {
      this.setState({
        buffer: this.state.buffer += value,
        expression: this.state.expression += value,
        display: this.state.buffer,
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
        expression: this.state.expression += value,
        display: this.state.buffer
      })
    }
  }

  handleDecimal(event) {
    let value = event.target.innerHTML;

    if (!newState.buffer.match(/\./g) && this.state.buffer === "") {
      this.setState({
        buffer: this.state.buffer += "0.",
        expression: this.state.expression += "0.",
      })
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
              {this.state.display}
            </div>
          </div>
          <div className="buttons">
            <div id="clear" className="operators" onClick={this.handleClear}>
              AC
            </div>
            <div id="divide" className="operators">
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
            <div id="multiply" className="operators">
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
            <div id="subtract" className="operators">
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
            <div id="add" className="operators">
              +
            </div>
            <div id="zero" className="chars" onClick={this.handleZero}>
              0
            </div>
            <div id="decimal" className="chars">
              .
            </div>
            <div id="equals" className="operators">
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
