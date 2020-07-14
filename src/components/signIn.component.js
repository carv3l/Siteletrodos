import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../Login.css';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
var operations = require('./Operations');


//var uri_get ="http://localhost:8080/soil/";
var uri_post_user="http://localhost:8080/users/add_user";
//var uri_get ="https://eletrodos.herokuapp.com/soil/";
//var uri_post_user="https://eletrodos.herokuapp.com/add_measure";


export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      mail:'',
      password:'',
      type:'1'
    }

    
  }

  

  componentDidMount() {
    }
    onChangeMail(e) {
    this.setState({
      mail: e.target.value
    })
  }
  onChangepassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  validateForm() {
    return this.mail.length > 0 && this.password.length > 0;
  }


  onSubmit(e) {
    e.preventDefault();
    const dados = {
    mail: this.state.mail,
    password: this.state.password,
    type: this.state.type
    }
               // alert("P: "+JSON.stringify(dados)+"\n");

      console.log(dados);

    axios.post(uri_post_user, dados)
      .then(res => console.log(res.data))
      .catch((error) => {
               console.log(error);
             });
      

  }
  render() {
      return (
        <div>
          <h3>Login</h3>
          
          <div className="Login">
        <form onSubmit={this.onSubmit}>
          <FormGroup controlId="email" bsSize="large">
          <FormLabel>Mail</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.mail}
              onChange={this.onChangeMail}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.onChangepassword}
              type="password"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!this.validateForm} type="submit">
           Registar
          </Button>
          
        </form>
      </div>
        </div>
      )
  }
}


