import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Link, Card, CardActions, useMediaQuery, useTheme } from '@material-ui/core';
import backgroundImage from '../images/home/desktop/background.jpg'; 
import Spende from '../images/home/desktop/spende.png'; 
import Logo from '../images/logo.png'; 
import LogoStiftung from '../images/logo_stiftung.jpg'; 
import LogoCaritas from '../images/logo_caritas.jpg'; 

import SectionBackground from '../images/home/mobile/section_background.png'; 

const useStyles = makeStyles(theme => ({           
    header: {    
        height: '68vh',
        width: '100%',  
        textAlign: 'center', 
        background: `no-repeat url(${backgroundImage})`,     
        backgroundSize: 'cover',  
    },        
    logo: {
        height: 'auto', 
        width: '12vh',                
    },
    sectionLogo: {
        [theme.breakpoints.down('md')]: {
            width: '50vh',            
            height: '12vh',         
        },
        height: '6vh', 
        width: 'auto',                 
    }, 
    subheading: {
        margin: '6px 30vw 12px 30vw',    
        [theme.breakpoints.down('md')]: {
            margin: '6px 20vw 12px 20vw',    
        },     
    },     
    cardContainer: {
        background: theme.background, 
        padding: '8px 5px 0 5px', 
        minHeight: '24.2vh',         
    }, 
    card: {
        position: 'relative', 
        [theme.breakpoints.down('md')]: {
            height: 'auto',            
            marginBottom: '8px',                                     
        },
        height: '95%', 
        width: '98%',    
        margin: 'auto',            
    },      
    cardTitle: {
        margin: '12px 0 0 0', 
        textAlign: 'center', 
    },     
    cardContent: {
        height: '100%', 
        margin: '0 15px 0 15px',         
        textAlign: 'justify', 
    },
    buttonContainer: {
        display: 'grid',                              
        backgroundImage: `url(${SectionBackground})`,              
    },     
    logoContainer: {
        placeSelf: 'center', 
        width: '100%',         
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        margin: '12px 0 0 0', 
    }, 
    footer: {
        textAlign: 'center', 
        background: theme.background, 
        padding: '0 0 6px 0',                 
    },
})); 

