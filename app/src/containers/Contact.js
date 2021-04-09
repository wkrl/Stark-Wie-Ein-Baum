import React from 'react';
import NavBar from '../components/NavBar'; 
import Message from '../components/Message';
import InputField from '../components/InputField'; 
import { Typography, Button, Grid, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core';
import useGlobal from '../store';

const axios = require('axios');
axios.defaults.baseURL = 'https://swebapi.demo.datexis.com'; 

const useStyles = makeStyles(theme => ({
    bg: {
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: '0',
            left: '0', 
            zIndex: '-1', 
            width: '100vw',
            minHeight: '100vh',        
            background: 'linear-gradient(180deg, rgba(145,185,147,1) 0%, rgba(194,228,195,1) 100%)',
        },
    },
    root: {        
        background: 'linear-gradient(180deg, rgba(145,185,147,1) 0%, rgba(194,228,195,1) 100%)',
        height: '100%', 
        padding: '15px 30px 0 30px',
        [theme.breakpoints.up('md')]: {
            padding: '6% 30% 0 30%',
        },
    },
    required: {
        '&::after': {
            content: '" *"',
            color: 'red',
            fontWeight: 'bold',
        }
    },
}));


const SignUp = (props) => {
    const classes = useStyles();
    const [globalState,] = useGlobal();
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [warning, setWarning] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false);
        setWarning(false); 
        setSuccess(false); 
    };

    const checkInput = () => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (globalState.vorname && globalState.nachname && globalState.email && globalState.nachricht && globalState.email.match(regex)) {
            sendUserInput();
        } else {
            setWarning(true); 
        }
    }

    const sendUserInput = () => {      
        axios.post("/api/kontakt", {            
            firstName: globalState.vorname,
            lastName: globalState.nachname,
            streetAddress: `${globalState.straße} ${globalState.nummer}`, 
            cityAddress: `${globalState.postleitzahl} ${globalState.ort}`, 
            email: globalState.email,
            message: globalState.nachricht,
            phone: globalState.telefon, 
        })        
        .then(() => {
            setSuccess(true)
        })
        .catch(() => setError(true))
    }

    return <React.Fragment>
        <NavBar isSticky></NavBar>        
        <div className={classes.bg}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>Anfrage</Typography>
                        <Typography className={classes.required} variant="body2" gutterBottom>Name</Typography>
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <InputField value="Vorname" name="vorname"></InputField>
                    </Grid>
                    <Grid item xs={6} lg={6}>
                        <InputField value="Nachname" name="nachname"></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>Anschrift</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        <InputField value="Straße" name="straße"></InputField>
                    </Grid>
                    <Grid item xs={4} lg={6}>
                        <InputField value="Nr." name="nummer"></InputField>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        <InputField value="Ort" name="ort"></InputField>
                    </Grid>
                    <Grid item xs={4} lg={6}>
                        <InputField value="Postleitzahl" name="postleitzahl"></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.required} variant="body2" gutterBottom>Email</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField name="email"></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>Telefon / Handy</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField name="telefon"></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.required} variant="body2" gutterBottom>Nachricht</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField name="nachricht" selectedTree={props.location.state ? props.location.state : null} textArea></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button style={{ float: "right", marginBottom: "10px", }} variant="outlined" size="medium" onClick={() => checkInput()}>Senden</Button>
                        {globalState.status ? <Message value={globalState.status} key={new Date()} /> : null}
                    </Grid>
                </Grid>
            </div>
        </div>
        <Snackbar open={warning} autoHideDuration={6000} onClose={handleClose}>
        <SnackbarContent style={{backgroundColor: 'rgb(242, 159, 51)'}}
            message={"Bitte alle mit * markierten Felder ausfüllen."}
        />
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <SnackbarContent style={{backgroundColor: 'rgb(211, 56, 47)'}}
            message={"Anfrage konnten nicht gesendet werden!"}
        />
        </Snackbar>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <SnackbarContent style={{backgroundColor: 'rgb(81, 161, 71)'}}
            message={"Anfrage wurde gesendet!"}
        />
        </Snackbar>
    </React.Fragment>
}

export default SignUp;
