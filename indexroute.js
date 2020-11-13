import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router ,Route ,Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header" 
import Home from "./Home"
import About from "./About"
import Potoforio from "./Potoforio"
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Routing = () => {
    return(
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path = "/" render={() => <Home />} />
                <Route path ="/Home" component={Home} />
                <Route path ="/About" component={About} />
                <Route path ="/Potoforio" component={Potoforio} />
            </Switch>
        </Router>
    )
}

function App() {
    const style =  {
        background:"#9E9E9E" 
    };
  return (
    <div style={style}>
        <Header />
        <ThemeProvider theme={theme}>
            <Routing />
        </ThemeProvider>

    </div>
  );
}



// Render
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);