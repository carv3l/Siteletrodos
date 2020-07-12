import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import axios from 'axios';
var operations = require('./Operations');



var uri_get ="http://localhost:8080/measures/";
var array_media = [];
var larray_media= [];
var array_nmedidas = [];
var larray_nmedidas = [];
var array_rsolo = [];
var larray_rsolo = [];
var medida;
var vtoggle = false;
var newState = {};
const initialState = {
  options: {
    chart: {
      id: "basic-line",
      },
    tooltip: {
      enabled: true,
      },
    xaxis: {
      categories: []
    },
    markers: {
      size: [5, 0],//Tamanho do ponto, 5 para a primeira serie, 0 para a média
  },    
  stroke: {
    curve: 'smooth',
    //width: [1, 4]
  },
  dataLabels: {//mostra o valor nos pontos
    enabled: vtoggle,
    enabledOnSeries: [0, 1]
  }
  },
  labels: ['01 Jan 2001', '02 Jan 2001'],
  colors: ["#FF1654", "#247BA0"],
  series: [
    {
      name: "series-1",
      data: []
    },
    {
      name: "series-2",
      data: []
    },
]
};


class App extends Component {

// shouldComponentUpdate = () => false;
constructor(props) {
    super(props);  
  this.state = {measure: []};
  this.state = initialState;
  }
//async e await para esperar que haja response do axios
  async componentDidMount() {
    await axios.get(uri_get)
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              measure: response.data.map(medidas => medidas),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
      
        //alert(this.state.options.xaxis.categories)
        medida = this.state.measure;
    
        console.log(medida.length);
       
        console.log(medida);
      

        //Criacao de um array com valores da bd para o Y
       
        var soma=0;
        var media=0;
        for (var i = 0; i < medida.length; i++) {
          array_rsolo.push(medida[i]['r_solo']);
          soma+=medida[i]['r_solo'];//dentro do loop tambem faz a soma para a média
        }
        media= Math.round((soma/medida.length) * 100) / 100;

        //Colocar a media num array para mostrar no grafico
        //alert("media"+media);
        
        for (let index = 0; index < medida.length; index++) {
          array_media.push(media);
        }
        //Criacao de um array com valores da bd para o x (numero medidas)
        
        for (var i = 0; i < medida.length; i++) {
            array_nmedidas.push(i+1);
          }
        //alert('nmedidas:'+array_nmedidas);


        this.setState(prevState => {
            let options = Object.assign({}, prevState.options); // creating copy of state variable options
            options.xaxis.categories = array_nmedidas;                     // update the name property, assign a new value                 
            return { options };                                 // return new object options object
          })
        //alert("Oi"+this.state.options.xaxis.categories);

        console.log(array_rsolo);
        var name1 = "Medida";
        var name2 = "Average";
        this.setState(prevState => {                        
            let series = { ...prevState.series };           // creating copy of state variable serie 
          //  alert("in"+JSON.stringify(series));
            series = JSON.stringify(series); //convertin object to string
            series = JSON.parse('[{"name":"'+name1+'","data":['+array_rsolo+']},{"name":"'+name2+'","data":['+array_media+']}]'); // update and parsing to object                                  
            return {series};                                 // return new object
          }); 
          this.reset();
          
  }
  async onSubmit(e) {
    //this.setState(initialState)
    vtoggle=!vtoggle;

    this.setState(prevState => {
      let options = Object.assign({}, prevState.options); // creating copy of state variable options
       options.dataLabels.enabled = vtoggle;                  // update the name property, assign a new value                 
      return { options };// return new object options object
    })
    //this.setState({ options: this.state.options})
    //this.forceUpdate();
  }
  
  //componentDidUpdate(){

//console.log(this.state.options.dataLabels.enabled);
 // }
 

  stratifiedSoil(e) {
    var count = 0;
    console.log("upo:"+larray_nmedidas.length);
    for(let i= 0; i < larray_nmedidas.length; i++) {
     var res = operations.isNumberWithinPercentOfNumber(larray_media[0],0.15,larray_rsolo[i]);//Aqui o 15% tem de ser 0.15
      console.log("res:"+res,larray_rsolo[i],+larray_media[0]);
      if (res) {
        count++;
        console.log(count);
        console.log("res:"+res,larray_rsolo[i],+larray_media[0]);
      }

    }

    if (count == larray_nmedidas.length) {
      alert("SOLO HOMOGENEO");
      
    }else{
      alert("SOLO NÃO HOMOGENEO \n Nº  Medidas Compativeis: "+count);
    }

  }

  reset(){
    larray_media = array_media;
    larray_nmedidas = array_nmedidas;
    larray_rsolo = array_rsolo;
    array_media= [];
    array_nmedidas = [];
    array_rsolo = [];
  }


  render() {
    //console.log("ola categories "+ JSON.stringify(this.state.options));
   // alert("Oi"+this.state.options.dataLabels.enabled);
   
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="860"
            />
          </div> 
        </div>
         <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)} >Ver Dados</button>
         <button type="submit" className="btn btn-primary" onClick={this.stratifiedSoil.bind(this)} >Análise</button>
      </div>

    );
  }
}

export default App;