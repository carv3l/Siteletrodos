import React, { Component } from 'react';
import axios from 'axios';


var uri_get ="http://localhost:8080/users/";
var uri_update ="http://localhost:8080/users/update/";

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
      type: ''
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
          type: response.data.type
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      document.getElementById('textbox_mail').value = this.state.mail;
      document.getElementById('textbox_password').value = this.state.password;
      document.getElementById('textbox_type').value = this.state.type;

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
      type: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user_data = {
      mail: this.state.mail,
      password: this.state.password,
      type: this.state.type
    }

    console.log(JSON.stringify(user_data));

    axios.post(uri_update + this.props.match.params.id, user_data)
      .then(res => console.log(res.data));

    window.location = '/Administration';
  }

  render() {
    return (
    <div>
      <h3>Editar Utilizador</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Mail: </label>
          <input id="textbox_mail" type="text"
              required
              className="form-control"
              value={this.state.mail}
              onChange={this.onChangeMail}
              />
        </div>
        <div className="form-group"> 
          <label>Password: </label>
          <input id="textbox_password" type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        <div  className="form-group">
          <label>Type: </label>
          <input id="textbox_type"
              type="text" 
              className="form-control"
              value={this.state.type}
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