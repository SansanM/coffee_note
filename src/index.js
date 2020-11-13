import Layout from "./Layout";
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Home";
import Login from "./Login";
import NoteDetail from "./NoteDetail";
import AddNote from "./AddNote";

import IsLogin from "./component/isLogin";
import IsLogout from "./component/isLogout";

const LoginOnly = (props) =>{
  return(
    <React.Fragment>
      <Route path="/NoteDetail" render={() => <NoteDetail />}/>
      <Route path="/AddNote" render={() => <AddNote />}/>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/Home" render={() => <Home />} />
    </React.Fragment>
  )
} 
const LogoutOnly = (props) =>{
  return(
    <React.Fragment>
      <Route path="/Login" render={() => <Login isLogin={true} />} />
      <Route path="/Signup" render={() => <Login isLogin={false} />} />
    </React.Fragment>
  )
} 
const RoutingComponent = (props) => {
  return (
    <React.Fragment>
      
      <IsLogin>
        <LoginOnly />
      </IsLogin>
      <IsLogout>
        <LogoutOnly />
      </IsLogout>
    </React.Fragment>
  )
}

export default function APP(props) {

  return (
    <Layout title="CoffeeNote">
      <Router basename={process.env.PUBLIC_URL}>
        <RoutingComponent />
      </Router>
    </Layout>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <CookiesProvider>
    <APP />
  </CookiesProvider>
  , rootElement);