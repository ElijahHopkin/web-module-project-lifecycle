import React from 'react'

export default class Form extends React.Component {
  addItem =(e) => {
    e.preventDefault()
    this.props.onSubmit()
  }

  inputHandler =(e) => {
    this.props.inputChange(e)
  }
  render() {
    return (
      <form onSubmit= {this.addItem}>
        <input 
        type= "text"
        placeholder= "enter new todo"
        name= "todo"
        value= {this.props.textInput}
        onChange = {this.inputHandler}
        />
          <button>Submit New Todo</button>
        <div>
          <button>Hide Completed Todos</button>
        </div>
      </form>
    )
  }
}
