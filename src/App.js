import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Soils from "./components/soils.component";
import EditExercise from "./components/edit-exercise.component";
import AddSoils from "./components/addsoil.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CreateUser} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/AddSoil" component={AddSoils} />
      <Route path="/soils" component={Soils} />
      </div>
    </Router>
  );
}

export default App;
