import React from 'react'
import axios from 'axios'

import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'



export default class App extends React.Component {
  constructor() {
    super() 
    this.state= {
      todos: [],
      textInput: '',
      message: '',
      displayCompleteds: true
    }
  }


  componentDidMount() {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state,
        todos: res.data.data,
        message:res.data.message
      })
    })
    .catch(err => {
      console.log({err})
    })

  }

    inputChange =(e) => {
    this.setState({
      ...this.state,
      textInput:e.target.value})
  }

  onSubmit =() => {
    axios.post(URL, {name: this.state.textInput})
    .then (res => {
      // console.log(res)
      this.setState({
        ...this.state,
        todos:[...this.state.todos, res.data.data ],
        textInput: '',
        message: res.data.message
      })
    })
    .catch( err => {
      this.setState({
        ...this.state,
        message: err.response.data.message
      })
    })
  }

  toggleCompleted =(itemId) => {
    axios.patch(`${URL}/${itemId}`)
    .then(res => {
      console.log(res)
      this.setState({
        ...this.state,
        todos: this.state.todos.map(todo => {
          if(todo.id===itemId) {
            return res.data.data
          }else{
            return todo
          }
        }),
        message: res.data.message
      })
    })
    .catch(err => {
      console.log({err})
    })
    // BELOW IS CODE FOR CHANGING FRONT END ONLY. NOTICE THE SIMILARITY TO REACHING OUT TO THE API
    // this.setState({
    //   ...this.state,
    //   todos: this.state.todos.map(todo => {
    //     if(todo.id===itemId) {
    //      return {...todo,
    //       completed : !todo.completed}
    //     }else{
    //     return todo}
    //   })
    // })
  }

  hideCompleted =() => {
    this.setState({
      ...this.state,
      displayCompleteds: !this.state.displayCompleteds
    })
    //THIS CODE BELOW IS A ONE TIME CLICK. YOU WILL REMOVE THEM FROM VIEW UNTIL PAGE REFRESH
    // this.setState({
    //   ...this.state,
    //   todos: this.state.todos.filter(todo => {
    //    return (todo.completed===false)
    //   })
    // })
  }

  
  render() {
    // console.log(this.state.todos)

    return (
      <div>
      <h1>Todo List</h1>
      <h2>{this.state.message}</h2>
      <TodoList 
      todos= {this.state.todos}
      toggleCompleted={this.toggleCompleted}
      displayCompleteds= {this.state.displayCompleteds}
      />
      
      <Form 
      onSubmit= {this.onSubmit}
      inputChange= {this.inputChange}
      textInput= {this.state.textInput}
      hideCompleted= {this.hideCompleted}
      displayCompleteds= {this.state.displayCompleteds}
      />
      
      </div>
    )
  }
}
