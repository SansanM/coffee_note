import Layout from "./Layout";
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Home";
import Public from "./Public"
import Login from "./Login";
import AddNote from "./AddNote";
import IsLogin from "./component/isLogin";
import IsLogout from "./component/isLogout";

const LoginOnly = () =>{
  return(
    <React.Fragment>
      <Switch>
        <Route exact path="/AddNoteMyNote" render={() => <AddNote isPublic={false}/>}/>
        <Route exact path="/AddNotePublic" render={() => <AddNote isPublic={true}/>}/>
        <Route exact path="/Home" render={() => <Home />} />
        <Route exact path="/Public" render={() => <Public />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </React.Fragment>
  )
} 
const LogoutOnly = () =>{
  return(
    <React.Fragment>
      <Switch>
        <Route exact path="/Login" render={() => <Login isLogin={true} />} />
        <Route exact path="/Signup" render={() => <Login isLogin={false} />} />
        <Route path="/" render={() => <Login isLogin={true} />} />
      </Switch>
    </React.Fragment>
  )
} 
const RoutingComponent = () => {
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

export default function APP() {
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