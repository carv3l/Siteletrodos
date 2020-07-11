import React, { Component } from 'react';
import Plotta from 'dist/plotta.js';


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
        text: "Plotta.js"
      },
      grid: {
        visible: true,
        color: "#888888"
      },
      border: {
        visible: true,
        color: "#DDDDDD",
        width: 1
      }
    }
  })
export default class graph extends Component {
    constructor(props) {
        super(props);
    
        
       }
    
        
    
render() {
    return (
<canvas
  id="canvas"
  width="700px"
  height="700px"
  style="width:700px; height:700px; border:1px solid #d3d3d3;"
></canvas>
    )}
}