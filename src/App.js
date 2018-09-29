import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import loadingGif from './loading.gif';
import './App.css';

import ListItem from './ListItem';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true,
    };

    this.apiUrl = 'https://5bae46fca65be0001467641c.mockapi.io';

    this.alert = this.alert.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    async componentDidMount() {
      const response = await axios.get(`${this.apiUrl}/todos`);
      console.log(response);
      
      setTimeout(() => {
        this.setState({
          todos: response.data,
          loading: false
        });
      }, 1000);

    }

    handleChange(event) {
      this.setState({
        newTodo: event.target.value
      });
    }

    async addTodo() {
      const response = await axios.post(`${this.apiUrl}/todos`, {
        name: this.state.newTodo
      });

        const todos = this.state.todos;
        todos.push(response.data);
        
        this.setState({
          todos: todos,
          newTodo: ''
        });
        this.alert('Todo added successfully.');
    }

    editTodo(index) {
      const todo = this.state.todos[index];

      this.setState({
        editing: true,
        newTodo: todo.name,
        editingIndex: index
      });
    }

    async updateTodo() {
      const todo = this.state.todos[this.state.editingIndex];
      const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
        name: this.state.newTodo
      });


      const todos = this.state.todos;
      todos[this.state.editingIndex] = response.data;
      this.setState({ todos, editing: false, editingIndex: null, newTodo: '' });
      this.alert('Todo updated successfully.');
    }

    async deleteTodo(index) {
      const todos = this.state.todos;
      const todo = todos[index];
      await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

      delete todos[index];
      this.setState({ todos });
      this.alert('Todo deleted successfully.');
    }

    alert(notification){
      this.setState({
        notification
      });
      setTimeout(() => {
        this.setState({
          notification: null
        });
      }, 2000);
    }

  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React API RestFul CRUD</h1>
        </header>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6">

              {
                this.state.notification &&
                <div className="alert alert-success mt-3">
                  <p className="text-center">{this.state.notification}</p>
                </div>
              }
              {
                this.state.loading &&
                <img src={loadingGif} alt="loading gif" />
              }
              <h2 className="text-center p-4">Todos App</h2>
             

              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control mb-3" 
                  placeholder="Agrega una nueva tarea" 
                  aria-label="Agrega una nueva tarea" 
                  aria-describedby="button-addon2"
                  onChange={this.handleChange}
                  value={this.state.newTodo}
                />
                <div className="input-group-append">
                  <button 
                    className="btn btn-info form-control" 
                    type="button" 
                    id="button-addon2"
                    onClick={this.state.editing ? this.updateTodo : this.addTodo}
                    disabled={this.state.newTodo.length < 5}
                  >{this.state.editing ? 'Actualizar Tarea' : 'Agregar Tarea'}</button>
                </div>
              </div>
              

              {
                (!this.state.editing || this.state.loading) &&
                <ul className="list-group">
                  {this.state.todos.map((item, index) => {
                    return <ListItem 
                              key={item.id}
                              item={item}
                              editTodo={() => {this.editTodo(index); }}
                              deleteTodo={() => {this.deleteTodo(index); }}
                           />;
                  })}
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
