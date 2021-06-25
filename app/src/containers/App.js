import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey, green, deepOrange } from '@material-ui/core/colors';

import Home from './Home';
import MapView from './MapView';
import FruitTypes from './FruitTypes';
import FavoriteFruit from './FavoriteFruit';
import Contact from './Contact';
import RoutesView from './RoutesView';

const theme = createMuiTheme({
    palette: {
      default: {
        main: deepOrange[300],
      },
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[800],
      },
    },
    background: green[200],
    important: deepOrange[300],
});

class App extends Component {
  render() {
    return (
        <Switch>
          <React.Fragment>
            <ThemeProvider theme={theme}>
            <Route path="/" exact strict component={Home} />
            <Route path="/karte" component={MapView} />
            <Route path="/sortenliste" component={FruitTypes} />
            <Route path="/lieblingssorte" component={FavoriteFruit} />
            <Route path="/routen" component={RoutesView} />
            <Route path="/anfrage" component={Contact} />
            </ThemeProvider>
          </React.Fragment>
        </Switch>
    );
  }
}

export default withRouter(App);
