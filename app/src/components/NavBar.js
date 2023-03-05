import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Drawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
      position: 'absolute',
      top: '0',
      left: '0',
      z: '1',
      width: '100%',
      flexGrow: 1,
    },
    rootIfSticky: {
      position: 'sticky',
      top: '0',
      left: '0',
      zIndex: '2',
      width: '100%',
      flexGrow: 1,
    },
    appbar: {
      background: theme.background,
    },
    title: {
      flexGrow: 1,
      fontWeight: '400',
    },
    list: {
      width: 250,
    },
}));

/**
 * Komponente die eine Navigations-Leiste am Rand des Bildschirms anzeigt.
 *
 * **Parameter**: `props`
 * - `props.isSticky` (*boolean*): Angabe ob die Position der Leiste sticky ist
 */
const NavBar = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const sideList = () => (
      <div
        className={classes.list}
          role="presentation"
          onClick={() => setState({ right: false })}
          onKeyDown={() => setState({ right: false })}
        >
        <List>
          <ListItem button key={"Home"} component={NavLink} to={"/"}>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button key={"Pate werden"} component={NavLink} to={"/anfrage"}>
            <ListItemText primary={"Pate werden"} />
          </ListItem>
          <ListItem button key={"Zu den Bäumen"} component={NavLink} to={"/karte"}>
            <ListItemText primary={"Zu den Bäumen"} />
          </ListItem>
          <ListItem button key={"Routen"} component={NavLink} to={"/routen"}>
            <ListItemText primary={"Routen"} />
          </ListItem>
          <ListItem button key={"Lieblingssorte"} component={NavLink} to={"/lieblingssorte"}>
            <ListItemText primary={"Lieblingssorte"} />
          </ListItem>
          <ListItem button key={"Sortenliste"} component={NavLink} to={"/sortenliste"}>
            <ListItemText primary={"Sortenliste"} />
          </ListItem>
          <Link href="http://www.stark-wie-ein-baum.de/" color="inherit" underline="none">
            <ListItem button key={"Mehr Infos"}>
                <ListItemText primary={"Mehr Infos"} />
            </ListItem>
          </Link>
        </List>
    </div>
    );

    return <div className={props.isSticky ? classes.rootIfSticky : classes.root}>
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="primary">STARK WIE EIN BAUM</Typography>
                <IconButton
                color="primary"
                aria-label="open drawer"
                edge="end"
                onClick={() => {setState({ right: true })}}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={state.right} onClose={ () => setState({ right: false })}>
                    {sideList()}
                </Drawer>
            </Toolbar>
        </AppBar>
    </div>
}


export default NavBar;
