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
      console.log("Data"+JSON.stringify(response.data))
      this.setState({ user_data: response.data })
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
  onChangepassword(e) {
    this.setState({
      password: e.target.value
    })
  }


    onSubmit(e) {
    var user = this.state.user_data;
    var validation = false;
    var item_n = 0;
    e.preventDefault();
    const dados = {
    mail: this.state.mail,
     password: this.state.password,
     type: this.state.type
    }
    //console.log(user[1]['mail']);

    for (let i = 0; i < user.length; i++) {
      if (dados.mail == user[i]['mail'] && dados.password ==user[i]['password']) {
        validation = true;
        item_n = i;
      }
    }
    if(validation)
    {
      alert("Bem Vindo: \n"+dados.mail);
      //alert("Sorage  \n"+ user[item_n]['type']);
      dados.type = user[item_n]['type'];

    }else{
      alert("UTILIZADOR NÃO DETECTADO \n");
    }

    //sessionStorage.SessionName = dados.mail;
    sessionStorage.setItem("mail",dados.mail); // para se obter a password : sessionStorage[Object.keys(sessionStorage)[1]
    sessionStorage.setItem("type",dados.type);
    //console.log("Dados: "+ JSON.stringify(dados));
    //console.log("State: "+ this.state.type);

   document.getElementById('session_user').innerHTML = "Bem Vindo " + sessionStorage.mail;
    //alert("Session Storage  \n"+ sessionStorage.type);
   //alert("Session Storage  \n"+  sessionStorage[Object.keys(sessionStorage)[0]]);
  }
  validateForm() {
    return this.mail.length > 0 && this.password.length > 0;
  }

  verifiyifadmin() {
    if (sessionStorage.type === 0){


      
    }
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


