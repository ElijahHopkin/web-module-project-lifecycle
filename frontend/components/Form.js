import React from "react";

export default class Form extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  inputHandler = (e) => {
    this.props.inputChange(e);
  };

  removeCompleted =() => {
    this.props.hideCompleted()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            placeholder="enter new todo"
            name="todo"
            value={this.props.textInput}
            onChange={this.inputHandler}
          />
          <button>Submit New Todo</button>
        </form>
        <button onClick={this.removeCompleted}>
          {this.props.displayCompleteds ? 'Hide' : 'Show'} Completed Todos
        </button>
      </div>
    );
  }
}
