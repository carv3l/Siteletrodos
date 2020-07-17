import React, { Component } from 'react';
import axios from 'axios';


var uri_get ="http://localhost:8080/users/";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      mail: '',
      password: '',
      type: '',
      users: []
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get(uri_get +this.props.match.params.id)
      .then(response => {
        console.log(JSON.stringify(response.data));
        this.setState({
          mail: response.data.mail,
          password: response.data.password,
          tpye: response.data.tpye
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:8080/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeMail(e) {
    this.setState({
      mail: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeType(e) {
    this.setState({
      tpye: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user_data = {
      mail: this.state.mail,
      password: this.state.password,
      type: this.state.tpye
    }

    console.log(user_data);

    axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user_data)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Editar Utilizador</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Mail: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeMail}>
          </select>
        </div>
        <div className="form-group"> 
          <label>Password: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group">
          <label>Type: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeType}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}