const HomeDesktop = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return <React.Fragment>     
        <Grid container alignContent="center" className={classes.header}>
            <Grid item xs={12}>
                <img src={Logo} className={classes.logo} />
                <Typography variant="h6">
                    Als Baumpate doppelt Gutes tun!
                </Typography>
                <Typography variant="body1" color="secondary" className={classes.subheading}>
                    Helfen Sie Familien mit einem schwer erkrankten Kind oder Jugendlichen. Unterstützen Sie gleichzeitig ein wichtiges Naturschutzprojekt.
                </Typography>                
                <Button variant="contained" size="small" style={{zIndex: '0.3'}} component={NavLink} to={() => "/anfrage"} style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Pate werden</Button>                        
            </Grid>
        </Grid>    
        <Grid container justify="space-evenly" className={classes.cardContainer}>
            <Grid item container alignItems="stretch" xs={12}>
                {!isTablet ? 
                <React.Fragment>
                    <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>                        
                            <div style={{width: '100%', maxHeight: '24.2vh', padding: '12px', textAlign: 'center'}}>                        
                                <img src={Spende} alt="Spendenübersicht" style={{width: 'auto', height: '18vh'}} />                            
                            </div>
                        </Card>            
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>
                            <div style={{display: 'grid', gridTemplateRows: '1fr 2fr 2fr', height: '100%', textAlign: 'center'}}>
                                <div className={classes.cardTitle}>
                                    <Typography variant="body1" color="primary">531 Bäume für den guten Zweck</Typography>
                                </div>                         
                                <div className={classes.cardContent}>
                                    <Typography variant="body2" color="secondary">Entdecke auf der Karte die unterschiedlichen Bäume der Sorten Apfel, Birne, Pflaume und Quitte.</Typography>
                                </div>                                                           
                                <div className={classes.buttonContainer}>
                                    <Button variant="contained" size="small" component={NavLink} to={() => "/karte"} style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)', placeSelf: 'center'}}>Zu den Bäumen</Button>
                                </div>
                            </div>    
                        </Card>                
                    </Grid> 
                    <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>                            
                            <div style={{display: 'grid', gridTemplateRows: '3fr 2fr', height: '100%', textAlign: 'center'}}>
                                <div className={classes.logoContainer}>
                                    <Link href="https://www.hof-grueneberg.de/stiftung/stiftung-hof-grueneberg/">
                                        <img className={classes.sectionLogo} src={LogoStiftung} alt="Stiftung Logo"></img>                    
                                    </Link>
                                    <Link href="https://www.caritas-berlin.de/beratungundhilfe/berlin/hospizdienste/kinderhospiz-und-familienbesuchsdienst">
                                        <img className={classes.sectionLogo} src={LogoCaritas} alt="Caritas Logo"></img>
                                    </Link>
                                </div>
                                <div style={{display: 'grid'}}>
                                    <Link href="https://www.stark-wie-ein-Baum.de">
                                        <Button variant="contained" size="small" style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)', placeSelf: 'center'}}>Mehr Infos</Button>
                                    </Link>
                                </div>
                            </div>                                   
                        </Card>            
                    </Grid>            
                </React.Fragment> : 
                <React.Fragment>
                   <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>
                            <Grid item container direction="column" alignItems="center" spacing={1}>
                                <Grid item className={classes.cardTitle}>
                                    <Typography variant="body1" color="primary">531 Bäume für den guten Zweck</Typography>
                                </Grid>
                                <Grid item className={classes.cardContent}>
                                    <Typography variant="body2" color="secondary">Entdecke auf der Karte die unterschiedlichen Bäume der Sorten Apfel, Birne, Pflaume und Quitte.</Typography>
                                </Grid>                        
                                <Grid item style={{padding: '14px'}}>
                                    <Button variant="contained" size="small" component={NavLink} to={() => "/karte"} style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Zu den Bäumen</Button>
                                </Grid>                        
                            </Grid>                                                 
                        </Card>                
                    </Grid>  
                    <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>                        
                            <div style={{width: '100%', maxHeight: '50vh', padding: '12px', textAlign: 'center'}}>                        
                                <img src={Spende} alt="Spendenübersicht" style={{width: 'auto', height: '48vh'}} />                            
                            </div>
                        </Card>            
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>
                            <Grid item container direction="row" alignItems="center" justify="space-evenly" className={classes.cardContent}>                                                                                                                                                             
                                <Grid item style={{padding: '15px 0 3px 0'}}>
                                    <Link href="https://www.hof-grueneberg.de/">
                                        <img className={classes.sectionLogo} src={LogoStiftung} alt="Stiftung Logo"></img>                    
                                    </Link>
                                </Grid>
                                <Grid item style={{padding: '3px 0 3px 0'}}>
                                    <Link href="https://www.caritas-berlin.de/beratungundhilfe/berlin/hospizdienste/kinderhospiz-und-familienbesuchsdienst">
                                        <img className={classes.sectionLogo} src={LogoCaritas} alt="Caritas Logo"></img>
                                    </Link>
                                </Grid>                      
                                <Grid item xs={12} style={{textAlign: 'center', padding: '3px 0 15px 0'}}>
                                    <Link href="https://www.stark-wie-ein-Baum.de" underline="none">
                                        <Button variant="contained" size="small" style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Mehr Infos</Button>
                                    </Link>
                                </Grid>
                            </Grid>                        
                        </Card>            
                    </Grid>            
                </React.Fragment>}                                        
            </Grid>                              
        </Grid>         
        <div className={classes.footer}>
            <Typography variant="caption" color="secondary">
                <span><Link href="https://www.hof-grueneberg.de/kontakt/kontaktformular/#c1613">Impressum</Link> | <Link href="http://admin.stark-wie-ein-baum.de/">Admin</Link></span>
            </Typography>
        </div>
    </React.Fragment>
}

export default HomeDesktop;