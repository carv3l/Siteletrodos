import React, { Component } from 'react';
import axios from 'axios';
var operations = require('./Operations');
export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeAmperage = this.onChangeAmperage.bind(this);
    this.onChangeSpacing = this.onChangeSpacing.bind(this);
    this.onChangeDepth = this.onChangeDepth.bind(this);
    this.onChangeResistivity = this.onChangeResistivity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      amperage: '',
      spacing:'',
      depth:'',
      resistivity:'',
      resistiv: []
    }

    
  }

  

  componentDidMount() {
      axios.get('http://localhost:8080/soil/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              resistiv: response.data.map(resist => resist.resistividade),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  
    }
  


  onChangeAmperage(e) {
    this.setState({
      amperage: e.target.value
    })
  }
  onChangeSpacing(e) {
    this.setState({
      spacing: e.target.value
    })
  }
  onChangeDepth(e) {
    this.setState({
      depth: e.target.value
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
      amperage: this.state.amperage,
      spacing: this.state.spacing,
      depth: this.state.depth,
      resistivity: this.state.resistivity
    }

    console.log(dados);

  
    var v2 = operations.potencial2(dados.amperage,dados.spacing,dados.depth,dados.resistivity);
    var v3 = operations.potencial3(dados.amperage,dados.spacing,dados.depth,dados.resistivity);
    var v231 = operations.ddp23(dados.amperage,dados.spacing,dados.depth,dados.resistivity);

    var rsolo = operations.resolo(dados.amperage,dados.spacing,dados.depth,dados.resistivity);

    var rsolo1 = v231/ dados.amperage;

    var v23 = v2-v3;

    var reletricaarray = operations.reletrica(dados.amperage,dados.spacing,dados.depth,dados.resistivity,rsolo);

    var reletrica = reletricaarray[0];
   // var reletrica1 = reletricaarray[1];

    
     
    
        // console.log("V2:"+v2);
        // console.log("V3:"+v3);
        // console.log("V23:"+v231);
        // console.log("V231"+v23);
        // console.log("ReSOlo: "+rsolo);
        // console.log("Resolo1: "+rsolo1);

        alert("V2: "+v2+"\n"+"V3: " + v3+"\n"+"V23: "+v231+
        "\n"+"V231: "+v23+"\n"+"Resolo: "+rsolo+"\n"+"Resolo1: "+rsolo1+
        "\n"+"Reletrica: "+reletrica+"\n");









    this.setState({
      amperage: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Calcular Resistividade Solo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Intensidade da Corrente: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.amperage}
                onChange={this.onChangeAmperage}
                />
                <label>Espaçamento </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.spacing}
                onChange={this.onChangeSpacing}
                />
                <label>Profundidade</label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.depth}
                onChange={this.onChangeDepth}
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
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }

 

}


