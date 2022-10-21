import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid, Button } from '@material-ui/core';
import { Snackbar, SnackbarContent } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            bottom: 'auto',
            margin: 'auto',
            top: '74px',
            right: '10px',
            maxHeight: '10vh',
            width: '25%',
        },
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
        },
    },
    card: {
        width: '100%',
    },
    content: {
        [theme.breakpoints.up('md')]: {
            maxHeight: '60vh',
            overflowY: 'scrollbar',
            overflowX: 'hidden',
        },
        [theme.breakpoints.down('sm')]: {
            maxHeight: '20vh',
            overflowY: 'scrollbar',
            overflowX: 'hidden',
        },
    },
    moreInfoButton: {
        [theme.breakpoints.up('md')]: {
            margin: '6px 0 0 0',
        },
    },
}));

const TreeInfoBox = (props) => {
    const classes = useStyles();
    const [data, setData] = useState({response: null});
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const redirectToContact = () => {
        const options = { state: { 
            treeId: props.treeId, 
            treeName: data.response.sorte, 
            reihe:  props.reihe,
            pflanzreihePosition: props.pflanzreihePosition
        }}
        navigate("/anfrage", options)
    }

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setError(false);
    };

    useEffect(() => {        
        axios.get("https://swebapi.demo.datexis.com/api/karte/baeume")
        .then(response => {
            let baumInfos = response.data.filter(sorte => sorte.id === props.sortenId)[0];
            setData({response: baumInfos});
        })
        .catch((e) => {
            setError(e);
        });
    }, [props.sortenId]);

    return <div className={classes.root}>
        {data.response && 
        <Card className={classes.card}>                        
            <CardContent>
                <IconButton style={{float: 'right'}} onClick={() => props.parentCallback(false)}>
                    <CloseIcon />
                </IconButton>  
                <Typography variant="h5">
                    {`${data.response.sorte} - Baum ${props.treeId}`}
                </Typography>       
                <Typography variant="h6" gutterBottom>                    
                    {`Reihe ${props.reihe}, Baum ${props.pflanzreihePosition}`}
                </Typography>                          
                <div className={classes.content}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Patenschaft</Typography>
                            <Typography variant="body2">{props.hasSponsor === true ? "Hat bereits einen Paten" : "Sucht noch einen Paten"}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Geschmack</Typography>
                            <Typography variant="body2">{data.response.geschmack}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Verwendung</Typography>
                            <Typography variant="body2">{data.response.verwendung}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Früchte und Baumwuchs</Typography>
                            <Typography variant="body2">{data.response.beschreibung}</Typography>
                            <Typography variant="body2">{data.response.groesse}</Typography>                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Reifezeit und Lagerfähigkeit</Typography>
                            <Typography variant="body2">{data.response.reifezeit}</Typography>
                            <Typography variant="body2">Die Lagerzeit beträgt {data.response.lagerfaehigkeit} {data.response.lagerfaehigkeit > 1 ? "Monate" : data.response.lagerfaehigkeit === 0 ? "weniger als einen Monat" : "Monat"}.</Typography>
                        </Grid>              
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Andere Namen</Typography>
                            <Typography variant="body2">{data.response.andereNamen}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Herkunft</Typography>
                            <Typography variant="body2">{data.response.herkunft}</Typography>
                        </Grid>                                  
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Verbreitung</Typography>
                            <Typography variant="body2">{data.response.verbreitung}</Typography>
                        </Grid>
                    </Grid>                       
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" 
                    onClick={() => redirectToContact()}                    
                    variant="contained" 
                    style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}
                >
                    Pate werden
                </Button>                
            </CardActions>
        </Card>}
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarContent
                style={{
                    backgroundColor: 'rgb(211, 56, 47)',
                }}
                message={                          
                    "Bauminfos konnten nicht geladen werden!"
                }
            />
        </Snackbar>
    </div>
}

export default TreeInfoBox;
