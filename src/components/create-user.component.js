import React, { Component } from 'react';
import axios from 'axios';
var operations = require('./Operations');


var uri_get ="http://localhost:8080/soil/";
//var uri_get ="https://eletrodos.herokuapp.com/soil/";



export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeSpacing = this.onChangeSpacing.bind(this);
    this.onChangeResistivity = this.onChangeResistivity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      spacing:'',
      resistivity:'',
      resistiv: []
    }

    
  }

  

  componentDidMount() {
      axios.get(uri_get)
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              resistiv: response.data.map(resist => resist.resistividade+" - "+resist.solo+" - "+resist.idsolo),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  
    }
  


  onChangeSpacing(e) {
    this.setState({
      spacing: e.target.value
    })
  }
  onChangeResistivity(e) {
    this.setState({
      resistivity: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const dados = {
      spacing: this.state.spacing,
      resistivity: this.state.resistivity.split('-')[0]
    }

    console.log(dados);
    

  
    //var v2 = operations.potencial2(dados.amperage,dados.spacing,dados.depth,dados.resistivity);
    //var v3 = operations.potencial3(dados.amperage,dados.spacing,dados.depth,dados.resistivity);
   // var v231 = operations.ddp23(dados.amperage,dados.spacing,dados.depth,dados.resistivity);

    //var rsolo = operations.resolo(dados.amperage,dados.spacing,dados.depth,dados.resistivity);

    //var rsolo1 = v231/ dados.amperage;

    //var v23 = v2-v3;

    var reletricaarray = operations.reletricasolo(dados.spacing,dados.resistivity);

         //   alert("P: "+reletricaarray+"\n");
    document.getElementById('resultado').innerHTML = reletricaarray+ " kOhm";


    this.setState({
      spacing: '',
      resistivity: 0
    })
  }

  render() {
    return (
      <div>
        <h3>Calcular Resistividade Solo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Espaçamento </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.spacing}
                onChange={this.onChangeSpacing}
                />
                <label>Resistencia do Solo </label>
                <select ref="userInput"
              required
              className="form-control"
              value={this.state.resistivity}
              onChange={this.onChangeResistivity}>
              {
                this.state.resistiv.map(function(resist) {
                  return <option 
                    key={resist}
                    value={resist}>{resist}
                    </option>;
                })
              }
          </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Calcular" className="btn btn-primary" />

            <input type="submit" value="+ Novo" className="btn" />
          </div>
          
        </form>
        <div className="form-group">
        <label id="resultado">-</label>


        </div>
          

      </div>
    )
  }

 

}


