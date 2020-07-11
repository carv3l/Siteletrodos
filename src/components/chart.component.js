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
          id: "basic-bar"
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
      series: [{name: "series-1",data: []}
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

     var medida = this.state.measure;
    
         console.log(medida.length);
        
        this.setState({categories : medida.length});
        
        console.log(medida);

        var arraydata =[];
        for (var i = 0; i < medida.length; i++) {
          //console.log(medida[i]['r_solo']);
          arraydata.push(medida[i]['r_solo']);

        }
        console.log(arraydata);
        this.setState({categories: arraydata});
  }




  render() {
    console.log("ola"+ this.state.options.xaxis.categories)
    console.log("ola"+ this.state.series)
   
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