import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid, Button } from '@material-ui/core';
import { Snackbar, SnackbarContent } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const axios = require('axios');

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
    const [showInfo, setShowInfo] = useState(false);
    const [data, setData] = useState({response: null});
    const [error, setError] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false);
    };

    const renderMoreInfoButton = () => {
        return (!showInfo &&
            <Grid container>
                <Grid item xs={12}>
                    <Button className={classes.moreInfoButton} size="small" color="primary" onClick={() => setShowInfo(!showInfo)}>
                        Mehr Infos
                    </Button>
                </Grid>
            </Grid>)
    }

    const renderMoreInfoField = () => {
        return (showInfo &&
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Andere Namen</Typography>
                    <Typography variant="body2">{data.response[0].andereNamen}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Früchte</Typography>
                    <Typography variant="body2">{data.response[0].beschreibung}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Verbreitung</Typography>
                    <Typography variant="body2">{data.response[0].verbreitung}</Typography>
                </Grid>
            </Grid>)
    }

    const renderCardActions = () => {
        return (<CardActions>
            <Button size="small" 
                component={NavLink} 
                to={{
                    pathname: "/anfrage", 
                    state: { 
                        treeId: props.treeId, 
                        treeName: data.response[0].sorte, 
                        reihe:  props.reihe, 
                        pflanzreihePosition: props.pflanzreihePosition
                    }
                }}
                variant="contained" 
                style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}
            >
                Pate werden
            </Button>
            { showInfo &&
            <Button size="small" color="primary" onClick={() => setShowInfo(!showInfo)}>
                Weniger Infos
            </Button>}
        </CardActions>)
    }

    useEffect(() => {        
        axios.get("https://swebapi.demo.datexis.com/api/karte/baeume")
        .then(response => {
            let baumInfos = response.data.filter(sorte => sorte.id === props.sortenId);
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
                    {`${data.response[0].sorte} - Baum ${props.treeId}`}
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
                            <Typography variant="body2">{data.response[0].geschmack}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Verwendung</Typography>
                            <Typography variant="body2">{data.response[0].verwendung}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Herkunft</Typography>
                            <Typography variant="body2">{data.response[0].herkunft}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">{data.response[0].reifezeit}</Typography>
                        </Grid>
                    </Grid>
                    { renderMoreInfoButton() }
                    { renderMoreInfoField() }
                </div>
            </CardContent>
            { renderCardActions() }
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
