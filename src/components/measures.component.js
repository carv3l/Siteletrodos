import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



var uri_get ="http://localhost:8080/measures/";


//var uri_get ="https://eletrodos.herokuapp.com/measures/";

const Measures = medidas => (
  <tr>
    <td>{medidas.measure.espacamento}</td>
    <td>{medidas.measure.r_medido}</td>
    <td>{medidas.measure.r_solo}</td>
    <td>{medidas.measure.nota}</td>

    <td>
      <Link to={"/edit/"+medidas.measure._id}>edit</Link> | <a href="#" onClick={() => { medidas.deleteExercise(medidas.measure._id) }}>delete</a>

    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(medidas) {
    super(medidas);

    this.deleteExercise = this.deleteExercise.bind(this)


    this.state = {measure: []};
  }

 componentDidMount() {
    axios.get(uri_get)
      .then(response => {
        this.setState({ measure: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      console.log("Measures:"+this.state.measure);
  }

  deleteExercise(id) {

    axios.delete(uri_get+id)
      .then(response => { console.log(response.data)});
    this.setState({
      measure: this.state.measure.filter(el => el._id !== id)

    })
  }

  exerciseList() {

    return this.state.measure.map(currentexercise => {
      return <Measures measure={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;

    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>

              <th>Espaçamento</th>
              <th>Resistencia Medida</th>
              <th>Resistencia Solo</th>
              <th>Notas</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}