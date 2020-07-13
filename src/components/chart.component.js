import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom';
var operations = require('./Operations');


var uri_get ="https://eletrodos.herokuapp.com/measures/";
//var uri_get ="http://localhost:8080/measures/";
var array_media = [];
var larray_media= [];
var array_nmedidas = [];
var larray_nmedidas = [];
var array_rsolo = [];
var larray_rsolo = [];
var measures_to_store =[];
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
  this.state = {measure: [],retrieved_data: []};
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
        this.setState(prevState => {
            let options = Object.assign({}, prevState.options); // creating copy of state variable options
            options.xaxis.categories = array_nmedidas;                     // update the name property, assign a new value                 
            return { options };                                 // return new object options object
          })
   
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
    var measures_to_store =[];
    console.log("upo:"+larray_nmedidas.length);
    for(let i= 0; i < larray_nmedidas.length; i++) {
     var res = operations.isNumberWithinPercentOfNumber(larray_media[0],0.15,larray_rsolo[i]);//Aqui o 15% tem de ser 0.15
      console.log("res:"+res,larray_rsolo[i],+larray_media[0]);
      if (res) {
        this.loadData(larray_rsolo[i]);
        //measures_to_store.push(larray_rsolo[i]);
        count++;
        console.log(count);
        //console.log("res:"+res,measures_to_store);
      }

    }

    if (count == larray_nmedidas.length) {
      alert("SOLO HOMOGENEO");
      
    }else{
      alert("SOLO NÃO HOMOGENEO \n Nº Medidas Compativeis: "+count);
    }
    this.exerciseList()
  }

  loadData(soil) {
    for (var i = 0; i < medida.length; i++) {
      if(medida[i]['r_solo']==soil){

        measures_to_store.push(medida[i]);
      }
    }
}




  reset(){
    larray_media = array_media;
    larray_nmedidas = array_nmedidas;
    larray_rsolo = array_rsolo;
    array_media= [];
    array_nmedidas = [];
    array_rsolo = [];
    measures_to_store =[];
  }

  exerciseList() {
    console.log("measu:",measures_to_store);
    var output = document.getElementById('output');
    output.innerHTML = this.json2Table(measures_to_store);
    this.reset();
    /* if(measures_to_store != 0){
 
    return measures_to_store.map(current => {
      return <Measure_row measure={current}/>;
    })
  }
  */


  }

  json2Table(json) { //https://dev.to/boxofcereal/how-to-generate-a-table-from-json-data-with-es6-methods-2eel
    let columns= Object.keys(json[0]);
    console.log("headerRow"+JSON.stringify(json[0]));
    //console.log("cols"+cols[index]);
    //Mostrar só os dados importantes
    let cols = []; 
    for (let index = 1; index < columns.length-1; index++) {
      cols.push(columns[index]);
    }

   // console.log("headerRow"+cols);
  
    //Map over columns, make headers,join into string
    let headerRow = cols
      .map(col => `<th>${col}</th>`)
      .join("");

      //console.log("headerRow"+headerRow.length);
  
    //map over array of json objs, for each row(obj) map over column values,
    //and return a td with the value of that object for its column
    //take that array of tds and join them
    //then return a row of the tds
    //finally join all the rows together
    //console.log("Row"+JSON.stringify(json));
    let rows = json.map(row => {
        let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
        console.log("Row"+JSON.stringify(row));
        console.log("tds"+tds);
        return `<tr>${tds}</tr>`;
        
      })
      .join("");

  
     //build the table
     const table = `
     <table class="table">
       <thead class="thead-light">
         <tr>${headerRow}</tr>
       <thead class="thead-light">
       <tbody>
         ${rows}
       <tbody>
     <table>`;
    return table;
  }
  
  

  
  render() {
    //console.log("ola categories "+ JSON.stringify(this.state.options));
   // alert("Oi"+this.state.options.dataLabels.enabled);
   
    return (
     
      <div className="app">
        <div className="row">
         <table>
  <tr>
  <th>

          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="860"
            />
            
          </div> 
          </th>
    <th valign = "top">
    
    
    </th>

  </tr>
  </table>
  </div>

         <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Ver Dados</button>
         <button type="submit" className="btn btn-primary" onClick={this.stratifiedSoil.bind(this)}>Análise</button>
      
      <div id='output'>

</div>
</div>

    );
  }
}

export default App;