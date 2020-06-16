import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

<<<<<<< HEAD
const Eletrodo = solo => (
  <tr>
    <td>{solo.eletrodos.idsolo}</td>
    <td>{solo.eletrodos.solo}</td>
    <td>{solo.eletrodos.resistividade}</td>
    <td>{solo.eletrodos.coordenadas}</td>
    <td>
      <Link to={"/edit/"+solo.eletrodos._id}>edit</Link> | <a href="#" onClick={() => { solo.deleteExercise(solo.eletrodos._id) }}>delete</a>
=======
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
>>>>>>> 3acc2accef591483190f3a7d7af07ea98737e7ac
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

<<<<<<< HEAD
    this.state = {eletrodos: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8080/soil/')
      .then(response => {
        this.setState({ eletrodos: response.data })
=======
    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
>>>>>>> 3acc2accef591483190f3a7d7af07ea98737e7ac
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
<<<<<<< HEAD
    axios.delete('http://localhost:8080/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      eletrodos: this.state.eletrodos.filter(el => el._id !== id)
=======
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
>>>>>>> 3acc2accef591483190f3a7d7af07ea98737e7ac
    })
  }

  exerciseList() {
<<<<<<< HEAD
    return this.state.eletrodos.map(currentexercise => {
      return <Eletrodo eletrodos={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
=======
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
>>>>>>> 3acc2accef591483190f3a7d7af07ea98737e7ac
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
<<<<<<< HEAD
              <th>idSolo</th>
              <th>Solo</th>
              <th>Resistividade</th>
              <th>Coordenadas</th>
=======
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
>>>>>>> 3acc2accef591483190f3a7d7af07ea98737e7ac
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