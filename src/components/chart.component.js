import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import axios from 'axios';



var uri_get ="http://localhost:8080/measures/";




class App extends Component {
constructor(props) {
    super(props);
  this.state = {measure: []};
    this.state = {
      options: {
        chart: {
          id: "basic-line"
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
      }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0]
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
        var medida = this.state.measure;
    
        console.log(medida.length);
        
        this.setState({categories : medida.length});
        
        console.log(medida);

        //Criacao de um array com valores da bd para o Y
        var array_rsolo =[];
        var soma=0;
        var media=0;
        for (var i = 0; i < medida.length; i++) {
          array_rsolo.push(medida[i]['r_solo']);
          soma+=medida[i]['r_solo'];//dentro do loop tambem faz a soma para a média
        }
        media= Math.round((soma/medida.length) * 100) / 100;

        //Colocar a media num array para mostrar no grafico
        //alert("media"+media);
        var media_array=[];
        for (let index = 0; index < medida.length; index++) {
          media_array.push(media);
        }        
        //Criacao de um array com valores da bd para o x (numero medidas)
        var array_nmedidas =[];
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
            series = JSON.parse('[{"name":"'+name1+'","data":['+array_rsolo+']},{"name":"'+name2+'","data":['+media_array+']}]'); // update and parsing to object                                  
            return {series};                                 // return new object
          }); 

       // this.setState({categories: array_rsolo});
  }




  render() {
    //console.log("ola categories "+ JSON.stringify(this.state.options));
    //alert("Oi there mate"+this.state.options.xaxis.categories);
  //  console.log("ola series "+ this.state.series.data)
   
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
      </div>
    );
  }
}

export default App;