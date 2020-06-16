import React, { Component } from 'react';
import axios from 'axios';

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


    function potencial2(amperage,spacing,depth,resistivity) {
      var powspacing = Math.pow(spacing,2);
      var powdepth = Math.pow(depth,2);      
      var ct0 = (resistivity*amperage)/(4*Math.PI);
      var v2_ct1 = 1/spacing;
      var v2_ct2 = 1/(Math.sqrt(powspacing+(2*powdepth)));
      var v2_ct3 = 1/(2*spacing);
      var v2_ct4 = 1/(Math.sqrt(2*powspacing+(2*powdepth)));
      var v2 = ct0 *(v2_ct1+v2_ct2-v2_ct3-v2_ct4);
      
      return v2;
    }

    function potencial3(amperage,spacing,depth,resistivity) {
      var powspacing = Math.pow(spacing,2);
      var powdepth = Math.pow(depth,2);      
      var ct0 = (resistivity*amperage)/(4*Math.PI);
      var v3_ct1 = 1/2*spacing;
      var v3_ct2 = 1/(Math.sqrt(2*powspacing+(2*powdepth)));
      var v3_ct3 = 1/(spacing);
      var v3_ct4 = 1/(Math.sqrt(2*powspacing+(powdepth))); 
      var v3 = ct0 *(v3_ct1+v3_ct2-v3_ct3-v3_ct4);
      return v3;
    }


    function ddp23(amperage,spacing,depth,resistivity) {
      var powspacing = Math.pow(spacing,2);
      var powdepth = Math.pow(depth,2);      
      var ct0 = (resistivity*amperage)/(4*Math.PI);
      var v_ct1 = 1/spacing;
      var v_ct2 = 2/(Math.sqrt(powspacing+(2*powdepth)));
      var v_ct3 = 2/(Math.sqrt(2*powspacing+(2*powdepth)));
      var v231 = ct0*(v_ct1 + v_ct2 - v_ct3);

      return [v231];
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


}

  
var v2 = CreateUser.potencial2(dados.amperage,dados.spacing,dados.depth,dados.resistivity);
var v3 = CreateUser.potencial3(dados.amperage,dados.spacing,dados.depth,dados.resistivity);
var v231 = CreateUser.ddp231(dados.amperage,dados.spacing,dados.depth,dados.resistivity);

 

    console.log("V2:"+v2);
    console.log("V3:"+v3);
    console.log("V23:"+v231);



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