import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
var operations = require('./Operations');


var uri_get ="http://localhost:8080/soil/";
var uri_post_measure="http://localhost:8080/measures/add_measure";
//var uri_get ="https://eletrodos.herokuapp.com/soil/";
//var uri_post_measure="https://eletrodos.herokuapp.com/add_measure";


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    
    this.onChangeSpacing = this.onChangeSpacing.bind(this);
    this.onChangeResistivity = this.onChangeResistivity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      spacing:'',
      resistivity:'',
      rsolo:''
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

    //Arredondar 2 casas
    reletricaarray = Math.round(reletricaarray * 100) / 100;
   // reletricaarray = Math.round(reletricaarray * 100) / 100;

    this.state.rsolo = reletricaarray;
    //alert("P: "+this.state.rsolo+"\n");

         //   alert("P: "+reletricaarray+"\n");
    document.getElementById('espacamento').innerHTML = this.state.spacing+ " Metros";
    document.getElementById('r_medida').innerHTML = this.state.resistivity+ " kOhm";
    document.getElementById('resultado').innerHTML = reletricaarray+ " kOhm";



    const Search = () => {
      const [showResults, setShowResults] = React.useState(false)
      const onClick = () => setShowResults(true)
      return (
        <div>
          <button type="submit" className="btn" id="save" name="save" onClick={this.handleSubmit.bind(this)} >Guardar</button>
          { showResults ? <Results /> : null }
        </div>
      )
    }
    
    const Results = () => (
      <div id="results" className="search-results">
        Some Results
      </div>
    )
    
    ReactDOM.render(<Search />, document.querySelector("#container"))


    /* this.setState({
      spacing: '',
      resistivity: 0
    }) */
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
  render() {
    return (
      <div>
        <h3>Calcular Resistividade Solo</h3>
        <form>
          <div className="form-group"> 
            <label>Espaçamento </label>
            <input required type="text" className="form-control" value={this.state.spacing} onChange={this.onChangeSpacing} required/>
                <label>Resistencia do Solo </label>
                <input required type="text" className="form-control" value={this.state.resistivity} onChange={this.onChangeResistivity} required/>
               {/*  <select ref="userInput"
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
          </select> */}


          </div>
          <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)} >Calcular</button>
          
          </div>
          
        </form>
        <div className="form-group">
        <label id="espacamento"></label>
        <br></br>
        <label id="r_medida"></label>
        <br></br>
        <label id="resultado"></label>
        <br></br>
        <div id="container">
       
        </div>
        
        </div>
      </div>
    )
  }
}


