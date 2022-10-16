import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey, green, deepOrange } from '@material-ui/core/colors';
import './index.css';

import Home from './containers/Home';
import MapView from './containers/MapView';
import FruitTypes from './containers/FruitTypes';
import FavoriteFruit from './containers/FavoriteFruit';
import Contact from './containers/Contact';
import RoutesView from './containers/RoutesView';

const theme = createTheme({
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

const router = createBrowserRouter(
    createRoutesFromElements(
        <React.Fragment>       
            <Route path="/" exact strict element={<Home/>} />
            <Route path="/karte" element={<MapView/>} />
            <Route path="/sortenliste" element={<FruitTypes/>} />
            <Route path="/lieblingssorte" element={<FavoriteFruit/>} />
            <Route path="/routen" element={<RoutesView/>} />
            <Route path="/anfrage" element={<Contact/>} />                          
        </React.Fragment>)
  );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ThemeProvider theme={theme}>
        <RouterProvider router={router}/>             
    </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
