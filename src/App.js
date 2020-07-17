import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Soils from "./components/soils.component";
import EditUser from "./components/edit_user.component";
import AddSoils from "./components/addsoil.component";
import Main from "./components/create-user.component";
import Table from "./components/measures.component";
import Graph from "./components/chart.component";
import Login from "./components/login.component";
import SignIn from "./components/signIn.component";
import ControlPanel from "./components/administration.component";

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Main}/>
      <Route path="/edit/:id" component={EditUser} />
      <Route path="/AddSoil" component={AddSoils} />
      <Route path="/soils" component={Soils} />
      <Route path="/table" component={Table} />
      <Route path="/chart" component={Graph} />
      <Route path="/Login" component={Login} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Administration" component={ControlPanel} />
      </div>
    </Router>
  );
}

export default App;
