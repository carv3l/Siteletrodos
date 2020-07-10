import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Soils from "./components/soils.component";
import EditExercise from "./components/edit-exercise.component";
import AddSoils from "./components/addsoil.component";
import Main from "./components/create-user.component";
import Table from "./components/soils.component";

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Main}/>
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/AddSoil" component={AddSoils} />
      <Route path="/soils" component={Soils} />
      <Route path="/table" component={Table} />

      </div>
    </Router>
  );
}

export default App;
