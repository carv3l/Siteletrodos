import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



var uri_get ="http://localhost:8080/soil/";

//var uri_get ="https://eletrodos.herokuapp.com/soil/";

const Eletrodo = solo => (
  <tr>
    <td>{solo.eletrodos.idsolo}</td>
    <td>{solo.eletrodos.solo}</td>
    <td>{solo.eletrodos.resistividade}</td>
    <td>{solo.eletrodos.coordenadas}</td>
    <td>
      <Link to={"/edit/"+solo.eletrodos._id}>edit</Link> | <a href="#" onClick={() => { solo.deleteExercise(solo.eletrodos._id) }}>delete</a>

    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(solo) {
    super(solo);

    this.deleteExercise = this.deleteExercise.bind(this)


    this.state = {eletrodos: []};
  }

  componentDidMount() {
    axios.get(uri_get)
      .then(response => {
        this.setState({ eletrodos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {

    axios.delete('http://localhost:8080/exercises/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      eletrodos: this.state.eletrodos.filter(el => el._id !== id)

    })
  }



  

  exerciseList() {

    return this.state.eletrodos.map(currentexercise => {
      return <Eletrodo eletrodos={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;

    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>

              <th>idSolo</th>
              <th>Solo</th>
              <th>Resistividade</th>
              <th>Coordenadas</th>

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