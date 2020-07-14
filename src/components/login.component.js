import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
var operations = require('./Operations');


//var uri_get ="http://localhost:8080/soil/";
var uri_post_measure="http://localhost:8080/users/add_user";
//var uri_get ="https://eletrodos.herokuapp.com/soil/";
//var uri_post_measure="https://eletrodos.herokuapp.com/add_measure";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeMail = this.onChangeMail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
 
    this.state = {
      mail:'',
      password:'',
      redirect: false
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

  onSubmit(e) {
    e.preventDefault();
    const dados = {
    mail: this.state.mail,
     password: this.state.password
    }
               // alert("P: "+JSON.stringify(dados)+"\n");

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

    axios.post(uri_post_measure, measure)
      .then(res => console.log(res.data))
      .catch((error) => {
               console.log(error);
             });
      

  }
  setRedirect(e){
    e.preventDefault();
    this.props.history.push('./SignIn');
    
 }
  
  render() {
    return (
      <div>
        <h3>Login</h3>
        <form>
          <div className="form-group"> 
            <label>Mail </label>
            <input required type="mail" className="form-control" value={this.state.mail} onChange={this.onChangeMail} required/>
            <label>Palavra Passe</label>
            <input required type="password" className="form-control" value={this.state.password} onChange={this.onChangepassword} required/>
          </div>
          <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)} >Login</button>
          <button type="submit" onClick={this.setRedirect.bind(this)}>Registar</button>
          </div>
        </form>
      </div>
    )
  }
}


