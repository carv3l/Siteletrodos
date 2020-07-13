import React, { Component } from 'react';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";




//var uri_post ="http://localhost:8080/soil/add";
var uri_post ="https://eletrodos.herokuapp.com/soil/add";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeIdSolo = this.onChangeIdSolo.bind(this);
    this.onChangeSolo = this.onChangeSolo.bind(this);
    this.onChangeResistividade = this.onChangeResistividade.bind(this);
    this.onChangeCoordenadas= this.onChangeCoordenadas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      idsolo: '',
      solo: '',
      resistividade: '',
      coordenadas: '',
    }
  }

  // componentDidMount() {
  //   axios.get('http://localhost:5000/users/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map(user => user.username),
  //           username: response.data[0].username
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })

  // }

  onChangeIdSolo(e) {
    this.setState({
      idsolo: e.target.value
    })
  }

  onChangeSolo(e) {
    this.setState({
      solo: e.target.value
    })
  }

  onChangeResistividade(e) {
    this.setState({
      resistividade: e.target.value
    })
  }

  onChangeCoordenadas(e) {
    this.setState({
      coordenadas : e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.coordenadas == null){
      this.state.coordenadas = 0;
    }

    const datasoil = {
      idsolo: this.state.idsolo,
      solo: this.state.solo,
      resistividade: this.state.resistividade,
      coordenadas: this.state.coordenadas
    }

    console.log(datasoil);

    axios.post(uri_post, datasoil)
      .then(res => console.log(res.data));

      this.state = {
        idsolo: '',
        solo: '',
        resistividade: '',
        coordenadas: '',
      }

    //window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Add Soil</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Id Solo: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.idsolo}
              onChange={this.onChangeIdSolo}
              />
        </div>
        <div className="form-group"> 
          <label>Solo: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.solo}
              onChange={this.onChangeSolo}
              />
        </div>
        <div className="form-group">
          <label>Resistividade: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.resistividade}
              onChange={this.onChangeResistividade}
              />
        </div>
        <div className="form-group">
          <label>Coordenadas: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.coordenadas}
              onChange={this.onChangeCoordenadas}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Add" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}