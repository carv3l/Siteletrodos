import React, { Component } from 'react';
import Plotta from 'plotta.js';



export default class graph extends Component {
    constructor(props) {
        super(props); 
        
       }
       componentDidMount() {
        const canvas = document.getElementById("canvas");
        const plotta = new Plotta(canvas, {
            linedatas: [
              {
                id: "line1",
                type: "func",
                legend: "cos",
                color: "#55A8DE",
                visible: true,
                func: Math.cos,
                dotNum: 1000
              }
            ],
            config: {
              title: {
                location: "center",
                color: "#666666",
                text: "Medidas"
              },
              
              grid: {
                visible: true,
                color: "#888888"
              },
              border: {
                visible: true,
                color: "#DDDDDD",
                width: 200
              }
            }
          })


       }
        
    
render() {
    return (
<canvas
  id="canvas"
  width="700px"
  height="700px"
  style={{width: '700px', height:'700px', border:'1px'}}
></canvas>
    )}
}