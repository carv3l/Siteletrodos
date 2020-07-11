var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('../canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class chart extends Component {	
	constructor() {
		super();
    }
    
    componentDidMount() {
    }

        
    render() {
        const options = {
          title: {
            text: "Basic Column Chart in React"
          },
          data: [{				
                    type: "column",
                    dataPoints: [
                        { label: "Apple",  y: 10  },
                        { label: "Orange", y: 15  },
                        { label: "Banana", y: 25  },
                        { label: "Mango",  y: 30  },
                        { label: "Grape",  y: 28  }
                    ]
           }]
       }
            
       return (
          <div>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />
          </div>
        );
      }
    }
      module.exports = chart; 
    
 
