import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Link, Card, useMediaQuery, useTheme } from '@material-ui/core';
import backgroundImage from '../images/home/desktop/background.jpg'; 
import Spende from '../images/home/desktop/spende.png'; 
import Logo from '../images/logo.png'; 
import LogoStiftung from '../images/logo_stiftung.jpg'; 
import LogoCaritas from '../images/logo_caritas.jpg'; 
import LogoLinkedIn from '../images/linked_in_logo.png'; 

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
    mapButtonContainer: {
        backgroundImage: `url(${SectionBackground})`,              
    },        
    footer: {
        textAlign: 'center', 
        padding: '1vh 0 0 0',
        background: theme.background, 
        backgroundColor: 'rgb(159, 204, 160)',
    },
    linkedInLink: {
        '&:after': {
            content: `url(${LogoLinkedIn})`,
            padding: '0 0 0 2px',  
        }        
    }
})); 

const HomeDesktop = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return <React.Fragment>     
        <Grid container alignContent="center" className={classes.header}>
            <Grid item xs={12}>
                <img src={Logo} className={classes.logo} alt="Stark-Wie-Ein-Baum Logo" />
                <Typography variant="h6">
                    Als Baumpate doppelt Gutes tun!
                </Typography>
                <Typography variant="body1" color="secondary" className={classes.subheading}>
                    Helfen Sie Familien mit einem schwer erkrankten Kind oder Jugendlichen. Unterstützen Sie gleichzeitig ein wichtiges Naturschutzprojekt.
                </Typography>                
                <Button variant="contained" size="small" component={NavLink} to={() => "/anfrage"} style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)', zIndex: '0.3'}}>Pate werden</Button>                        
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
                                    <Typography variant="body2" color="secondary">Entdecke auf der Karte die unterschiedlichen Bäume der Sorten Apfel, Birne, Pflaume und Quitte. Du kannst außerdem deine Lieblingssorte über den Sortenfinder finden, sowie alle gelisteten Sorten erkunden.</Typography>
                                </div>                                                           
                                <Grid container className={classes.mapButtonContainer} direction="row" justify="space-evenly" alignItems="center">                                    
                                    <Grid item xs={4}>
                                        <Button variant="contained" size="small" component={NavLink} to={() => "/sortenliste"} style={{color: 'white', backgroundColor: 'rgb(226, 179, 79)'}}>Zu den Sorten</Button>
                                    </Grid>         
                                    <Grid item xs={4}>
                                        <Button variant="contained" size="small" component={NavLink} to={() => "/karte"} style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Zu den Bäumen</Button>                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button variant="contained" size="small" component={NavLink} to={() => "/lieblingssorte"} style={{color: 'white', backgroundColor: 'rgb(226, 179, 79)'}}>Sorten finden</Button>                                        
                                    </Grid>                                                                    
                                </Grid>
                            </div>    
                        </Card>                
                    </Grid> 
                    <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>   
                        <div style={{display: 'grid', gridTemplateRows: '3fr 2fr', height: '100%', textAlign: 'center'}}>
                                <Grid container direction="row" justify="space-evenly" alignItems="center">
                                    <Grid item xs={6}>
                                        <Link href="https://www.hof-grueneberg.de/stiftung/stiftung-hof-grueneberg/">
                                            <img className={classes.sectionLogo} src={LogoStiftung} alt="Stiftung Logo"></img>                    
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link href="https://www.caritas-berlin.de/beratungundhilfe/berlin/hospizdienste/kinderhospiz-und-familienbesuchsdienst">
                                            <img className={classes.sectionLogo} src={LogoCaritas} alt="Caritas Logo"></img>
                                        </Link>
                                    </Grid>                                                                                
                                </Grid>                                    
                                <Grid container direction="row" justify="space-evenly" alignItems="center">
                                    <Grid item xs={12}>
                                        <Link href="https://www.stark-wie-ein-Baum.de" underline="none">
                                            <Button variant="contained" size="small" style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)', placeSelf: 'center'}}>Mehr Infos</Button>
                                        </Link>
                                    </Grid>                                                                                                            
                                </Grid>
                            </div>
                        </Card>            
                    </Grid>            
                </React.Fragment> :             
                <React.Fragment>
                   <Grid item lg={4} xs={12}>
                        <Card className={classes.card}>
                            <Grid container direction="column" alignItems="center" spacing={1}>
                                <Grid item className={classes.cardTitle}>
                                    <Typography variant="body1" color="primary">531 Bäume für den guten Zweck</Typography>
                                </Grid>
                                <Grid item className={classes.cardContent}>
                                    <Typography variant="body2" color="secondary">Entdecke auf der Karte die unterschiedlichen Bäume der Sorten Apfel, Birne, Pflaume und Quitte. Du kannst außerdem deine Lieblingssorte über den Sortenfinder finden, sowie alle gelisteten Sorten erkunden.</Typography>
                                </Grid>         
                                <Grid container justify="space-evenly" className={classes.mapButtonContainer} style={{padding: '18px'}}>
                                    <Grid item xs={3} style={{textAlign: 'center'}}>                                        
                                        <Button variant="contained" size="small" component={NavLink} to={() => "/sortenliste"} style={{color: 'white', backgroundColor: 'rgb(226, 179, 79)'}}>Zu den Sorten</Button>
                                    </Grid>         
                                    <Grid item xs={3} style={{textAlign: 'center'}}>
                                        <Button variant="contained" size="small" component={NavLink} to={() => "/karte"} style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)'}}>Zu den Bäumen</Button>                                    
                                    </Grid>
                                    <Grid item xs={3} style={{textAlign: 'center'}}>
                                        <Button variant="contained" size="small" component={NavLink} to={() => "/lieblingssorte"} style={{color: 'white', backgroundColor: 'rgb(226, 179, 79)'}}>Sorten finden</Button>                                        
                                    </Grid>
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
                                        <Button variant="contained" size="small" style={{color: 'white', backgroundColor: 'rgb(236, 108, 63)', textDecoration: 'none'}}>Mehr Infos</Button>
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
            <Grid container>
                <Grid item xs={12} style={{padding:'1vh 36vw'}}>
                    <Typography variant="caption" color="secondary">
                        Web-App programmiert von <Link href="https://de.linkedin.com/in/katharinasachs-infopsy" className={classes.linkedInLink}>Katharina Sachs</Link> und <Link href="https://www.linkedin.com/in/karl-brendel-805bab199/" className={classes.linkedInLink}>Karl Brendel</Link> in Kooperation mit der <Link href="https://www.beuth-hochschule.de/">Beuth Hochschule für Technik Berlin</Link>.
                    </Typography>
                </Grid>
            </Grid>         
        </div>
    </React.Fragment>
}

export default HomeDesktop;