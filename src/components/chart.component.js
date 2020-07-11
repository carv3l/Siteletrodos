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
        xaxis: {
          categories: []
        },
        markers: {
          size: 5,
      },    
      stroke: {
        curve: 'smooth',
      }
      },
      legend: {
        show: true,
        position: 'bottom'
      },  
      series: [
        {
          name: "series-1",
          data: []
        }
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
        for (var i = 0; i < medida.length; i++) {
          array_rsolo.push(medida[i]['r_solo']);

        }
        
        //Criacao de um array com valores da bd para o x (numero medidas)
        var array_nmedidas =[];
        for (var i = 0; i < medida.length; i++) {
            array_nmedidas.push(i+1);
          }
        //alert('nmedidas:'+array_nmedidas);


        this.setState(prevState => {
            let options = Object.assign({}, prevState.options); // creating copy of state variable jasper
            options.xaxis.categories = array_nmedidas;                     // update the name property, assign a new value                 
            return { options };                                 // return new object jasper object
          })
        //alert("Oi"+this.state.options.xaxis.categories);

        console.log(array_rsolo);
        var name = "Medida 1";
        this.setState(prevState => {                        
            let series = { ...prevState.series[0] };            // creating copy of state variable serie 
            series = JSON.stringify(series);                    //convertin object to string
            series = JSON.parse('[{"name":"'+name+'","data":['+array_rsolo+']}]'); // update and parsing to object                                  
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
              width="1160"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;