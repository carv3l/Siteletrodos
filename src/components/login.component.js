import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import '../Login.css';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
var operations = require('./Operations');



var uri_get ="http://localhost:8080/users/";
//var uri_post_measure="http://localhost:8080/users/add_user";
//var uri_get ="https://eletrodos.herokuapp.com/soil/";
//var uri_post_measure="https://eletrodos.herokuapp.com/add_measure";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
 
    this.state = {user_data: []};

    this.state = {
      mail:'',
      password:'',
      type: ''
    }
  }

  

  componentDidMount() {
    axios.get(uri_get)
    .then(response => {
      this.setState({ user_data: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
    console.log(this.state.user_data);
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

  onSubmit(e) {
    var user = this.state.user_data;
    e.preventDefault();
    const dados = {
    mail: this.state.mail,
     password: this.state.password
    }


    for (let i = 0; i < this.state.user_data.length; i++) {

      if (dados.mail === user[i]) {
        alert("P: "+JSON.stringify(dados)+"\n");
      }
      
    }
    



  }
  validateForm() {
    return this.mail.length > 0 && this.password.length > 0;
  }


  handleSubmit(e) {
    e.preventDefault();
    let nota = prompt('Adicione uma nota');
    //let bar = confirm('Confirm or deny');
    //console.log(nota, bar);




    const measure = {
      espacamento: this.state.spacing,
      rmedido: this.state.resistivity,
      rsolo: this.state.rsolo,
      nota: nota
    }

    console.log(measure);

      

  }
  setRedirect(e){
    e.preventDefault();
    this.props.history.push('./SignIn');
    
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
          Login
        </Button>
        <Button block bsSize="large" className="button_register" onClick={this.setRedirect} type="submit">
          Registar
        </Button>
      </form>
    </div>
      </div>
    )
  }
}


