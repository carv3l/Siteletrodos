import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



var uri_get ="http://localhost:8080/users/";


//var uri_get ="https://eletrodos.herokuapp.com/measures/";

const User = users => (
  <tr>
    <td>{users.utilizador.espacamento}</td>
    <td>{users.utilizador.r_medido}</td>
    <td>{users.utilizador.r_solo}</td>
    <td>{users.utilizador.nota}</td>

    <td>
      <Link to={"/edit/"+users.utilizador._id}>edit</Link> | <a href="#" onClick={() => { users.deleteExercise(users.utilizador._id) }}>delete</a>

    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(users) {
    super(users);

    this.deleteExercise = this.deleteExercise.bind(this)


    this.state = {utilizador: []};
  }

 componentDidMount() {
    axios.get(uri_get)
      .then(response => {
        this.setState({ utilizador: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {

    axios.delete(uri_get+id)
      .then(response => { console.log(response.data)});
    this.setState({
      utilizador: this.state.utilizador.filter(el => el._id !== id)

    })
  }

  exerciseList() {

    return this.state.utilizador.map(currentexercise => {
      return <User utilizado={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;

    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>

              <th>Mail</th>
              <th>Password</th>
              <th>Type</th>
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